---
uid: network-dlna
title: DLNA
sidebar-position: 2
---

# DLNA

## Installation

DLNA support has been moved to a first party plugin and is not included in a Jellyfin base-install.
If you want to use DLNA, please install the plugin from the official Plugin catalog.
To do so, simply navigate to the admin dashboard and open the Catalog and install the [DLNA Plugin](https://github.com/jellyfin/jellyfin-plugin-dlna). Plugins maintained by the Jellyfin Project will be available in there by default.
Make sure to reboot your Jellyfin-Server to complete the plugin install.

## General

DLNA is based on uPnP.
DLNA will send a broadcast signal from Jellyfin.
This broadcast is limited to Jellyfin's current subnet.
If you are using docker, the network should use Host Mode, otherwise the broadcast signal will only be sent in the bridged network inside of docker.

If DLNA fails to bind properly, the message `[ERR] Failed to bind to port 1900: "Address already in use". DLNA will be unavailable` should appear in the logs.

Setting `Alive message interval (seconds)` to 30 seconds also appears to help discovery for some clients.

If a base URL is set, try removing it and restarting the server.

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
