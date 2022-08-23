---
uid: network-dlna
title: DLNA
---

## DLNA

DLNA is based on uPnP.
DLNA will send a broadcast signal from Jellyfin.
This broadcast is limited to Jellyfin's current subnet.
If you are using docker, the network should use Host Mode, otherwise the broadcast signal will only be sent in the bridged network inside of docker.

If DLNA fails to bind properly, the message `[ERR] Failed to bind to port 1900: "Address already in use". DLNA will be unavailable` should appear in the logs.

Setting `Alive message interval (seconds)` to 30 seconds also appears to help discovery for some clients.

If a base URL is set, try removing it and restarting the server.

### DLNA Logging

Use these entries in `logging.default.json` to turn on DLNA debug logs.

```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Warning",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning",
        "Emby.Dlna": "Debug",
        "Emby.Dlna.Eventing": "Debug"
      }
    }
  }
}
```
