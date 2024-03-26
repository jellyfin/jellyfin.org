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
- Intel Macs: https://repo.jellyfin.org/?path=/server/macos/latest-unstable/amd64
- Apple Silicon Macs: https://repo.jellyfin.org/?path=/server/macos/latest-unstable/arm64

There is no difference in content between the `tar.gz` and the `tar.xz` archives; they are only compressed in different formats. Either one will work.

## Get Jellyfin FFmpeg

The unstable version doesn't come with FFmpeg by default, so you need to obtain FFmpeg manually.

Jellyfin's custom FFmpeg is available here: https://repo.jellyfin.org/?path=/ffmpeg/macos

Select the version corresponding to the unstable version of the server.

Intel Macs should download the `AMD64` binaries.

Apple Silicon Macs should download the `ARM64` binaries.

## Prepare The Unstable Server

After you have downloaded both the server and FFmpeg, you should extract them in a folder you like.

Before running, we need to remove quarantine flag and do an ad-hoc sign to the server binaries:

1. Open a command line interface. You can use the `Terminal.app` come with macOS.
2. Type `cd` then a space(` `), then drag the folder contains unstable jellyfin server into the terminal window, then press enter.
    - The command line prompt should look like this before you press enter:
  ```
  cd /path/to/jellyfin
  ```
3. Then type `xattr -rd com.apple.quarantine .`, then press enter.
    - Be careful typing/coping this command. There is a `.` at the end.
4. Then type `codesign -fs - --deep jellyfin`, then press enter.
  - If the command line complains about `jellyfin: No such file or directory`, then you dragged the wrong folder.

## Prepare The FFmpeg

We also need to perform the similar thing to our ffmpeg binaries, but this time we only have to remove the quarantine flag as the ad-hoc signature will be automatically created on first launch.

1. Open another command line interface for convenience. You can use the `Terminal.app` come with macOS.
2. Type `cd` then a space(` `), then drag the folder contains jellyfin-ffmpeg into the terminal window, then press enter.
    - The command line prompt should look like this before you press enter:
```
cd /path/to/jellyfin-ffmpeg
```
3. Then type `xattr -rd com.apple.quarantine .`, then press enter.
    - Be careful typing/coping this command. There is a `.` at the end.

## Run The Unstable Server

At this point, you should be able to run unstable jellyfin with the specified ffmpeg:

- Open a new command line window and drag the folder containing the unstable Jellyfin server into it.
- Use backspace to remove the trailing space automatically added by the terminal, then type `/jellyfin --ffmpeg`, followed by a space (` `).
- Drag the `ffmpeg` file (not the folder containing it) into the command line window. Ensure that both `ffmpeg` and `ffprobe` are located at the same folder.

The command line prompt now should look like this:

```
/path/to/jellyfin-folder/jellyfin --ffmpeg /path/to/ffmpeg-folder/ffmpeg
```

After pressing enter, you should see Jellyfin up and running, with logs appearing in the console.

To stop it, you press `CTRL+C` in the terminal window.
Closing the terminal window will also stop Jellyfin.

