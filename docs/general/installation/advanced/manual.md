---
uid: installation-advanced-manual
title: Manual Installation
description: Install Jellyfin Manually.
sidebar_position: 3
---

<!-- markdownlint-disable MD036 no-emphasis-as-heading -->

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
The rest of these instructions assume version 10.10.7 is being installed (i.e. `jellyfin_10.10.7-amd64.tar.gz`).
Download the generic build, then extract the archive:

```sh
sudo wget https://repo.jellyfin.org/files/server/linux/latest-stable/amd64/jellyfin_10.10.7-amd64.tar.gz
sudo tar xvzf jellyfin_10.10.7-amd64.tar.gz
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

Due to the number of [command line options](https://jellyfin.org/docs/general/administration/configuration/#command-line-options) that must be passed on to the Jellyfin binary, it is easiest to create a small script to run Jellyfin.

```sh
sudoedit jellyfin.sh
```

Then paste the following commands, optionally changing arguments as needed for custom deployments.

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
USER=$(id --name --user)
GROUP=$(id --name --group)
sudo chown -R $USER:$GROUP *
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

Platform-agnostic .NET Core DLL builds in TAR archive format are available from the [portable downloads section](/downloads/server?os=DotNet).  
These builds use the binary `jellyfin.dll` and must be loaded with `dotnet`.

## Debian (using extrepo)

extrepo is only supported on Debian currently. The advantage of extrepo is that it is packaged in Debian. So you don’t have to execute the `curl | sudo bash` combo from the previous Automatic section. The risk with that command is that it relies on the security of the webserver. extrepo avoids this by having the Jellyfin repo information including the GPG key in its [extrepo-data](https://salsa.debian.org/extrepo-team/extrepo-data/-/blob/master/repos/debian/jellyfin.yaml?ref_type=heads). extrepo-data is verified with GPG by the extrepo tool. So there is a chain of trust from Debian all the way to the Jellyfin repo information.

```sh
sudo apt install extrepo
sudo extrepo enable jellyfin
```

Now you can continue at step 5. of the [Repository (Manual) section](#official-linux-repository-manual).

## Official Linux Repository (Manual)

If you would prefer to install everything manually, the full steps are as follows:

1. Install `curl` and `gnupg` if you haven't already:

   ```sh
   sudo apt install curl gnupg
   ```

2. On Ubuntu (and derivatives) only, enable the Universe repository to obtain all the FFmpeg dependencies:

   ```sh
   sudo add-apt-repository universe
   ```

   :::note

   If the above command fails you will need to install the following package `software-properties-common`.
   This can be achieved with the following command `sudo apt-get install software-properties-common`

   :::

   On Debian, you can also enable the `non-free` components of your base repositories for additional FFmpeg dependencies, but this is optional.

3. Download the GPG signing key (signed by the Jellyfin Team) and install it:

   ```sh
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg
   ```

4. Add a repository configuration at `/etc/apt/sources.list.d/jellyfin.sources`:

   ```sh
   export VERSION_OS="$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release )"
   export VERSION_CODENAME="$( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )"
   export DPKG_ARCHITECTURE="$( dpkg --print-architecture )"
   cat <<EOF | sudo tee /etc/apt/sources.list.d/jellyfin.sources
   Types: deb
   URIs: https://repo.jellyfin.org/${VERSION_OS}
   Suites: ${VERSION_CODENAME}
   Components: main
   Architectures: ${DPKG_ARCHITECTURE}
   Signed-By: /etc/apt/keyrings/jellyfin.gpg
   EOF
   ```

   :::note

   The supported values for the above variables are:
   - `${VERSION_OS}`: One of `debian` or `ubuntu`; if it is not, use the closest one for your distribution.
   - `${VERSION_CODENAME}`: One of our supported [Debian](https://github.com/jellyfin/jellyfin-repo-helper-scripts/blob/master/install-debuntu.sh#L7) or [Ubuntu](https://github.com/jellyfin/jellyfin-repo-helper-scripts/blob/master/install-debuntu.sh#L8) release codenames. These can change as new releases come out and old releases are dropped, so check the script to be sure yours is supported.
   - `${DPKG_ARCHITECTURE}`: One of our [supported architectures](https://github.com/jellyfin/jellyfin-repo-helper-scripts/blob/master/install-debuntu.sh#L6). Microsoft does not provide a .NET for 32-bit x86 Linux systems, and hence Jellyfin is **not** supported on the `i386` architecture.

   :::

5. Update your APT repositories:

   ```sh
   sudo apt update
   ```

6. Install the Jellyfin metapackage, which will automatically fetch the various sub-packages:

   ```sh
   sudo apt install jellyfin
   ```

   :::note

   If you want to be explicit, instead of the metapackage, you can install the sub-packages individually:

   ```sh
   sudo apt install jellyfin-server jellyfin-web
   ```

   The `jellyfin-server` package will automatically select the right `jellyfin-ffmpeg` package for you as well.

   :::

7. Manage the Jellyfin system service:

   ```sh
   sudo systemctl {action} jellyfin
   sudo service jellyfin {action}
   ```

## `.deb` Packages (Very Manual)

Raw `.deb` packages, including old versions, source packages, and `dpkg` meta files, are available [in the main download repository](https://repo.jellyfin.org/?path=/server/).

:::note

The repository is the preferred way to obtain Jellyfin on Debian and Ubuntu systems, as this ensures you get automatic updates and that all dependencies are properly resolved. Use these steps only if you really know what you're doing.

:::

1. On Ubuntu (and derivatives) only, enable the Universe repository to obtain all the FFmpeg dependencies:

   ```sh
   sudo add-apt-repository universe
   ```

   :::note

   If the above command fails you will need to install the following package `software-properties-common`.
   This can be achieved with the following command `sudo apt-get install software-properties-common`

   :::

   On Debian, you can also enable the `non-free` components of your base repositories for additional FFmpeg dependencies, but this is optional.

2. Download the desired `jellyfin-server`, `jellyfin-web`, and `jellyfin-ffmpeg` `.deb` packages from the repository; `jellyfin` is a metapackage and is not required.

3. Install the downloaded `.deb` packages with `apt` to handle dependency resolution:

   ```sh
   sudo apt install ./jellyfin-server_*.deb ./jellyfin-web_*.deb ./jellyfin-ffmpeg_*.deb
   ```

4. Manage the Jellyfin system service:

   ```sh
   sudo systemctl {action} jellyfin
   sudo service jellyfin {action}
   ```
