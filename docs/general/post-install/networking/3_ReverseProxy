# Running Jellyfin Behind a Reverse Proxy

It's possible to run Jellyfin behind another server acting as a reverse proxy. With a reverse proxy setup, this server handles all network traffic and proxies it back to Jellyfin. This provides the benefits of using DNS names and not having to remember port numbers, as well as easier integration and management of SSL certificates.

In cases when you would like to not use host networking with docker, you may use the gateway ip as a known proxy to fix ip resolution for clients logging in.

:::caution

In order for a reverse proxy to have the maximum benefit, you should have a publicly routable IP address and a domain with DNS set up correctly.
These examples assume you want to run Jellyfin under a sub-domain (e.g. jellyfin.example.com), but are easily adapted for the root domain if desired.

:::

:::caution

Be careful when logging requests with your reverse proxy. Jellyfin sometimes sends authentication information as part of the URL (e.g `api_key` parameter), so logging the full request path can expose secrets to your logfile.
We recommend that you either protect your logfiles or do not log full request URLs or censor sensitive data from the logfile.
The nginx documentation below includes an example how to censor sensitive information from a logfile.

:::

Some popular options for reverse proxy systems are [Apache](https://httpd.apache.org), [Caddy](https://caddyserver.com), [Haproxy](https://www.haproxy.com), [Nginx](https://www.nginx.com) and [Traefik](https://traefik.io).

- [Apache](./advanced/apache)
- [Caddy](./caddy)
- [HAProxy](./advanced/haproxy)
- [Nginx](./advanced/nginx)
- [Traefik](./advanced/traefik)

While not a reverse proxy, Let's Encrypt can be used independently or with a reverse proxy to provide SSL certificates.

- [Let's Encrypt](./advanced/letsencrypt)

When following this guide, be sure to replace the following variables with your information.

- `DOMAIN_NAME`: Your public domain name to access Jellyfin on (e.g. jellyfin.example.com)
- `example.com`: The domain name Jellyfin services will run under (e.g. example.com)
- `SERVER_IP_ADDRESS`: The IP address of your Jellyfin server (if the reverse proxy is on the same server use 127.0.0.1)

In addition, the examples are configured for use with Let's Encrypt certificates. If you have a certificate from another source, change the SSL configuration from `/etc/letsencrypt/DOMAIN_NAME/` to the location of your certificate and key.

Ports 80 and 443 (pointing to the proxy server) need to be opened on your router and firewall.

