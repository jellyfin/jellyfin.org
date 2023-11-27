---
uid: installation-windows
title: Windows
description: Install on Windows.
sidebar_position: 3
---

<!-- markdownlint-disable MD036 no-emphasis-as-heading -->

Windows installers and builds in ZIP archive format are available [here](/downloads/windows).

:::caution

If you installed a version prior to 10.4.0 using a PowerShell script, you will need to manually remove the service using the command `nssm remove Jellyfin` and uninstall the server by remove all the files manually.
Also one might need to move the data files to the correct location, or point the installer at the old location.

:::

:::caution

The Basic Install is the recommended way to run the Jellyfin Server.
Using the Advanced/Service mode may experience FFmpeg hardware acceleration issues and is only for advanced users.

:::

## Install using installer

**Install**

1. Download the latest version.
2. Run the installer.
3. (Optional) When installing as a service (not recommended), pick the service account type.
4. If everything was completed successfully, Jellyfin is now running.
5. Open your browser at [http://your_local_IP_address:8096](http://your_local_IP_address:8096) to finish setting up Jellyfin.

**Update**

1. Download the latest version.
2. Close or Stop Jellyfin if it is running.
3. Run the installer.
4. If everything was completed successfully, the new version is installed.

**Uninstall**

1. Go to `Add or remove programs` in Windows.
2. Search for Jellyfin.
3. Click Uninstall.

## Install manually (portable)

**Install**

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

**Update**

1. Stop Jellyfin
2. Rename the Jellyfin `system` folder to `system-bak`
3. Download and extract the latest Jellyfin version
4. Copy the extracted folder into the `jellyfin` folder and rename it to `system`
5. Run `jellyfin.bat` to start the server again

**Rollback**

1. Stop Jellyfin.
2. Delete the `system` folder.
3. Rename `system-bak` to `system`.
4. Run `jellyfin.bat` to start the server again.
