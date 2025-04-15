---
uid: installation-community
title: Community Maintained Packages
description: Community maintained packages.
sidebar_position: 6
---

# Community Maintained Packages

These packages are maintained by community packagers independent of Jellyfin.

## Alpine Linux

Jellyfin can be found in the `community` repository as
[`jellyfin`](https://pkgs.alpinelinux.org/package/edge/community/x86_64/jellyfin) and
[`jellyfin-web`](https://pkgs.alpinelinux.org/package/edge/community/x86_64/jellyfin-web).

To enable the web UI after installing `jellyfin-web`, make sure to remove the `--nowebclient` option from
`/etc/conf.d/jellyfin`.

## Arch Linux

The `Extra` repository contains builds for both [`jellyfin-server`](https://archlinux.org/packages/?name=jellyfin-server) and [`jellyfin-web`](https://archlinux.org/packages/?name=jellyfin-web).
`jellyfin-server` includes a hard dependency on [`jellyfin-ffmpeg`](https://archlinux.org/packages/?name=jellyfin-ffmpeg).

Both packages, server and web, can also be built from source at the tip of the master branch using [`jellyfin-git`](https://aur.archlinux.org/packages/jellyfin-git/).
The AUR also offers each separately at [`jellyfin-server-git`](https://aur.archlinux.org/packages/jellyfin-server-git/) and [`jellyfin-web-git`](https://aur.archlinux.org/packages/jellyfin-web-git/).

## Fedora, CentOS and other RPM distributions

Builds in RPM package format are provided by RPM Fusion. Official packages are no longer provided starting with 10.9.

### RPM Fusion

1. `rpmfusion` must be enabled first

   ```sh
   sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
   ```

2. Install the `jellyfin` package, which will automatically install `jellyfin-server`, `jellyfin-web` and `jellyfin-firewalld`

   ```sh
   sudo dnf install jellyfin
   ```

3. Enable and start the Jellyfin service:

   ```sh
   sudo systemctl enable --now jellyfin
   ```

### Manual installation via the .rpm packages

1. You will need to enable `rpmfusion`, as `ffmpeg` is a dependency of the `jellyfin` server package

   ```sh
   sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
   ```

   :::note

   You do not need to manually install `ffmpeg`; it will be installed by the Jellyfin server package as a dependency.

   :::

2. Install the Jellyfin server

   ```sh
   sudo dnf install <link to server `.rpm` file URL>
   ```

3. Install the Jellyfin web interface

   ```sh
   sudo dnf install <link to web `.rpm` file URL>
   ```

4. Enable and start the Jellyfin service:

   ```sh
   sudo systemctl enable --now jellyfin
   ```

5. Allow Jellyfin through the firewall:

   ```sh
   sudo firewall-cmd --permanent --add-service=jellyfin
   ```

   :::note

   This will open the following ports:

   - `8096 TCP`, used by default for HTTP traffic; you can change this in the dashboard
   - `8920 TCP`, used by default for HTTPS traffic; you can change this in the dashboard
   - `1900 UDP`, used for service auto-discovery; this is not configurable
   - `7359 UDP`, used for auto-discovery; this is not configurable

   :::

6. Reload the firewall to apply the new rules:

   ```sh
   sudo firewall-cmd --reload
   ```

7. Go to `localhost:8096` or `ip-address-of-jellyfin-server:8096` to finish setup in the web UI.

## Gentoo

The Gentoo ebuild repository includes the Jellyfin package which can be installed like other software:

```sh
emerge www-apps/jellyfin
```

## NixOS

NixOS has a [module for Jellyfin](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/misc/jellyfin.nix),
it can be enabled as follows:

```nix
{
  services.jellyfin.enable = true;
}
```

For more information, refer to the [NixOS wiki](https://wiki.nixos.org/wiki/Jellyfin).

## Flatpak

The Jellyfin Server package is available on [Flathub](https://flathub.org/apps/org.jellyfin.JellyfinServer).

This package is provided for convenience only, and may be deprecated at any time. It is not recommended as [Flatpak themselves don't recommend the use of Flatpak for server applications](https://flatpak.org/faq/#Can_Flatpak_be_used_on_servers_too_). Please use [container images](/docs/general/installation/container) instead.
