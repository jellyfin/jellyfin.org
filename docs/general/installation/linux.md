---
uid: installation-linux
title: Linux
description: Installing on Linux.
sidebar_position: 3
---

## Debian / Ubuntu and derivatives

### Installation

To simplify deployment, we provide a Bash script that installs the Jellyfin repository and Jellyfin itself.

The script supports many common derivatives, including Linux Mint (Ubuntu and Debian editions), Raspbian/Raspberry Pi OS, and KDE Neon. We welcome PRs [to the script](https://github.com/jellyfin/jellyfin-repo-helper-scripts/blob/master/install-debuntu.sh) for any other common derivatives.

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

If you do not want to execute a script with superuser permissions, you can also install the Jellyfin software repository manually (using either [extrepo](/docs/general/installation/advanced/manual/#debian-using-extrepo) or the [fully manual method](/docs/general/installation/advanced/manual/#official-linux-repository-manual)).

### Updating

Before updating, check your current Jellyfin version:

```sh
jellyfin --version
```

:::warning

Make a [backup of your Jellyfin data](/docs/general/administration/backup-and-restore) and check the release notes for each version you plan to install.

**Do not skip major releases.** Update to the latest patch release of each major release in sequence before moving to the next. For example, an upgrade from 10.10.7 to 12.4 needs to go through 10.11.10 first.

:::

Refresh the package list and check the available versions:

```sh
sudo apt update
apt-cache madison jellyfin-server
apt-cache madison jellyfin-web
```

To install a specific release, select the matching server and web package versions from the output and replace the version identifiers below:

```sh
sudo apt install jellyfin-server='<server-version>' jellyfin-web='<web-version>'
```

For example, the following installs Jellyfin 10.10.7 on Ubuntu 22.04, if those package versions are available:

```sh
sudo apt install jellyfin-server=10.10.7+ubu2204 jellyfin-web=10.10.7+ubu2204
```

After each major upgrade, ensure Jellyfin starts successfully and completes its migrations before proceeding to the next release.

## Other Distributions

For other distributions, [containers](/docs/general/installation/container) are the recommended way to install Jellyfin. There are also [community-maintained packages](/docs/general/installation/advanced/community) provided by 3rd parties if you would like to use them instead.
