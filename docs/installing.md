---
id: installing-jellyfin
title: Installing the server
sidebar_position: 2
---

The Jellyfin project and its contributors offer a number of pre-built binary packages to assist in getting Jellyfin up and running quickly on multiple systems.

## Container images

Official container image: `jellyfin/jellyfin` <a href="https://hub.docker.com/r/jellyfin/jellyfin"><img alt="Docker Pull Count" src="https://img.shields.io/docker/pulls/jellyfin/jellyfin.svg" /></a>.

LinuxServer.io image: `linuxserver/jellyfin` <a href="https://hub.docker.com/r/linuxserver/jellyfin"><img alt="Docker Pull Count" src="https://img.shields.io/docker/pulls/linuxserver/jellyfin.svg" /></a>.

hotio image: `hotio/jellyfin` <a href="https://hub.docker.com/r/hotio/jellyfin"><img alt="Docker Pull Count" src="https://img.shields.io/docker/pulls/hotio/jellyfin.svg" /></a>.

Jellyfin distributes [official container images on Docker Hub](https://hub.docker.com/r/jellyfin/jellyfin/) for multiple architectures. These images are based on Debian and [built directly from the Jellyfin source code](https://github.com/jellyfin/jellyfin/blob/master/Dockerfile).

Additionally the [LinuxServer.io](https://www.linuxserver.io/) project and [hotio](https://github.com/hotio) distribute images based on Ubuntu and the official Jellyfin Ubuntu binary packages, see [here](https://github.com/linuxserver/docker-jellyfin/blob/master/Dockerfile) and [here](https://github.com/hotio/docker-jellyfin/blob/stable/linux-amd64.Dockerfile) to see their Dockerfile.

:::note

For ARM hardware and RPi, it is recommended to use the LinuxServer.io or hotio image since hardware acceleration support is not yet available on the native image.

:::

### Docker

[Docker](https://www.docker.com/) allows you to run containers on Linux, Windows and MacOS.

The basic steps to create and run a Jellyfin container using Docker are as follows.

1. Follow the [offical installation guide to install Docker](https://docs.docker.com/engine/install).

2. Download the latest container image.

   ```sh
   docker pull jellyfin/jellyfin
   ```

3. Create persistent storage for configuration and cache data.

   Either create two persistent volumes:

   ```sh
   docker volume create jellyfin-config
   docker volume create jellyfin-cache
   ```

   Or create two directories on the host and use bind mounts:

   ```sh
   mkdir /path/to/config
   mkdir /path/to/cache
   ```

4. Create and run a container in one of the following ways.

:::note

The default network mode for Docker is bridge mode. Bridge mode will be used if host mode is omitted. Use host mode for networking in order to use DLNA or an HDHomeRun.

:::

**Using Docker command line interface:**

   ```sh
   docker run -d \
    --name jellyfin \
    --user id:gid \
    --net=host \
    --volume /path/to/config:/config \
    --volume /path/to/cache:/cache \
    --mount type=bind,source=/path/to/media,target=/media \
    --restart=unless-stopped \
    jellyfin/jellyfin
   ```

Using host networking (`--net=host`) is optional but required in order to use DLNA or HDHomeRun.

Bind Mounts are needed to pass folders from the host OS to the container OS whereas volumes are maintained by Docker and can be considered easier to backup and control by external programs. For a simple setup, it's considered easier to use Bind Mounts instead of volumes. Replace `jellyfin-config` and `jellyfin-cache` with `/path/to/config` and `/path/to/cache` respectively if using bind mounts. Multiple media libraries can be bind mounted if needed:

   ```sh
   --mount type=bind,source=/path/to/media1,target=/media1
   --mount type=bind,source=/path/to/media2,target=/media2,readonly
   ...etc
   ```

:::note

There is currently an [issue](https://github.com/docker/for-linux/issues/788) with read-only mounts in Docker. If there are submounts within the main mount, the submounts are read-write capable.

:::

**Using Docker Compose:**

Create a `docker-compose.yml` file with the following contents:

   ```yml
   version: "3.5"
   services:
     jellyfin:
       image: jellyfin/jellyfin
       container_name: jellyfin
       user: id:gid
       network_mode: "host"
       volumes:
         - /path/to/config:/config
         - /path/to/cache:/cache
         - /path/to/media:/media
         - /path/to/media2:/media2:ro
       restart: "unless-stopped"
       # Optional - alternative address used for autodiscovery
       environment:
         - JELLYFIN_PublishedServerUrl=http://example.com
   ```

Then while in the same folder as the `docker-compose.yml` run:

   ```sh
   docker-compose up
   ```

To run the container in background add `-d` to the above command.

You can learn more about using Docker by [reading the official Docker documentation](https://docs.docker.com/).

### Unraid Docker

An Unraid Docker template is available in the repository.

1. Open the unRaid GUI (at least unRaid 6.5) and click on the "Docker" tab.

2. Add the following line under "Template Repositories" and save the options.

   ```data
   https://github.com/jellyfin/jellyfin/blob/master/deployment/unraid/docker-templates
   ```

3. Click "Add Container" and select "jellyfin".

4. Adjust any required paths and save your changes.

### Kubernetes

A community project to deploy Jellyfin on Kubernetes-based platforms exists [at their repository](https://github.com/home-cluster/jellyfin-openshift). Any issues or feature requests related to deployment on Kubernetes-based platforms should be filed there.

### Podman

[Podman](https://podman.io) allows you to run containers as non-root. It's also the offically supported container solution on RHEL and CentOS.

Steps to run Jellyfin using Podman are almost identical to Docker steps:

1. Install Podman:

   ```sh
   dnf install -y podman
   ```
Installing
   podman volume create jellyfin-cache
   ```

   Or create two directories on the host and use bind mounts:

   ```sh
   mkdir /path/to/config
   mkdir /path/to/cache
   ```

4. Create and run a Jellyfin container:

   ```sh
   podman run \
    --cgroup-manager=systemd \
    --volume jellyfin-config:/config \
    --volume jellyfin-cache:/cache \
    --volume jellyfin-media:/media \
    -p 8096:8096 \
    --label "io.containers.autoupdate=image" \
    --name myjellyfin \
    jellyfin/jellyfin
   ```

Note that Podman doesn't require root access and it's recommended to run the Jellyfin container as a separate non-root user for security.

Keep in mind that the `--label "io.containers.autoupdate=image"` flag will allow the container to be automatically updated via `podman auto-update`.

If SELinux is enabled you need to use either the `z` (shared volume) or `Z` (private volume) volume option to allow Jellyfin to access the volumes.

Replace `jellyfin-config`, `jellyfin-cache`, and `jellyfin-media` with `/path/to/config`, `/path/to/cache` and `/path/to/media` respectively if using bind mounts.

To mount your media library read-only append ':ro' to the media volume:

   ```sh
   --volume /path/to/media:/media:ro
   ```

#### Managing via Systemd

To run as a systemd service see [Running containers with Podman and shareable systemd services](https://www.redhat.com/sysadmin/podman-shareable-systemd-services).

As always it is recommended to run the container rootless. Therefore we want to manage the container with the `systemd --user` flag.

1. First we have to generate the container as seen above.

2. Next generate the systemd.service file.

    ```sh
    podman generate systemd --new --name myjellyfin > ~/.config/systemd/user/container-myjellyfin.service
    ```

3. Verify and edit the systemd.service file to your liking. To further sandbox see [Mastering systemd: Securing and sandboxing applications and services](https://www.redhat.com/sysadmin/mastering-systemd). An example service file is shown below. **Do not blindly copy**, one should make edits to the service file generated by podman.

    ```sh
    # container-myjellyfin.service
    # autogenerated by Podman 2.2.1
    # Wed Feb 17 23:49:24 EST 2021

    [Unit]
    Description=Podman container-myjellyfin.service
    Documentation=man:podman-generate-systemd(1)
    Wants=network.target
    After=network-online.target

    [Service]
    Environment=PODMAN_SYSTEMD_UNIT=%n
    Restart=on-failure
    ExecStartPre=/bin/rm -f %t/container-myjellyfin.pid %t/container-myjellyfin.ctr-id
    ExecStart=/usr/bin/podman run --conmon-pidfile %t/container-myjellyfin.pid --cidfile %t/container-myjellyfin.ctr-id --cgroups=no-conmon -d --replace --cgroup-manager=systemd --volume jellyfin-config:/config:z --volume jellyfin-cache:/cache:z --volume jellyfin-media:/media:z -p 8096:8096 --userns keep-id --name myjellyfin jellyfin/jellyfin
    ExecStop=/usr/bin/podman stop --ignore --cidfile %t/container-myjellyfin.ctr-id -t 10
    ExecStopPost=/usr/bin/podman rm --ignore -f --cidfile %t/container-myjellyfin.ctr-id
    PIDFile=%t/container-myjellyfin.pid
    KillMode=control-group
    Type=forking

    # Security Features
    PrivateTmp=yes
    NoNewPrivileges=yes
    ProtectSystem=strict
    ProtectHome=yes
    ProtectKernelTunables=yes
    ProtectControlGroups=yes
    PrivateMounts=yes
    ProtectHostname=yes

    [Install]
    WantedBy=multi-user.target default.target
    ```

4. Enable the service.

    ```sh
    systemctl --user enable container-myjellyfin.service
    ```

    At this point the container will only start when the user logs in and shutdown when they log off. To have the container start as the user at first login we'll have to include one more option.

    ```sh
    loginctl enable-linger <username>
    ```

5. Start the service.

    ```sh
    systemctl --user start container-myjellyfin.service
    ```

### Cloudron

Cloudron is a complete solution for running apps on your server and keeping them up-to-date and secure. On your Cloudron you can install Jellyfin with a few clicks via the [app library](https://cloudron.io/store/org.jellyfin.cloudronapp.html) and updates are delivered automatically.

The source code for the package can be found [here](https://git.cloudron.io/cloudron/jellyfin-app).
Any issues or feature requests related to deployment on Cloudron should be filed there.

## Windows (x86/x64)

Windows installers and builds in ZIP archive format are available [here](https://jellyfin.org/downloads/#windows).

:::warning

If you installed a version prior to 10.4.0 using a PowerShell script, you will need to manually remove the service using the command `nssm remove Jellyfin` and uninstall the server by remove all the files manually. Also one might need to move the data files to the correct location, or point the installer at the old location.

:::

:::warning

The 32-bit or x86 version is not recommended. `ffmpeg` and its video encoders generally perform better as a 64-bit executable due to the extra registers provided. This means that the 32-bit version of Jellyfin is deprecated.

:::

### Install using Installer (x64)

**Install**

1. Download the latest version.
2. Run the installer.
3. (Optional) When installing as a service, pick the service account type.
4. If everything was completed successfully, the Jellyfin service is now running.
5. Open your browser at <http://localhost:8096> to finish setting up Jellyfin.

**Update**

1. Download the latest version.
2. Run the installer.
3. If everything was completed successfully, the Jellyfin service is now running as the new version.

**Uninstall**

1. Go to `Add or remove programs` in Windows.
2. Search for Jellyfin.
3. Click Uninstall.

### Manual Installation (x86/x64)

**Install**

1. Download and extract the latest version.
1. Create a folder `jellyfin` at your preferred install location.
1. Copy the extracted folder into the `jellyfin` folder and rename it to `system`.
1. Create `jellyfin.bat` within your `jellyfin` folder containing:
    - To use the default library/data location at `%localappdata%`:

    ```cmd
    <--Your install path-->\jellyfin\system\jellyfin.exe
    ```

    - To use a custom library/data location (Path after the -d parameter):

    ```cmd
    <--Your install path-->\jellyfin\system\jellyfin.exe -d <--Your install path-->\jellyfin\data
    ```

    - To use a custom library/data location (Path after the -d parameter) and disable the auto-start of the webapp:

    ```cmd
    <--Your install path-->\jellyfin\system\jellyfin.exe -d <--Your install path-->\jellyfin\data -noautorunwebapp
    ```

1. Run

    ```cmd
    jellyfin.bat
    ```

1. Open your browser at `http://<--Server-IP-->:8096` (if auto-start of webapp is disabled)

**Update**

1. Stop Jellyfin
2. Rename the Jellyfin `system` folder to `system-bak`
3. Download and extract the latest Jellyfin version
4. Copy the extracted folder into the `jellyfin` folder and rename it to `system`
5. Run `jellyfin.bat` to start the server again

**Rollback**

1. Stop Jellyfin.
2. Delete the `system` folder.
3. Rename `system-bak` to `system`.
4. Run `jellyfin.bat` to start the server again.

## MacOS

MacOS Application packages and builds in TAR archive format are available [here](https://jellyfin.org/downloads/#macos).

**Install**

1. Download the latest version.
2. Drag the `.app` package into the Applications folder.
3. Start the application.
4. Open your browser at `http://127.0.0.1:8096`.

**Upgrade**

1. Download the latest version.
2. Stop the currently running server either via the dashboard or using the application icon.
3. Drag the new `.app` package into the Applications folder and click yes to replace the files.
4. Start the application.
5. Open your browser at `http://127.0.0.1:8096`.

**Uninstall**

1. Stop the currently running server either via the dashboard or using the application icon.
2. Move the `.app` package to the trash.

**Deleting Configuation**

This will delete all settings and user information. This applies for the .app package and the portable version.

1. Delete the folder `~/.config/jellyfin/`
2. Delete the folder `~/.local/share/jellyfin/`

**Portable Version**

1. Download the latest version
2. Extract it into the Applications folder
3. Open Terminal and type `cd` followed with a space then drag the jellyfin folder into the terminal.
4. Type `./jellyfin` to run jellyfin.
5. Open your browser at <http://localhost:8096>

Closing the terminal window will end Jellyfin. Running Jellyfin in screen or tmux can prevent this from happening.

**Upgrading the Portable Version**

1. Download the latest version.
1. Stop the currently running server either via the dashboard or using `CTRL+C` in the terminal window.
1. Extract the latest version into Applications
1. Open Terminal and type `cd` followed with a space then drag the jellyfin folder into the terminal.
1. Type `./jellyfin` to run jellyfin.
1. Open your browser at <http://localhost:8096>

**Uninstalling the Portable Version**

1. Stop the currently running server either via the dashboard or using `CTRL+C` in the terminal window.
1. Move `/Application/jellyfin-version` folder to the Trash. Replace version with the actual version number you are trying to delete.

**Using FFmpeg with the Portable Version**

The portable version doesn't come with FFmpeg by default, so to install FFmpeg you have three options.

- use the package manager homebrew by typing `brew install ffmpeg` into your Terminal ([here's how to install homebrew if you don't have it already](https://treehouse.github.io/installation-guides/mac/homebrew)
- download the most recent static build from [this link](https://evermeet.cx/ffmpeg/get/zip) (compiled by a third party see [this page](https://evermeet.cx/ffmpeg/) for options and information), or
- compile from source available from the official [website](https://ffmpeg.org/download.html)

More detailed download options, documentation, and signatures can be found.

If using static build, extract it to the `/Applications/` folder.

Navigate to the Playback tab in the Dashboard and set the path to FFmpeg under FFmpeg Path.

## Linux

### Linux (generic amd64)

Generic amd64 Linux builds in TAR archive format are available [here](https://jellyfin.org/downloads/#linux).

#### Installation Process

Create a directory in `/opt` for jellyfin and its files, and enter that directory.

```sh
sudo mkdir /opt/jellyfin
cd /opt/jellyfin
```

Download the latest generic Linux build from the [release page](https://github.com/jellyfin/jellyfin/releases). The generic Linux build ends with "`linux-amd64.tar.gz`". The rest of these instructions assume version 10.4.3 is being installed (i.e. `jellyfin_10.4.3_linux-amd64.tar.gz`). Download the generic build, then extract the archive:

```sh
sudo wget https://github.com/jellyfin/jellyfin/releases/download/v10.4.3/jellyfin_10.4.3_linux-amd64.tar.gz
sudo tar xvzf jellyfin_10.4.3_linux-amd64.tar.gz
```

Create a symbolic link to the Jellyfin 10.4.3 directory. This allows an upgrade by repeating the above steps and enabling it by simply re-creating the symbolic link to the new version.

```sh
sudo ln -s jellyfin_10.4.3 jellyfin
```

Create four sub-directories for Jellyfin data.

```sh
sudo mkdir data cache config log
```

If you are running Debian or a derivative, you can also [download](https://repo.jellyfin.org/releases/server/debian/versions/jellyfin-ffmpeg/) and install an ffmpeg release built specifically for Jellyfin. Be sure to download the latest release that matches your OS (4.2.1-5 for Debian Stretch assumed below).

```sh
sudo wget https://repo.jellyfin.org/releases/server/debian/versions/jellyfin-ffmpeg/4.2.1-5/jellyfin-ffmpeg_4.2.1-5-stretch_amd64.deb
sudo dpkg --install jellyfin-ffmpeg_4.2.1-5-stretch_amd64.deb
```

If you run into any dependency errors, run this and it will install them and jellyfin-ffmpeg.

```sh
sudo apt install -f
```

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

Assuming you desire Jellyfin to run as a non-root user, `chmod` all files and directories to your normal login user and group. Also make the startup script above executable.

```sh
sudo chown -R user:group *
sudo chmod u+x jellyfin.sh
```

Finally you can run it. You will see lots of log information when run, this is normal. Setup is as usual in the web browser.

```sh
./jellyfin.sh
```

### Portable DLL

Platform-agnostic .NET Core DLL builds in TAR archive format are available [here](https://jellyfin.org/downloads/#portable). These builds use the binary `jellyfin.dll` and must be loaded with `dotnet`.

### Arch Linux

Jellyfin can be found in the AUR as [`jellyfin`](https://aur.archlinux.org/packages/jellyfin/), [`jellyfin-bin`](https://aur.archlinux.org/packages/jellyfin-bin/) and [`jellyfin-git`](https://aur.archlinux.org/packages/jellyfin-git/).

### Fedora

Fedora builds in RPM package format are available [here](https://jellyfin.org/downloads/#fedora) for now but an official Fedora repository is coming soon.

1. You will need to enable rpmfusion as ffmpeg is a dependency of the jellyfin server package

    ```sh
    sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
    ```

:::note

You do not need to manually install ffmpeg, it will be installed by the jellyfin server package as a dependency

:::

1. Install the jellyfin server

    ```sh
    sudo dnf install (link to version jellyfin server you want to install)
    ```

1. Install the jellyfin web interface

    ```sh
    sudo dnf install (link to web RPM you want to install)
    ```

1. Enable jellyfin service with systemd

    ```sh
    sudo systemctl start jellyfin
    ```

    ```sh
    sudo systemctl enable jellyfin
    ```

1. Open jellyfin service with firewalld

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

1. Reboot your box

    ```sh
    sudo systemctl reboot
    ```

1. Go to localhost:8096 or ip-address-of-jellyfin-server:8096 to finish setup in the web UI

### CentOS

CentOS/RHEL 7 builds in RPM package format are available [here](https://jellyfin.org/downloads/#centos) and an official CentOS/RHEL repository is planned for the future.

The default CentOS/RHEL repositories don't carry FFmpeg, which the RPM requires. You will need to add a third-party repository which carries FFmpeg, such as [RPM Fusion's Free repository](https://rpmfusion.org/Configuration).

You can also build [Jellyfin's version](https://github.com/jellyfin/jellyfin-ffmpeg) on your own. This includes gathering the dependencies and compiling and installing them. Instructions can be found at [the FFmpeg wiki](https://trac.ffmpeg.org/wiki/CompilationGuide/Centos).

### Debian

#### Repository

The Jellyfin team provides a Debian repository for installation on Debian Stretch/Buster. Supported architectures are `amd64`, `arm64`, and `armhf`.

:::note

Microsoft does not provide a .NET for 32-bit x86 Linux systems, and hence Jellyfin is not supported on the `i386` architecture.

:::

Steps 1 to 3 can also be replaced by:

```sh
sudo apt install extrepo
sudo extrepo enable jellyfin
```

1. Install HTTPS transport for APT as well as `gnupg` and `lsb-release` if you haven't already.

    ```sh
    sudo apt install apt-transport-https gnupg lsb-release
    ```

1. Import the GPG signing key (signed by the Jellyfin Team):

    ```sh
    wget -O - https://repo.jellyfin.org/debian/jellyfin_team.gpg.key | sudo apt-key add -
    ```

1. Add a repository configuration at `/etc/apt/sources.list.d/jellyfin.list`:

    ```sh
    echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/debian $( lsb_release -c -s ) main" | sudo tee /etc/apt/sources.list.d/jellyfin.list
    ```

:::note

Supported releases are `stretch`, `buster`, and `bullseye`.

:::

1. Update APT repositories:

    ```sh
    sudo apt update
    ```

1. Install Jellyfin:

    ```sh
    sudo apt install jellyfin
    ```

1. Manage the Jellyfin system service with your tool of choice:

    ```sh
    sudo service jellyfin status
    sudo systemctl restart jellyfin
    sudo /etc/init.d/jellyfin stop
    ```

#### Packages

Raw Debian packages, including old versions, are available [here](https://jellyfin.org/downloads/#debian).

:::note

The repository is the preferred way to obtain Jellyfin on Debian, as it contains several dependencies as well.

:::

1. Download the desired `jellyfin` and `jellyfin-ffmpeg` `.deb` packages from the repository.

1. Install the downloaded `.deb` packages:

    ```sh
    sudo dpkg -i jellyfin_*.deb jellyfin-ffmpeg_*.deb
    ```

1. Use `apt` to install any missing dependencies:

    ```sh
    sudo apt -f install
    ```

1. Manage the Jellyfin system service with your tool of choice:

    ```sh
    sudo service jellyfin status
    sudo systemctl restart jellyfin
    sudo /etc/init.d/jellyfin stop
    ```

### Ubuntu

#### Migrating to the new repository

Previous versions of Jellyfin included Ubuntu under the Debian repository. This has now been split out into its own repository to better handle the separate binary packages. If you encounter errors about the `ubuntu` release not being found and you previously configured an `ubuntu` `jellyfin.list` file, please follow these steps.

1. Remove the old `/etc/apt/sources.list.d/jellyfin.list` file:

    ```sh
    sudo rm /etc/apt/sources.list.d/jellyfin.list
    ```

1. Proceed with the following section as written.

#### Ubuntu Repository

The Jellyfin team provides an Ubuntu repository for installation on Ubuntu Xenial, Bionic, Cosmic, Disco, Eoan, and Focal. Supported architectures are `amd64`, `arm64`, and `armhf`. Only `amd64` is supported on Ubuntu Xenial.

:::note

Microsoft does not provide a .NET for 32-bit x86 Linux systems, and hence Jellyfin is not supported on the `i386` architecture.

:::

1. Install HTTPS transport for APT if you haven't already:

    ```sh
    sudo apt install apt-transport-https
    ```

1. Enable the Universe repository to obtain all the FFMpeg dependencies:

    ```sh
    sudo add-apt-repository universe
    ```

:::note

If the above command fails you will need to install the following package `software-properties-common`.
This can be achieved with the following command `sudo apt-get install software-properties-common`

:::

1. Import the GPG signing key (signed by the Jellyfin Team):

    ```sh
    wget -O - https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | sudo apt-key add -
    ```

1. Add a repository configuration at `/etc/apt/sources.list.d/jellyfin.list`:

    ```sh
    echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/ubuntu $( lsb_release -c -s ) main" | sudo tee /etc/apt/sources.list.d/jellyfin.list
    ```

:::note

Supported releases are `xenial`, `bionic`, `cosmic`, `disco`, `eoan`, and `focal`.

:::

1. Update APT repositories:

    ```sh
    sudo apt update
    ```

1. Install Jellyfin:

    ```sh
    sudo apt install jellyfin
    ```

1. Manage the Jellyfin system service with your tool of choice:

    ```sh
    sudo service jellyfin status
    sudo systemctl restart jellyfin
    sudo /etc/init.d/jellyfin stop
    ```

#### Ubuntu Packages

Raw Ubuntu packages, including old versions, are available [here](https://jellyfin.org/downloads/#ubuntu).

:::note

The repository is the preferred way to install Jellyfin on Ubuntu, as it contains several dependencies as well.

:::

1. Enable the Universe repository to obtain all the FFMpeg dependencies, and update repositories:

    ```sh
    sudo add-apt-repository universe
    sudo apt update
    ```

1. Download the desired `jellyfin` and `jellyfin-ffmpeg` `.deb` packages from the repository.

1. Install the required dependencies:

    ```sh
    sudo apt install at libsqlite3-0 libfontconfig1 libfreetype6 libssl1.0.0
    ```

1. Install the downloaded `.deb` packages:

    ```sh
    sudo dpkg -i jellyfin_*.deb jellyfin-ffmpeg_*.deb
    ```

1. Use `apt` to install any missing dependencies:

    ```sh
    sudo apt -f install
    ```

1. Manage the Jellyfin system service with your tool of choice:

    ```sh
    sudo service jellyfin status
    sudo systemctl restart jellyfin
    sudo /etc/init.d/jellyfin stop
    ```

#### Migrating native Debuntu install to docker

It's possible to map your local installation's files to the official docker image.

:::note

You need to have exactly matching paths for your files inside the docker container! This means that if your media is stored at `/media/raid/` this path needs to be accessible at `/media/raid/` inside the docker container too - the configurations below do include examples.

:::

To guarantee proper permissions, get the `uid` and `gid` of your local jellyfin user and jellyfin group by running the following command:

   ```sh
      id jellyfin
   ```

You  need to replace the `<uid>:<gid>` placeholder below with the correct values.

**Using docker**

   ```sh
   docker run -d \
       --user <uid>:<gid> \
       -e JELLYFIN_CACHE_DIR=/var/cache/jellyfin \
       -e JELLYFIN_CONFIG_DIR=/etc/jellyfin \
       -e JELLYFIN_DATA_DIR=/var/lib/jellyfin \
       -e JELLYFIN_LOG_DIR=/var/log/jellyfin \
       --volume </path/to/media>:</path/to/media> \
       --net=host \
       --restart=unless-stopped \
       jellyfin/jellyfin
   ```

**Using docker-compose**

   ```yml
   version: "3"
   services:
     jellyfin:
       image: jellyfin/jellyfin
       user: <uid>:<gid>
       network_mode: "host"
       restart: "unless-stopped"
       environment:
         - JELLYFIN_CACHE_DIR=/var/cache/jellyfin
         - JELLYFIN_CONFIG_DIR=/etc/jellyfin
         - JELLYFIN_DATA_DIR=/var/lib/jellyfin
         - JELLYFIN_LOG_DIR=/var/log/jellyfin
       volumes:
         - /etc/jellyfin:/etc/jellyfin
         - /var/cache/jellyfin:/var/cache/jellyfin
         - /var/lib/jellyfin:/var/lib/jellyfin
         - /var/log/jellyfin:/var/log/jellyfin
         - <path-to-media>:<path-to-media>
   ```

## Synology

For [Synology](https://www.synology.com/en-us/dsm), Jellyfin is installed using Docker.

![Installing ynology](/img/docs/install-synology-1.png)

![Installing Synology](/img/docs/install-synology-2.png)

![Installing Synology](/img/docs/install-synology-3.png)

Create the container.

![Installing Synology](/img/docs/install-synology-4.png)

![Installing Synology](/img/docs/install-synology-5.png)

Use Advanced Settings to add mount points to your media and config.

![Installing Synology](/img/docs/install-synology-6.png)

![Installing Synology](/img/docs/install-synology-7.png)

Host Mode is required for HdHR and DLNA. Use bridge mode if running multiple instances.

![Installing Synology](/img/docs/install-synology-8.png)

![Installing Synology](/img/docs/install-synology-9.png)

Browse to `http://SERVER_IP:8096` to access the web client.
