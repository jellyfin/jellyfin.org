---
uid: installation-macos
title: macOS
description: Install on macOS.
sidebar_position: 6
---

<!-- markdownlint-disable MD036 no-emphasis-as-heading -->

# Install on macOS

macOS Application packages and builds in TAR archive format are available [here](/downloads/macos).

Jellyfin requires macOS 12 or newer to run.
Jellyfin 10.9 or newer is required for Apple Silicon native support.

## Packaged Version(dmg)

### Install

1. Download the latest version.
2. Drag the `.app` package into the Applications folder.
3. Start the application.
4. Click the icon in the menu bar and select "Launch Web UI".

### Upgrade

1. Download the latest version.
2. Stop the currently running server either via the dashboard or using the menu bar icon.
3. Drag the new `.app` package into the Applications folder and click yes to replace the files.
4. Start the application.

### Uninstall

1. Stop the currently running server either via the dashboard or using the application icon.
2. Move the `.app` package to the trash.

### Deleting Configuration

This will delete all settings and user information. This applies for the .app package and the portable version.

1. Delete the folder `~/.config/jellyfin/`
2. Delete the folder `~/.local/share/jellyfin/`

## Portable Version

The portable version is intended for advanced users who want more customization options.

For average users, the packaged version is strongly recommended.

If you are not comfortable with command line, then this is not the version for you.

### Installing the Portable Version

1. Download the latest version of Jellyfin.
2. Extract it into the Applications folder.
3. Open Terminal and type `cd` followed with a space then drag the jellyfin folder into the terminal.
4. Type `xattr -rd com.apple.quarantine .` to remove the quarantine flag.
5. Type `codesign -fs - --deep jellyfin` to create an ad-hoc signature for the server.
6. Type `./jellyfin` to run jellyfin.
7. Open your browser at [http://localhost:8096](http://localhost:8096).

Closing the terminal window will end Jellyfin. Running Jellyfin in screen or tmux can prevent this from happening.

### Upgrading the Portable Version

1. Download the latest version.
2. Stop the currently running server either via the dashboard or using `CTRL+C` in the terminal window.
3. Extract the latest version into Applications
4. Open Terminal and type `cd` followed with a space then drag the jellyfin folder into the terminal.
5. Type `xattr -rd com.apple.quarantine .` to remove the quarantine flag.
6. Type `codesign -fs - --deep jellyfin` to create an ad-hoc signature for the server.
7. Type `./jellyfin` to run jellyfin.
8. Open your browser at [http://localhost:8096](http://localhost:8096)

### Uninstalling the Portable Version

1. Stop the currently running server either via the dashboard or using `CTRL+C` in the terminal window.
2. Move `/Application/jellyfin-version` folder to the Trash. Replace version with the actual version number you are trying to delete.
3. Delete the folder `~/.config/jellyfin/`
4. Delete the folder `~/.local/share/jellyfin/`

### Using FFmpeg with the Portable Version

The portable version doesn't come with FFmpeg by default. There are a few options for installing FFmpeg:

- download jellyfin-ffmpeg from the [Jellyfin repo](https://repo.jellyfin.org/?path=/ffmpeg/macos) (recommended)
- use the package manager homebrew by typing `brew install ffmpeg` into your Terminal ([here's how to install homebrew if you don't have it already](https://treehouse.github.io/installation-guides/mac/homebrew)
- download the most recent static build from [this link](https://evermeet.cx/ffmpeg/get/zip) (compiled by a third party see [this page](https://evermeet.cx/ffmpeg/) for options and information) (Apple Silicon builds are not available from this source)
- compile from source available from the official [website](https://ffmpeg.org/download.html)

Once downloaded, remove the quarantine flag for the `ffmpeg` and `ffprobe`.

Ensure that both `ffmpeg` and `ffprobe` are located at the same path, then execute the following command:

```shell
cd /path/to/ffmpeg/folder
xattr -rd com.apple.quarantine .
```
