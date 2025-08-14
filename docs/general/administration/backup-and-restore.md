---
uid: backup-and-restore
title: Backup and Restore
---

# Backup and Restore

This guide documents how to both back up and then restore the data in your Jellyfin instance.

## Why Backing Up is Important

Backups are important in general for all digital data. There are myriad possible bugs and issues that can arise and cause data loss, especially when you upgrade major releases (for instance, from Jellyfin 10.9.x to Jellyfin 10.10.x).

:::caution

Jellyfin does not have a downgrade mechanism. This is very important to understand; once your Jellyfin instance has been started with a new version, any pending migrations are immediately applied, and your Jellyfin data will no longer work with the old version.

The **only** way to restore your active instance back to the old version is to restore a backup. Backups are thus critical if you want to test `Unstable` pre-release versions, or before upgrading to the latest release. In fact, when testing `Unstable`, it is best to back up much more regularly, perhaps using a cron job or similar automatic mechanism, to ensure that your data can be recovered if you hit a major issue.

:::

If a bug in a new version of Jellyfin Server causes corruption of its data, restoring from a backup means you can quickly restore to a working state and potentially apply fixes to avoid a repeat in future. Without a backup, you would likely need to reconfigure Jellyfin from scratch.

Other scenarios in which backups make sense include administrative mistakes, normal operation issues (e.g., running out of storage on the disk that your Jellyfin Server database is stored on), general bit rot, or corruption. It is always better to have one than not. It is highly recommended that as soon as you have your Jellyfin Server in a functioning state that you should configure your backup schedule.

It is strongly recommended to replicate your backups elsewhere so that in the event of major failure, you are able to restore your Jellyfin Server to a previous state.

## Taking a Backup

As of Jellyfin 10.11.0, a backup facility is included in the core Jellyfin experience.

You can manually initiate a backup via this facility by following these steps:

1. Go to the Jellyfin Server `Dashboard` on the Jellyfin instance you wish to back up.
2. Scroll down to `Advanced` via the left sidebar menu.
3. Click `Backups` in the left sidebar menu.
4. Click the `Create Backup` button.
5. Using the checkboxes, select which aspects of Jellyfin Server you wish to back up. `Database` is always required to be backed up. Other options include `Metadata`, `Subtitles` and `Trickplay`.
6. Click `Create` and wait for your backup to be created.
