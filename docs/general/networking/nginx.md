---
uid: network-reverse-proxy-nginx
title: Nginx
---

## Nginx

"[Nginx](https://www.nginx.com/) (pronounced "engine X") is a web server which can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. The software was created by Igor Sysoev and first publicly released in 2004.[9] A company of the same name was founded in 2011 to provide support and Nginx plus paid software." - [Wikipedia](https://en.wikipedia.org/wiki/Nginx)

## Nginx from a subdomain (jellyfin.example.org)

Create the file `/etc/nginx/sites-available/jellyfin` which will forward requests to Jellyfin.  After you've finished, you will need to symlink this file to /etc/nginx/sites-enabled and then reload nginx.  This example assumes you've already acquired certifications as documented in our [Let's Encrypt](https://jellyfin.org/docs/general/networking/letsencrypt#nginx) guide.

Note that a server listening on http port 80 is required for the Certbot / Let's Encrypt certificate renewal process.

### HTTPS config example

```config
server {
    listen 80;
    listen [::]:80;
    server_name jellyfin.example.org;

    # Uncomment to redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    # Nginx versions prior to 1.25
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    # Nginx versions 1.25+
    #listen 443 ssl;
    #listen [::]:443 ssl;
    #http2 on;

    server_name jellyfin.example.org;

    ## The default `client_max_body_size` is 1M, this might not be enough for some posters, etc.
    client_max_body_size 20M;

    # Comment next line to allow TLSv1.0 and TLSv1.1 if you have very old clients
    ssl_protocols TLSv1.3 TLSv1.2;

    ssl_certificate /etc/letsencrypt/live/example.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.org/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.org/chain.pem;

    # use a variable to store the upstream proxy
    set $jellyfin 127.0.0.1;

    # Security / XSS Mitigation Headers
    add_header X-Content-Type-Options "nosniff";

    # Permissions policy. May cause issues with some clients
    add_header Permissions-Policy "accelerometer=(), ambient-light-sensor=(), battery=(), bluetooth=(), camera=(), clipboard-read=(), display-capture=(), document-domain=(), encrypted-media=(), gamepad=(), geolocation=(), gyroscope=(), hid=(), idle-detection=(), interest-cohort=(), keyboard-map=(), local-fonts=(), magnetometer=(), microphone=(), payment=(), publickey-credentials-get=(), serial=(), sync-xhr=(), usb=(), xr-spatial-tracking=()" always;

    # Content Security Policy
    # See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    # Enforces https content and restricts JS/CSS to origin
    # External Javascript (such as cast_sender.js for Chromecast) must be whitelisted.
    add_header Content-Security-Policy "default-src https: data: blob: ; img-src 'self' https://* ; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://www.youtube.com blob:; worker-src 'self' blob:; connect-src 'self'; object-src 'none'; frame-ancestors 'self'; font-src 'self'";

    location / {
        # Proxy main Jellyfin traffic
        proxy_pass http://$jellyfin:8096;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Protocol $scheme;
        proxy_set_header X-Forwarded-Host $http_host;

        # Disable buffering when the nginx proxy gets very resource heavy upon streaming
        proxy_buffering off;
    }

    location /socket {
        # Proxy Jellyfin Websockets traffic
        proxy_pass http://$jellyfin:8096;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Protocol $scheme;
        proxy_set_header X-Forwarded-Host $http_host;
    }
}
```

## Nginx with Subpath (example.org/jellyfin)

When connecting to server from a client application, enter `http(s)://example.org/jellyfin` in the address field.

Set the [base URL](/docs/general/networking#base-url) field in the Jellyfin server. This can be done by navigating to the Admin Dashboard -> Networking -> Base URL in the web client. Fill in this box with `/jellyfin` and click Save. The server will need to be restarted before this change takes effect.

### HTTPS subpath example

```conf
# Jellyfin hosted on https://example.org/jellyfin

server {
    listen 80;
    listen [::]:80;
    server_name example.org;

    # Uncomment to redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    # Nginx versions prior to 1.25
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    # Nginx versions 1.25+
    #listen 443 ssl;
    #listen [::]:443 ssl;
    #http2 on;

    server_name example.org;
    # You can specify multiple domain names if you want
    #server_name jellyfin.local;

    # Comment next line to allow TLSv1.0 and TLSv1.1 if you have very old clients
    ssl_protocols TLSv1.3 TLSv1.2;

    ssl_certificate /etc/letsencrypt/live/example.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.org/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.org/chain.pem;
    
    # use a variable to store the upstream proxy
    set $jellyfin 127.0.0.1;

    # Security / XSS Mitigation Headers
    add_header X-Content-Type-Options "nosniff";

    # Permissions policy. May cause issues with some clients
    add_header Permissions-Policy "accelerometer=(), ambient-light-sensor=(), battery=(), bluetooth=(), camera=(), clipboard-read=(), display-capture=(), document-domain=(), encrypted-media=(), gamepad=(), geolocation=(), gyroscope=(), hid=(), idle-detection=(), interest-cohort=(), keyboard-map=(), local-fonts=(), magnetometer=(), microphone=(), payment=(), publickey-credentials-get=(), serial=(), sync-xhr=(), usb=(), xr-spatial-tracking=()" always;

    # Content Security Policy
    # See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    # Enforces https content and restricts JS/CSS to origin
    # External Javascript (such as cast_sender.js for Chromecast) must be whitelisted.
    add_header Content-Security-Policy "default-src https: data: blob: ; img-src 'self' https://* ; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://www.youtube.com blob:; worker-src 'self' blob:; connect-src 'self'; object-src 'none'; frame-ancestors 'self'; font-src 'self'";

    # Jellyfin
    location /jellyfin {
        return 302 $scheme://$host/jellyfin/;
    }

    # The / at the end is significant.
    # https://www.acunetix.com/blog/articles/a-fresh-look-on-reverse-proxy-related-attacks/
    location /jellyfin/ {
        # Proxy main Jellyfin traffic
        proxy_pass http://$jellyfin:8096;
        proxy_pass_request_headers on;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $http_connection;

        # Disable buffering when the nginx proxy gets very resource heavy upon streaming
        proxy_buffering off;
    }

    location /jellyfin/socket {
        # Proxy Jellyfin Websockets traffic
        proxy_pass http://$jellyfin:8096;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Protocol $scheme;
        proxy_set_header X-Forwarded-Host $http_host;
    }
}
```

## Extra Nginx Configurations

### Censor sensitive information in logs

This censors any <code>api_key</code> URL parameter from the logfile.

```conf
#Must be in HTTP block
log_format stripsecrets '$remote_addr $host - $remote_user [$time_local] '
                    '"$secretfilter" $status $body_bytes_sent '
                    '$request_length $request_time $upstream_response_time '
                    '"$http_referer" "$http_user_agent"';

map $request $secretfilter {
    ~*^(?<prefix1>.*[\?&]api_key=)([^&]*)(?<suffix1>.*)$  "${prefix1}***$suffix1";
    default                                               $request;
}

#Must be inside server block
#Insert into all servers where you want filtering (e.g HTTP + HTTPS block)
access_log /var/log/nginx/access.log stripsecrets;
```

### Cache Images

```conf
# Add this outside of you server block (i.e. http block)
proxy_cache_path /var/cache/nginx/jellyfin levels=1:2 keys_zone=jellyfin:100m max_size=15g inactive=30d use_temp_path=off;

# Cache images (inside server block)
location ~ /Items/(.*)/Images {
  proxy_pass http://$jellyfin:8096;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header X-Forwarded-Protocol $scheme;
  proxy_set_header X-Forwarded-Host $http_host;

  proxy_cache jellyfin;
  proxy_cache_revalidate on;
  proxy_cache_lock on;
  # add_header X-Cache-Status $upstream_cache_status; # This is only to check if cache is working
}
```

Ensure that the directory /var/cache/nginx/jellyfin exists and the nginx user has write permissions on it! All the cache options used are explained on [Nginx blog](https://www.nginx.com/blog/nginx-caching-guide/) and [Nginx proxy module](http://nginx.org/en/docs/http/ngx_http_proxy_module.html).

## Nginx Proxy Manager

[Nginx Proxy Manager](https://nginxproxymanager.com/) provides an easy-to-use web GUI for Nginx.

Create a proxy host and point it to your Jellyfin server's IP address and http port (usually 8096)

Enable "Block Common Exploits", and "Websockets Support". Configure the access list if you intend to use them. Otherwise leave it on "publicly accessible".

In the "Advanced" tab, enter the following in "Custom Nginx Configuration".  This is optional, but recommended if you intend to make Jellyfin accessible outside of your home.

```config
    # Disable buffering when the nginx proxy gets very resource heavy upon streaming
    proxy_buffering off;

    # Proxy main Jellyfin traffic
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Protocol $scheme;
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_headers_hash_max_size 2048;
    proxy_headers_hash_bucket_size 128; 
    
    # Security / XSS Mitigation Headers
    add_header X-Content-Type-Options "nosniff";

    # Content Security Policy
    # See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    # Enforces https content and restricts JS/CSS to origin
    # External Javascript (such as cast_sender.js for Chromecast) must be whitelisted.
    add_header Content-Security-Policy "default-src https: data: blob: ; img-src 'self' https://* ; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://www.youtube.com blob:; worker-src 'self' blob:; connect-src 'self'; object-src 'none'; frame-ancestors 'self'; font-src 'self'";
```

### Nginx Proxy Manager Subpaths

To use subpaths with Jellyfin you will need to add a custom location with the following location block.  Replace "SERVER_IP" with your Jellyfin server's actual IP.

```config
location ^~ /jellyfin/ {
    proxy_pass http://SERVER_IP:8096/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_buffering off;

    sub_filter '/web/' '/jellyfin/web/';
    sub_filter '/socket' '/jellyfin/socket';
    sub_filter '/api/' '/jellyfin/api/';
    sub_filter '/touchicon' '/jellyfin/web/touchicon'; # Redireccionar iconos
    sub_filter_once off;

    rewrite /jellyfin/(.*) /$1 break;
}
```

In the "SSL" tab, use the jellyfin.example.org certificate that you created with Nginx Proxy Manager and enable "Force SSL", "HTTP/2 Support", "HSTS Enabled", "HSTS Subdomains".
