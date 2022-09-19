---
uid: admin-installing
title: Installing Jellyfin
---

<!-- markdownlint-disable MD036 no-emphasis-as-heading -->

# Installing <!-- omit in toc -->

The Jellyfin project and its contributors offer a number of pre-built binary packages to assist in getting Jellyfin up and running quickly on multiple systems.

## Container images

Official container image: `jellyfin/jellyfin` <a href="https://hub.docker.com/r/jellyfin/jellyfin"><img alt="Docker Pull Count" src="https://img.shields.io/docker/pulls/jellyfin/jellyfin.svg" /></a>.

LinuxServer.io image: `linuxserver/jellyfin` <a href="https://hub.docker.com/r/linuxserver/jellyfin"><img alt="Docker Pull Count" src="https://img.shields.io/docker/pulls/linuxserver/jellyfin.svg" /></a>.

hotio image: `hotio/jellyfin` <a href="https://hub.docker.com/r/hotio/jellyfin"><img alt="Docker Pull Count" src="https://img.shields.io/docker/pulls/hotio/jellyfin.svg" /></a>.

Jellyfin distributes [official container images on Docker Hub](https://hub.docker.com/r/jellyfin/jellyfin/) for multiple architectures.
These images are based on Debian and [built directly from the Jellyfin source code](https://github.com/jellyfin/jellyfin/blob/master/Dockerfile).

Additionally the [LinuxServer.io](https://www.linuxserver.io/) project and [hotio](https://github.com/hotio) distribute images based on Ubuntu and the official Jellyfin Ubuntu binary packages, see [here](https://github.com/linuxserver/docker-jellyfin/blob/master/Dockerfile) and [here](https://github.com/hotio/jellyfin/blob/release/linux-amd64.Dockerfile) to see their Dockerfile.

:::note

For ARM hardware and RPi, it is recommended to use the LinuxServer.io or hotio image since hardware acceleration support is not yet available on the native image.

:::

### Docker

[Docker](https://www.docker.com/) allows you to run containers on Linux, Windows and MacOS.

The basic steps to create and run a Jellyfin container using Docker are as follows.

1. Follow the [official installation guide to install Docker](https://docs.docker.com/engine/install).

2. Download the latest container image.

   ```sh
   docker pull jellyfin/jellyfin
   ```

3. Create persistent storage for configuration and cache data.

   Either create two directories on the host and use bind mounts:

   ```sh
   mkdir /path/to/config
   mkdir /path/to/cache
   ```

   Or create two persistent volumes:

   ```sh
   docker volume create jellyfin-config
   docker volume create jellyfin-cache
   ```

4. Create and run a container in one of the following ways.

:::note

The default network mode for Docker is bridge mode. Bridge mode will be used if host mode is omitted.
Using host networking (`--net=host`) is optional but required in order to use DLNA.

:::

**Using Docker command line interface:**

```sh
docker run -d \
 --name jellyfin \
 --user uid:gid \
 --net=host \
 --volume /path/to/config:/config \ # Alternatively --volume jellyfin-config:/config
 --volume /path/to/cache:/cache \ # Alternatively --volume jellyfin-cache:/cache
 --mount type=bind,source=/path/to/media,target=/media \
 --restart=unless-stopped \
 jellyfin/jellyfin
```

Bind Mounts are needed to pass folders from the host OS to the container OS whereas volumes are maintained by Docker and can be considered easier to backup and control by external programs.
For a simple setup, it's considered easier to use Bind Mounts instead of volumes.
Multiple media libraries can be bind mounted if needed:

```sh
--mount type=bind,source=/path/to/media1,target=/media1
--mount type=bind,source=/path/to/media2,target=/media2,readonly
...etc
```

:::note

There is currently an [issue](https://github.com/docker/for-linux/issues/788) with read-only mounts in Docker.
If there are submounts within the main mount, the submounts are read-write capable.

:::

**Using Docker Compose:**

Create a `docker-compose.yml` file with the following contents:

```yml
version: '3.5'
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    user: uid:gid
    network_mode: 'host'
    volumes:
      - /path/to/config:/config
      - /path/to/cache:/cache
      - /path/to/media:/media
      - /path/to/media2:/media2:ro
    restart: 'unless-stopped'
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

1. Open the unRaid GUI (at least unRaid 6.5) and click on the `Docker` tab.

2. Add the following line under "Template Repositories" and save the options.

   ```data
   https://github.com/jellyfin/jellyfin/blob/master/deployment/unraid/docker-templates
   ```

3. Click "Add Container" and select "jellyfin".

4. Adjust any required paths and save your changes.

### Kubernetes

A community project to deploy Jellyfin on Kubernetes-based platforms exists [at their repository](https://github.com/home-cluster/jellyfin-openshift).
Any issues or feature requests related to deployment on Kubernetes-based platforms should be filed there.

### Podman

[Podman](https://podman.io) allows you to run rootless containers.
It's also the officially supported container solution on Fedora Linux and its derivatives such as CentOS Stream and RHEL.
Steps to run Jellyfin using Podman are similar to the Docker steps.

1. Install Podman:

   ```sh
   sudo dnf install -y podman
   ```

2. Create and run a Jellyfin container:

   ```sh
   podman run \
    --detach \
    --label "io.containers.autoupdate=registry" \
    --name myjellyfin \
    --publish 8096:8096/tcp \
    --rm \
    --user $(id -u):$(id -g) \
    --userns keep-id \
    --volume jellyfin-cache:/cache:Z \
    --volume jellyfin-config:/config:Z \
    --mount type=bind,source=/path/to/media,destination=/media,ro=true \
    docker.io/jellyfin/jellyfin:latest
   ```

3. Open the necessary ports in your machine's firewall if you wish to permit access to the Jellyfin server from outside the host.
   This is not done automatically when using rootless Podman.
   If your distribution uses `firewalld`, the following commands save and load a new firewall rule opening the HTTP port `8096` for TCP connections.

   ```sh
   sudo firewall-cmd --add-port=8096/tcp --permanent
   sudo firewall-cmd --reload
   ```

Podman doesn't require root access to run containers, although there are some details to be mindful of; see [the relevant documentation](https://docs.podman.io/en/latest/markdown/podman.1.html#rootless-mode).
For security, the Jellyfin container should be run using rootless Podman.
Furthermore, it is safer to run as a non-root user within the container.
The `--user` option will run with the provided user id and group id _inside_ the container.
The `--userns keep-id` flag ensures that current user's id is mapped to the non-root user's id inside the container.
This ensures that the permissions for directories bind-mounted inside the container are mapped correctly between the user running Podman and the user running Jellyfin inside the container.

Keep in mind that the `--label "io.containers.autoupdate=image"` flag will allow the container to be automatically updated via `podman auto-update`.

The `z` (shared volume) or `Z` (private volume) volume option tells Podman to relabel files inside the volumes as appropriate, for systems running SELinux.

Replace `jellyfin-config` and `jellyfin-cache` with `/path/to/config` and `/path/to/cache` if you wish to use bind mounts.

This example mounts your media library read-only by setting `ro=true`; set this to `ro=false` if you wish to give Jellyfin write access to your media.

#### Managing via Systemd

To run as a systemd service see [Running containers with Podman and shareable systemd services](https://www.redhat.com/sysadmin/podman-shareable-systemd-services).

As always it is recommended to run the container rootless. Therefore we want to manage the container with the `systemd --user` flag.

1. First we have to generate the container as seen above.

2. Next generate the systemd.service file.

   ```sh
   podman generate systemd --new --name myjellyfin > ~/.config/systemd/user/container-myjellyfin.service
   ```

3. Verify and edit the systemd.service file to your liking.
   To further sandbox see [Mastering systemd: Securing and sandboxing applications and services](https://www.redhat.com/sysadmin/mastering-systemd).
   An example service file is shown below. **Do not blindly copy**, one should make edits to the service file generated by podman.

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

4. Stop the running Jellyfin container.

   ```sh
   podman stop myjellyfin
   ```

5. Start and enable the service.

   ```sh
   systemctl --user enable --now container-myjellyfin.service
   ```

   At this point the container will only start when the user logs in and shutdown when they log off.
   To have the container start as the user at first login we'll have to include one more option.

   ```sh
   loginctl enable-linger $USER
   ```

6. To enable Podman auto-updates, enable the necessary systemd timer.

   ```sh
   systemctl --user enable --now podman-auto-update.timer
   ```

### Cloudron

Cloudron is a complete solution for running apps on your server and keeping them up-to-date and secure.
On your Cloudron you can install Jellyfin with a few clicks via the [app library](https://cloudron.io/store/org.jellyfin.cloudronapp.html) and updates are delivered automatically.

The source code for the package can be found [here](https://git.cloudron.io/cloudron/jellyfin-app).
Any issues or feature requests related to deployment on Cloudron should be filed there.

## Windows (x64)

Windows installers and builds in ZIP archive format are available [here](/downloads/windows).

:::caution

If you installed a version prior to 10.4.0 using a PowerShell script, you will need to manually remove the service using the command `nssm remove Jellyfin` and uninstall the server by remove all the files manually.
Also one might need to move the data files to the correct location, or point the installer at the old location.

:::

:::caution

The Basic Install is the recommended way to run the Jellyfin Server.
Using the Advanced/Service mode may experience FFmpeg hardware acceleration issues and is only for advanced users.

:::

### Install using Installer (x64)

**Install**

1. Download the latest version.
2. Run the installer.
3. (Optional) When installing as a service (not recommended), pick the service account type.
4. If everything was completed successfully, Jellyfin is now running.
5. Open your browser at <http://your_local_IP_address:8096> to finish setting up Jellyfin.

**Update**

1. Download the latest version.
2. Close or Stop Jellyfin if it is running.
3. Run the installer.
4. If everything was completed successfully, the new version is installed.

**Uninstall**

1. Go to `Add or remove programs` in Windows.
2. Search for Jellyfin.
3. Click Uninstall.

### Manual Installation (x86/x64)

**Install**

1. Download and extract the latest version.
2. Create a folder `jellyfin` at your preferred install location.
3. Copy the extracted folder into the `jellyfin` folder and rename it to `system`.
4. Create `jellyfin.bat` within your `jellyfin` folder containing:

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

5. Run

   ```cmd
   jellyfin.bat
   ```

6. Open your browser at `http://<--Server-IP-->:8096` (if auto-start of webapp is disabled)

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

## macOS

macOS Application packages and builds in TAR archive format are available [here](/downloads/macos).

**Install**

1. Download the latest version.
2. Drag the `.app` package into the Applications folder.
3. Start the application.
4. Click the icon in the menu bar and select "Launch Web UI".

**Upgrade**

1. Download the latest version.
2. Stop the currently running server either via the dashboard or using the menu bar icon.
3. Drag the new `.app` package into the Applications folder and click yes to replace the files.
4. Start the application.

**Uninstall**

1. Stop the currently running server either via the dashboard or using the application icon.
2. Move the `.app` package to the trash.

**Deleting Configuration**

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

Generic amd64, arm64, and armhf Linux builds in TAR archive format are available [here](/downloads/linux).

#### Base Installation Process

Create a directory in `/opt` for jellyfin and its files, and enter that directory.

```sh
sudo mkdir /opt/jellyfin
cd /opt/jellyfin
```

Download the latest generic Linux build for your architecture.
The rest of these instructions assume version 10.7.7 is being installed (i.e. `jellyfin_10.7.7_amd64.tar.gz`).
Download the generic build, then extract the archive:

```sh
sudo wget https://repo.jellyfin.org/releases/server/linux/stable/combined/jellyfin_10.7.7_amd64.tar.gz
sudo tar xvzf jellyfin_10.7.7_amd64.tar.gz
```

Create a symbolic link to the Jellyfin 10.7.7 directory.
This allows an upgrade by repeating the above steps and enabling it by simply re-creating the symbolic link to the new version.

```sh
sudo ln -s jellyfin_10.7.7 jellyfin
```

Create four sub-directories for Jellyfin data.

```sh
sudo mkdir data cache config log
```

#### `ffmpeg` Installation

If you are not running a Debian derivative, install `ffmpeg` through your OS's package manager, and skip this section.

:::caution

Not being able to use `jellyfin-ffmpeg` will most likely break hardware acceleration and tonemapping.

:::

If you are running Debian or a derivative, you should [download](https://repo.jellyfin.org/releases/server/debian/versions/jellyfin-ffmpeg/) and install an `ffmpeg` release built specifically for Jellyfin.
Be sure to download the latest release that matches your OS (4.4.1-1 for Debian Bullseye assumed below).

```sh
sudo wget https://repo.jellyfin.org/releases/server/debian/versions/jellyfin-ffmpeg/4.4.1-1/jellyfin-ffmpeg_4.4.1-1-bullseye_amd64.deb
sudo dpkg --install jellyfin-ffmpeg_4.4.1-1-bullseye_amd64.deb
```

If you run into any dependency errors, run this and it will install them and `jellyfin-ffmpeg`.

```sh
sudo apt install -f
```

#### Running Jellyfin

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

##### Starting Jellyfin on boot (optional)

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

### Portable DLL

Platform-agnostic .NET Core DLL builds in TAR archive format are available [here](/downloads#portable).
These builds use the binary `jellyfin.dll` and must be loaded with `dotnet`.

### Arch Linux

Jellyfin can be found in the AUR as [`jellyfin`](https://aur.archlinux.org/packages/jellyfin/), [`jellyfin-bin`](https://aur.archlinux.org/packages/jellyfin-bin/) and [`jellyfin-git`](https://aur.archlinux.org/packages/jellyfin-git/).

### Fedora

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

### CentOS

CentOS/RHEL 7 builds in RPM package format are available [here](/downloads/linux#fedora-centos) and an official CentOS/RHEL repository is planned for the future.

The default CentOS/RHEL repositories don't provide FFmpeg, which the RPM requires. You will need to add a third-party repository which provide FFmpeg, such as [RPM Fusion's Free repository](https://rpmfusion.org/Configuration).

You can also build [Jellyfin's version](https://github.com/jellyfin/jellyfin-ffmpeg) on your own. This includes gathering the dependencies and compiling and installing them. Instructions can be found at [the FFmpeg wiki](https://trac.ffmpeg.org/wiki/CompilationGuide/Centos).

### Debian

#### Repository

The Jellyfin team provides a Debian repository for installation on Debian Buster/Bullseye.
Supported architectures are `amd64`, `arm64`, and `armhf`.

:::note

Microsoft does not provide a .NET for 32-bit x86 Linux systems, and hence Jellyfin is **not** supported on the `i386` architecture.

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

2. Import the GPG signing key (signed by the Jellyfin Team):

   ```sh
   curl -fsSL https://repo.jellyfin.org/debian/jellyfin_team.gpg.key | gpg --dearmor -o /etc/apt/trusted.gpg.d/debian-jellyfin.gpg
   ```

3. Add a repository configuration at `/etc/apt/sources.list.d/jellyfin.list`:

   ```sh
   echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/debian $( lsb_release -c -s ) main" | sudo tee /etc/apt/sources.list.d/jellyfin.list
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

#### Packages

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

### Ubuntu

#### Migrating to the new repository

Previous versions of Jellyfin included Ubuntu under the Debian repository.
This has now been split out into its own repository to better handle the separate binary packages.
If you encounter errors about the `ubuntu` release not being found and you previously configured an `ubuntu` `jellyfin.list` file, please follow these steps.

1. Remove the old `/etc/apt/sources.list.d/jellyfin.list` file:

   ```sh
   sudo rm /etc/apt/sources.list.d/jellyfin.list
   ```

2. Proceed with the following section as written.

#### Ubuntu Repository

The Jellyfin team provides an Ubuntu repository for installation on Ubuntu Xenial, Bionic, Cosmic, Disco, Eoan, and Focal. Supported architectures are `amd64`, `arm64`, and `armhf`.
Only `amd64` is supported on Ubuntu Xenial.

:::note

Microsoft does not provide a .NET for 32-bit x86 Linux systems, and hence Jellyfin is **not** supported on the `i386` architecture.

:::

1. Install HTTPS transport for APT if you haven't already:

   ```sh
   sudo apt install apt-transport-https
   ```

2. Enable the Universe repository to obtain all the FFMpeg dependencies:

   ```sh
   sudo add-apt-repository universe
   ```

   :::note

   If the above command fails you will need to install the following package `software-properties-common`.
   This can be achieved with the following command `sudo apt-get install software-properties-common`

   :::

3. Import the GPG signing key (signed by the Jellyfin Team):

   ```sh
   curl -fsSL https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/debian-jellyfin.gpg
   ```

4. Add a repository configuration at `/etc/apt/sources.list.d/jellyfin.list`:

   ```sh
   echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/ubuntu $( lsb_release -c -s ) main" | sudo tee /etc/apt/sources.list.d/jellyfin.list
   ```

   :::note

   Supported releases are `bionic`, `cosmic`, `disco`, `eoan`, and `focal`.

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

#### Ubuntu Packages

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
