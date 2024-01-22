---
uid: network-reverse-proxy-nginx
title: Nginx
---

## Nginx

"[Nginx](https://www.nginx.com/) (pronounced "engine X") is a web server which can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. The software was created by Igor Sysoev and first publicly released in 2004.[9] A company of the same name was founded in 2011 to provide support and Nginx plus paid software." - [Wikipedia](https://en.wikipedia.org/wiki/Nginx)

## Nginx from a subdomain (jellyfin.example.org)

:::caution

HTTP is insecure. The following configuration is provided for ease of use only. If you are planning on exposing your server over the Internet you should setup HTTPS. [Let's Encrypt](https://letsencrypt.org/getting-started/) can provide free TLS certificates which can be installed easily via [certbot](https://certbot.eff.org/). Using only HTTP will expose passwords and API keys.

:::

:::tip

The default X-Frame-Options header may cause issues with the webOS app, causing it to remain stuck at a black screen. If enabled, the default Content Security Policy may also cause issues.

:::

Create the file `/etc/nginx/conf.d/jellyfin.conf` which will forward requests to Jellyfin.

```config
# Uncomment the commented sections after you have acquired a SSL Certificate
server {
    listen 80;
    listen [::]:80;
    # server_name DOMAIN_NAME;

    # Uncomment to redirect HTTP to HTTPS
    # return 301 https://$host$request_uri;
#}

#server {
    # listen 443 ssl http2;
    # listen [::]:443 ssl http2;
    server_name DOMAIN_NAME;

    ## The default `client_max_body_size` is 1M, this might not be enough for some posters, etc.
    client_max_body_size 20M;

    # Uncomment next line to Disable TLS 1.0 and 1.1 (Might break older devices)
    # ssl_protocols TLSv1.3 TLSv1.2;

    # use a variable to store the upstream proxy
    # in this example we are using a hostname which is resolved via DNS
    # (if you aren't using DNS remove the resolver line and change the variable to point to an IP address e.g `set $jellyfin 127.0.0.1`)
    set $jellyfin jellyfin;
    resolver 127.0.0.1 valid=30s;

    #ssl_certificate /etc/letsencrypt/live/DOMAIN_NAME/fullchain.pem;
    #ssl_certificate_key /etc/letsencrypt/live/DOMAIN_NAME/privkey.pem;
    #include /etc/letsencrypt/options-ssl-nginx.conf;
    #ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    #add_header Strict-Transport-Security "max-age=31536000" always;
    #ssl_trusted_certificate /etc/letsencrypt/live/DOMAIN_NAME/chain.pem;
    #ssl_stapling on;
    #ssl_stapling_verify on;

    # Security / XSS Mitigation Headers
    # NOTE: X-Frame-Options may cause issues with the webOS app
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "0"; # Do NOT enable. This is obsolete/dangerous
    add_header X-Content-Type-Options "nosniff";

    # COOP/COEP. Disable if you use external plugins/images/assets
    add_header Cross-Origin-Opener-Policy "same-origin" always;
    add_header Cross-Origin-Embedder-Policy "require-corp" always;
    add_header Cross-Origin-Resource-Policy "same-origin" always;

    # Permissions policy. May cause issues on some clients
    add_header Permissions-Policy "accelerometer=(), ambient-light-sensor=(), battery=(), bluetooth=(), camera=(), clipboard-read=(), display-capture=(), document-domain=(), encrypted-media=(), gamepad=(), geolocation=(), gyroscope=(), hid=(), idle-detection=(), interest-cohort=(), keyboard-map=(), local-fonts=(), magnetometer=(), microphone=(), payment=(), publickey-credentials-get=(), serial=(), sync-xhr=(), usb=(), xr-spatial-tracking=()" always;

    # Tell browsers to use per-origin process isolation
    add_header Origin-Agent-Cluster "?1" always;


    # Content Security Policy
    # See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    # Enforces https content and restricts JS/CSS to origin
    # External Javascript (such as cast_sender.js for Chromecast) must be whitelisted.
    # NOTE: The default CSP headers may cause issues with the webOS app
    #add_header Content-Security-Policy "default-src https: data: blob: http://image.tmdb.org; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://www.youtube.com blob:; worker-src 'self' blob:; connect-src 'self'; object-src 'none'; frame-ancestors 'self'";

    location = / {
        return 302 http://$host/web/;
        #return 302 https://$host/web/;
    }

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

    # location block for /web - This is purely for aesthetics so /web/#!/ works instead of having to go to /web/index.html/#!/
    location = /web/ {
        # Proxy main Jellyfin traffic
        proxy_pass http://$jellyfin:8096/web/index.html;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Protocol $scheme;
        proxy_set_header X-Forwarded-Host $http_host;
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

When connecting to server from a client application, enter `http(s)://DOMAIN_NAME/jellyfin` in the address field.

Set the [base URL](/docs/general/networking#base-url) field in the Jellyfin server. This can be done by navigating to the Admin Dashboard -> Networking -> Base URL in the web client. Fill in this box with `/jellyfin` and click Save. The server will need to be restarted before this change takes effect.

### HTTP config example

:::caution

HTTP is insecure. The following configuration is provided for ease of use only. If you are planning on exposing your server over the Internet you should setup HTTPS (see below for HTTPS configuration example). [Let's Encrypt](https://letsencrypt.org/getting-started/) can provide free TLS certificates which can be installed easily via [certbot](https://certbot.eff.org/).

:::

```conf
# Jellyfin hosted on http://DOMAIN_NAME/jellyfin

server {
    listen 80;
    listen [::]:80;

    server_name DOMAIN_NAME;
    # You can specify multiple domain names if you want
    #server_name jellyfin.local;

    # use a variable to store the upstream proxy
    # in this example we are using a hostname which is resolved via DNS
    # (if you aren't using DNS remove the resolver line and change the variable to point to an IP address e.g `set $jellyfin 127.0.0.1`)
    set $jellyfin jellyfin;
    resolver 127.0.0.1 valid=30s;

    # Uncomment and create directory to also host static content
    #root /srv/http/media;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

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
}
```

### HTTPS config example

The following config is meant to work with Certbot / Let's Encrypt.

```conf
# Jellyfin hosted on https://DOMAIN_NAME/jellyfin

server {
    listen 80;
    listen [::]:80;
    server_name DOMAIN_NAME;

    # Uncomment to redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name DOMAIN_NAME;
    # You can specify multiple domain names if you want
    #server_name jellyfin.local;
    ssl_certificate /etc/letsencrypt/live/DOMAIN_NAME/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/DOMAIN_NAME/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    add_header Strict-Transport-Security "max-age=31536000" always;
    ssl_trusted_certificate /etc/letsencrypt/live/DOMAIN_NAME/chain.pem;
    ssl_stapling on;
    ssl_stapling_verify on;
    # use a variable to store the upstream proxy
    # in this example we are using a hostname which is resolved via DNS
    # (if you aren't using DNS remove the resolver line and change the variable to point to an IP address e.g `set $jellyfin 127.0.0.1`)
    set $jellyfin jellyfin;
    resolver 127.0.0.1 valid=30s;

    # Uncomment next line to disable TLS 1.0 and 1.1 (Might break older devices)
    # ssl_protocols TLSv1.3 TLSv1.2;

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

### Cache Video Streams

```conf
# Must be in HTTP block
# Set in-memory cache-metadata size in keys_zone, size of video caching and how many days a cached object should persist
proxy_cache_path  /var/cache/nginx/jellyfin-videos levels=1:2 keys_zone=jellyfin-videos:100m inactive=90d max_size=35000m;
map $request_uri $h264Level { ~(h264-level=)(.+?)& $2; }
map $request_uri $h264Profile { ~(h264-profile=)(.+?)& $2; }

# Set in Server block
location ~* ^/Videos/(.*)/(?!live)
{
  # Set size of a slice (this amount will be always requested from the backend by nginx)
  # Higher value means more latency, lower more overhead
  # This size is independent of the size clients/browsers can request
  slice 2m;

  proxy_cache jellyfin-videos;
  proxy_cache_valid 200 206 301 302 30d;
  proxy_ignore_headers Expires Cache-Control Set-Cookie X-Accel-Expires;
  proxy_cache_use_stale error timeout invalid_header updating http_500 http_502 http_503 http_504;
  proxy_connect_timeout 15s;
  proxy_http_version 1.1;
  proxy_set_header Connection "";
  # Transmit slice range to the backend
  proxy_set_header Range $slice_range;

  # This saves bandwidth between the proxy and jellyfin, as a file is only downloaded one time instead of multiple times when multiple clients want to at the same time
  # The first client will trigger the download, the other clients will have to wait until the slice is cached
  # Esp. practical during SyncPlay
  proxy_cache_lock on;
  proxy_cache_lock_age 60s;

  proxy_pass http://$jellyfin:8096;
  proxy_cache_key "jellyvideo$uri?MediaSourceId=$arg_MediaSourceId&VideoCodec=$arg_VideoCodec&AudioCodec=$arg_AudioCodec&AudioStreamIndex=$arg_AudioStreamIndex&VideoBitrate=$arg_VideoBitrate&AudioBitrate=$arg_AudioBitrate&SubtitleMethod=$arg_SubtitleMethod&TranscodingMaxAudioChannels=$arg_TranscodingMaxAudioChannels&RequireAvc=$arg_RequireAvc&SegmentContainer=$arg_SegmentContainer&MinSegments=$arg_MinSegments&BreakOnNonKeyFrames=$arg_BreakOnNonKeyFrames&h264-profile=$h264Profile&h264-level=$h264Level&slicerange=$slice_range";

  # add_header X-Cache-Status $upstream_cache_status; # This is only for debugging cache

}
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

### Rate Limit Downloads

```conf
# Add this outside of you server block (i.e. http block)
limit_conn_zone $binary_remote_addr zone=addr:10m;

# Downloads limit (inside server block)
location ~ /Items/(.*)/Download$ {
   proxy_pass http://$jellyfin:8096;
   proxy_set_header Host $host;
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header X-Forwarded-Proto $scheme;
   proxy_set_header X-Forwarded-Protocol $scheme;
   proxy_set_header X-Forwarded-Host $http_host;

   limit_rate 1700k; # Speed limit (here is on kb/s)
   limit_conn addr 3; # Number of simultaneous downloads per IP
   limit_conn_status 460; # Custom error handling
   # proxy_buffering on; # Be sure buffering is on (it is by default on nginx), otherwise limits won't work
}

# Error page
error_page 460 http://your-page-telling-your-limit/;
```

[See here for more](https://www.nginx.com/blog/rate-limiting-nginx/)

## Nginx Proxy Manager

[Nginx Proxy Manager](https://nginxproxymanager.com/) provides an easy-to-use web GUI for Nginx.

Create a proxy host and point it to your Jellyfin server's IP address and http port (usually 8096)

Enable "Cache Assets", "Block Common Exploits", and "Websockets Support". Configure the access list if you intend to use them. Otherwise leave it on "publicly accessible".

In the "Custom Locations" tab, create two HTTP locations using the same IP and port as the step before:

```config

LOCATION: /

    # Proxy main Jellyfin traffic
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Protocol $scheme;
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_headers_hash_max_size 2048;
    proxy_headers_hash_bucket_size 128; 
    
    # Security / XSS Mitigation Headers
    # NOTE: X-Frame-Options may cause issues with the webOS app
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "0";
    add_header X-Content-Type-Options "nosniff";
    
    # Tell browsers to use per-origin process isolation
    add_header Origin-Agent-Cluster "?1" always;

    # Content Security Policy
    # See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    # Enforces https content and restricts JS/CSS to origin
    # External Javascript (such as cast_sender.js for Chromecast) must be whitelisted.
    # NOTE: The default CSP headers may cause issues with the webOS app
    #add_header Content-Security-Policy "default-src https: data: blob: http://image.tmdb.org; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.gstatic.com/cv/js/sender/v1/cast_sender.js https://www.gstatic.com/eureka/clank/95/cast_sender.js https://www.gstatic.com/eureka/clank/96/cast_sender.js https://www.gstatic.com/eureka/clank/97/cast_sender.js https://www.youtube.com blob:; worker-src 'self' blob:; connect-src 'self'; object-src 'none'; frame-ancestors 'self'";

```

```config

LOCATION: /socket

    # Proxy Jellyfin Websockets traffic
    proxy_set_header Connection "upgrade";
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Protocol $scheme;
    proxy_set_header X-Forwarded-Host $http_host;
    
    # Security / XSS Mitigation Headers
    # NOTE: X-Frame-Options may cause issues with the webOS app
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "0";
    add_header X-Content-Type-Options "nosniff";
    
    # Tell browsers to use per-origin process isolation
    add_header Origin-Agent-Cluster "?1" always;

    # Content Security Policy
    # See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    # Enforces https content and restricts JS/CSS to origin
    # External Javascript (such as cast_sender.js for Chromecast) must be whitelisted.
    # NOTE: The default CSP headers may cause issues with the webOS app
    #add_header Content-Security-Policy "default-src https: data: blob: http://image.tmdb.org; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.gstatic.com/cv/js/sender/v1/cast_sender.js https://www.gstatic.com/eureka/clank/95/cast_sender.js https://www.gstatic.com/eureka/clank/96/cast_sender.js https://www.gstatic.com/eureka/clank/97/cast_sender.js https://www.youtube.com blob:; worker-src 'self' blob:; connect-src 'self'; object-src 'none'; frame-ancestors 'self'";

```

In the "SSL" tab, use the jellyfin.example.org certificate that you created with Nginx Proxy Manager and enable "Force SSL", "HTTP/2 Support", "HSTS Enabled", "HSTS Subdomains".

Finally, in the "Advanced" tab, add the following:

```config
    
    # Disable buffering when the nginx proxy gets very resource heavy upon streaming
    proxy_buffering off;


```
