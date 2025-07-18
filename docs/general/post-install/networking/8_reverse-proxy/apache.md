---
uid: network-reverse-proxy-apache
title: Apache
---

"The [Apache HTTP Server Project](https://httpd.apache.org/) is an effort to develop and maintain an open-source HTTP server for modern operating systems including UNIX and Windows. The goal of this project is to provide a secure, efficient and extensible server that provides HTTP services in sync with the current HTTP standards."

```conf
<VirtualHost *:80>
    ServerName DOMAIN_NAME

    # Comment to prevent HTTP to HTTPS redirect
    Redirect permanent / https://DOMAIN_NAME/

    ErrorLog /var/log/apache2/DOMAIN_NAME-error.log
    CustomLog /var/log/apache2/DOMAIN_NAME-access.log combined
</VirtualHost>

# If you are not using a SSL certificate, replace the 'redirect'
# line above with all lines below starting with 'Proxy'
<IfModule mod_ssl.c>
<VirtualHost *:443>
    ServerName DOMAIN_NAME
    # This folder exists just for certbot (You may have to create it, chown and chmod it to give apache permission to read it)
    DocumentRoot /var/www/html/jellyfin/public_html

    ProxyPreserveHost On

    # Letsencrypt's certbot will place a file in this folder when updating/verifying certs
    # This line will tell apache to not to use the proxy for this folder.
    ProxyPass "/.well-known/" "!"

    # Tell Jellyfin to forward requests that came from TLS connections
    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Forwarded-Port "443"

    # Apache should be able to know when to change protocols (between WebSocket and HTTP)
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} =websocket
    RewriteRule /(.*) ws://SERVER_IP_ADDRESS:8096/socket/$1 [P,L]
    RewriteCond %{HTTP:Upgrade} !=websocket
    RewriteRule /(.*) http://SERVER_IP_ADDRESS:8096/$1 [P,L]

    # Sometimes, Jellyfin requires clients to empty their cache to display and function correctly.
    # This header tells clients not to keep any cache and is quite strict on that.
    # This might also fix some syncplay issues (#5485 and #8140 @ https://github.com/jellyfin/jellyfin-web/issues/)
    # Header set Cache-Control "no-store, no-cache, must-revalidate, max-age=0"

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/DOMAIN_NAME/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/DOMAIN_NAME/privkey.pem
    Protocols h2 http/1.1

    # Enable only strong encryption ciphers and prefer versions with Forward Secrecy
    SSLCipherSuite HIGH:RC4-SHA:AES128-SHA:!aNULL:!MD5
    SSLHonorCipherOrder on

    # Disable insecure SSL and TLS versions
    SSLProtocol all -SSLv2 -SSLv3 -TLSv1 -TLSv1.1

    ErrorLog /var/log/apache2/DOMAIN_NAME-error.log
    CustomLog /var/log/apache2/DOMAIN_NAME-access.log combined
</VirtualHost>
</IfModule>
```

If you encounter errors, you may have to enable `mod_proxy`, `mod_ssl`, `proxy_wstunnel`, `http2`, `headers` and `remoteip` support manually.

```bash
sudo a2enmod proxy proxy_http ssl proxy_wstunnel remoteip http2 headers
```

## Apache with Subpath (example.org/jellyfin)

When connecting to server from a client application, enter `http(s)://DOMAIN_NAME/jellyfin` in the address field.

Set the [base URL](../#base-url) field in the Jellyfin server. This can be done by navigating to the Admin Dashboard -> Networking -> Base URL in the web client. Fill in this box with `/jellyfin` and click Save. The server will need to be restarted before this change takes effect.

:::caution

HTTP is insecure. The following configuration is provided for ease of use only. If you are planning on exposing your server over the Internet you should setup HTTPS. [Let's Encrypt](https://letsencrypt.org/getting-started/) can provide free TLS certificates which can be installed easily via [certbot](https://certbot.eff.org/).

:::

The following configuration can be saved in `/etc/httpd/conf/extra/jellyfin.conf` and included in your vhost.

```conf
# Jellyfin hosted on http(s)://DOMAIN_NAME/jellyfin
<Location /jellyfin/socket>
    ProxyPreserveHost On
    ProxyPass "ws://127.0.0.1:8096/jellyfin/socket"
    ProxyPassReverse "ws://127.0.0.1:8096/jellyfin/socket"
</Location>
<Location /jellyfin>
    ProxyPass "http://127.0.0.1:8096/jellyfin"
    ProxyPassReverse "http://127.0.0.1:8096/jellyfin"
</Location>
```
