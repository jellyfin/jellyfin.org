---
uid: installation-linux
title: Linux
description: Installing on Linux.
sidebar_position: 3
---

## Debian / Ubuntu and derivatives

To simplify deployment and help automate this for as many users as possible, we provide a BASH script to handle repo installation as well as installing Jellyfin on Debian / Ubuntu and derivatives.

Download and verify the script, then execute it on your system (requires `curl` and `sha256sum`):

```sh
curl -s https://repo.jellyfin.org/install-debuntu.sh -O && \
curl -s https://repo.jellyfin.org/install-debuntu.sh.sha256sum -O && \
sha256sum -c install-debuntu.sh.sha256sum
```

`install-debuntu.sh: OK` means the checksum is correct.

You can optionally inspect the script to see what it does before executing it:

```sh
less install-debuntu.sh
```

Then execute it with:

```sh
sudo bash install-debuntu.sh
```

:::note

The script tries to handle as many common derivatives as possible, including, at least, Linux Mint (Ubuntu and Debian editions), Raspbian/Raspberry Pi OS, and KDE Neon. We welcome PRs [to the script](https://github.com/jellyfin/jellyfin-repo-helper-scripts/blob/master/install-debuntu.sh) for any other common derivatives.

:::

If you do not want to execute a script with superuser permissions, you can also install the Jellyfin software repository manually (using either [extrepo](/docs/general/installation/advanced/manual/#debian-using-extrepo) or the [fully manual method](/docs/general/installation/advanced/manual/#official-linux-repository-manual)).

## Other Distributions

For other distributions, [containers](/docs/general/installation/container) are the recommended way to install Jellyfin. There are also [community-maintained packages](/docs/general/installation/advanced/community) provided by 3rd parties if you would like to use them instead.

## Non LTS Ubuntu Distro Install
Below manual workaround to install in non LTS ubuntu versions, like 25.10
https://forum.jellyfin.org/t-non-lts-install-jellyfin
