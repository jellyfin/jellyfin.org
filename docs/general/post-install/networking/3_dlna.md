---
uid: network-dlna
title: DLNA
sidebar-position: 2
---

DLNA support has been moved to a first party plugin and is not included in a Jellyfin base install since 10.9.
If you want to use DLNA, please install the plugin from the official Plugin catalog.
To do so simply navigate to the admin dashboard, open the Catalog and install the [DLNA Plugin](https://github.com/jellyfin/jellyfin-plugin-dlna). Plugins maintained by the Jellyfin Project will be available in there by default.
Make sure to restart your Jellyfin-Server to complete the plugin installation.

## General

**Requirements:**

- Docker Host-networking (if Docker is used)
- 1900 udp

DLNA is based on UPnP.
Therefore it will make use of its **Service Discovery** (SSDP) running on Port 1900 UDP.
Since UPnP is a standard Protocol expected to be on UDP port 1900, its not possible to configure this.
Make sure to open this port to your local network. You will find more information about how to do this in the [Firewall guide](./#firewall-port-forwarding).

DLNA discovery works by sending a broadcast to the current subnet and waiting for DLNA Servers to respond.
This means that Clients will not be abled to find your server if it is not in the same subnet.
Using DLNA remotely is not possible.
If you are using Docker, the network should use **Host Mode**, otherwise the broadcast signal will not reach the bridged network inside of Docker.

## Troubleshooting

- If DLNA fails to bind properly, the message `[ERR] Failed to bind to port 1900: "Address already in use". DLNA will be unavailable` should appear in the logs.

- Setting `Alive message interval (seconds)` to 30 seconds also appears to help discovery for some clients.

- If a base URL is set, try removing it and restarting the server.

## DLNA Logging

Use these entries in `logging.default.json` to turn on DLNA debug logs.

```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Warning",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning",
        "Jellyfin.Plugin.Dlna": "Debug"
      }
    }
  }
}
```
