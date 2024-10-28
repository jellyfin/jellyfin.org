---
uid: upgrades-and-downgrades
title: Upgrades & Downgrades
description: Upgrade and downgrade to and from Unstable releases
sidebar_position: 2
---

This document provides details on upgrading and downgrading between Stable and Unstable releases, and why you might want to do so.

## Stable vs. Unstable

Which install type to pick depends on your needs; ultimately, Unstable is for testing new things, while Stable is for running a server for others to use reliably.

- Stable provides the most consistent and predictable user experience. A particular major release (e.g. 10.8.z, 10.9.z) will not introduce, remove, or change major features or functionality (with minor caveats for security). Bugfixes are provided in point releases, which are released as needed during the lifecycle of the major release in response to bugfixes and security advisories. Most users should generally use Stable releases, as this will ensure maximum uptime and consistency for your end users.

- Unstable provides the most up-to-date, cutting edge features, but may have rapid and unpredictable breaking changes or serious bugs, and has more limited client support as API changes are made over time. Unstable releases are provided via weekly binary builds on Monday mornings around 5:00 AM UTC, or by [building your own packages from the `master` code branches](https://github.com/jellyfin/jellyfin-packaging).

In addition, Unstable is used to test forthcoming releases during the major release cycle since we provide no beta builds. If you want to help us test upcoming releases - and we ask that anyone able to do so does - you will need to run the Unstable builds for at least some amount of time, before switching back to Stable on release.

### What do you mean "no beta builds"

Because of the massive complexity of packaging Jellyfin for multiple unique platforms, not to mention 3rd party builds providing several more, with our 10.9.0 release and beyond we have decided not to provide explicitly tagged pre-release builds. This is quite unusual for free-and-open-source software, but is a practical necessity to streamline our major releases and increase their cadence.

To compensate, we use a feature freeze window on major breaking changes before major releases, and leverage our scheduled weekly Unstable builds as an alternative. Before each major release, we will announce a schedule of the upcoming Unstable releases and how to map them to hypothetical "beta" and "release candidate" pre-release versions. For instance, with a 4 week freeze, we might consider the first 3 weeks of Unstable builds as "beta" and the last week as "release candidate". If you want to get in some early testing, you can try it out in the first 3 weeks; if you'd rather wait until things are mostly settled, wait until the last week.

While this system isn't perfect, it does streamline versioning significantly, helps us avoid a 3rd repository component/label, and helps give Unstable builds a bit more love around releases, while having very little additional administrative overhead versus explicit pre-release versions.

## Warnings & Notes

### Make Backups

Generally, **once you've upgraded to an Unstable version** from a given Stable version, **you can't simply downgrade back to that original Stable version**. This is because Unstable versions will likely have made changes to the database schemas, configuration entries, and other metadata, which the older Stable version cannot handle.

The only way to downgrade from an Unstable to an older Stable is to restore from a backup, or to completely clear out your data and start again. The exception is migrating from an Unstable to a newly released Stable major version at the time that Stable version is released.

**Always make a backup of your instance data and configuration directories before upgrading to Unstable for any reason.** You never know what might go wrong, be it a failure in migrations, a breaking bug that forces a downgrade back, or some other corruption. This applies even for testing right before a Stable release. It is always better to have a backup ready, perform some testing immediately after upgrading, and revert if things aren't working right - after reporting your bug, of course!

You can utilize certain plugins to help with this, for instance the Trakt plugin to synchronize watched status, but this will not necessarily preserve everything. So be careful here, and know the limitations before proceeding.

Follow [the process listed in the documentation here](/docs/general/administration/backup-and-restore) for more details.

### Disable Automatic Updates on Unstable

Running with automatic updates while on Unstable, or during a pre-release testing of Unstable, can cause problems. Always ensure you update manually and test things out afterwards. We generally recommend against automatic updates _in general_ even on Stable, as it can result in missed release notes from new versions, but we understand how desirable this can be; avoid the temptation when running Unstable though to avoid missing important changes.

## Upgrading from Stable to Unstable

The exact details of this process depend on your platform and installation method. This document will detail the two most popular: Debian/Ubuntu packages via our repository, and Docker. The process is generally the same for others (e.g. manual downloads, Windows installers, etc.) with the exact details changed; for the specifics of individual platforms, please see the child articles under [Testing Jellyfin Server](/docs/general/testing/server).

We assume you are already running Jellyfin Stable releases.

### Plugins (Stable to Unstable)

We provide plugins for Stable and Unstable releases in separate repositories with separate versioning. This is done to avoid accidental incompatibilities and allow us to release Unstable plugins at a much quicker cadence in response to ongoing changes in the `master` branch. You will need to switch to the Unstable plugin repository if you use any plugins. If you do this before upgrading, plugins will be automatically upgraded afterwards.

Plugins are versioned in such a way that Unstable plugins will seamlessly upgrade from the latest Stable plugin version to an Unstable plugin version, and then permit a seamless upgrade from the Unstable version to the next Stable version (e.g. 13.0.0.0 Stable -> 13.2024.0429.0 Unstable -> 14.0.0.0 Stable).

1. In your Jellyfin server instance, navigate to the Dashboard -> Plugins -> Repositories.
2. Delete the default "Stable" repository by clicking the trashcan button.
3. Add a new repository with the "+" button. Name the repository whatever you wish, and use the following as the Repository URL.

   ```sh
   https://repo.jellyfin.org/files/plugin-unstable/manifest.json
   ```

### Debian/Ubuntu Repositories (Stable to Unstable)

1. Edit your `/etc/apt/sources.list.d/jellyfin.sources` and add `unstable` to the `Components:` line. **Do not** remove `main`, simply add `unstable` after it.

   ```sh
   ...
   Components: main unstable
   ...
   ```

2. Run `sudo apt-get update`.
3. Run `sudo apt-get upgrade` and apply the upgraded Jellyfin packages. Jellyfin will automatically restart.
4. Once Jellyfin starts, if you updated your plugin repository above before upgrading, plugins will automatically upgrade to their newer Unstable versions. Wait until Jellyfin finishes starting, then restart the service again (either via the UI's "Restart" button or "systemctl" commands) to finish the upgrade.

### Docker (Stable to Unstable)

1. Stop your Jellyfin container.
2. Pull the `jellyfin/jellyfin:unstable` image tag.
3. Start a new Jellyfin container with the updated image.

## Upgrading from Unstable to Stable upon Release

When a new major version of Jellyfin is released, it is possible - until the next published Unstable release - to directly upgrade from Unstable to the new Stable. This provides a migration path for Unstable testers before the release to move to the actual Stable release.

As part of the release process, Unstable weekly builds will be temporarily disabled for 1-2 weeks to provide a window for this to occur, after which they will resume as normal. If you wish to remain on Unstable, you can simply wait this out, otherwise follow the process here to "upgrade" back to the new Stable version.

The exact details of this process depend on your platform and installation method. This document will detail the two most popular: Debian/Ubuntu packages via our repository, and Docker. The process is generally the same for others (e.g. manual downloads, Windows installers, etc.) with the exact details changed; for the specifics of individual platforms, please see the child articles under ["Testing Jellyfin Server"](/docs/general/testing/server).

We assume you are already running Jellyfin Unstable releases.

### Plugins (Unstable to Release)

We provide plugins for Stable and Unstable releases in separate repositories with separate versioning. You will need to switch (back) to the Stable plugin repository if you use any plugins, to avoid installing future incompatible versions of the Unstable plugins onto your Stable install. Note that plugins may not be available for a few hours to a few days after a new release, depending on the plugin; if they are already ready and you follow these steps, they should automatically upgrade when switching back to Stable.

Plugins are versioned in such a way that Unstable plugins will seamlessly upgrade from the latest Stable plugin version to an Unstable plugin version, and then permit a seamless upgrade from the Unstable version to the next Stable version (e.g. 13.0.0.0 Stable -> 13.2024.0429.0 Unstable -> 14.0.0.0 Stable).

1. In your Jellyfin server instance, navigate to the Dashboard -> Plugins -> Repositories.
2. Delete the "Unstable" repository by clicking the trashcan button.
3. Add a new repository with the "+" button. Name the repository whatever you wish ("Stable" is the default), and use the following as the Repository URL.

   ```sh
   https://repo.jellyfin.org/files/plugin/manifest.json
   ```

### Debian/Ubuntu (Unstable to Release)

1. Edit your `/etc/apt/sources.list.d/jellyfin.sources` and remove `unstable` from the `Components:` line.

   ```sh
   ...
   Components: main
   ...
   ```

2. Run `sudo apt-get update`.
3. Run `sudo apt install jellyfin=<version> jellyfin-server=<version> jellyfin-web=<version>`.
   Replace `<version>` with the desired version number, for example, `10.9.1+ubu2204`. This will reinstall the Stable version over top of the Unstable version. Jellyfin will automatically restart.

   Example: `sudo apt install jellyfin=10.9.1+ubu2204 jellyfin-server=10.9.1+ubu2204 jellyfin-web=10.9.1+ubu2204`

### Docker (Unstable to Release)

1. Stop your Jellyfin container.
2. Pull the `jellyfin/jellyfin:latest` image tag.
3. Start a new Jellyfin container with the updated image.

### Post-Install (Unstable to Release)

1. Once updated plugins become available, Jellyfin should automatically upgrade these to the next stable version as mentioned above. If you find any that do not, try to upgrade them manually.

## Downgrading from Unstable to an older Stable

As mentioned above, this process requires restoring from a backup taken before you first upgraded to Unstable.

The exact details of this process depend on your platform and installation method. This document will detail the two most popular: Debian/Ubuntu packages via our repository, and Docker. The process is generally the same for others (e.g. manual downloads, Windows installers, etc.) with the exact details changed; for the specifics of individual platforms, please see the child articles under [Testing Jellyfin Server](/docs/general/testing/server).

We assume you are already running Jellyfin Unstable releases.

### Debian/Ubuntu (Unstable to Old Stable)

1. Stop Jellyfin using the service manager (`sudo service jellyfin stop` or similar). Ensure Jellyfin has actually stopped.
2. Restore your backup of the configuration and data directories. Ensure you remove the current contents entirely (or move it out of the way) first.
3. Edit your `/etc/apt/sources.list.d/jellyfin.sources` and remove `unstable` from the `Components:` line.

   ```sh
   ...
   Components: main
   ...
   ```

4. Run `sudo apt-get update`.
5. Run `sudo apt-get install --reinstall jellyfin jellyfin-server jellyfin-web`. This will forcibly reinstall the new Stable version over top of the Unstable version. Jellyfin should automatically start; if not, start Jellyfin using the service manager (`sudo service jellyfin start` or similar).

### Docker (Unstable to Old Stable)

1. Stop your Jellyfin container.
2. Restore your backup of the configuration and data directories. Ensure you remove the current contents entirely (or move it out of the way) first.
3. Pull the `jellyfin/jellyfin:latest` image tag.
4. Start a new Jellyfin container with the updated image.

### Post-Install (Unstable to Old Stable)

1. Your backup should have restored your original plugin repository and plugin versions. If not, you may need to remove any Unstable plugins and reinstall them; configuration will be preserved here.
