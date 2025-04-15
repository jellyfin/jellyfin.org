---
uid: installation-portable
title: Portable Packages
description: Install using an portable package.
sidebar_position: 5
---

<!-- markdownlint-disable MD036 no-emphasis-as-heading -->

These are the more advanced installation methods intended for advanced users.

## Portable Windows Package

### Portable Windows Install

1. Download and extract the latest version.
2. Create a folder `jellyfin` at your preferred install location.
3. Copy the extracted folder into the `jellyfin` folder and rename it to `system`.
4. Create `jellyfin.bat` within your `jellyfin` folder containing:

   - To use the default library/data location at `%localappdata%`:

   ```cmd
   <--Your install path-->\jellyfin\system\jellyfin.exe
   ```

   - To use a custom library/data location (Path after the -d parameter):

   ```cmd
   <--Your install path-->\jellyfin\system\jellyfin.exe -d <--Your install path-->\jellyfin\data
   ```

   - To use a custom library/data location (Path after the -d parameter) and disable the auto-start of the webapp:

   ```cmd
   <--Your install path-->\jellyfin\system\jellyfin.exe -d <--Your install path-->\jellyfin\data -noautorunwebapp
   ```

5. Run

   ```cmd
   jellyfin.bat
   ```

6. Open your browser at `http://<--Server-IP-->:8096`.

### Portable Windows Update

1. Stop Jellyfin
2. Rename the Jellyfin `system` folder to `system-bak`
3. Download and extract the latest Jellyfin version
4. Copy the extracted folder into the `jellyfin` folder and rename it to `system`
5. Run `jellyfin.bat` to start the server again

### Portable Windows Rollback

1. Stop Jellyfin.
2. Delete the `system` folder.
3. Rename `system-bak` to `system`.
4. Run `jellyfin.bat` to start the server again.

## Portable macOS package

### Installing the Portable macOS Version

1. Download the latest version of Jellyfin.
2. Extract it into the Applications folder.
3. Open Terminal and type `cd` followed with a space then drag the jellyfin folder into the terminal.
4. Type `xattr -rd com.apple.quarantine .` to remove the quarantine flag.
5. Type `codesign -fs - --deep jellyfin` to create an ad-hoc signature for the server.
6. Type `./jellyfin` to run jellyfin.
7. Open your browser at [http://localhost:8096](http://localhost:8096).

Closing the terminal window will end Jellyfin. Running Jellyfin in screen or tmux can prevent this from happening.

### Updating the Portable macOS Version

1. Download the latest version.
2. Stop the currently running server either via the dashboard or using `CTRL+C` in the terminal window.
3. Extract the latest version into Applications
4. Open Terminal and type `cd` followed with a space then drag the jellyfin folder into the terminal.
5. Type `xattr -rd com.apple.quarantine .` to remove the quarantine flag.
6. Type `codesign -fs - --deep jellyfin` to create an ad-hoc signature for the server.
7. Type `./jellyfin` to run jellyfin.
8. Open your browser at [http://localhost:8096](http://localhost:8096)

### Uninstalling the Portable macOS Version

1. Stop the currently running server either via the dashboard or using `CTRL+C` in the terminal window.
2. Move `/Application/jellyfin-version` folder to the Trash. Replace version with the actual version number you are trying to delete.
3. Delete the folder `~/.config/jellyfin/`
4. Delete the folder `~/.local/share/jellyfin/`

### Using FFmpeg with the Portable macOS Version

The portable version doesn't come with FFmpeg by default. There are a few options for installing FFmpeg:

- download jellyfin-ffmpeg from the [Jellyfin repo](https://repo.jellyfin.org/?path=/ffmpeg/macos) (recommended)
- use the package manager homebrew by typing `brew install ffmpeg` into your Terminal ([here's how to install homebrew if you don't have it already](https://treehouse.github.io/installation-guides/mac/homebrew)
- download the most recent [static build](https://evermeet.cx/ffmpeg/get/zip) (compiled by a third party see [evermeet.cx](https://evermeet.cx/ffmpeg/) for options and information) (Apple Silicon builds are not available from this source)
- compile from source available from the official [website](https://ffmpeg.org/download.html)

Once downloaded, remove the quarantine flag for the `ffmpeg` and `ffprobe`.

Ensure that both `ffmpeg` and `ffprobe` are located at the same path, then execute the following command:

```shell
cd /path/to/ffmpeg/folder
xattr -rd com.apple.quarantine .
```

## Portable Linux install

Generic `amd64`, `arm64`, and `armhf` Linux builds in TAR archive format are available [in the main download repository](https://repo.jellyfin.org/?path=/server/).

### Base Installation Process

Create a directory in `/opt` for jellyfin and its files, and enter that directory.

```sh
sudo mkdir /opt/jellyfin
cd /opt/jellyfin
```

Download the latest generic Linux build for your architecture.
The rest of these instructions assume version 10.8.13 is being installed (i.e. `jellyfin_10.8.13_amd64.tar.gz`).
Download the generic build, then extract the archive:

```sh
sudo wget https://repo.jellyfin.org/?path=/server/linux/stable/combined/jellyfin_10.8.13_amd64.tar.gz
sudo tar xvzf jellyfin_10.8.13_amd64.tar.gz
```

Create a symbolic link to the Jellyfin 10.8.13 directory.
This allows an upgrade by repeating the above steps and enabling it by simply re-creating the symbolic link to the new version.

```sh
sudo ln -s jellyfin_10.8.13 jellyfin
```

Create four sub-directories for Jellyfin data.

```sh
sudo mkdir data cache config log
```

### `FFmpeg` Installation

If you are not running a Debian derivative, install `ffmpeg` through your OS's package manager, and skip this section.

:::caution

Not being able to use `jellyfin-ffmpeg` will most likely break hardware acceleration and tonemapping.

:::

If you are running Debian or a derivative, you should [download](https://repo.jellyfin.org/?path=/ffmpeg/debian/) and install an `ffmpeg` `.deb` package built specifically for Jellyfin.

If you run into any dependency errors, run this and it will install them and `jellyfin-ffmpeg`.

```sh
sudo apt install -f
```

### Running Jellyfin

Due to the number of command line options that must be passed on to the Jellyfin binary, it is easiest to create a small script to run Jellyfin.

```sh
sudoedit jellyfin.sh
```

Then paste the following commands and modify as needed.

```sh
#!/bin/bash
JELLYFINDIR="/opt/jellyfin"
FFMPEGDIR="/usr/share/jellyfin-ffmpeg"

$JELLYFINDIR/jellyfin/jellyfin \
 -d $JELLYFINDIR/data \
 -C $JELLYFINDIR/cache \
 -c $JELLYFINDIR/config \
 -l $JELLYFINDIR/log \
 --ffmpeg $FFMPEGDIR/ffmpeg
```

Assuming you desire Jellyfin to run as a non-root user, `chmod` all files and directories to your normal login user and group.
Also make the startup script above executable.

```sh
sudo chown -R user:group *
sudo chmod u+x jellyfin.sh
```

Finally, you can run it.
You will see lots of log information when run, this is normal.
Setup is as usual in the web browser.

```sh
./jellyfin.sh
```

#### Starting Jellyfin on boot (optional)

Create a `systemd` unit file.

```sh
cd /etc/systemd/system
sudo nano jellyfin.service
```

Then paste the following contents, replacing `youruser` with your username.

```ini
[Unit]
Description=Jellyfin
After=network.target

[Service]
Type=simple
User=youruser
Restart=always
ExecStart=/opt/jellyfin/jellyfin.sh

[Install]
WantedBy=multi-user.target
```

Apply the correct permissions to the file, enable the service to start on boot, then start it.

```sh
sudo chmod 644 jellyfin.service
sudo systemctl daemon-reload
sudo systemctl enable jellyfin.service
sudo systemctl start jellyfin.service
```

## Portable .NET DLL

Platform-agnostic .NET Core DLL builds in TAR archive format are available from the [portable downloads section](/downloads#portable).  
These builds use the binary `jellyfin.dll` and must be loaded with `dotnet`.
