---
uid: testing-macos
title: macOS
description: Test unstable builds on macOS.
sidebar_position: 2
---

# Test unstable builds on macOS

Testing unstable builds requires you to be confident with the command line, or at least not afraid of it.

## Get Unstable Server

Unlike the release version, the unstable builds for macOS will not come with a packaged DMG or application. Instead, you have to run them from the command line.

The latest unstable builds for packaged jellyfin can be obtained here:

- [Intel Macs](https://repo.jellyfin.org/?path=/server/macos/latest-unstable/amd64)
- [Apple Silicon Macs](https://repo.jellyfin.org/?path=/server/macos/latest-unstable/arm64)

There is no difference in content between the `tar.gz` and the `tar.xz` archives; they are only compressed in different formats. Either one will work.

## Get Jellyfin FFmpeg

The unstable version doesn't come with FFmpeg by default, so you need to obtain FFmpeg manually.

Jellyfin's custom FFmpeg is available [here](https://repo.jellyfin.org/?path=/ffmpeg/macos).

Select the version corresponding to the unstable version of the server.

Intel Macs should download the `AMD64` binaries.

Apple Silicon Macs should download the `ARM64` binaries.

## Prepare The Unstable Server

After you have downloaded both the server and FFmpeg, you should extract them in a folder you like.

Before running, we need to remove quarantine flag and do an ad-hoc sign to the server binaries:

Open a command line interface. You can use the `Terminal.app` come with macOS, then run following commands:

```shell
cd /path/to/jellyfin
xattr -rd com.apple.quarantine .
codesign -fs - --deep jellyfin
```

## Prepare The FFmpeg

We also need to perform the similar thing to our ffmpeg binaries, but this time we only have to remove the quarantine flag as the ad-hoc signature will be automatically created on first launch.

Open another command line interface, then run the following commands:

```shell
cd /path/to/jellyfin-ffmpeg
xattr -rd com.apple.quarantine .
```

## Run The Unstable Server

At this point, you should be able to run unstable jellyfin with the specified ffmpeg in the command line:

```shell
/path/to/jellyfin-folder/jellyfin --ffmpeg /path/to/ffmpeg-folder/ffmpeg
```

After pressing enter, you should see Jellyfin up and running, with logs appearing in the console.

To stop it, you press `CTRL+C` in the terminal window.
Closing the terminal window will also stop Jellyfin.
