---
uid: network-vpn
title: VPNs
---

# VPNs

"A virtual private network (VPN) is a mechanism for creating a secure connection between a computing device and a computer network, or between two networks, using an insecure communication medium such as the public Internet." - [Wikipedia](https://en.wikipedia.org/wiki/Virtual_private_network)

## Commercial VPN services

Commercial VPN services such as PIA, NordVPN or Windscribe are a great way to hide your IP and bypass georestrictions. While some of them do provide a port forwarding feature, hosting Jellyfin using one is not recommended.

## VPN Software

Services like Tailscale and Zerotier provide an easy way to link devices together in a Virtual network. They are an easy way to allow access to devices without requiring much networking expertise. However, they require devices that support their apps in order to function.

### Tailscale

[Tailscale](https://tailscale.com/) is a VPN solution based on [WireGuard](https://www.wireguard.com/). The free tier of its service allows up to 100 connected devices. Tailscale is easy to setup, but support is limited.

To setup remote access to Jellyfin using Tailscale, please follow the steps below:

1. Register an account at [their website](https://tailscale.com/).
2. Download and install the Tailscale client from [here](https://tailscale.com/download/) on the Jellyfin server and all clients.
3. Login to your Tailscale account on all devices. They will be automatically assigned an IP address for the Tailscale network.
4. Connect to the IP assigned to the Jellyfin server from all clients.

### ZeroTier

[ZeroTier](https://www.zerotier.com/) is another VPN solution. The free tier allows up to 25 connected devices. ZeroTier supports much more platforms than Tailscale, but can be more complicated to setup. Zerotier also has the option for users to self-host the coordination server.

To setup remote access to Jellyfin using ZeroTier, please follow the steps below.

#### Setting Up a Network

1. Register an account at [their website](https://www.zerotier.com/).
2. Login to [ZeroTier Central](https://my.zerotier.com/). For new accounts, there should be 4 networks already created. You can use any of them, or create a new one and enter its settings page by clicking on it.
3. Give the network a name and description that you can remember (optional).
4. Change `Access Control` to `Private`
5. Scroll down and check `IPv4 Auto Assign`. Select `Easy` and pick an IP range from below. Any IP range that doesn't conflict with the local IP range of any client should work.
6. Note down the `Network ID`. This will be required for adding new devices to the network.

#### Adding Devices

The server and all clients should be added to this network.

1. Download and install [ZeroTier One](https://www.zerotier.com/download/) on the device.
2. Login to [ZeroTier Central](https://my.zerotier.com/) and choose your Jellyfin network.
3. Use the `Network ID` to join new devices.
4. Scroll down to the `Members` section in the dashboard. The devices that have joined should appear in this section. Devices that have a dashed red line aren't authorized to connect yet. Check the `Auth?` box to authorize the device.
5. After they are authorized, they will be assigned an IP address automatically. Please connect all clients to the IP address of the Jellyfin Server.

## Self Hosted Options

You can also host a VPN server yourself, either on premises or in the cloud. These are intended for advanced users only.

### WireGuard

To quickly establish a link between 2 devices using WireGuard, [their quick start guide](https://www.wireguard.com/quickstart/) can be followed.

### PiVPN

[PiVPN](https://www.pivpn.io/) can be used to quickly setup a VPN server on any device running Debian / Ubuntu.
