---
uid: installation-source
title: Building from source
description: Compile and run Jellyfin yourself.
sidebar_position: 6
---

<!-- markdownlint-disable MD029 ol-prefix -->

As an alternative to using binary packages, you can build Jellyfin from source.

Jellyfin supports several methods of building for different platforms and instructions for all supported platforms are below.

All package builds begin with these two steps:

1. Clone the repository.

   ```sh
   git clone https://github.com/jellyfin/jellyfin-packaging.git
   cd jellyfin-packaging
   ```

2. Initialize the submodules.

   ```sh
   git submodule update --init
   ```

## Container image

1. Build the container image using Docker or Podman.

   ```sh
   docker build -t $USERNAME/jellyfin --file docker/Dockerfile .
   ```

   Or

   ```sh
   podman build -t $USERNAME/jellyfin --file docker/Dockerfile .
   ```

   Or use provided Python build script:

   ```sh
   ./build.py auto docker
   ```

   Replace "auto" with your own Jellyfin version tag if you want to.

3. Run Jellyfin in a new container using Docker or Podman from the built container image.

   ```sh
   docker run -d -p 8096:8096 $USERNAME/jellyfin
   ```

   Or

   ```sh
   podman run -d -p 8096:8096 $USERNAME/jellyfin
   ```

## Linux or MacOS

3. Use the included `build` script to perform builds.

   ```sh
   ./build --help
   ./build --list-platforms
   ./build <platform> all
   ```

4. The resulting archives can be found at `../bin/<platform>`.

:::note

This will very likely be split out into a separate repository at some point in the future.

:::

## Windows

3. Install dotnet SDK 8.0 from [Microsoft's Website](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) and [install Git for Windows](https://gitforwindows.org/).
   You must be on Powershell 3 or higher.

4. From Powershell set the execution policy to unrestricted.

   ```powershell
   set-executionpolicy unrestricted
   ```

5. If you are building a version of Jellyfin newer than 10.6.4, you will need to download the build script from a separate repository.

   ```powershell
   git clone https://github.com/jellyfin/jellyfin-server-windows.git windows
   ```

6. Run the Jellyfin build script.

   ```powershell
   windows\build-jellyfin.ps1 -verbose
   ```

   - The `-WindowsVersion` and `-Architecture` flags can optimize the build for your current environment; The default is a generic Windows x64.

   - The `-InstallLocation` flag lets you select where the compiled binaries go; The default is `$Env:AppData\Jellyfin-Server\`.

   - The `-InstallFFMPEG` flag will automatically pull the appropriate stable `ffmpeg` binaries for your architecture (x86/x64 only for now) from [BtbN](https://github.com/BtbN/FFmpeg-Builds/releases) and place them in your Jellyfin directory.

   - The `-InstallNSSM` flag will automatically pull the appropriate stable `nssm` binary for your architecture (x86/x64 only for now) from [NSSM's Website](https://nssm.cc/) and place it in your Jellyfin directory.

7. (Optional) Use [NSSM](https://nssm.cc) to configure Jellyfin to run as a service.

8. Jellyfin is now available in the default directory, or whichever directory you chose.

   - Start it from PowerShell.

     ```powershell
     &"$env:APPDATA\Jellyfin-Server\jellyfin.exe"
     ```

   - Start it from CMD.

     ```cmd
     %APPDATA%\Jellyfin-Server\jellyfin.exe
     ```

:::note

This will very likely be split out into a separate repository at some point in the future.

:::
