---
uid: installation-container
title: Container
description: Install as a container using Docker, Podman and others.
sidebar_position: 4
---

<!-- markdownlint-disable MD036 no-emphasis-as-heading -->

## Container images

Official container image: `jellyfin/jellyfin` [![jellyfin Docker Pull Count](https://img.shields.io/docker/pulls/jellyfin/jellyfin.svg)](https://hub.docker.com/r/jellyfin/jellyfin).  
This image is also published on the GitHub Container Registry: `ghcr.io/jellyfin/jellyfin`.

LinuxServer.io image: `linuxserver/jellyfin` [![linuxserver jellyfin Docker Pull Count](https://img.shields.io/docker/pulls/linuxserver/jellyfin.svg)](https://hub.docker.com/r/linuxserver/jellyfin).

hotio image: `ghcr.io/hotio/jellyfin`.

Jellyfin distributes official container images on [Docker Hub](https://hub.docker.com/r/jellyfin/jellyfin/) and the [GitHub Container Registry](https://ghcr.io/jellyfin/jellyfin) for multiple architectures.
These images are based on Debian and [built directly from the Jellyfin source code](https://github.com/jellyfin/jellyfin-packaging/blob/master/docker/Dockerfile).

Additionally, there are several third parties providing unofficial container images, including the [LinuxServer.io](https://www.linuxserver.io/) ([Dockerfile](https://github.com/linuxserver/docker-jellyfin/blob/master/Dockerfile)) project and [hotio](https://github.com/hotio) ([Dockerfile](https://github.com/hotio/jellyfin/blob/release/linux-amd64.Dockerfile)), which offer images based on Ubuntu and the official Jellyfin Ubuntu binary packages.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation Instructions

<Tabs>
<TabItem value="docker-cli" label="Docker">

import dockercli from './\_container-docker-cli.md';

<dockercli />

</TabItem>
<TabItem value="docker-compose" label="Docker Compose" default>

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

</TabItem>
<TabItem value="podman-run" label="Podman">

[Podman](https://podman.io) allows you to run rootless containers.
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

<details>
<summary>Managing via systemd</summary>

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

   ```ini
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

</details>
<details>
<summary>Using hardware acceleration</summary>

To use hardware acceleration, you need to allow the container to access the render device. If you are using container-selinux-2.226 or later, you have to set the `container_use_dri_devices` flag in selinux or the container will not be able to use it:

`sudo setsebool -P container_use_dri_devices 1`

On older versions of container-selinux, you have to disable the selinux confinement for the container by adding `--security-opt label=disable` to the podman command.

Then, you need to mount the render device inside the container:

`--device /dev/dri/:/dev/dri/`

Finally, you need to set the `--device` flag for the container to use the render device:

`--device /dev/dri/`

Podman run example:

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

systemd example:

```ini
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

</details>
<details>
<summary>Vendor-specific configuration</summary>

Additional configuration steps may be required depending on your GPU vendor. Check the [Hardware Acceleration](/docs/general/post-install/transcoding/hardware-acceleration) section.

</details>
</TabItem>
</Tabs>
