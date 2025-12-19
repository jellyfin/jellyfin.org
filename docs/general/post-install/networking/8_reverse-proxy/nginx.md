---
uid: network-reverse-proxy-nginx
title: Nginx
---

"[Nginx](https://www.nginx.com/) (pronounced "engine X") is a web server which can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. The software was created by Igor Sysoev and first publicly released in 2004.[9] A company of the same name was founded in 2011 to provide support and Nginx plus paid software." - [Wikipedia](https://en.wikipedia.org/wiki/Nginx)

## Nginx from a subdomain (jellyfin.example.org)

Create the file `/etc/nginx/sites-available/jellyfin` which will forward requests to Jellyfin. After you've finished, you will need to symlink this file to /etc/nginx/sites-enabled and then reload nginx. This example assumes you've already acquired certifications as documented in our [Let's Encrypt](https://jellyfin.org/docs/general/networking/letsencrypt#nginx) guide.

Note that a server listening on http port 80 is required for the Certbot / Let's Encrypt certificate renewal process.

### HTTPS config example

```config
server {
    # Nginx versions prior to 1.25
    #listen 443 ssl http2;
    #listen [::]:443 ssl http2;

    # Nginx versions 1.25+
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;

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
    add_header Content-Security-Policy "default-src https: data: blob: ; img-src 'self' https://* ; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://www.youtube.com blob:; worker-src 'self' blob:; connect-src 'self'; object-src 'none'; font-src 'self'";

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

server {
    listen 80;
    listen [::]:80;
    server_name jellyfin.example.org;
    return 301 https://$host$request_uri;
}
```

## Extra Nginx Configurations

### Censor sensitive information in logs

This censors any 'api_key' or 'ApiKey' URL parameter from the logfile.

```conf
#Must be in HTTP block
log_format stripsecrets '$remote_addr $host - $remote_user [$time_local] '
                    '"$secretfilter" $status $body_bytes_sent '
                    '$request_length $request_time $upstream_response_time '
                    '"$http_referer" "$http_user_agent"';

map $request $secretfilter {
    ~*^(?<prefix1>.*[\?&]api_key=)([^&]*)(?<suffix1>.*)$  "${prefix1}***$suffix1";
    ~*^(?<prefix1>.*[\?&]ApiKey=)([^&]*)(?<suffix1>.*)$  "${prefix1}***$suffix1";
    default                                               $request;
}

#Must be inside server block
#Insert into all servers where you want filtering (e.g HTTP + HTTPS block)
access_log /var/log/nginx/access.log stripsecrets;
```

### NAXSI WAF module for Nginx

If you want to protect Jellyfin with a Web Application Firewall (WAF), you can compile nginx with the [naxsi module](https://github.com/wargio/naxsi) and use the jellyfin.rules whitelist to mitigate false positives. Naxsi is an open-source WAF that is easy to configure and create rules for.

#### Install Nginx with Naxsi

Follow the steps on [Naxsi's GitHub](https://github.com/wargio/naxsi?tab=readme-ov-file#build-naxsi) or on its [webpage](https://wargio.github.io/naxsi/build-naxsi.html). Ensure you use the correct nginx version, as the module will fail to build if the version is incorrect.

#### Configure Nginx

Add the following to your `nginx.conf` in the `http` block. This loads the default blocking rules and a generic whitelist for all your sites. Verify the paths to the actual rules, as they may vary depending on your setup. You can find the default rules in the [Naxsi Repository](https://github.com/wargio/naxsi/tree/main/naxsi_rules). In this example, the `naxsi` folder was created manually, and the rules were copied into it.

```
# naxsi
	include /etc/nginx/naxsi/naxsi_core.rules;
	include /etc/nginx/naxsi/blocking/10000000_scanner.rules;
	include /etc/nginx/naxsi/blocking/20000000_web_security.rules;
	include /etc/nginx/naxsi/blocking/40000000_php_security.rules;
	include /etc/nginx/naxsi/blocking/50000000_sql_injection.rules;
	include /etc/nginx/naxsi/whitelists/generic.rules;
```

Adjust the jellyfin specific config block like so:

```
server {
    # Nginx versions prior to 1.25
    #listen 443 ssl http2;
    #listen [::]:443 ssl http2;

    # Nginx versions 1.25+
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;

    server_name jellyfin.example.org;

	set $naxsi_json_log 1; # Enable JSON logs for Naxsi

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
    add_header Content-Security-Policy "default-src https: data: blob: ; img-src 'self' https://* ; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://www.youtube.com blob:; worker-src 'self' blob:; connect-src 'self'; object-src 'none'; font-src 'self'";

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

        # naxsi
		SecRulesEnabled; #enable naxsi for this `location`
		# LearningMode;  #When enable, BLOCK CheckRule are considered as LOG.
		LibInjectionSql; #enable libinjection support for SQL injection detection
		LibInjectionXss; #enable libinjection support for XSS detection

		# Internal denied request points to error_pages.conf snippet
		DeniedUrl "/RequestDenied";

		CheckRule "$SQL >= 8" BLOCK; # SQL injection action (unrelated to libinjection)
		CheckRule "$XSS >= 8" BLOCK; # XSS action (unrelated to libinjection)
		CheckRule "$RFI >= 8" BLOCK; # Remote File Inclusion action
		CheckRule "$UWA >= 8" BLOCK; # Unwanted Access action
		CheckRule "$EVADE >= 8" BLOCK; # Evade action (some tools may try to avoid detection).
		CheckRule "$UPLOAD >= 5" BLOCK; # Malicious upload action
		CheckRule "$TRAVERSAL >= 5" BLOCK; # Traversal access action
		CheckRule "$LIBINJECTION_XSS >= 8" BLOCK; # libinjection XSS action
		CheckRule "$LIBINJECTION_SQL >= 8" BLOCK; # libinjection SQLi actio

		# Jellyfin Whitelist
		include naxsi/whitelists/jellyfin.rules;
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

        # naxsi
		SecRulesEnabled; #enable naxsi for this `location`
		# LearningMode;  #When enable, BLOCK CheckRule are considered as LOG.
		LibInjectionSql; #enable libinjection support for SQL injection detection
		LibInjectionXss; #enable libinjection support for XSS detection

		# Internal denied request points to error_pages.conf snippet
		DeniedUrl "/RequestDenied";

		CheckRule "$SQL >= 8" BLOCK; # SQL injection action (unrelated to libinjection)
		CheckRule "$XSS >= 8" BLOCK; # XSS action (unrelated to libinjection)
		CheckRule "$RFI >= 8" BLOCK; # Remote File Inclusion action
		CheckRule "$UWA >= 8" BLOCK; # Unwanted Access action
		CheckRule "$EVADE >= 8" BLOCK; # Evade action (some tools may try to avoid detection).
		CheckRule "$UPLOAD >= 5" BLOCK; # Malicious upload action
		CheckRule "$TRAVERSAL >= 5" BLOCK; # Traversal access action
		CheckRule "$LIBINJECTION_XSS >= 8" BLOCK; # libinjection XSS action
		CheckRule "$LIBINJECTION_SQL >= 8" BLOCK; # libinjection SQLi actio

		# Jellyfin Whitelist in /etc/nginx/naxsi...
		include naxsi/whitelists/jellyfin.rules;
    }
}

location /RequestDenied {
    internal;
    return 403;
}

server {
    listen 80;
    listen [::]:80;
    server_name jellyfin.example.org;
    return 301 https://$host$request_uri;
}
```

Adjust your logging configuration to match your needs. A specific error log path for each site is recommended, as it helps detect false positive blocks from Naxsi. Add the following after the `set $naxsi_json_log 1;` line:

```
    error_log /var/log/nginx/error/jellyfin_example_org_error.log notice;
    access_log /var/log/nginx/access/jellyfin_example_org_access.log combined if=$loggable;
```

#### Learning Mode

It is recommended to enable learning mode for the first few weeks to detect false positives and add them to the whitelist. Enable learning mode by uncommenting the `LearningMode;` line. To create your own whitelists, follow the [Naxsi documentation on whitelists](https://wargio.github.io/naxsi/whitelist.html).
