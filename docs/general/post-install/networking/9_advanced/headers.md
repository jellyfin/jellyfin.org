---
uid: network-http-headers
title: HTTP Security Headers
---

[HTTP Security Headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)

HTTP Headers are a great booster for web security with easy implementation. Proper HTTP response headers can help prevent security vulnerabilities like Cross-Site Scripting, Clickjacking, Information disclosure and more.

Here an exemple of headers that could be added to nginx configuration to improve security
```config
server {
    # Nginx versions prior to 1.25
    #listen 443 ssl http2;
    #listen [::]:443 ssl http2;

    # Nginx versions 1.25+
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    (....)

    # Referrer Policy: Prevents leaking your internal URLs to external sites
    add_header Referrer-Policy "no-referrer" always;

    # Prevents Clickjacking by restricting the page from being embedded in frames,
    # except by pages from the same origin. The 'always' parameter ensures
    # the header is sent even for error responses (e.g., 404, 500).
    add_header X-Frame-Options "SAMEORIGIN";

    # Cross-Origin Isolation Headers
    # COOP: Isolates the browsing context to prevent interaction with other windows
    add_header Cross-Origin-Opener-Policy "same-origin" always;

    # CORP: Prevents other origins from loading your resources (images, scripts)
    add_header Cross-Origin-Resource-Policy "same-origin" always;

    # COEP: Prevents the document from loading any cross-origin resources that
    # do not explicitly grant permission via CORP or CORS.
    add_header Cross-Origin-Embedder-Policy 'require-corp' always;

    (....)
}
```

Here another example for Apache, first enable the headers module if you have not done so yet
```bash
sudo a2enmod headers
```

```config
<VirtualHost *:443>
    ServerName DOMAIN_NAME
    # This folder exists just for certbot (You may have to create it, chown and chmod it to give apache permission to read it)
    DocumentRoot /var/www/html/jellyfin/public_html
    (...)

    # Referrer Policy: Prevents leaking your internal URLs to external sites
    Header always set Referrer-Policy "no-referrer"

    # Prevents Clickjacking by restricting the page from being embedded in frames,
    # except by pages from the same origin.
    Header always set X-Frame-Options "SAMEORIGIN"

    # Cross-Origin Isolation Headers

    # COOP: Isolates the browsing context to prevent interaction with other windows
    Header always set Cross-Origin-Opener-Policy "same-origin"

    # CORP: Prevents other origins from loading your resources (images, scripts)
    Header always set Cross-Origin-Resource-Policy "same-origin"

    # COEP: Prevents the document from loading any cross-origin resources that
    # do not explicitly grant permission via CORP or CORS.
    Header always set Cross-Origin-Embedder-Policy "require-corp"

    (...)
</VirtualHost>
```
