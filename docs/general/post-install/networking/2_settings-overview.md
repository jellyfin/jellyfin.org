---
uid: network-settings-overview
title: Settings Overview
---

# Settings Overview

**_This entire section will be soon reworked with Pictures and the like._**
This section is meant to give  an overview of all the configurable network settings within the admin-dashboard.

## Known Proxies

When a reverse proxy handles incoming http requests it terminates the request and then creates a new request to your jellyfin server. This will result in jellyfin seeing the sender IP as the ip of the reverse proxy instead of the actual client. To compensate for that, reverse proxies set the original sender IP in a header. This header is usually one of `X-Forwarded-For`, `X-Forwarded-Proto` or `X-Forwarded-Host` all 3 are supported by jellyfin. However as blindly trusting those headers from any source is a security risk, Jellyfin has to be configured to trust your reverse proxy. For jellyfin to know which reverse proxy is trusted, the IP, Hostname or Subnet has to be set in the `Known Proxies` (under Admin Dashboard -> Networking) setting. You can add multiple IP's/Subnets/Hostnames by seperating them with a comma (`,`) like `192.168.178.5,10.10.0.6,127.0.0.0/26,MyReverseProxyHostname`.

This is required for reverse proxies as otherwise all incoming traffic will be seen as originating from your reverse proxy which can be a security risk.

Changes to the KnownProxies setting requires a server restart after saving to take effect.

## Base URL

Running Jellyfin with a path (e.g. `https://example.com/jellyfin`) is supported by the Android and web clients.

:::caution

Base URL is known to break HDHomeRun, DLNA, Sonarr, Radarr, Chromecast, and MrMC.

:::

The Base URL setting in the **Networking** page is an advanced setting used to specify the URL prefix that your Jellyfin instance can be accessed at. In effect, it adds this URL fragment to the start of any URL path. For instance, if you have a Jellyfin server at `http://myserver` and access its main page `http://myserver/web/index.html`, setting a Base URL of `/jellyfin` will alter this main page to `http://myserver/jellyfin/web/index.html`. This can be useful if administrators want to access multiple Jellyfin instances under a single domain name, or if the Jellyfin instance lives only at a subpath to another domain with other services listening on `/`.

The entered value on the configuration page will be normalized to include a leading `/` if this is missing.

This setting requires a server restart to change, in order to avoid invalidating existing paths until the administrator is ready.

There are three main caveats to this setting.

1. When setting a new Base URL (i.e. from `/` to `/baseurl`) or changing a Base URL (i.e. from `/baseurl` to `/newbaseurl`), the Jellyfin web server will automatically handle redirects to avoid displaying users invalid pages. For instance, accessing a server with a Base URL of `/jellyfin` on the `/` path will automatically append the `/jellyfin` Base URL. However, entirely removing a Base URL (i.e. from `/baseurl` to `/`, an empty value in the configuration) will not - all URLs with the old Base URL path will become invalid and throw 404 errors. This should be kept in mind when removing an existing Base URL.

2. Client applications generally, for now, do not handle the Base URL redirects implicitly. Therefore, for instance in the Android app, the `Host` setting _must_ include the BaseURL as well (e.g. `http://myserver:8096/baseurl`), or the connection will fail.

3. Any reverse proxy configurations must be updated to handle a new Base URL. Generally, passing `/` back to the Jellyfin instance will work fine in all cases and the paths will be normalized, and this is the standard configuration in our examples. Keep this in mind however when doing more advanced routing.
