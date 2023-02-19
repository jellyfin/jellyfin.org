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

Jellyfin can be found in the AUR as [`jellyfin`](https://aur.archlinux.org/packages/jellyfin/), [`jellyfin-bin`](https://aur.archlinux.org/packages/jellyfin-bin/) and [`jellyfin-git`](https://aur.archlinux.org/packages/jellyfin-git/).

## Fedora

Fedora builds in RPM package format are available [here](/downloads/linux#fedora-centos) for now but an official Fedora repository is coming soon.

1. You will need to enable rpmfusion as ffmpeg is a dependency of the jellyfin server package

   ```sh
   sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
   ```

   :::note

   You do not need to manually install ffmpeg, it will be installed by the jellyfin server package as a dependency

   :::

2. Install the jellyfin server

   ```sh
   sudo dnf install (link to version jellyfin server you want to install)
   ```

3. Install the jellyfin web interface

   ```sh
   sudo dnf install (link to web RPM you want to install)
   ```

4. Enable jellyfin service with systemd

   ```sh
   sudo systemctl start jellyfin
   ```

   ```sh
   sudo systemctl enable jellyfin
   ```

5. Open jellyfin service with firewalld

   ```sh
   sudo firewall-cmd --permanent --add-service=jellyfin
   ```

   :::note

   This will open the following ports
   8096 TCP used by default for HTTP traffic, you can change this in the dashboard
   8920 TCP used by default for HTTPS traffic, you can change this in the dashboard
   1900 UDP used for service auto-discovery, this is not configurable
   7359 UDP used for auto-discovery, this is not configurable

   :::

6. Reboot your machine

   ```sh
   sudo systemctl reboot
   ```

7. Go to `localhost:8096` or `ip-address-of-jellyfin-server:8096` to finish setup in the web UI

## CentOS

CentOS/RHEL 7 builds in RPM package format are available [here](/downloads/linux#fedora-centos) and an official CentOS/RHEL repository is planned for the future.

The default CentOS/RHEL repositories don't provide FFmpeg, which the RPM requires. You will need to add a third-party repository which provide FFmpeg, such as [RPM Fusion's Free repository](https://rpmfusion.org/Configuration).

You can also build [Jellyfin's version](https://github.com/jellyfin/jellyfin-ffmpeg) on your own. This includes gathering the dependencies and compiling and installing them. Instructions can be found at [the FFmpeg wiki](https://trac.ffmpeg.org/wiki/CompilationGuide/Centos).

## Debian

### Repository

The Jellyfin team provides a Debian repository for installation on Debian Buster/Bullseye.
Supported architectures are `amd64`, `arm64`, and `armhf`.

:::note

Microsoft does not provide a .NET for 32-bit x86 Linux systems, and hence Jellyfin is **not** supported on the `i386` architecture.

:::

Use extrepo to enable the jellyfin repositories (or see steps 1-3 below for manual repository setup):

```sh
sudo apt install extrepo
sudo extrepo enable jellyfin
```

WARNING: Do not run steps 1-3 below if the extrepo commands above were used.

1. Install `curl` and `gnupg` if you haven't already:

   ```sh
   sudo apt install curl gnupg
   ```

2. Download the GPG signing key (signed by the Jellyfin Team):

   ```sh
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg
   ```

3. Add a repository configuration at `/etc/apt/sources.list.d/jellyfin.sources`:

   ```sh
   cat <<EOF | sudo tee /etc/apt/sources.list.d/jellyfin.sources
   Types: deb
   URIs: https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release )
   Suites: $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )
   Components: main
   Architectures: $( dpkg --print-architecture )
   Signed-By: /etc/apt/keyrings/jellyfin.gpg
   EOF
   ```

   :::note

   Supported releases are `buster` and `bullseye`.

   :::

4. Update APT repositories:

   ```sh
   sudo apt update
   ```

5. Install Jellyfin:

   ```sh
   sudo apt install jellyfin
   ```

6. Manage the Jellyfin system service with your tool of choice:

   ```sh
   sudo service jellyfin status
   sudo systemctl restart jellyfin
   sudo /etc/init.d/jellyfin stop
   ```

### Packages

Raw Debian packages, including old versions, are available [here](/downloads/linux#debubuntu).

:::note

The repository is the preferred way to obtain Jellyfin on Debian, as it contains several dependencies as well.

:::

1. Download the desired `jellyfin` and `jellyfin-ffmpeg` `.deb` packages from the repository.

2. Install the downloaded `.deb` packages:

   ```sh
   sudo dpkg -i jellyfin_*.deb jellyfin-ffmpeg_*.deb
   ```

3. Use `apt` to install any missing dependencies:

   ```sh
   sudo apt -f install
   ```

4. Manage the Jellyfin system service with your tool of choice:

   ```sh
   sudo service jellyfin status
   sudo systemctl restart jellyfin
   sudo /etc/init.d/jellyfin stop
   ```

## Ubuntu

### Migrating to the new repository

Previous versions of Jellyfin included Ubuntu under the Debian repository.
This has now been split out into its own repository to better handle the separate binary packages.
If you encounter errors about the `ubuntu` release not being found and you previously configured an `ubuntu` `jellyfin.list` file, please follow these steps.

1. Remove the old `/etc/apt/sources.list.d/jellyfin.list` file:

   ```sh
   sudo rm /etc/apt/sources.list.d/jellyfin.list
   ```

2. Proceed with the following section as written.

### Ubuntu Repository

The Jellyfin team provides an Ubuntu repository for installation on Ubuntu Bionic, Focal, Impish, and Jammy. Supported architectures are `amd64`, `arm64`, and `armhf`.

:::note

Microsoft does not provide a .NET for 32-bit x86 Linux systems, and hence Jellyfin is **not** supported on the `i386` architecture.

:::

1. Install `curl` and `gnupg` if you haven't already:

   ```sh
   sudo apt install curl gnupg
   ```

2. Enable the Universe repository to obtain all the FFMpeg dependencies:

   ```sh
   sudo add-apt-repository universe
   ```

   :::note

   If the above command fails you will need to install the following package `software-properties-common`.
   This can be achieved with the following command `sudo apt-get install software-properties-common`

   :::

3. Download the GPG signing key (signed by the Jellyfin Team):

   ```sh
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg
   ```

4. Add a repository configuration at `/etc/apt/sources.list.d/jellyfin.sources`:

   ```sh
   cat <<EOF | sudo tee /etc/apt/sources.list.d/jellyfin.sources
   Types: deb
   URIs: https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release )
   Suites: $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )
   Components: main
   Architectures: $( dpkg --print-architecture )
   Signed-By: /etc/apt/keyrings/jellyfin.gpg
   EOF
   ```

   :::note

   Supported releases are `bionic`, `focal`, `impish`, and `jammy`.

   :::

5. Update APT repositories:

   ```sh
   sudo apt update
   ```

6. Install Jellyfin:

   ```sh
   sudo apt install jellyfin
   ```

7. Manage the Jellyfin system service with your tool of choice:

   ```sh
   sudo service jellyfin status
   sudo systemctl restart jellyfin
   sudo /etc/init.d/jellyfin stop
   ```

### Ubuntu Packages

Raw Ubuntu packages, including old versions, are available [here](/downloads/linux#debubuntu).

:::note

The repository is the preferred way to install Jellyfin on Ubuntu, as it contains several dependencies as well.

:::

1. Enable the Universe repository to obtain all the FFMpeg dependencies, and update repositories:

   ```sh
   sudo add-apt-repository universe
   sudo apt update
   ```

2. Download the desired `jellyfin` and `jellyfin-ffmpeg` `.deb` packages from the repository.

3. Install the required dependencies:

   ```sh
   sudo apt install at libsqlite3-0 libfontconfig1 libfreetype6 libssl1.0.0
   ```

4. Install the downloaded `.deb` packages:

   ```sh
   sudo dpkg -i jellyfin_*.deb jellyfin-ffmpeg_*.deb
   ```

5. Use `apt` to install any missing dependencies:

   ```sh
   sudo apt -f install
   ```

6. Manage the Jellyfin system service with your tool of choice:

   ```sh
   sudo service jellyfin status
   sudo systemctl restart jellyfin
   sudo /etc/init.d/jellyfin stop
   ```

## Linux (generic amd64)

Generic amd64, arm64, and armhf Linux builds in TAR archive format are available [here](/downloads/linux).

### Base Installation Process

Create a directory in `/opt` for jellyfin and its files, and enter that directory.

```sh
sudo mkdir /opt/jellyfin
cd /opt/jellyfin
```

Download the latest generic Linux build for your architecture.
The rest of these instructions assume version 10.8.9 is being installed (i.e. `jellyfin_10.8.9_amd64.tar.gz`).
Download the generic build, then extract the archive:

```sh
sudo wget https://repo.jellyfin.org/releases/server/linux/stable/combined/jellyfin_10.8.9_amd64.tar.gz
sudo tar xvzf jellyfin_10.8.9_amd64.tar.gz
```

Create a symbolic link to the Jellyfin 10.8.9 directory.
This allows an upgrade by repeating the above steps and enabling it by simply re-creating the symbolic link to the new version.

```sh
sudo ln -s jellyfin_10.8.9 jellyfin
```

Create four sub-directories for Jellyfin data.

```sh
sudo mkdir data cache config log
```

### `ffmpeg` Installation

If you are not running a Debian derivative, install `ffmpeg` through your OS's package manager, and skip this section.

:::caution

Not being able to use `jellyfin-ffmpeg` will most likely break hardware acceleration and tonemapping.

:::

If you are running Debian or a derivative, you should [download](https://repo.jellyfin.org/releases/server/debian/versions/jellyfin-ffmpeg/) and install an `ffmpeg` release built specifically for Jellyfin.
Be sure to download the latest release that matches your OS (5.1.2-7 for Debian Bullseye assumed below).

```sh
sudo wget https://repo.jellyfin.org/releases/server/debian/versions/jellyfin-ffmpeg/5.1.2-7/jellyfin-ffmpeg5_5.1.2-7-bullseye_amd64.deb
sudo dpkg --install jellyfin-ffmpeg5_5.1.2-7-bullseye_amd64.deb
```

If you run into any dependency errors, run this and it will install them and `jellyfin-ffmpeg`.

```sh
sudo apt install -f
```

### Running Jellyfin

Due to the number of command line options that must be passed, it is easiest to create a small script to run Jellyfin.

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
