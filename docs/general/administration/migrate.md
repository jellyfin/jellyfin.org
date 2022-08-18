---
uid: admin-migrate
title: Migrating
---

# Migrating

It is possible to migrate your system to another system by using environment variables.
It's possible to do this via the command line or by using Docker environment variables.
To read more, see the [Configuration](https://jellyfin.org/docs/general/administration/configuration.html) page.

## Watched Status Migration

There are scripts available that will use the API to copy watched status and users from one instance to another.
This can be done from Plex, Emby or another Jellyfin instance.

[Emby/Jellyfin to Jellyfin migration](https://github.com/CobayeGunther/Emby2Jelly)

[Plex to Jellyfin migration](https://github.com/wilmardo/migrate-plex-to-jellyfin)

## Migrating Linux install to Docker

It's possible to use the data of a local install in the official docker image by mapping files and folders to the same locations and configuring the image accordingly.

> [!Note]
> You need to have exactly matching paths for your files inside the docker container!
> This means that if your media is stored at `/media/raid/` this path needs to be accessible at `/media/raid/` inside the docker container too - the configurations below do include examples.

To guarantee proper permissions, get the `uid` and `gid` of the local user Jellyfin runs as (on a default install this is the `jellyfin` system user).
You can do this by running the following command:

   ```sh
      id jellyfin
   ```

You need to replace the `<uid>:<gid>` placeholder below with the correct values.

> [!NOTE]
> To properly map the folders for your install, go to `Dashboard > Paths`.

### Using docker cli

   ```sh
   docker run -d \
       --user <uid>:<gid> \
       -e JELLYFIN_CACHE_DIR=/var/cache/jellyfin \
       -e JELLYFIN_CONFIG_DIR=/etc/jellyfin \
       -e JELLYFIN_DATA_DIR=/var/lib/jellyfin \
       -e JELLYFIN_LOG_DIR=/var/log/jellyfin \
       --mount type=bind,source=/etc/jellyfin,target=/etc/jellyfin \
       --mount type=bind,source=/var/cache/jellyfin,target=/var/cache/jellyfin \
       --mount type=bind,source=/var/lib/jellyfin,target=/var/lib/jellyfin \
       --mount type=bind,source=/var/log/jellyfin,target=/var/log/jellyfin \
       --mount type=bind,source=</path/to/media>,target=</path/to/media> \
       --net=host \
       --restart=unless-stopped \
       jellyfin/jellyfin
   ```

### Using docker-compose yaml

   ```yml
   version: "3"
   services:
     jellyfin:
       image: jellyfin/jellyfin
       user: <uid>:<gid>
       network_mode: "host"
       restart: "unless-stopped"
       environment:
         - JELLYFIN_CACHE_DIR=/var/cache/jellyfin
         - JELLYFIN_CONFIG_DIR=/etc/jellyfin
         - JELLYFIN_DATA_DIR=/var/lib/jellyfin
         - JELLYFIN_LOG_DIR=/var/log/jellyfin
       volumes:
         - /etc/jellyfin:/etc/jellyfin
         - /var/cache/jellyfin:/var/cache/jellyfin
         - /var/lib/jellyfin:/var/lib/jellyfin
         - /var/log/jellyfin:/var/log/jellyfin
         - <path-to-media>:<path-to-media>
   ```

## Migrating From Emby 3.5.2 to Jellyfin

> [!IMPORTANT]
> Direct database migration from Emby (of any version) to Jellyfin is NOT SUPPORTED.
> We have found many subtle bugs due to the inconsistent database schemas that result from trying to do this, and strongly recommend that all Jellyfin users migrating from Emby start with a fresh database and library scan.

The original procedure is provided below for reference however we cannot support it nor guarantee that a system upgraded in this way will work properly, if at all.
If anyone is interested in writing a database migration script which will correct the deficiencies in the existing database and properly import them into Jellyfin, [we would welcome it however](xref:contrib-index)!

> [!WARNING]
> While it is technically possible to migrate existing configuration of Emby version 3.5.2 or earlier, due to subtle and weird bugs reported after such attempts we do not recommend this migration.
> Emby versions 3.5.3 or 3.6+ cannot be migrated.
> Thus we recommend creating a new Jellyfin configuration and rebuilding your library instead.

Windows users may take advantage of the `install-jellyfin.ps1` script in the [Jellyfin repository](https://github.com/jellyfin/jellyfin) which includes an automatic upgrade option.

This procedure is written for Debian-based Linux distributions, but can be translated to other platforms by following the same general principles.

1. Upgrade to Emby version 3.5.2, so that the database schema is fully up-to-date and consistent.
   While this is not required, it can help reduce the possibility of obscure bugs in the database.

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

9. Mark Startup Wizard as completed - if not marked as completed then it can be a security risk especially if remote access is enabled:

   ```sh
   sudo sed -i '/IsStartupWizardCompleted/s/false/true/' /etc/jellyfin/system.xml
   ```

10. Start the `jellyfin` daemon:

   ```sh
   sudo service jellyfin start
   ```
