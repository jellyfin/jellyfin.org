---
uid: network-vpn
title: VPNs
---

# VPNs
"A virtual private network (VPN) is a mechanism for creating a secure connection between a computing device and a computer network, or between two networks, using an insecure communication medium such as the public Internet." - [Wikipedia](https://en.wikipedia.org/wiki/Virtual_private_network)

## Commercial VPN services
Commercial VPN services such as Mullvad, PIA, NortVPN or Windscribe are a great way to hide your IP and bypass georestrictions. While some of them do provide a port forwarding feature,  they are **NOT** designed for hosting permanent services. You **SHOULD NOT** use a commercial VPN as a means to remotely access a Jellyfin server.

## Point To Point VPNs
Services like Tailscale, Zerotier and Hamachi provide an easy eay to link devices together in a Virtual network, providing LAN access between them. They are an easy way to allow access to devices without requiring much networking expertise. However, they require devices that support their apps in order to function.

### Tailscale

[Tailscale](https://tailscale.com/) is a VPN solution based on [WireGuard](https://www.wireguard.com/). The free tier of its service allows up to 100 connected devices.

To setup remote access to Jellyfin using Tailscale, please follow the steps below.

1. Register an account at [their website](https://tailscale.com/)
2. Download and install the Tailscale client from [here](https://tailscale.com/download/) on the Jellyfin server and all clients.
3. Login to your Tailscale account on all devices. They will be automatically assigned an IP address for the Tailscale network.
4. Connect to the IP assigned to the Jellyfin server from all clients.
