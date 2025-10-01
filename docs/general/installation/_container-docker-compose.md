<!-- markdownlint-disable MD041 -->

:::warning

If you wish to use Windows or macOS, please install Jellyfin natively instead. [Windows](/docs/general/installation/windows) [macOS](/docs/general/installation/macos).

While it is possible to run Jellyfin in Docker on a Windows or macOS host, it is NOT supported. Some features are known to be broken when running in Docker on platforms other than Linux, Notably:

- Hardware Accelerated Transcoding
- [Scanning on macOS in Docker](https://github.com/jellyfin/jellyfin/issues/13093)

You WILL NOT receive any support for running Jellyfin in Docker on platforms other than Linux.

:::

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
