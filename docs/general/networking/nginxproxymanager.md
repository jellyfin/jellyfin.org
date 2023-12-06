---
uid: network-reverse-proxy-nginx-proxy-manager
title: Nginx Proxy Manager
---

## Nginx Proxy Manager

[Nginx Proxy Manager](https://nginxproxymanager.com/) (pronounced "engine X") is a web server which can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. Nginx was created by Igor Sysoev and first publicly released in 2004. A company of the same name was founded in 2011 to provide support and Nginx plus paid software. Nginx Proxy Manager was created by jc21 in 2016 and provides an easy-to-use web GUI for Nginx.

## Nginx from a subdomain (jellyfin.example.org)

:::tip

The default X-Frame-Options header may cause issues with the webOS app, causing it to remain stuck at a black screen. If enabled, the default Content Security Policy may also cause issues.

:::

Create a proxy host and point it to your Jellyfin server's IP address and http port (usually 8096)

Enable "Cache Assets", "Block Common Exploits", and "Websockets Support". Configure the access list if you intend to use them. Otherwise leave it on "publicly accessible".

In the "Custom Locations" tab, create two HTTP locations using the same IP and port as the step before:

```config

LOCATION: /

    # Proxy main Jellyfin traffic
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Protocol $scheme;
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_headers_hash_max_size 2048;
    proxy_headers_hash_bucket_size 128; 
    
    # Security / XSS Mitigation Headers
    # NOTE: X-Frame-Options may cause issues with the webOS app
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "0";
    add_header X-Content-Type-Options "nosniff";
    add_header Strict-Transport-Security "max-age=31536000" always;
    
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
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Protocol $scheme;
    proxy_set_header X-Forwarded-Host $http_host;
    
    # Security / XSS Mitigation Headers
    # NOTE: X-Frame-Options may cause issues with the webOS app
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "0";
    add_header X-Content-Type-Options "nosniff";
    add_header Strict-Transport-Security "max-age=31536000" always;
    
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

    # Uncomment next line to disable insecure TLS 1.0 and 1.1 (Might break older devices)
    # ssl_protocols TLSv1.3 TLSv1.2;
    
    # Disable buffering when the nginx proxy gets very resource heavy upon streaming
    proxy_buffering off;
    
    # The default `client_max_body_size` is 1M, this might not be enough for some posters, etc.
    client_max_body_size 20M;

```
