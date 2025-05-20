---
uid: network-index
title: Networking
---

# Networking

As a Server Software, Jellyfin offers different Services over the Network.
Specifically Jellyfin supports the streaming of content and comes packed with a web-Client. - This will work purely over the http(s) ports.

Additionaly in local networks Jellyfin offers various Auto-Discovery services. Theese will not work outside your local subnet.

As a fully self hosted Software, Jellyfin runs independently from the Internet.
You do not HAVE TO make your server accessable through the internet.
Neither does jellyfin require an internet connection to run - however you should note that it will load metadata from various Providers, which will not work without an Internet connection.

If you are looking for a detailed overview of the networking settings, see the [Settings Overview](./settings-overview/).

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

<details>
<summary>Learn more about limitations with local DNS</summary>

Devices like Google Chromecast or Google Streamer use hardcoded DNS Servers - therefore they will not make use of your local DNS entries.
There are multiple workarrounds for this issue.

The easiest involves the usage of IPv6 Entries in the public DNS.
Since IPv6 adresses dont differenciate between local and public, the adress will be abled to get resolved localy.
This however requires the use of a public DNS server - The Jellyfin Server does not have to be accessible from the outside though!

</details>

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
- [firewalld](https://firewalld.org/documentation/howto/open-a-port-or-service.html)
- [Uncomplicated Firewall](https://wiki.ubuntu.com/UncomplicatedFirewall#Basic_Usage) (ufw)
- [nftables](https://wiki.nftables.org/wiki-nftables/index.php/Main_Page)

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

If you want to learn more about reverse Proxies and how to use them for Jellyfin, learn more on our dedicated site about [Reverse-Proxies](./reverse-proxy/).

### SSL/ https

Using https to access the Server is recommended.
By default https will not be enabled, because it requires an SSL Certificate.

SSL Certificates are usually issued by a third party and verify that the Server and URL are assigned to another.
Please use a trusted certificate authority such as [Let's Encrypt](./advanced/letsencrypt) when using https.

:::caution

Self signed certificates present problems with security and compatibility and are strongly discouraged.

:::

Whilst Jellyfin offers https support its also possible to handle https/ ssl entirely on Proxy level.

**It's strongly recommend that you check your SSL strength and server security at [SSLLabs](https://www.ssllabs.com/ssltest/analyze.html) if you are exposing these services to the internet.**
