---
uid: installation-linux
title: Linux
description: Installing on Linux.
sidebar_position: 3
---

## Installing on Linux

### Debian / Ubuntu and derivatives

To simplify deployment and help automate this for as many users as possible, we provide a BASH script to handle repo installation as well as installing Jellyfin on Debian / Ubuntu and derivatives.
All you need to do is run this command on your system (requires `curl`, or substitute `curl` with `wget -O-`):

```sh
curl https://repo.jellyfin.org/install-debuntu.sh | sudo bash
```

:::note

You can verify the script download integrity with (requires `sha256sum`):

```sh
diff <( curl -s https://repo.jellyfin.org/install-debuntu.sh -o install-debuntu.sh; sha256sum install-debuntu.sh ) <( curl -s https://repo.jellyfin.org/install-debuntu.sh.sha256sum )
```

An empty output means everything is correct. Then you can inspect the script to see what it does (optional but recommended) and execute it with:

```sh
less install-debuntu.sh
sudo bash install-debuntu.sh
```

:::

:::note

The script tries to handle as many common derivatives as possible, including, at least, Linux Mint (Ubuntu and Debian editions), Raspbian/Raspberry Pi OS, and KDE Neon. We welcome PRs [to the script](https://github.com/jellyfin/jellyfin-repo-helper-scripts/blob/master/install-debuntu.sh) for any other common derivatives.

:::

### Other Distributions

For other distributions, [containers](/docs/general/installation/container) are the recommended way to install Jellyfin. There are also [community-maintained packages](/docs/general/installation/advanced/community) provided by 3rd parties if you would like to use them instead.

## Updating on Linux

It is very important to note your current Jellyfin version before attempting to upgrade.

```sh
jellyfin --version
```

First, make a backup of your current data. Instructions can be found [here](/docs/general/administration/backup-and-restore.md).

### From version 10.10.7 or above

```sh
sudo apt upgrade jellyfin
```

### From version 10.10.6 or below

You must first upgrade to the 10.10.7 release, before upgrading to the 10.11.0 stable version and beyond. Check the relevant release notes for more information.

Check what Jellyfin versions are available:
```sh
apt-cache madison jellyfin-server
apt-cache madison jellyfin-web
```

Find the full version ID for 10.10.7, and use it below.
Or find and download the version with `wget` from https://repo.jellyfin.org/archive/server/

```sh
sudo apt install jellyfin-server=<version> jellyfin-web=<version>
```

For example:
```sh
sudo apt install jellyfin-server=10.10.7+ubu2204 jellyfin-web=10.10.7+ubu2204
```

### Restart the service

You may need to restart Jellyfin

```sh
sudo service jellyfin start
```
