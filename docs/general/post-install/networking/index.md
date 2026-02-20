---
uid: network-index
title: Networking
---

As a server software, Jellyfin offers different services over the network.
Specifically Jellyfin supports the streaming of content and comes packed with a web-Client. - This will work purely over the HTTP(S) ports.

Additionally, in local networks, Jellyfin offers various Auto-Discovery services. These will not work outside your local subnet.

As a fully self-hosted software, Jellyfin runs independently from the Internet.
You do not have to make your server accessible through the internet.
Neither does Jellyfin require an internet connection to run; however you should note that it will load metadata from various Providers, which will not work without an Internet connection.

## Port Bindings

This section aims to provide an administrator with knowledge on what ports Jellyfin binds to and what purpose they serve.

| Port | Protocol | Configurable | Description      |
| ---- | -------- | ------------ | ---------------- |
| 8096 | TCP      | ✔️           | Default HTTP     |
| 8920 | TCP      | ✔️           | Default HTTPS    |
| 7359 | UDP      | ❌           | Client Discovery |

<details>
<summary>See details</summary>

- **HTTP Traffic** (8096/TCP):
  The web frontend can be accessed here. You can modify this setting from the **Networking** page in the admin settings.

- **HTTPS Traffic** (8920/TCP):
  Used when https is enabled. By default this port will not be used.
  This setting can also be modified from the **Networking** page to use a different port.

- **Client Discovery** (7359/UDP):
  Allows clients to discover Jellyfin on the local network. A broadcast message to this port will return detailed information about your server that includes name, ip-address and ID.

</details>

## Accessing Jellyfin

This section focusses on how to make Jellyfin Available within Networks.
Here you will find descriptions on how to make Jellyfin accessible both only locally and through the Internet.

In general, Jellyfin will be available locally on the specified port over the host-ip - e.g. `http://10.0.0.2:8096`.
However its also possible to create a local DNS entry that will point to your Jellyfin-Server - e.g. `http://jellyfin.local:8096`.

<details>
<summary>Learn more about limitations with local DNS</summary>

Devices like Google Chromecast or Google Streamer use hardcoded DNS Servers - therefore they will not make use of your local DNS entries.
There are multiple workarounds for this issue.

The easiest involves the usage of IPv6 Entries in the public DNS.
Since IPv6 addresses do not differentiate between local and public, the address will be abled to be resolved locally.
This, however, requires the use of a public DNS server - The Jellyfin Server does not have to be accessible from the outside though!

</details>

### Firewall / Port Forwarding

Networks are usually divided from each other by firewalls. These block all incoming traffic and are meant to protect the network.
To access Jellyfin through these boundaries, its ports need to be forwarded / opened in the respective firewalls.

Note that opening a port gives full access to that port to the next higher Network.
Opening a port directly to the Internet is therefore insecure and not recommended.

There are different layers where a firewall can be placed:

| Layer   | Example                            | Description                                                                            |
| ------- | ---------------------------------- | -------------------------------------------------------------------------------------- |
| Local   | Docker, VM                         | Open ports at this layer to allow traffic from the Host to enter the Application       |
| Host    | physical machine, operating system | Open ports at this layer to allow traffic from the Network to enter the Host device    |
| Network | Router                             | Open ports at this layer to allow traffic from the Internet to enter the Local Network |

<details>
<summary>Port forwarding vs. opening a Port</summary>

Whilst Routers often allow you to forward a port, firewalls typically only allow you to open one.
The difference is within the Target. Opening a Port essentially just means that traffic on this Port will go through.
Forwarding a Port you typically do in NAT scenarios - traffic is coming in on your public IP Address, what device inside your network should receive it.
Sometimes, port forwarding also lets you map an external port to a different internal port.

</details>

<details>
<summary>How to open a Port</summary>

How exactly a port will be opened depends on your firewall software and its UI.
Here is linked below how to open ports for:

- [Windows Firewall](https://learn.microsoft.com/en-us/sql/reporting-services/report-server/configure-a-firewall-for-report-server-access?view=sql-server-ver16#open-ports-in-windows-firewall)
- [firewalld](https://firewalld.org/documentation/howto/open-a-port-or-service.html)
- [Uncomplicated Firewall](https://wiki.ubuntu.com/UncomplicatedFirewall#Basic_Usage) (ufw)
- [nftables](https://wiki.nftables.org/wiki-nftables/index.php/Main_Page)

</details>

### External Access

Since Jellyfin is entirely self-hosted, you must manually expose it to the internet.
To do so, you need a method to access the HTTP(S) ports remotely.
Automatic discovery only works locally and should not be exposed externally

To access a server remotely there will need to be a way to find it or its network on the internet.
This can be done through the public IP Address of the Device or for IPv6 the Server's directly.

To store the IP Address, the easiest option would be to use a Domain and rely on DNS to resolve it.
This can also be used to store the 'current IP Address' in the case of a dynamic public IP Address.
However its not mandatory to use a Domain.

There are multiple ways of exposing Jellyfin to the outside - the most common ones are:

- forwarding its Ports directly to the internet (not recommended!)
- forwarding through a Reverse Proxy
- using a VPN connection to enter the Network
- use a VPS to Reverse Proxy to your home network

Learn more about reverse proxies in our dedicated [Reverse Proxy guide](./8_reverse-proxy/index.md).

### SSL / https

Using https to access the Server is recommended.
By default, HTTPS is disabled because it requires an SSL certificate.

SSL Certificates are usually issued by a third party and verify that the Server and URL are assigned to another.
Please use a trusted certificate authority such as [Let's Encrypt](./9_advanced/letsencrypt.md) when using https.

:::caution

Self-signed certificates pose security and compatibility issues and are strongly discouraged.

:::

While Jellyfin supports HTTPS, it is strongly recommended to handle HTTPS termination separately on a reverse proxy. You can find more info on how to set this up on our [Reverse Proxy](./8_reverse-proxy/index.md) page.

**It's strongly recommend that you check your SSL strength and server security at [SSLLabs](https://www.ssllabs.com/ssltest/analyze.html) if you are exposing these services to the internet.**

### Base URL

Running Jellyfin with a path (e.g. `https://example.com/jellyfin`) is supported.

:::caution

Base URL is known to break HDHomeRun, the [DLNA plugin](./3_dlna.md), Sonarr, Radarr, and MrMC.

:::

The Base URL setting is a setting used to specify the URL prefix that your Jellyfin instance can be accessed at. In effect, it adds this URL fragment to the start of any URL path. For instance, if you have a Jellyfin server at `http://myserver` and access its main page `http://myserver/web/index.html`, setting a Base URL of `/jellyfin` will alter this main page to `http://myserver/jellyfin/web/index.html`. This can be useful if administrators want to access multiple Jellyfin instances under a single domain name, or if the Jellyfin instance lives only at a subpath to another domain with other services listening on `/`.

The entered value on the configuration page will be normalized to include a leading `/` if this is missing.

This setting requires a server restart to change, in order to avoid invalidating existing paths until the administrator is ready.

There are three main caveats to this setting.

1. When setting a new Base URL (i.e. from `/` to `/baseurl`) or changing a Base URL (i.e. from `/baseurl` to `/newbaseurl`), the Jellyfin web server will automatically handle redirects to avoid displaying users invalid pages. For instance, accessing a server with a Base URL of `/jellyfin` on the `/` path will automatically append the `/jellyfin` Base URL. However, entirely removing a Base URL (i.e. from `/baseurl` to `/`, an empty value in the configuration) will not - all URLs with the old Base URL path will become invalid and throw 404 errors. This should be kept in mind when removing an existing Base URL.

2. Client applications generally, for now, do not handle the Base URL redirects implicitly. Therefore, for instance in the Android TV app, the `Host` setting _must_ include the BaseURL as well (e.g. `http://myserver:8096/baseurl`), or the connection will fail.

3. Any reverse proxy configurations must be updated to handle a new Base URL. Generally, passing `/` back to the Jellyfin instance will work fine in all cases and the paths will be normalized, and this is the standard configuration in our examples. Keep this in mind however when doing more advanced routing.
