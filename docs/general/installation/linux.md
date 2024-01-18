---
uid: installation-linux
title: Linux
description: Install on Linux.
sidebar_position: 2
---

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

## Fedora

Fedora builds in RPM package format are available [in the main download repository](https://repo.jellyfin.org/releases/server/). We do not yet have an official Fedora repository, but one is planned for the future.  
However [`rpmfusion`](https://rpmfusion.org/) provides both `jellyfin-server` and `jellyfin-web` for Fedora version `38` and above.

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

   * `8096 TCP`, used by default for HTTP traffic; you can change this in the dashboard
   * `8920 TCP`, used by default for HTTPS traffic; you can change this in the dashboard
   * `1900 UDP`, used for service auto-discovery; this is not configurable
   * `7359 UDP`, used for auto-discovery; this is not configurable

   :::

6. Go to `localhost:8096` or `ip-address-of-jellyfin-server:8096` to finish setup in the web UI

## CentOS

CentOS/RHEL 7 builds in RPM package format are available [in the main download repository](https://repo.jellyfin.org/releases/server/). We do not yet have an official CentOS/RHEL repository, but one is planned for the future.

The default CentOS/RHEL repositories don't provide FFmpeg, which the RPM requires.
You will need to add a third-party repository which provide FFmpeg, such as [RPM Fusion's Free repository](https://rpmfusion.org/Configuration).

You can also build [Jellyfin's version](https://github.com/jellyfin/jellyfin-ffmpeg) on your own.
This includes gathering the dependencies and compiling and installing them.
Instructions can be found at [the FFmpeg wiki](https://trac.ffmpeg.org/wiki/CompilationGuide/Centos).

The general process should follow the above Fedora instructions.

## Debuntu (Debian, Ubuntu, and derivatives using `apt`)

The Jellyfin team provides 3rd-party Debian and Ubuntu repositories, to help ensure your Jellyfin install is always kept up-to-date.

### Repository (Automatic)

To simplify deployment and help automate this for as many users as possible, we provide a BASH script to handle repo installation as well as installing Jellyfin.
All you need to do is run this command on your system (requires `curl`, or subsitute `curl` with `wget -O-`):

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

The script tries to handle as many common derivatives as possible, including, at least, Linux Mint (Ubuntu and Debian editions), Raspbian/Raspberry Pi OS, and KDE Neon. We welcome PRs [to the script](https://github.com/jellyfin/jellyfin-metapackages/blob/master/install-debuntu.sh#L52) for any other common derivatives, or you can use the steps below instead.

:::

### Repository (Manual)

If you would prefer to install everything manually, the full steps are as follows:

1. Install `curl` and `gnupg` if you haven't already:

   ```sh
   sudo apt install curl gnupg
   ```

2. On Ubuntu (and derivatives) only, enable the Universe repository to obtain all the FFmpeg dependencies:

   ```sh
   sudo add-apt-repository universe
   ```

   :::note

   If the above command fails you will need to install the following package `software-properties-common`.
   This can be achieved with the following command `sudo apt-get install software-properties-common`

   :::

   On Debian, you can also enable the `non-free` components of your base repositories for additional FFmpeg dependencies, but this is optional.

3. Download the GPG signing key (signed by the Jellyfin Team) and install it:

   ```sh
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg
   ```

4. Add a repository configuration at `/etc/apt/sources.list.d/jellyfin.sources`:

   ```sh
   export VERSION_OS="$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release )"
   export VERSION_CODENAME="$( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )"
   export DPKG_ARCHITECTURE="$( dpkg --print-architecture )"
   cat <<EOF | sudo tee /etc/apt/sources.list.d/jellyfin.sources
   Types: deb
   URIs: https://repo.jellyfin.org/${VERSION_OS}
   Suites: ${VERSION_CODENAME}
   Components: main
   Architectures: ${DPKG_ARCHITECTURE}
   Signed-By: /etc/apt/keyrings/jellyfin.gpg
   EOF
   ```

   :::note

   The supported values for the above variables are:

   * `${VERSION_OS}`: One of `debian` or `ubuntu`; if it is not, use the closest one for your distribution.
   * `${VERSION_CODENAME}`: One of our supported [Debian](https://github.com/jellyfin/jellyfin-metapackages/blob/master/install-debuntu.sh#L7) or [Ubuntu](https://github.com/jellyfin/jellyfin-metapackages/blob/master/install-debuntu.sh#L8) release codenames. These can change as new releases come out and old releases are dropped, so check the script to be sure yours is supported.
   * `${DPKG_ARCHITECTURE}`: One of our [supported architectures](https://github.com/jellyfin/jellyfin-metapackages/blob/master/install-debuntu.sh#L6). Microsoft does not provide a .NET for 32-bit x86 Linux systems, and hence Jellyfin is **not** supported on the `i386` architecture.

   :::

5. Update your APT repositories:

   ```sh
   sudo apt update
   ```

6. Install the Jellyfin metapackage, which will automatically fetch the various sub-packages:

   ```sh
   sudo apt install jellyfin
   ```

   :::note

   If you want to be explicit, instead of the metapackage, you can install the sub-packages individually:

   ```sh
   sudo apt install jellyfin-server jellyfin-web
   ```

   The `jellyfin-server` package will automatically select the right `jellyfin-ffmpeg` package for you as well.

   :::

7. Manage the Jellyfin system service:

   ```sh
   sudo systemctl {action} jellyfin
   sudo service jellyfin {action}
   ```

### `.deb` Packages (Very Manual)

Raw `.deb` packages, including old versions, source packages, and `dpkg` meta files, are available [in the main download repository](https://repo.jellyfin.org/releases/server/).

:::note

The repository is the preferred way to obtain Jellyfin on Debian and Ubuntu systems, as this ensures you get automatic updates and that all dependencies are properly resolved. Use these steps only if you really know what you're doing.

:::

1. On Ubuntu (and derivatives) only, enable the Universe repository to obtain all the FFmpeg dependencies:

   ```sh
   sudo add-apt-repository universe
   ```

   :::note

   If the above command fails you will need to install the following package `software-properties-common`.
   This can be achieved with the following command `sudo apt-get install software-properties-common`

   :::

   On Debian, you can also enable the `non-free` components of your base repositories for additional FFmpeg dependencies, but this is optional.

2. Download the desired `jellyfin-server`, `jellyfin-web`, and `jellyfin-ffmpeg` `.deb` packages from the repository; `jellyfin` is a metapackage and is not required.

3. Install the downloaded `.deb` packages:

   ```sh
   sudo dpkg -i jellyfin_*.deb jellyfin-ffmpeg_*.deb
   ```

   :::note

   This step may throw errors; continue to the next step to resolve them.

   :::

4. Use `apt` to install any missing dependencies:

   ```sh
   sudo apt -f install
   ```

5. Manage the Jellyfin system service:

   ```sh
   sudo systemctl {action} jellyfin
   sudo service jellyfin {action}
   ```

## Gentoo

The Gentoo ebuild repository includes the Jellyfin package which can be installed like other software:

   ```sh
   emerge www-apps/jellyfin
   ```

## Linux (generic amd64)

Generic `amd64`, `arm64`, and `armhf` Linux builds in TAR archive format are available [in the main download repository](https://repo.jellyfin.org/releases/server/).

### Base Installation Process

Create a directory in `/opt` for jellyfin and its files, and enter that directory.

```sh
sudo mkdir /opt/jellyfin
cd /opt/jellyfin
```

Download the latest generic Linux build for your architecture.
The rest of these instructions assume version 10.8.13 is being installed (i.e. `jellyfin_10.8.13_amd64.tar.gz`).
Download the generic build, then extract the archive:

```sh
sudo wget https://repo.jellyfin.org/releases/server/linux/stable/combined/jellyfin_10.8.13_amd64.tar.gz
sudo tar xvzf jellyfin_10.8.13_amd64.tar.gz
```

Create a symbolic link to the Jellyfin 10.8.13 directory.
This allows an upgrade by repeating the above steps and enabling it by simply re-creating the symbolic link to the new version.

```sh
sudo ln -s jellyfin_10.8.13 jellyfin
```

Create four sub-directories for Jellyfin data.

```sh
sudo mkdir data cache config log
```

### `FFmpeg` Installation

If you are not running a Debian derivative, install `ffmpeg` through your OS's package manager, and skip this section.

:::caution

Not being able to use `jellyfin-ffmpeg` will most likely break hardware acceleration and tonemapping.

:::

If you are running Debian or a derivative, you should [download](https://repo.jellyfin.org/releases/server/debian/versions/jellyfin-ffmpeg/) and install a `ffmpeg` release built specifically for Jellyfin.
Be sure to download the latest release that matches your OS (`5.1.3-2` for Debian Bookworm assumed below).

```sh
sudo wget https://repo.jellyfin.org/releases/server/debian/versions/jellyfin-ffmpeg/5.1.3-2/jellyfin-ffmpeg5_5.1.3-2-bookworm_amd64.deb
sudo dpkg --install jellyfin-ffmpeg5_5.1.3-2-bookworm_amd64.deb
```

If you run into any dependency errors, run this and it will install them and `jellyfin-ffmpeg`.

```sh
sudo apt install -f
```

### Running Jellyfin

Due to the number of command line options that must be passed on to the Jellyfin binary, it is easiest to create a small script to run Jellyfin.

```sh
sudo nano jellyfin.sh
```

Then paste the following commands and modify as needed.

```sh
#!/bin/bash
JELLYFINDIR="/opt/jellyfin"
FFMPEGDIR="/usr/share/jellyfin-ffmpeg"

$JELLYFINDIR/jellyfin/jellyfin \
 -d $JELLYFINDIR/data \
 -C $JELLYFINDIR/cache \
 -c $JELLYFINDIR/config \
 -l $JELLYFINDIR/log \
 --ffmpeg $FFMPEGDIR/ffmpeg
```

Assuming you desire Jellyfin to run as a non-root user, `chmod` all files and directories to your normal login user and group.
Also make the startup script above executable.

```sh
sudo chown -R user:group *
sudo chmod u+x jellyfin.sh
```

Finally you can run it.
You will see lots of log information when run, this is normal.
Setup is as usual in the web browser.

```sh
./jellyfin.sh
```

#### Starting Jellyfin on boot (optional)

Create a `systemd` unit file.

```sh
cd /etc/systemd/system
sudo nano jellyfin.service
```

Then paste the following contents, replacing `youruser` with your username.

```ini
[Unit]
Description=Jellyfin
After=network.target

[Service]
Type=simple
User=youruser
Restart=always
ExecStart=/opt/jellyfin/jellyfin.sh

[Install]
WantedBy=multi-user.target
```

Apply the correct permissions to the file, enable the service to start on boot, then start it.

```sh
sudo chmod 644 jellyfin.service
sudo systemctl daemon-reload
sudo systemctl enable jellyfin.service
sudo systemctl start jellyfin.service
```

## Portable DLL

Platform-agnostic .NET Core DLL builds in TAR archive format are available [here](/downloads#portable).
These builds use the binary `jellyfin.dll` and must be loaded with `dotnet`.
