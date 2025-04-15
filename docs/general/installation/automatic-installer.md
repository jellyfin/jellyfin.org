---
uid: installation-automatic-installer
title: Automatic Installers
description: Install using an automatic installer.
sidebar_position: 1
---

<!-- markdownlint-disable MD036 no-emphasis-as-heading -->

Jellyfin provides automatic installers for a few platforms. These installers can help you install Jellyfin quickly and easily.

## Windows

### Installing on Windows

1. Download the latest version installer from [the downloads page](/downloads/windows).
2. Run the installer.
3. (Optional) When installing as a service (not recommended), pick the service account type.
4. If everything was completed successfully, Jellyfin is now running.
5. Open your browser at [http://your_local_IP_address:8096](http://your_local_IP_address:8096) to finish setting up Jellyfin.

### Updating on Windows

1. Download the latest version installer from [the downloads page](/downloads/windows).
2. Close or Stop Jellyfin from the tray app if it is running.
3. Run the installer.
4. If everything was completed successfully, the new version is installed.

### Uninstalling on Windows

1. Go to [Add or remove programs](https://support.microsoft.com/en-us/windows/uninstall-or-remove-apps-and-programs-in-windows-4b55f974-2cc6-2d2b-d092-5905080eaf98) in Windows settings.
2. Search for Jellyfin.
3. Click Uninstall.

## macOS

### Installing on macOS

1. Download the latest version DMG image from [the downloads page](/downloads/macos).
2. Drag the `.app` package into the Applications folder.
3. Start the application.
4. Click the icon in the menu bar and select "Launch Web UI".

### Updating on macOS

1. Download the latest version DMG image from [the downloads page](/downloads/macos).
2. Stop the currently running server either via the dashboard or using the menu bar icon.
3. Drag the new `.app` package into the Applications folder and click yes to replace the files.
4. Start the application.

### Uninstalling on macOS

1. Stop the currently running server either via the dashboard or using the application icon.
2. Move the `.app` package to the trash.

### Deleting Configuration on macOS

This will delete all settings and user information. This applies for the .app package and the portable version.

1. Delete the folder `~/.config/jellyfin/`
2. Delete the folder `~/.local/share/jellyfin/`

## Debian / Ubuntu and derivatives

To simplify deployment and help automate this for as many users as possible, we provide a BASH script to handle repo installation as well as installing Jellyfin on Debian / Ubuntu and derivatives.
All you need to do is run this command on your system (requires `curl`, or subsitute `curl` with `wget -O-`):

```sh
curl https://repo.jellyfin.org/install-debuntu.sh | sudo bash
```

:::note

You can verify the script download integrity with (requires `sha256sum`):

```sh
diff <( curl -s https://repo.jellyfin.org/install-debuntu.sh -o install-debuntu.sh; sha256sum install-debuntu.sh ) <( curl -s https://repo.jellyfin.org/install-debuntu.sh.sha256sum )
```

An empty output means everything is correct. Then you can inspect the script to see what it does (optional but recommended) and execute it with:

```sh
less install-debuntu.sh
sudo bash install-debuntu.sh
```

:::

:::note

The script tries to handle as many common derivatives as possible, including, at least, Linux Mint (Ubuntu and Debian editions), Raspbian/Raspberry Pi OS, and KDE Neon. We welcome PRs [to the script](https://github.com/jellyfin/jellyfin-repo-helper-scripts/blob/master/install-debuntu.sh) for any other common derivatives.

:::
