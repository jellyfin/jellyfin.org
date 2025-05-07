---
uid: reverse-proxy-index
title: Reverse Proxy
---

# Reverse Proxy

## General

Whilst a Proxy typically is meant to catch and forward outgoing traffic, a reverse proxy does the same for ingoing network traffic.
The reverse Proxy can then act as an entrypoint to various services and will internaly forward the traffic to your service.

This opens the ability to do rule specific routing, for example subdomain routing, ip geoblocking, ratelimits or url forwarding.
Its also possible to handle all DNS and SSL specific things on the reverse Proxy, so that everything routing wise can be managed in one place.

Additionaly reverse proxies offer extended access logging, so its always clear who, when and where a network request came from and went to.

## Running Jellyfin Behind a Reverse Proxy

Important things to note when using Jellyfin behind a reverse proxy.

### Logging

Be careful when logging requests with your reverse proxy. Jellyfin sometimes sends authentication information as part of the URL (e.g `api_key` parameter), so logging the full request path can expose secrets to your logfile.
We recommend that you either protect your logfiles or do not log full request URLs or censor sensitive data from the logfile.
The nginx documentation [here](./nginx/) includes an example how to censor sensitive information from a logfile.

### forwarded-for headers

Since the reverse proxy forwards the traffic to the Jellyfin-Server, Jellyfin will see all requests comming from the reverse proxy, not the actual Client IP's.
This introduces potential security risks and can also break compatibility.

Therefore the IP Adress(es) of the reverse Proxy MUST be set in the Network configuration [here](../settings-overview#Known-Proxies).
This will enable Jellyfin to search for `X-Forwarded-For`, `X-Forwarded-Proto` and `X-Forwarded-Host` headers and use the associated value as the source IP adress.

This assumes that the reverse Proxy is set up to include this header, which is not always the case by default.
If issues with source IP forwarding appear, this should be checked.

### Websockets

Jellyfin makes use of Websockets for various things. Not all reverse proxies allow this by default. Its important to make sure Websockets are allowed for your Jellyfin-Server.

## Guides

We recommend using [Caddy](https://caddyserver.com) for its easy install and use.
You can find our Guide for using Jellyfin through Caddy [here](./caddy/).

If you do not want to use Caddy, some other popular options for reverse proxy systems are [Nginx](https://www.nginx.com), [Traefik](https://traefik.io), [Haproxy](https://www.haproxy.com) and[Apache](https://httpd.apache.org). Note that these have a greater learning curve than the recommended reverse proxy Caddy. You can find respective guides here:

- [Nginx](./nginx)
- [Traefik](./traefik)
- [HAProxy](./haproxy)
- [Apache](./apache)

While not a reverse proxy, Let's Encrypt can be used independently or with a reverse proxy to provide SSL certificates.

- [Let's Encrypt](../advanced/letsencrypt)

When following these guides, be sure to replace the following variables with your information.

- `DOMAIN_NAME`: Your public domain name to access Jellyfin on (e.g. jellyfin.example.com)
- `example.com`: The domain name Jellyfin services will run under (e.g. example.com)
- `SERVER_IP_ADDRESS`: The IP address of your Jellyfin server (if the reverse proxy is on the same server use 127.0.0.1)

In addition, the examples are configured for use with Let's Encrypt certificates. If you have a certificate from another source, change the SSL configuration from `/etc/letsencrypt/DOMAIN_NAME/` to the location of your certificate and key.

Ports 80 and 443 (pointing to the proxy server) need to be opened on your router and firewall.
