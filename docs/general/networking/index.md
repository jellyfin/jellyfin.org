---
uid: network-index
title: Networking
---

# Networking

This section describes how to get basic connectivity to a Jellyfin server, and also some more advanced networking scenarios.

## Connectivity

Many clients will automatically discover servers running on the same LAN and display them on login. If you are outside the network when you connect you can type in the complete IP address or domain name in the server field with the correct port to continue to the login page. You can find the default ports below to access the web frontend.

HTTP and HTTPS are the primary means of connecting to the server. If using a self-signed certificate for HTTPS, some clients may not work such as Chromecast or Roku.

> [!WARNING]
> In order for Chromecast to work on a non-public routable connection, 8.8.8.8 must be blocked on the Chromecast's Gateway. Blocking 8.8.8.8 on your router is the easiest solution to this problem.

### Port Bindings

This document aims to provide an administrator with knowledge on what ports Jellyfin binds to and what purpose they serve.

#### Static Ports

* 8096/tcp is used by default for HTTP traffic. You can change this in the dashboard.
* 8920/tcp is used by default for HTTPS traffic. You can change this in the dashboard.
* 1900/udp is used for service auto-discovery. This is not configurable.
* 7359/udp is also used for auto-discovery. This is not configurable.

**HTTP Traffic:** 8096

The web frontend can be accessed here for debugging SSL certificate issues on your local network. You can modify this setting from the **Networking** page in the settings.

**HTTPS Traffic:** 8920

This setting can also be modified from the **Networking** page to use a different port.

**Service Discovery:** 1900

Since client auto-discover would break if this option were configurable, you cannot change this in the settings at this time. DLNA also uses this port and is required to be in the local subnet.

**Client Discovery:** 7359 UDP

Allows clients to discover Jellyfin on the local network. A broadcast message to this port with `Who is JellyfinServer?` will get a JSON response that includes the server address, ID, and name.

#### Dynamic Ports

Live TV devices will often use a random UDP port for HDHomeRun devices. The server will select an unused port on startup to connect to these tuner devices.

### Monitoring Endpoints

See @monitoring for details on the monitoring endpoints that Jellyfin provides.

## Self-Signed Certificate

[See here for more information.](https://www.sslshopper.com/article-most-common-openssl-commands.html)

Create a private key.

```sh
openssl req -x509 -newkey rsa:4096 -keyout ./privkey.pem -out cert.pem -days 365 -nodes -subj '/CN=jellyfin.lan'
```

Omit `-nodes` to set a password interactively.

Remove `-days 365` to make it 'permanent'.

Add `-subj '/CN=localhost'` to make it not ask interactive questions about content of certificate.

The above command creates `./privkey.pem` which will require one more step before use in Jellyfin.

```sh
openssl pkcs12 -export -out jellyfin.pfx -inkey privkey.pem -in /usr/local/etc/letsencrypt/live/domain.org/cert.pem -passout pass:
```

## Running Jellyfin Behind a Reverse Proxy

It's possible to run Jellyfin behind another server acting as a reverse proxy.  With a reverse proxy setup, this server handles all network traffic and proxies it back to Jellyfin. This provides the benefits of using DNS names and not having to remember port numbers, as well as easier integration and management of SSL certificates.

> [!WARNING]
> In order for a reverse proxy to have the maximum benefit, you should have a publically routable IP address and a domain with DNS set up correctly.
> These examples assume you want to run Jellyfin under a sub-domain (e.g. jellyfin.example.com), but are easily adapted for the root domain if desired.

> [!WARNING]
> Be careful when logging requests with your reverse proxy. Jellyfin sometimes sends authentication information as part of the URL (e.g <code>api_key</code> parameter), so logging the full request
> path can expose secrets to your logfile. We recommend that you either protect your logfiles or do not log full request URLs or censor sensitive data from the logfile.
> The nginx documentation below includes an example how to censor sensitive information from a logfile.

Some popular options for reverse proxy systems are [Apache](https://httpd.apache.org), [Caddy](https://caddyserver.com), [Haproxy](https://www.haproxy.com), [Nginx](https://www.nginx.com) and [Traefik](https://traefik.io).

* [Apache](xref:network-reverse-proxy-apache)
* [Caddy](xref:network-reverse-proxy-caddy)
* [HAProxy](xref:network-reverse-proxy-haproxy)
* [Nginx](xref:network-reverse-proxy-nginx)
* [Traefik](xref:network-reverse-proxy-traefik)

While not a reverse proxy, Let's Encrypt can be used independently or with a reverse proxy to provide SSL certificates.

* [Let's Encrypt](xref:network-letsencrypt)

When following this guide, be sure to replace the following variables with your information.

* `DOMAIN_NAME`: Your public domain name to access Jellyfin on (e.g. jellyfin.example.com)
* `example.com`: The domain name Jellyfin services will run under (e.g. example.com)
* `SERVER_IP_ADDRESS`: The IP address of your Jellyfin server (if the reverse proxy is on the same server use 127.0.0.1)

In addition, the examples are configured for use with Let's Encrypt certificates. If you have a certificate from another source, change the SSL configuration from `/etc/letsencrypt/DOMAIN_NAME/` to the location of your certificate and key.

Ports 80 and 443 (pointing to the proxy server) need to be opened on your router and firewall.

### Known Proxies

Add the IP address/hostname of your reverse proxy to the `Known Proxies` (under Admin Dashboard -> Networking).  This is a comma separated list of IP addresses/hostnames of known proxies used when connecting to your Jellyfin instance and is required to make proper use of X-Forwarded-For headers. Requires a server restart after saving.

### Base URL

Running Jellyfin with a path (e.g. `https://example.com/jellyfin`) is supported by the Android and web clients.

> [!WARNING]
> Base URL is known to break HDHomeRun, DLNA, Sonarr, Radarr, Chromecast, and MrMC.

The Base URL setting in the **Networking** page is an advanced setting used to specify the URL prefix that your Jellyfin instance can be accessed at. In effect, it adds this URL fragment to the start of any URL path. For instance, if you have a Jellyfin server at `http://myserver` and access its main page `http://myserver/web/index.html`, setting a Base URL of `/jellyfin` will alter this main page to `http://myserver/jellyfin/web/index.html`. This can be useful if administrators want to access multiple Jellyfin instances under a single domain name, or if the Jellyfin instance lives only at a subpath to another domain with other services listening on `/`.

The entered value on the configuration page will be normalized to include a leading `/` if this is missing.

This setting requires a server restart to change, in order to avoid invalidating existing paths until the administrator is ready.

There are three main caveats to this setting.

1. When setting a new Base URL (i.e. from `/` to `/baseurl`) or changing a Base URL (i.e. from `/baseurl` to `/newbaseurl`), the Jellyfin web server will automatically handle redirects to avoid displaying users invalid pages. For instance, accessing a server with a Base URL of `/jellyfin` on the `/` path will automatically append the `/jellyfin` Base URL. However, entirely removing a Base URL (i.e. from `/baseurl` to `/`, an empty value in the configuration) will not - all URLs with the old Base URL path will become invalid and throw 404 errors. This should be kept in mind when removing an existing Base URL.

2. Client applications generally, for now, do not handle the Base URL redirects implicitly. Therefore, for instance in the Android app, the `Host` setting *must* include the BaseURL as well (e.g. `http://myserver:8096/baseurl`), or the connection will fail.

3. Any reverse proxy configurations must be updated to handle a new Base URL. Generally, passing `/` back to the Jellyfin instance will work fine in all cases and the paths will be normalized, and this is the standard configuration in our examples. Keep this in mind however when doing more advanced routing.

### Final Steps

It's strongly recommend that you check your SSL strength and server security at [SSLLabs](https://www.ssllabs.com/ssltest/analyze.html) if you are exposing these services to the internet.
