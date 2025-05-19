---
uid: network-tailscale
title: Tailscale
sidebar-position: 3
---

# Tailscale

[Tailscale](https://tailscale.com) is a VPN based on Wireguard which offers easy configuration and high performance. It is great for users who don't want to open ports, or are behind CGNAT.

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

Setup on server:

1. Install the Tailscale app on the server host and login. Instructions are available in [their install guide](https://tailscale.com/kb/1347/installation)
2. Enable Tailscale.
3. Find and note your Tailscale IP of the server according to the [Tailscale Documentation](https://tailscale.com/kb/1033/ip-and-dns-addresses?tab=linux#finding-your-tailscale-ip-address). This IP will be used for other devices to connect. The IP should start with 100 (e.g. 100.12.34.56).

Setup on clients:

1. Install the Tailscale app on the client and login. Instructions are available in [their install guide](https://tailscale.com/kb/1347/installation)
2. Enable Tailscale.
3. Type in the server IP from above into your browser or Jellyfin client of choice and connect. (e.g. 100.12.34.56:8096)

## Using Tailscale with a reverse proxy

Tailscale can also be used to connect between a server and a remote reverse proxy. This is useful for getting around CGNAT or in situations where port forwarding is otherwise not possible.

Setup on Jellyfin server:

Please follow the `Setup on server` section in the [Using Tailscale Directly](#using-tailscale-directly) section.

Setup on reverse proxy server:

1. Install the Tailscale app on the reverse proxy server and login. Instructions are available in [their install guide](https://tailscale.com/kb/1347/installation)
2. Enable Tailscale.
3. Setup a reverse proxy of your choice and set the upstream server to the IP from above. Example [Caddy](./caddy) configuration: (Assuming server has Tailscale IP of 100.12.34.56)

```txt
example.com

redir /jellyfin /jellyfin/
reverse_proxy /jellyfin/* 100.12.34.56:8096
```
