---
uid: testing-macos
title: macOS
description: Test unstable builds on macOS.
sidebar_position: 2
---

# Test unstable builds on macOS

Testing unstable builds requires you to not be afraid of using the command line.

Before running the unstable builds, make sure to backup your current data from the following folders:

```shell
~/.config/jellyfin/
~/.local/share/jellyfin/
~/Library/Application Support/Jellyfin/
```

## Get Unstable Server

Unlike the stable releases, the unstable builds for macOS do not come with a packaged installer or application. Instead, they have to be ran from the command line.

The latest unstable builds for packaged jellyfin can be obtained [here](https://repo.jellyfin.org/?path=/server/macos/latest-unstable).

Intel Macs should download the `AMD64` binaries.

Apple Silicon Macs should download the `ARM64` binaries.

There is no difference in content between the `tar.gz` and the `tar.xz` archives. They are only compressed in different formats and either one will work.

## Get Jellyfin FFmpeg

The unstable builds don't come with FFmpeg bundled. Instead, the binaries have to be downloaded separately.

Jellyfin's custom FFmpeg is available [here](https://repo.jellyfin.org/?path=/ffmpeg/macos).

Select the version corresponding to the unstable version of the server.

## Prepare The Unstable Server and FFmpeg

After downloading both the server and FFmpeg, extract them to a folder you like. Before running, the quarantine flag needs to be removed and an ad-hoc signature needs to be created for the binaries.

Open a command line interface. You can use the `Terminal.app` come with macOS, then run following commands:

```shell
cd /path/to/jellyfin
xattr -rd com.apple.quarantine .
codesign -fs - --deep jellyfin
```

Similarly, the quarantine flag needs to be removed from `ffmpeg` and `ffprobe` as well. We don't need to sign them manually, as the ad-hoc signature will be created automatically on first run:

```shell
cd /path/to/jellyfin-ffmpeg
xattr -rd com.apple.quarantine .
```

## Run The Unstable Server

At this point, the binaries should be ready for testing. Run the following command in a terminal to start Jellyfin:

```shell
/path/to/jellyfin-folder/jellyfin --ffmpeg /path/to/ffmpeg-folder/ffmpeg
```

After running the command, Jellyfin should startup in the terminal window.

To stop Jellyfin, press `CONTROL+C` in the terminal window, and Jellyfin will shutdown gracefully.
Closing the terminal window will also stop Jellyfin.
