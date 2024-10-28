---
uid: installation-container
title: Container
description: Install as a container using Docker, Podman and others.
sidebar_position: 1
---

<!-- markdownlint-disable MD036 no-emphasis-as-heading -->

## Container images

Official container image: `jellyfin/jellyfin` <a href="https://hub.docker.com/r/jellyfin/jellyfin"><img alt="Docker Pull Count" src="https://img.shields.io/docker/pulls/jellyfin/jellyfin.svg" /></a>.

LinuxServer.io image: `linuxserver/jellyfin` <a href="https://hub.docker.com/r/linuxserver/jellyfin"><img alt="Docker Pull Count" src="https://img.shields.io/docker/pulls/linuxserver/jellyfin.svg" /></a>.

hotio image: `hotio/jellyfin` <a href="https://hub.docker.com/r/hotio/jellyfin"><img alt="Docker Pull Count" src="https://img.shields.io/docker/pulls/hotio/jellyfin.svg" /></a>.

Jellyfin distributes [official container images on Docker Hub](https://hub.docker.com/r/jellyfin/jellyfin/) for multiple architectures.
These images are based on Debian and [built directly from the Jellyfin source code](https://github.com/jellyfin/jellyfin/blob/master/Dockerfile).

Additionally, there are several third parties providing unofficial container images, including the [LinuxServer.io](https://www.linuxserver.io/) ([Dockerfile](https://github.com/linuxserver/docker-jellyfin/blob/master/Dockerfile)) project and [hotio](https://github.com/hotio) ([Dockerfile](https://github.com/hotio/jellyfin/blob/release/linux-amd64.Dockerfile)), which offer images based on Ubuntu and the official Jellyfin Ubuntu binary packages.

## Docker

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

Custom [server-side system fonts](/docs/general/administration/configuration/#server-side-system-fonts) directory can be optionally bind mounted in order to use these fonts during transcoding with subtitle burn-in:

```sh
--mount type=bind,source=/path/to/fonts,target=/usr/local/share/fonts/custom,readonly
```

A directory of [fallback fonts](/docs/general/administration/configuration/#fallback-fonts) can be mounted as well. In this case, you will have to set the directory of fallback fonts to `/fallback_fonts` in Jellyfin server settings panel:

```sh
--mount type=bind,source=/path/to/fallback/fonts,target=/fallback_fonts,readonly
```

### Using Docker Compose

Create a `docker-compose.yml` file with the following contents. Add in the UID and GID that you would like to run jellyfin as in the user line below, or remove the user line to use the default (root).

```yml
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    user: uid:gid
    network_mode: 'host'
    volumes:
      - /path/to/config:/config
      - /path/to/cache:/cache
      - type: bind
        source: /path/to/media
        target: /media
      - type: bind
        source: /path/to/media2
        target: /media2
        read_only: true
      # Optional - extra fonts to be used during transcoding with subtitle burn-in
      - type: bind
        source: /path/to/fonts
        target: /usr/local/share/fonts/custom
        read_only: true
    restart: 'unless-stopped'
    # Optional - alternative address used for autodiscovery
    environment:
      - JELLYFIN_PublishedServerUrl=http://example.com
    # Optional - may be necessary for docker healthcheck to pass if running in host network mode
    extra_hosts:
      - 'host.docker.internal:host-gateway'
```

Then while in the same folder as the `docker-compose.yml` run:

```sh
docker compose up
```

To run the container in background add `-d` to the above command.

You can learn more about using Docker by [reading the official Docker documentation](https://docs.docker.com/).

## Podman

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
    --mount type=bind,source=/path/to/media,destination=/media,ro=true,relabel=private \
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

The `z` (shared volume) or `Z` (private volume) volume option and `relabel=shared` or `relabel=private` mount option tell Podman to relabel files inside the volumes as appropriate, for systems running SELinux.

Replace `jellyfin-config` and `jellyfin-cache` with `/path/to/config` and `/path/to/cache` if you wish to use bind mounts.

This example mounts your media library read-only by setting `ro=true`; set this to `ro=false` if you wish to give Jellyfin write access to your media.

### Managing via Systemd

To run as a systemd service see [podman-systemd.unit](https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html).

As always it is recommended to run the container rootless. Therefore we want to manage the container with the `systemd --user` flag.

1. Create a new user that the rootless container will run under.

   `useradd jellyfin`

   This allows users who are not logged in to run long-running services.

   `loginctl enable-linger jellyfin`

   Open an interactive shell session.

   `machinectl shell jellyfin@`

2. Install `.config/containers/systemd/jellyfin.container`

   > Contents of `~/.config/containers/systemd/jellyfin.container`

   ```sh
   [Container]
   Image=docker.io/jellyfin/jellyfin:latest
   AutoUpdate=registry
   PublishPort=8096:8096/tcp
   UserNS=keep-id
   Volume=jellyfin-config:/config:Z
   Volume=jellyfin-cache:/cache:Z
   Volume=jellyfin-media:/media:Z

   [Service]
   # Inform systemd of additional exit status
   SuccessExitStatus=0 143

   [Install]
   # Start by default on boot
   WantedBy=default.target
   ```

3. Reload daemon and start the service.

   `systemctl --user daemon-reload`

   `systemctl --user start jellyfin`

4. To enable Podman auto-updates, enable the necessary systemd timer.

   `systemctl --user enable --now podman-auto-update.timer`

5. Optionally check logs for errors

   `journalctl --user -u jellyfin`

6. `exit` the current session.

### With hardware acceleration

To use hardware acceleration, you need to allow the container to access the render device. If you are using container-selinux-2.226 or later, you have to set the `container_use_dri_devices` flag in selinux or the container will not be able to use it:

`sudo setsebool -P container_use_dri_devices 1`

On older versions of container-selinux, you have to disable the selinux confinement for the container by adding `--security-opt label=disable` to the podman command.

Then, you need to mount the render device inside the container:

`--device /dev/dri/:/dev/dri/`

Finally, you need to set the `--device` flag for the container to use the render device:

`--device /dev/dri/`

#### podman run

```sh
   podman run \
    --detach \
    --label "io.containers.autoupdate=registry" \
    --name myjellyfin \
    --publish 8096:8096/tcp \
    --device /dev/dri/:/dev/dri/ \
    # --security-opt label=disable # Only needed for older versions of container-selinux < 2.226
    --rm \
    --user $(id -u):$(id -g) \
    --userns keep-id \
    --volume jellyfin-cache:/cache:Z \
    --volume jellyfin-config:/config:Z \
    --mount type=bind,source=/path/to/media,destination=/media,ro=true,relabel=private \
    docker.io/jellyfin/jellyfin:latest
```

#### systemd

```sh
[Unit]
Description=jellyfin

[Container]
Image=docker.io/jellyfin/jellyfin:latest
AutoUpdate=registry
PublishPort=8096:8096/tcp
UserNS=keep-id
#SecurityLabelDisable=true # Only needed for older versions of container-selinux < 2.226
AddDevice=/dev/dri/:/dev/dri/
Volume=jellyfin-config:/config:Z
Volume=jellyfin-cache:/cache:Z
Volume=jellyfin-media:/media:Z

[Service]
# Inform systemd of additional exit status
SuccessExitStatus=0 143

[Install]
# Start by default on boot
WantedBy=default.target
```

## TrueNAS SCALE

Jellyfin is available as a [TrueNAS SCALE](https://www.truenas.org/) App in the official app catalog with direct integration into the GUI, no CLI needed.

1. Go to Apps page from the top level SCALE menu

2. Click `Discover Apps` and search for `Jellyfin`

3. Click `Install`, which will take you to the GUI installation wizard and you'll be able to fill out the necessary info

   - Published Server URL to publish in UDP Auto Discovery response
   - User and Group Configuration: adjust only if needed, defaults to `568:568` which is `apps:apps` user/group
   - Network Configuration
     - Tick `Host Network` if DLNA is used, otherwise it's optional.
     - You may optionally change the `WebUI Port` to the Jellyfin's default of `8096` if it's not occupied already by another app.
   - Storage Configuraton
     - For `Jellyfin Config Storage` and `Jellyfin Cache Storage`, consider mapping Host Paths for ease of backup.
       - Store them on SSD storage if possible, as using HDD storage **will** lead to poor experience.
     - For `Jellyfin Transcode Storage`, consider using `Temporary` or `tmpfs`
       - `Temporary` places a Docker volume under your configured Apps dataset (`Apps` -> `Configuration` -> `Choose Pool`). Avoid if that's on HDD.
       - `tmpfs` creates a temporary directory on the RAM. Ensure you set the limit to at least a few gigabytes, and that you have considerate amount of spare memory, since TrueNAS disables swap by default. You may need to increase the limit if you have many large media files streamed with transcoding at once, or transcodes might fail. Note that total memory usage may also be capped in the `Resources Configuration` section.
       - If your only SSD storage is the boot drive, you may configure a Host Path mount to `/var/tmp/jellyfin_transcodes`.
     - For media, add your library directories as Additional Storage.
     - For hardware-accelerated transcoding, under the Resources Configuration:
       - If using NVIDIA, tick `Use this GPU` under your listed GPU. If you don't see your GPU, go to `Apps` -> `Configuration` -> `Settings` -> Install NVIDIA Drivers.
       - If using other vendors, tick `Passthrough available (non-NVIDIA) GPUs`.
       - Then in Jellyfin UI, configure it under `Dashboard` -> `Playback` -> `Transcoding`.
       - Note that [some newer Intel GPUs](/docs/general/administration/hardware-acceleration/known-issues#intel-on-linux) might require a newer kernel version than provided. If that's the case for your GPU, you may consider using a VM with PCIe pass-through instead of app containers.

4. Click `Install` and once it's up and running you'll be able to click `Web UI` button to access `Jellyfin`.

Additional documentation is available on [TrueNAS Documentation Hub](https://www.truenas.com/docs/truenasapps/communityapps/jellyfin/).
