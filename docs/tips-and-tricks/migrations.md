---
id: migrations
title: Migrations
---

Direct database migration from Emby (of any version) to Jellyfin is NOT SUPPORTED. We have found many subtle bugs due to the inconsistent database schemas that result from trying to do this, and strongly recommend that all Jellyfin users migrating from Emby start with a fresh database and library scan.

The original procedure is provided below for reference however we cannot support it nor guarantee that a system upgraded in this way will work properly, if at all. If anyone is interested in writing a database migration script which will correct the deficiencies in the existing database and properly import them into Jellyfin, [we would welcome it however](xref:contrib-index)!

## Watched Status Migration

There are scripts available that will use the API to copy watched status and users from one instance to another. This can be done from Plex, Emby or another Jellyfin instance.

[Emby/Jellyfin to Jellyfin migration](https://github.com/CobayeGunther/Emby2Jelly)

[Plex to Jellyfin migration](https://github.com/wilmardo/migrate-plex-to-jellyfin)

## Unofficial Procedure

> [!WARNING]
> While it is technically possible to migrate existing configuration of Emby version 3.5.2 or earlier, due to subtle and weird bugs reported after such attempts we do not recommend this migration. Emby versions 3.5.3 or 3.6+ cannot be migrated. Thus we recommend creating a new Jellyfin configuration and rebuilding your library instead.

Windows users may take advantage of the `install-jellyfin.ps1` script in the [Jellyfin repository](https://github.com/jellyfin/jellyfin) which includes an automatic upgrade option.

This procedure is written for Debian-based Linux distributions, but can be translated to other platforms by following the same general principles.

1. Upgrade to Emby version 3.5.2, so that the database schema is fully up-to-date and consistent. While this is not required, it can help reduce the possibility of obscure bugs in the database.

2. Stop the `emby-server` daemon:

   ```sh
   sudo service emby-server stop
   ```

3. Move your existing Emby data directory out of the way:

   ```sh
   sudo mv /var/lib/emby /var/lib/emby.backup
   ```

4. Remove or purge the `emby-server` package:

   ```sh
   sudo apt purge emby-server
   ```

5. Install the `jellyfin` package using the [installaton instructions](xref:admin-installing).

6. Stop the `jellyfin` daemon:

   ```sh
   sudo service jellyfin stop
   ```

7. Copy over all the data files from the Emby backup data directory:

   ```sh
   sudo cp -a /var/lib/emby.backup/* /var/lib/jellyfin/
   ```

8. Correct ownership on the new data directory:

   ```sh
   sudo chown -R jellyfin:jellyfin /var/lib/jellyfin
   ```

9. Start the `jellyfin` daemon:

   ```sh
   sudo service jellyfin start
   ```
