<!-- markdownlint-disable MD041 -->

[Docker](https://www.docker.com/) allows you to run containers on Linux, Windows and MacOS.

:::warning

If you wish to use Windows or macOS, please install Jellyfin natively instead. [Windows](/docs/general/installation/windows) [macOS](/docs/general/installation/macos).

While it is possible to run Jellyfin in Docker on a Windows or macOS host, it is NOT supported. Some features are known to be broken when running in Docker on platforms other than Linux, Notably:

- Hardware Accelerated Transcoding
- [Scanning on macOS in Docker](https://github.com/jellyfin/jellyfin/issues/13093)

You WILL NOT receive any support for running Jellyfin in Docker on platforms other than Linux.

:::

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
