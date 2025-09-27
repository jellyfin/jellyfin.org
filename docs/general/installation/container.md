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

## Installation Instructions

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DockerCli from './\_container-docker-cli.md';
import DockerCompose from './\_container-docker-compose.md';
import Podman from './\_container-podman.md';

<Tabs queryString="method">
<TabItem value="docker-cli" label="Docker">

<DockerCli />

</TabItem>
<TabItem value="docker-compose" label="Docker Compose" default>

<DockerCompose />

</TabItem>
<TabItem value="podman" label="Podman">

<Podman />

</TabItem>
</Tabs>

The above configuration uses a so-called bridge network, which causes the source IP address of client connections to appear as the bridge gateway rather than the actual client.
To preserve correct client IP information, Jellyfin must be configured to treat the bridge network as a known proxy.
Detailed instructions can be found on our [reverse proxy guide](../post-install/networking/8_reverse-proxy/index.md).
