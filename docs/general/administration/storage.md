---
uid: server-storage
title: Storage
---

## Storage

Jellyfin is designed to directly read media from the filesystem. A network storage device that is using samba or NFS must be directly mounted to the OS. The Jellyfin database should also be stored locally and not on a network storage device.

### NFS

In case you encounter performance issues where files take a long time to start playing while using NFSv3, you might be running in an issue with .NET locking without NFSv3 having locking enabled.

To solve this, you have the following options:

- Disable .NET locking using DOTNET_SYSTEM_IO_DISABLEFILELOCKING (introduced in .NET 6).
- Disable locking for the mount using the nolock option.
- Enable the lock service.
- Use NFSv4 which has built-in lock support.

## Docker or VMs

For storage, a moderate size library database can grow anywhere from 10 to 100 GB. The [transcoding](/docs/general/server/transcoding) folder needs roughly the same size as the original media if it's being transcoded at the same bitrate. A single 50GB Blu-Ray Remux by itself can take up to approximately 60GB or as little as 15GB, depending on the quality selected. If the transcoding folder is held on the same storage as the database, this must be taken into consideration.

## Cloud

A popular choice for cloud storage has been the program [rclone](https://rclone.org/downloads/). It is supported on most Operating Systems. To facilitate combining local and cloud filesystems, rclone can be paired with another program such as [mergerfs](https://github.com/trapexit/mergerfs). For cloud storage, it is recommended to disable image extraction as this requires downloading the entire file to perform this task.

### MergerFS

MergerFS isn't meant for everything, [see here](https://github.com/trapexit/mergerfs#what-should-mergerfs-not-be-used-for) for more.

- rclone recommended [config](https://forum.rclone.org/t/my-best-rclone-config-mount-for-plex/7441).

To modify and examine your mergerfs mount, here's a quick [guide](https://zackreed.me/mergerfs-neat-tricks).
