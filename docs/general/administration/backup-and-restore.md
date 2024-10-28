---
uid: backup-and-restore
title: Backup and Restore
---

# Backup and Restore

This guide documents how to both back up and then restore the data in your Jellyfin instance.

## Why Backing Up is Important

Backups are important in general for all digital data. There are myriad possible bugs and issues that can arise and cause data loss, especially when you upgrade major releases (for instance, from Jellyfin 10.9.x to Jellyfin 10.10.x).

In addition, Jellyfin does not have a downgrade mechanism. This is very important to understand; once your Jellyfin instance has been started with a new version, any pending migrations are immediately applied, and your Jellyfin data will no longer work with the old version. The **only** way to restore your active instance back to the old version is to restore a backup. Backups are thus critical if you want to test Unstable versions, or before upgradiing to the latest version. In fact, when testing Unstable, it is best to back up much more regularly, perhaps using a cron job or similar automatic mechanism, to ensure that your data can be recovered if you hit a major issue.

Backups may also come in handy if you hit a bug. For instance, if a bug in the new version causes corruption of some aspect of the Jellyfin data, restoring from a backup means you can quickly restore to good data and apply any fixes to avoid a repeat. Without a backup, you would be completely out of luck in this situation.

Finally, administrative mistakes, normal operation issues (e.g. filling up a disk), or general bit rot can cause corruption or issues that require a backup to be restored. It's always better to have one than not.

## Taking a Backup

1. Stop the running Jellyfin server. This is extremely important, as otherwise the database will be locked and might not be recoverable when restoring. Note that this will interrupt any playback.

   * Any platform: Within the Jellyfin Dashboard, click "Shutdown". This should cleanly stop the process on all platforms, but if not, try one of the following.
   * Docker: `docker stop jellyfin`
   * Debian/Ubuntu packages: `sudo systemctl stop jellyfin` or `sudo service jellyfin stop`
   * Windows Installer: Right-click the Tray app, and select "Quit"; or, in Process Manager, find the Jellyfin process and terminate it.
   * MacOS Installer (.dmg): In Activity Monitor, find the Jellyfin process and terminate it.
   * Portable Installs (regardless of platform): Stop the running `jellyfin` or `jellyfin.exe` program, however it was started.

2. Copy your data and configuration directories to a destination of your choice. What you name the copies is up to you; personally, I like to use dated and versioned directory names e.g. `jellyfin.2024-05-01_10.8.13`. Where these files are also depends on the platform; generally these follow the [XDG Directory Specification](https://specifications.freedesktop.org/basedir-spec/latest/) for platforms that support it. For more information see [the configuration documentation](/docs/general/administration/configuration/#server-paths).

   **NOTE**: These are default locations; if you've changed your data or config paths, use those instead.

   * Official Docker: Wherever your `/data` and `/config` volumes are sourced from; this is set in your `docker-compose.yml` or in your `-v` options to `docker run`.
   * LinuxServer.io Docker: Data and config are wherever your `/config` volume is sourced from; this is set in your `docker-compose.yml` or in your `-v` options to `docker run`.
   * Debian/Ubuntu packages: Data is in `/var/lib/jellyfin` and config is in `/etc/jellyfin`; these are defined in `/etc/default/jellyfin`.
   * RPMFusion Fedora/CentOS packages: Data is in `/var/lib/jellyfin` and config is in `/etc/jellyfin`; these are defined in `/etc/sysconfig/jellyfin`.
   * Windows Tray/Installer (.exe): Data and config is in `%PROGRAMDATA%\Jellyfin\Server` (`C:\ProgramData\Jellyfin\Server`) or `%LOCALAPPDATA%\Jellyfin` (`C:\Users\<Username>\AppData\Local\Jellyfin`).
   * MacOS Installer (.dmg): Data is stored in one of these paths; back up whichever one(s) exist: `~/.config/jellyfin/`, `~/.local/share/jellyfin/`, `~/Library/Application Support/Jellyfin/`.
   * Portable Installs:
      * Linux: Data is stored in `~/.local/share/jellyfin` and config in `~/.local/share/jellyfin`.
      * Windows: Data and config is in `C:\Users\<Username>\AppData\Local\Jellyfin`, using `%LOCALAPPDATA%`.
      * MacOS: Data is stored in these paths; back up whichever one(s) exist: `~/.config/jellyfin/`, `~/.local/share/jellyfin/`, `~/Library/Application Support/Jellyfin/`.

   As an example, on Debian, you can do this with these commands to make a copy of both directories into a single target directory:

   ```bash
   TIMESTAMP=$(date +%Y%m%d%H%M%S)
   VERSION=10.9.10
   sudo mkdir -p /media/backups/jellyfin.${TIMESTAMP}_${VERSION}  # Or change the path wherever in your system makes sense to you
   sudo cp -a /var/lib/jellyfin /media/backups/jellyfin.${TIMESTAMP}_${VERSION}/data
   sudo cp -a /etc/jellyfin /media/backups/jellyfin.${TIMESTAMP}_${VERSION}/config
   ```

3. Start up Jellyfin again, either after upgrading or on the current version. You now have a safe copy of your data in the path chosen in step 2.

## Restoring a Backup

This process assumes you followed the steps above to take the backup.

1. Stop the running Jellyfin server process.

2. Move your current data and configuration directories out of the way (e.g. by appending `.bak` to them). For example, `sudo mv /var/lib/jellyfin /var/lib/jellyfin.bak` and `sudo mv /etc/jellyfin /etc/jellyfin.bak`.

3. Copy - **do not move or rename** - your backup to the existing name. For example, `sudo cp -a /media/backups/jellyfin.2024-10-27_10.9.11/data /var/lib/jellyfin` and `sudo cp -a /media/backups/jellyfin.2024-10-27_10.9.11/config /etc/jellyfin`.

4. If required, downgrade Jellyfin to the same version as your backup now.

5. Start up Jellyfin again. It should start cleanly with the old data, assuming versions are correct. If you downgraded this may happen automatically.

## The Future

Long-term, we have plans to provide an official backup and restore plugin bundled with Jellyfin, however this requires the completion of our EFCore rewrite, which is currently slated for our next major release 10.11.0. Once that becomes available, this document will be updated to reflect the process using that plugin.
