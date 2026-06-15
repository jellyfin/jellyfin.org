---
uid: network-tailscale
title: Tailscale
sidebar-position: 3
---

# Tailscale

[Tailscale](https://tailscale.com) is a VPN based on Wireguard which offers easy configuration and high performance. It provides an effective alternative in situations where opening ports is undesirable or not feasible, such as when the network is behind a carrier-grade NAT (CGNAT), or if your ISP blocks incoming traffic on certain ports.

## Prerequisites

A Tailscale account is required for Tailscale to work. An account can be created on the [Tailscale Website](https://tailscale.com)

## Using Tailscale Directly

Tailscale can be directly used to connect multiple devices together.

Pros:

- No changing router or network settings required.
- No Public IP or additional servers required.

Cons:

- Every client needs to have the Tailscale software installed
- Needs extra, complex configuration to block clients from connecting to each other.
- Requires an account with a 3rd party provider.

Setup on server:

1. Install the Tailscale app on the client device. Instructions are available in [Tailscale's official install guide](https://tailscale.com/kb/1347/installation)
2. Login to the Tailscale client and connect to the tailnet. On Windows and macOS that can be done through the icon in the system tray. On Linux that can be done with the command `sudo tailscale up`
3. Find and note your Tailscale IP of the server according to the [Tailscale Documentation](https://tailscale.com/kb/1033/ip-and-dns-addresses?tab=linux#finding-your-tailscale-ip-address). This IP will be used for other devices to connect. The IP should start with 100 (e.g. 100.12.34.56).

Setup on clients:

1. Install the Tailscale app on the client device. Instructions are available in [Tailscale's official install guide](https://tailscale.com/kb/1347/installation)
2. Login to the Tailscale client and connect to the tailnet. On Windows and macOS that can be done through the icon in the system tray. On Linux that can be done with the command `sudo tailscale up`. On mobile devices that can be done through the tailscale app.
3. Type in the server IP from above into your browser or Jellyfin client of choice and connect. (e.g. 100.12.34.56:8096)

## Using Tailscale with a reverse proxy

Tailscale can also be used to connect between a server and a remote reverse proxy. While it is possible to setup a traditional VPN connection between the remote reverse proxy and the Jellyfin server, it can be tricky. Tailscale provides an easy way to set up such a connection.

Setup on Jellyfin server:

1. Follow the `Setup on server` section in the [Using Tailscale Directly](#using-tailscale-directly) section to setup Tailscale on the Jellyfin server host.
2. Complete the setup on the reverse proxy server below.
3. Open the Dashboard of the Jellyfin server and go to Networking. Add the reverse proxy Tailscale IP to the `known proxies` setting. This is explained in detail in our [reverse proxy guide](./8_reverse-proxy/index.md#forwarded-for-headers).

Setup on reverse proxy server:

1. Install the Tailscale app on the client device. Instructions are available in [Tailscale's official install guide](https://tailscale.com/kb/1347/installation)
2. Login to the tailscale client and connect to the tailnet. On Linux this can be done with the command `sudo tailscale up`
3. Setup a reverse proxy of your choice and set the upstream server to the IP from above. Example [Caddy](./reverse-proxy/caddy) configuration: (Assuming server has Tailscale IP of 100.12.34.56)

   ```txt
   example.com

   redir /jellyfin /jellyfin/
   reverse_proxy /jellyfin/* 100.12.34.56:8096
   ```

4. Find and note your Tailscale IP of the reverse proxy server according to the [Tailscale Documentation](https://tailscale.com/kb/1033/ip-and-dns-addresses?tab=linux#finding-your-tailscale-ip-address). This IP must be added to the Jellyfin server’s `known proxies` setting. The IP should start with 100 (e.g. 100.65.43.21).
