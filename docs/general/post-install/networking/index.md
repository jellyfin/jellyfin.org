---
uid: network-index
title: Networking
---

# Networking

This section describes how to get basic connectivity to a Jellyfin server, and also some more advanced networking scenarios.

## Introduction

As a Server Software, Jellyfin offers different Services over the Network.
Specifically Jellyfin supports the streaming of content and comes packed with a web-Client. - This will work purely over the http(s) ports.

Additionaly in local networks jellyfin offers various Auto-Discovery services. Theese will not work outside your local subnet.

As a fully self hosted Software, jellyfin runs fully independently from the Internet.
You do not HAVE TO make your server accessable through the internet.
Neither does jellyfin require an internet connection to run - however you should note that it will load metadata from various Providers, which will not work without an Internet connection.

## Port Bindings

This section aims to provide an administrator with knowledge on what ports Jellyfin binds to and what purpose they serve.

| Port | Protocol | Configurable | Description |
|---|---|---|---|
| 8096 | tcp | ✔️ | Default http |
| 8920 | tcp | ✔️ | Default https |
| 1900 | udp | ❌ | UPnP (SSDP) |
| 7359 | udp | ❌ | Client Discovery |

<details>
<summary>See details</summary>

- **HTTP Traffic:** 8096
    The web frontend can be accessed here for debugging SSL certificate issues on your local network. You can modify this setting from the **Networking** page in the admin settings.

- **HTTPS Traffic:** 8920
    Used when https is enabled. By default this port will not be used.
    This setting can also be modified from the **Networking** page to use a different port.

- **Service Discovery:** 1900
    Used for UPnP service discovery. This is also needed to discover your Server via DLNA in the local subnet (when enabled)
    Since UPnP is a universal Protocol expecting to run on port 1900, its not possible to configure this.

- **Client Discovery:** 7359 UDP
    Allows clients to discover Jellyfin on the local network. A broadcast message to this port with `Who is JellyfinServer?` will get a JSON response that includes the server address, ID, and name.

</details>

### Monitoring Endpoints

See [monitoring](./advanced/monitoring) for details on the monitoring endpoints that Jellyfin provides.

## Accessing Jellyfin

This section focusses on how to make Jellyfin Available within Networks.
Here you will find descriptions on how to make Jellyfin accessible both only localy and through the Internet.

In general, Jellyfin will be available localy on the specified port over the host-ip - e.g. `http://10.0.0.2:8096`.
However its also possible to create a local DNS entry that will point to your Jellyfin-Server - e.g. `jellyfin.local:8096`.

:::caution

In order for Chromecast to work with local DNS entries, the easiest solution is to use IPv6 instead of IPv4.
For IPv4, you need to use NAT reflection to redirect to your local LAN IPv4 or add a override rules to your local DNS server to point to your local LAN IPv4 (for example 192.168.1.10) of Jellyfin.  
Because Chromecasts have hardcoded Google DNS servers, you need to block Chromecast from reaching these servers (8.8.8.8) so it makes use of your local DNS server instead.  
For a public routable IPv6 (not a link-local or ULA) there is no difference between public or local. Such IPv6 address is simultaneously publicly routable and accessible from the local LAN.  
Because of that, there is no blocking, redirecting or DNS override needed.

:::
(this warning is weird to me)

### Firewall/ Port Forwarding

Networks are usually devided from eachother by firewalls. These block all incoming traffic and are meant to protect the network.
To access Jellyfin through these boundaries, its ports need to be forwarded/ opened in the respective firewalls.

Note that opening a port gives full access to that port to the next higher Network.
Opening a port directly to the Internet is therefore insecure and not recommended.

There are different layers where a firewall can be placed:

| Layer | Example | Description |
| --- | --- | --- |
| Local | Docker, VM | Open ports at this layer to allow traffic from the Host to enter the Application |
| Host | physical machine, operating system | Open ports at this layer to allow traffic from the Network to enter the Host device |
| Network | Router | Open ports at this layer to allow traffic from the Internet to enter the Local Network |

<details>
<summary>Port forwarding vs. opening a Port</summary>

Whilst Routers often allow you to forward a port, firewalls typically only allow you to open one.
The difference is within the Target. Opening a Port essentially just means that traffic on this Port will go through.
Forwarding a Port you typically do in NAT scenarios - traffic is comming in on your public IP Adress, what device inside your network should recieve it.
Sometime port forwarding also offers to set a different target port then entry port.

</details>

<details>
<summary>How to open a Port</summary>

How exactly a port will be opened depends on your firewall software and its UI.
Here is linked below how to open ports for:

- [Windows Firewall](https://learn.microsoft.com/en-us/sql/reporting-services/report-server/configure-a-firewall-for-report-server-access?view=sql-server-ver16#open-ports-in-windows-firewall)

</details>

### External Access

Since Jellyfin is entirely self hosted, the server will have to be made accessible from the Internet manualy.
To do that there will have to be some way to access the http(s) port remotely.
Autodiscovery services will only work localy and should not be made accessible externaly.

To access a server remotely there will need to be a way to find it or its network on the internet.
This can be done through the public IP Adress of the Device or for IPv6 the Server's directly.

To store the IP Adress, the easiest option would be to use a Domain and rely on the DNS System to resolve it.
This can also be used to store the 'current IP Adress' in the case of a dynamic public IP Adress.
However its not mandatory to use a Domain.

There are multiple ways of exposing Jellyfin to the outside - the most common ones are:

- forwarding the Port to the Internet (not recommended!)
- forwarding through a Reverse Proxy
- using a VPN connection to enter the Network
- use a VPS to Reverse Proxy to your home network

If you want to learn more about reverse Proxies and how to use them for Jellyfin, learn more [here](./reverse-proxy/)

### SSL/ https

Using https to access the Server is recommended.
By default https will not be enabled, because it requires an SSL Certificate.

SSL Certificates are usually issued by a third party and verify that the Server and URL are assigned to another.
When using HTTPS, self-signed certs are not recommended. Please use a trusted certificate authority such as [Let's Encrypt](./advanced/letsencrypt).

If you are not using a local DNS and do not want to expose any of your Servers to the Internet then you will have to use self-signed certificates.

:::caution

A lot of Clients do not support self-signed certificates. Be aware that using them regardless will break compatibility with them.

:::

Whilst Jellyfin offers https support its also possible to handle https/ ssl entirely on Proxy level.

**It's strongly recommend that you check your SSL strength and server security at [SSLLabs](https://www.ssllabs.com/ssltest/analyze.html) if you are exposing these services to the internet.**

## Settings Overview

This section is meant to give  an overview of all the configurable network settings within the admin-dashboard.

TODO: Add Pictured and the like here.

### Known Proxies

When a reverse proxy handles incoming http requests it terminates the request and then creates a new request to your jellyfin server. This will result in jellyfin seeing the sender IP as the ip of the reverse proxy instead of the actual client. To compensate for that, reverse proxies set the original sender IP in a header. This header is usually one of `X-Forwarded-For`, `X-Forwarded-Proto` or `X-Forwarded-Host` all 3 are supported by jellyfin. However as blindly trusting those headers from any source is a security risk, Jellyfin has to be configured to trust your reverse proxy. For jellyfin to know which reverse proxy is trusted, the IP, Hostname or Subnet has to be set in the `Known Proxies` (under Admin Dashboard -> Networking) setting. You can add multiple IP's/Subnets/Hostnames by seperating them with a comma (`,`) like `192.168.178.5,10.10.0.6,127.0.0.0/26,MyReverseProxyHostname`.

This is required for reverse proxies as otherwise all incoming traffic will be seen as originating from your reverse proxy which can be a security risk.

Changes to the KnownProxies setting requires a server restart after saving to take effect.

### Base URL

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
