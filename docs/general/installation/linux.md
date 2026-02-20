---
uid: installation-linux
title: Linux
description: Installing on Linux.
sidebar_position: 3
---

## Debian / Ubuntu and derivatives

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

## Other Distributions

For other distributions, [containers](/docs/general/installation/container) are the recommended way to install Jellyfin. There are also [community-maintained packages](/docs/general/installation/advanced/community) provided by 3rd parties if you would like to use them instead.
