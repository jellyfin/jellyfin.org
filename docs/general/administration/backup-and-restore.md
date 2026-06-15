---
uid: backup-and-restore
title: Backup and Restore
---

# Backup and Restore

This guide documents how to both back up and then restore the data in your Jellyfin instance.

## Why Backing Up is Important

Backups are important in general for all digital data. There are myriad possible bugs and issues that can arise and cause data loss, especially when you upgrade major releases (for instance, from Jellyfin 10.9.x to Jellyfin 10.10.x).

In addition, Jellyfin does not have a downgrade mechanism. This is very important to understand; once your Jellyfin instance has been started with a new version, any pending migrations are immediately applied, and your Jellyfin data will no longer work with the old version. The **only** way to restore your active instance back to the old version is to restore a backup. Backups are thus critical if you want to test Unstable versions, or before upgrading to the latest version. In fact, when testing Unstable, it is best to back up much more regularly, perhaps using a cron job or similar automatic mechanism, to ensure that your data can be recovered if you hit a major issue.

Backups may also come in handy if you hit a bug. For instance, if a bug in the new version causes corruption of some aspect of the Jellyfin data, restoring from a backup means you can quickly restore to good data and apply any fixes to avoid a repeat. Without a backup, you would be completely out of luck in this situation.

Finally, administrative mistakes, normal operation issues (e.g. filling up a disk), or general bit rot can cause corruption or issues that require a backup to be restored. It's always better to have one than not.

There are two ways of backing up your Jellyfin data. One is with its built-in Backup/Restore system and the other is manually.

## Built-in Backup

Jellyfin's built-in backup system is able to create a backup while your system is online and running, as opposed to the manual process that **requires** you to stop Jellyfin beforehand.
However in 10.11 we still recommend performing the backup process during a time of low activity and while no scan is currently active.

### Create a Built-in Backup

To take a new Backup, enter the Jellyfin Dashboard, open the `Backups` tab and click on the `Create Backup` button. The popup will now ask you to select what data you want to backup.

- Database. Always enabled. Will contain all data from the jellyfin.db or used database provider.
- Metadata. The contents of the metadata folder and depending on your selected options may contain metadata images.
- Subtitles. All extracted subtitles including downloaded ones.
- Trickplay. All Trickplay data that is stored not alongside media.

The Backup system will check for at least 5GB of free space in the backup folder where backups a written to. However this can easily not be enough if you also backup Subtitles and Trickplay so ensure you have enough free space there.
The Backup folder is located within your Jellyfin data directory, by default:

- Official Docker: `<volume path>/config/data/backups` where `<volume path>` is where your `/config` volume is sourced from; this is set in your `docker-compose.yml` or in your `-v` options to `docker run`.
- LinuxServer.io Docker: `<volume path>/config/data/data/backups` where `<volume path>` is where your `/config` volume is sourced from; this is set in your `docker-compose.yml` or in your `-v` options to `docker run`.
- Debian/Ubuntu packages: `/var/lib/jellyfin/data/backups`.
- RPMFusion Fedora/CentOS packages: `/var/lib/jellyfin/data/backups`.
- Windows User Install: `%LOCALAPPDATA%\Jellyfin\data\backups` (`C:\Users\<Username>\AppData\Local\Jellyfin\data\backups`)
- Windows Service Install: `%PROGRAMDATA%\Jellyfin\Server\data\backups` (`C:\ProgramData\Jellyfin\Server\data\backups`)
- MacOS Installer (.dmg): Data is stored in one of these paths; back up whichever one(s) exist: `~/.config/jellyfin/data/backups`, `~/.local/share/jellyfin/data/backups`, `~/Library/Application Support/Jellyfin/data/backups`:
- Portable Installs:
  - Linux: Data is stored in `~/.local/share/jellyfin/data/backups`.
  - Windows: Data and config is in `C:\Users\<Username>\AppData\Local\jellyfin\data\backups`, using `%LOCALAPPDATA%`.
  - MacOS: Data is stored in these paths; back up whichever one(s) exist: `~/.config/jellyfin/data/backups`, `~/.local/share/jellyfin/data/backups`, `~/Library/Application Support/Jellyfin/data/backups`.

After clicking on the `Create` button all data will be written into a new zip archive.

### Restore from a Built-in Backup

To restore from a Backup you can either use the webUI by navigating to the same view as for the step above and clicking on the restore button in the list of backups, or you can start jellyfin with the `--restore-archive PATH_TO_BACKUP_ZIP` argument. Note that when you start a restore from the webUI, your server will immediately restart for this process to take place and will be unavailable for that time.

## Manual Backup

Taking a manual Backup essentially involves you copying all the data jellyfin requires on your own.

### Create a Manual Backup

1. Stop the running Jellyfin server. This is extremely important, as otherwise the database will be locked and might not be recoverable when restoring. Note that this will interrupt any playback.
   - Any platform: Within the Jellyfin Dashboard, click "Shutdown". This should cleanly stop the process on all platforms, but if not, try one of the following.
   - Docker: `docker stop jellyfin`
   - Debian/Ubuntu packages: `sudo systemctl stop jellyfin` or `sudo service jellyfin stop`
   - Windows Installer: Right-click the Tray app, and select "Quit"; or, in Process Manager, find the Jellyfin process and terminate it.
   - MacOS Installer (.dmg): In Activity Monitor, find the Jellyfin process and terminate it.
   - Portable Installs (regardless of platform): Stop the running `jellyfin` or `jellyfin.exe` program, however it was started.

2. Copy your data and configuration directories to a destination of your choice. What you name the copies is up to you; personally, I like to use dated and versioned directory names e.g. `jellyfin.2024-05-01_10.8.13`. Where these files are also depends on the platform; generally these follow the [XDG Directory Specification](https://specifications.freedesktop.org/basedir-spec/latest/) for platforms that support it. For more information see [the configuration documentation](/docs/general/administration/configuration/#server-paths).

   **NOTE**: These are default locations; if you've changed your data or config paths, use those instead.
   - Official Docker: The data directory is wherever your `/config` volume is sourced from; this is set in your `docker-compose.yml` or in your `-v` options to `docker run`. This directory contains the config directory as well.
   - LinuxServer.io Docker: The config directory is wherever your `/config` volume is sourced from; this is set in your `docker-compose.yml` or in your `-v` options to `docker run`. This directory contains the data directory as well.
   - Debian/Ubuntu packages: The data directory is `/var/lib/jellyfin` and the config directory is `/etc/jellyfin`; these are defined in `/etc/default/jellyfin`.
   - RPMFusion Fedora/CentOS packages: The data directory is `/var/lib/jellyfin` and the config directory is `/etc/jellyfin`; these are defined in `/etc/sysconfig/jellyfin`.
   - Windows Tray/Installer (.exe): The data directory is `%PROGRAMDATA%\Jellyfin\Server` (`C:\ProgramData\Jellyfin\Server`) or `%LOCALAPPDATA%\Jellyfin` (`C:\Users\<Username>\AppData\Local\Jellyfin`). This directory contains the config directory as well.
   - MacOS Installer (.dmg): Data is stored in one of these paths; back up whichever one(s) exist: `~/.config/jellyfin/`, `~/.local/share/jellyfin/`, `~/Library/Application Support/Jellyfin/`.
   - Portable Installs:
     - Linux: The data and config directories are both `~/.local/share/jellyfin`.
     - Windows: The data directory is `%LOCALAPPDATA%\jellyfin` (`C:\Users\<Username>\AppData\Local\jellyfin`). This directory contains the config directory as well.
     - MacOS: Data is stored in these paths; back up whichever one(s) exist: `~/.config/jellyfin/`, `~/.local/share/jellyfin/`, `~/Library/Application Support/Jellyfin/`.

   As an example, on Debian, you can do this with these commands to make a copy of both directories into a single target directory:

   ```bash
   TIMESTAMP=$(date +%Y%m%d%H%M%S)
   VERSION=10.9.10
   sudo mkdir -p /media/backups/jellyfin.${TIMESTAMP}_${VERSION}  # Or change the path wherever in your system makes sense to you
   sudo cp -a /var/lib/jellyfin /media/backups/jellyfin.${TIMESTAMP}_${VERSION}/data
   sudo cp -a /etc/jellyfin /media/backups/jellyfin.${TIMESTAMP}_${VERSION}/config
   ```

3. Start up Jellyfin again, either after upgrading or on the current version. You now have a safe copy of your data in the path chosen in step 2.

### Restore from a Manual Backup

This process assumes you followed the steps above to take the backup.

1. Stop the running Jellyfin server process.

2. Move your current data and configuration directories out of the way (e.g. by appending `.bak` to them). For example, `sudo mv /var/lib/jellyfin /var/lib/jellyfin.bak` and `sudo mv /etc/jellyfin /etc/jellyfin.bak`.

3. Copy - **do not move or rename** - your backup to the existing name. For example, `sudo cp -a /media/backups/jellyfin.2024-10-27_10.9.11/data /var/lib/jellyfin` and `sudo cp -a /media/backups/jellyfin.2024-10-27_10.9.11/config /etc/jellyfin`.

4. If required, downgrade Jellyfin to the same version as your backup now.

5. Start up Jellyfin again. It should start cleanly with the old data, assuming versions are correct. If you downgraded this may happen automatically.
