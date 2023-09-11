---
uid: network-reverse-proxy-vpn
title: VPNs
---

# VPNs
"A virtual private network (VPN) is a mechanism for creating a secure connection between a computing device and a computer network, or between two networks, using an insecure communication medium such as the public Internet." - [Wikipedia](https://en.wikipedia.org/wiki/Virtual_private_network)

## Commercial VPN services
Commercial VPN services such as Mullvad, PIA, NortVPN or Windscribe are a great way to hide your IP and bypass georestrictions. While some of them do provide a port forwarding feature,  they are **NOT** designed for hosting permanent services. You **SHOULD NOT** use a commercial VPN as a means to remotely access a Jellyfin server.

## Point To Point VPNs
Services like Tailscale, Zerotier and Hamachi provide an easy eay to link devices together in a Virtual network, providing LAN access between them. They are an easy way to allow access to devices without requiring much knowledge.