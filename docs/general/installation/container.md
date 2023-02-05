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

Additionally the [LinuxServer.io](https://www.linuxserver.io/) project and [hotio](https://github.com/hotio) distribute images based on Ubuntu and the official Jellyfin Ubuntu binary packages, see [here](https://github.com/linuxserver/docker-jellyfin/blob/master/Dockerfile) and [here](https://github.com/hotio/jellyfin/blob/release/linux-amd64.Dockerfile) to see their Dockerfile.

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

:::note

There is currently an [issue](https://github.com/docker/for-linux/issues/788) with read-only mounts in Docker.
If there are submounts within the main mount, the submounts are read-write capable.

:::

### Using Docker Compose

Create a `docker-compose.yml` file with the following contents. Add in the UID and GID that you would like to run jellyfin as in the user line below, or remove the user line to use the default (root).

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
    # Optional - may be necessary for docker healthcheck to pass if running in host network mode
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

Then while in the same folder as the `docker-compose.yml` run:

```sh
docker compose up
```

To run the container in background add `-d` to the above command.

You can learn more about using Docker by [reading the official Docker documentation](https://docs.docker.com/).

## Unraid Docker

An Unraid Docker template is available in the repository.

1. Open the unRaid GUI (at least unRaid 6.5) and click on the `Docker` tab.

2. Add the following line under "Template Repositories" and save the options.

   ```data
   https://github.com/jellyfin/jellyfin/blob/master/deployment/unraid/docker-templates
   ```

3. Click "Add Container" and select "jellyfin".

4. Adjust any required paths and save your changes.

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

### Managing via Systemd

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

## TrueNAS SCALE / TrueCharts

Jellyfin is available as a [TrueNAS SCALE](https://www.truenas.org/) App inside the [TrueCharts](https://www.truecharts.org/) App Catalog with direct intergation into the GUI, no CLI needed. Direct support is available on the [TrueCharts Discord](https://discord.com/Js6xv9nGuU) and the source code is available on [GitHub](https://github.com/truecharts/charts).

1. Install the TrueCharts Catalog to TrueNAS SCALE, see [website](https://truecharts.org/manual/guides/Adding-TrueCharts) for more info.

   1. Go to Apps page from the top level SCALE menu
   2. Select Manage Catalogs tab on the Apps page
   3. Click Add Catalog
   4. After reading the iXsystems notice, click Continue and enter the required information:
      Name: truecharts
      Repository: https://github.com/truecharts/catalog
      Preferred Trains: enterprise and stable
      Branch: main
   5. Click Save and allow SCALE to refresh its catalog with TrueCharts (this may take a few minutes)

2. Click `Available Applications` and search for `Jellyfin`

3. Click `Install`, which will take you to the GUI Wizard and you'll be able to fill out the necessary info

   - Server URL to publish in UDP Auto Discovery response.
   - Networking, Ingress (Reverse Proxy), Security Options
   - Adding Storage (for media folders) is also a standalone guide available in the [TrueCharts documentation](https://truecharts.org/manual/guides/add-storage). For Jellyfin the recommendation is to  add storage as `Additional App Storage`
   
4. Click Save and once it's up and running you'll be able to click Open to access `Jellyfin`.
