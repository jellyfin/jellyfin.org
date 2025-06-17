---
uid: reverse-proxy-index
title: Reverse Proxy
---

A proxy server is meant to catch and forward outgoing traffic. A reverse proxy does the same, but for incoming network traffic.
It can serve as an entry point to various services and will internally forward the traffic to your service.

This opens the ability to do rule specific routing, for example subdomain routing, ip geoblocking, ratelimits or url forwarding.
It is also possible to centralize DNS and SSL management on the reverse proxy, streamlining all routing-wise configuration.

Additionally, reverse proxies offer extended access logging, so it is always clear who, when and where a network request came from and went to.

## Running Jellyfin Behind a Reverse Proxy

Important things to note when using Jellyfin behind a reverse proxy.

### Logging

Be careful when logging requests with your reverse proxy. Jellyfin sometimes sends authentication information as part of the URL (e.g. `api_key` parameter), so logging the full request path can expose secrets to your logfile.
We recommend that you either protect your logfiles or do not log full request URLs or censor sensitive data from the logfile.
Our [proxy guides](./#Guides) include examples on how to censor sensitive information from a logfile.

### Forwarded-For Headers

When traffic is forwarded through a reverse proxy, Jellyfin sees the proxy’s IP address rather than the client’s.
This introduces potential security risks and can also break compatibility, since Jellyfin will not be able to differentiate between local and remote connections.
Therefore, if set up incorrectly, all limitations for external access will not work.

Therefore, the IP address(es) of your reverse proxy must be configured under “Known Proxies” in Jellyfin’s **Network** settings.
This allows Jellyfin to respect the `X-Forwarded-For`, `X-Forwarded-Proto`, and `X-Forwarded-Host` headers and use the associated value as the source IP address. By default, Jellyfin will discard all forwarded-for headers that do not originate from a "known Proxy". This is so that malicious devices will not be able to hide their IP address by providing a forwarded-for header.

This assumes that the reverse proxy is set up to include this header, which is not always the case by default.
If issues with source IP forwarding appear, this should be checked.

### Websockets

Jellyfin makes use of Websockets for various things. Not all reverse proxies allow this by default. It is important to make sure Websockets are allowed for your Jellyfin server.

## Guides

We recommend using [Caddy](https://caddyserver.com/) for its ease of use, especially with https. We provide a [guide](./caddy/) for configuring Caddy with Jellyfin.

If you do not want to use Caddy, some other popular options for reverse proxy systems are [Nginx](https://www.nginx.com), [Traefik](https://traefik.io), [Haproxy](https://www.haproxy.com) and [Apache](https://httpd.apache.org). Note that these have a greater learning curve than the recommended reverse proxy Caddy. You can find respective guides here:

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

Ports 80 (TCP) and 443 (TCP) need to be opened on your router and firewall. (pointing to the proxy server)
For HTTP/3 support (QUIC), also forward/open UDP port 443.
