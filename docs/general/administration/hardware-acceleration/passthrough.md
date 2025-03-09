---
uid: admin-hardware-acceleration-passthrough
title: GPU passthrough
---


# GPU passthrough tutorial

This tutorial will guide you through how to set up GPU passthrough in virtualised environments (VM/LXCs) in order to enable hardware acceleration.


## Proxmox - Jellyfin installed as (unpriviledged) LXC

To use the iGPU for hardware acceleration, the following devices need to be passed through to the LXC:

- **/dev/dri/card0** - owned by group video
- **/dev/dri/renderD128** - owned by group render

To use the dGPU, use **card1** and **renderD129** instead

Hardware passthrough requires mapping the GIDs to the correct group ownership.

- the GID for group **video is 44**
- the GID for group **render varies** (based on your LXC template distro) - e.g. debian 104, ubuntu 106 etc.

:::note

- Proxmox unpriviledged LXCs achieve isolation/security by mapping the guest GID/UIDs to different values from the host.
- Most issues with hardware passthrough in unpriviledged LXC is due to incorrect GID mapping.

:::

You can find the GIDs using the **LXC console/command line**

To find out your distros group render GID, type:
  
```shell
cat /etc/group | grep render
```

it should output something like:

```shell
render:x:104:jellyfin 
```

this shows
- the render group GID is 104
- the jellyfin user is in group render


### Web GUI method

1. Find out the GID for your video and render groups

2. In Proxmox Web GUI (x.x.x.x:8006), go to: LXC -> Resources -> Add -> Device Passthrough

3. Add the **/dev/dri/card0** device
   
- tick the *Advanced* checkbox to map GID to **44** (for group video)
   
4. Add the **/dev/dri/renderD128** device

- tick the *Advanced* checkbox to map GID to **your render group GID** (for group render)
  
5. Reboot your LXC and continue with instructions for your GPU architecture

