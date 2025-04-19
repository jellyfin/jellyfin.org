---
uid: installation-synology
title: Synology
description: Install on Synology NAS.
sidebar_position: 2
---

For [Synology](https://www.synology.com/en-us/dsm), Jellyfin is installed using Docker.

![Docker image add from url](/images/docs/install-synology-1.png)

![add from url window](/images/docs/install-synology-2.png)

![choose tag window](/images/docs/install-synology-3.png)

Create the container.

![create container general settings](/images/docs/install-synology-4.png)

![create container advance settings](/images/docs/install-synology-5.png)

Use Advanced Settings to add mount points to your media and config.

![add mounts window](/images/docs/install-synology-6.png)

![advance settings showing mount added](/images/docs/install-synology-7.png)

Host Mode is required for HdHR and DLNA. Use bridge mode if running multiple instances.

![advance settings network tab](/images/docs/install-synology-8.png)

![create container summary](/images/docs/install-synology-9.png)

Browse to `http://SERVER_IP:8096` to access the web client.
