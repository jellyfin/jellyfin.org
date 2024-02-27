---
uid: installation-synology
title: Synology
description: Install on Synology NAS.
sidebar_position: 4
---

# Install on Synology
:::caution Pre-built NAS Devices

Many pre-built NAS devices are underpowered. We generally do not recommend running Jellyfin on those devices.
See: [Hardware Selection](https://jellyfin.org/docs/general/administration/hardware-selection#normal-server) for more information.

:::
For [Synology](https://www.synology.com/en-us/dsm), Jellyfin is installed using Docker. For this guide, we will use the Synology Container Manager to install Jellyfin.

## Prerequisites

Everything is done through the Synology web interface.
This guide assumes you have already set up your Synology NAS and have access to the web interface. And your Synology NAS is running DSM 7.0 or newer.
If you are running an older version of DSM, you can use the guide at the bottom.
Install the "Container Manager" package from the Synology Package Center.
To do this you need to open the Package Center and search for "Container Manager" and install it.

## Installation

The installation is done with the Synology Container Manager.
If after the installation of the "Container Manager" you don´t see the icon in the main menu, you can find it in when clicking on the top left corner of the main menu.

### Downloading the Jellyfin Image

Navigate to the "Registry" tab and search for "Jellyfin". You should see the official jellyfin/jellyfin image. Click on it and then click "Download".

![Downloading the Image](/images/docs/install-synology-10.png)

A new window will open, there you can select a version of Jellyfin. We recommend using the latest version. Click "Apply".

![Downloading the Image](/images/docs/install-synology-11.png)

After a few seconds, the image will be downloaded and you can find it in the "Image" tab.

### Creating the Container

Navigate to the "Container" tab and click "Create".
Select the "Jellyfin" image and give the container a name. We recommend using "Jellyfin" as the name. You can also set the container to auto-start if you want Jellyfin to start when the NAS boots.
Also, you can set the resource limits for the container. We recommend that you let the container use all available resources.
Click "Next".
![Creating the Container](/images/docs/install-synology-12.png)

**Port Settings**
You need to set the port settings for the container. Jellyfin uses port 8096 for the web interface and 1900 for DLNA. You can set the container to use the same ports as the host or use different ports. We recommend using the same ports as the host.

**Volume Settings**
You need to set the volume settings for the container. Jellyfin needs access to your media files and configuration files.
To add a volume, click "Add Folder" and select the folder you want to use. In the middle column, you need to set the mount path. For the media files, you can use "/media" and for the configuration files, you can use "/config".

**Network Settings**
You need to set the network settings for the container. Jellyfin needs access to the network to stream media and use DLNA. You can use "Bridge" mode if you are running multiple instances of Jellyfin or "Host" mode if you are only running one instance. We recommend using "Host" mode.

Any other settings can be left as default.
Your settings should look like this:
![Advanced Settings](/images/docs/install-synology-13.png)
![Advanced Settings](/images/docs/install-synology-14.png)
Click "Next".

You can review your settings and then click "Apply".
Make sure the checkbox "Run this container after the wizard is finished" is checked.
You can now see the container in the "Container" tab.

Browse to `http://SERVER_IP:8096` to access the web client.
If you used a different port, replace 8096 with the port you used.

## earlier versions of DSM

![Installing Synology](/images/docs/install-synology-1.png)

![Installing Synology](/images/docs/install-synology-2.png)

![Installing Synology](/images/docs/install-synology-3.png)

Create the container.

![Installing Synology](/images/docs/install-synology-4.png)

![Installing Synology](/images/docs/install-synology-5.png)

Use Advanced Settings to add mount points to your media and config.

![Installing Synology](/images/docs/install-synology-6.png)

![Installing Synology](/images/docs/install-synology-7.png)

Host Mode is required for HdHR and DLNA. Use bridge mode if running multiple instances.

![Installing Synology](/images/docs/install-synology-8.png)

![Installing Synology](/images/docs/install-synology-9.png)

Browse to `http://SERVER_IP:8096` to access the web client.
If you used a different port, replace 8096 with the port you used.
