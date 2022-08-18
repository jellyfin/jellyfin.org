---
uid: server-plugins-index
title: Plugins
---

# Plugins

Jellyfin has a collection of optional plugins that can be installed to provide additional features. To create a plugin, see the [plugin template](https://github.com/jellyfin/jellyfin-plugin-template) repository.

## Installing

### Catalog

Many plugins are available in a repository hosted on our servers, which can be easily installed using the plugin catalog in the settings. At the moment many of these are still being updated frequently so the version number may not be accurate. There are several different categories that can indicate what kind of functionality the plugins may provide.

**Note to Windows Users:**
Due to currently unresolved permission issues on Jellyfin Windows installs it is not possible to update and/or uninstall plugins from the UI.
To update and/or uninstall plugins you must stop Jellyfin, navigate to the local *plugins folder* and delete the `.dll` files for the plugins you want to update and/or uninstall.

The *plugins folder* is located in different locations depending on your install:

* `%UserProfile%\AppData\Local\jellyfin\plugins` for direct installs
* `%ProgramData%\Jellyfin\Server\plugins` for tray installs

After that start Jellyfin back up, and reinstall each plugin you want to update using the above method from the catalog.
Plugin settings should be retained if you do not delete the `.xml` files from the `<direct or tray path>\plugins\configurations` folder.

**Authentication:** Add new authentication providers, such as LDAP.

**Channels:** Allow streaming remote audio or video content.

**General:** Plugins that serve general purposes, such as sync with Trakt.tv, or Kodi.

**Live TV:** Plugins that help with connecting to tuners, such as NextPVR, or TVHeadend.

**Metadata:** Scrape metadata from a new source or modify existing metadata.

**Notifications:** Allow notifications to connect to many different services, including Gotify and Slack.

### Manual

All plugins hosted on the repository can be built from source and manually added to your server as well. They just need to be placed in the plugin directory, which is something like `/var/lib/jellyfin/plugins/` on most Linux distributions. Once the server is restarted any additions should automatically show up in your list of installed plugins. If you can't see the new plugin there may be a file permission issue.

## List

### Official Plugins

#### Metadata Plugins

Manage your Anime in Jellyfin with several different metadata providers and options for organizing your collection.

##### Anilist

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-anilist.svg)](https://github.com/jellyfin/jellyfin-plugin-anilist)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-anilist.svg)](https://github.com/jellyfin/jellyfin-plugin-anilist)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-anilist.svg)](https://github.com/jellyfin/jellyfin-plugin-anilist)

Provides metadata support from [Anilist](https://anilist.co/).

**Link:**

* [Github](https://github.com/jellyfin/jellyfin-plugin-anilist)

##### Anidb

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-anidb.svg)](https://github.com/jellyfin/jellyfin-plugin-anidb)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-anidb.svg)](https://github.com/jellyfin/jellyfin-plugin-anidb)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-anidb.svg)](https://github.com/jellyfin/jellyfin-plugin-anidb)

Provides metadata support from [Anidb](https://anidb.net/).

**Link:**

* [Github](https://github.com/jellyfin/jellyfin-plugin-anidb)

##### Anisearch

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-anisearch.svg)](https://github.com/jellyfin/jellyfin-plugin-anisearch)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-anisearch.svg)](https://github.com/jellyfin/jellyfin-plugin-anisearch)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-anisearch.svg)](https://github.com/jellyfin/jellyfin-plugin-anisearch)

Provides metadata support from [Anisearch](https://www.anisearch.com/).

**Link:**

* [Github](https://github.com/jellyfin/jellyfin-plugin-anisearch)

##### Bookshelf

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-bookshelf.svg)](https://github.com/jellyfin/jellyfin-plugin-bookshelf)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-bookshelf.svg)](https://github.com/jellyfin/jellyfin-plugin-bookshelf)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-bookshelf.svg)](https://github.com/jellyfin/jellyfin-plugin-bookshelf)

Supports several different metadata providers and options for organizing your collection.

**Links:**

* [GitHub](https://github.com/jellyfin/jellyfin-plugin-bookshelf)

##### Kitsu

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-kitsu.svg)](https://github.com/jellyfin/jellyfin-plugin-kitsu)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-kitsu.svg)](https://github.com/jellyfin/jellyfin-plugin-kitsu)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-kitsu.svg)](https://github.com/jellyfin/jellyfin-plugin-kitsu)

Provides metadata support from [Kitsu](https://kitsu.io/).

* [Github](https://github.com/jellyfin/jellyfin-plugin-kitsu)

#### Fanart

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-fanart.svg)](https://github.com/jellyfin/jellyfin-plugin-fanart)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-fanart.svg)](https://github.com/jellyfin/jellyfin-plugin-fanart)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-fanart.svg)](https://github.com/jellyfin/jellyfin-plugin-fanart)

Scrape poster images for movies, shows, and artists in your library from [fanart.tv](https://fanart.tv).

**Links:**

* [GitHub](https://github.com/jellyfin/jellyfin-plugin-fanart)

#### Kodi Sync Queue

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-kodisyncqueue.svg)](https://github.com/jellyfin/jellyfin-plugin-kodisyncqueue)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-kodisyncqueue.svg)](https://github.com/jellyfin/jellyfin-plugin-kodisyncqueue)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-kodisyncqueue.svg)](https://github.com/jellyfin/jellyfin-plugin-kodisyncqueue)

Helps keep Jellyfin for Kodi in sync with the library without needing to run periodic full scans.

**Links:**

* [GitHub](https://github.com/jellyfin/jellyfin-plugin-kodisyncqueue)

#### LDAP

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-ldapauth.svg)](https://github.com/jellyfin/jellyfin-plugin-ldapauth)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-ldapauth.svg)](https://github.com/jellyfin/jellyfin-plugin-ldapauth)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-ldapauth.svg)](https://github.com/jellyfin/jellyfin-plugin-ldapauth)

Authenticate your Jellyfin users against an LDAP database, and optionally create users who do not yet exist automatically. Allows the administrator to customize most aspects of the LDAP authentication process, including customizable search attributes, username attribute, and a search filter for administrative users (set on user creation). The user, via the "Manual Login" process, can enter any valid attribute value, which will be mapped back to the specified username attribute automatically as well.

**Links:**

* [GitHub](https://github.com/jellyfin/jellyfin-plugin-ldapauth)

#### NextPVR

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-nextpvr.svg)](https://github.com/jellyfin/jellyfin-plugin-nextpvr)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-nextpvr.svg)](https://github.com/jellyfin/jellyfin-plugin-nextpvr)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-nextpvr.svg)](https://github.com/jellyfin/jellyfin-plugin-nextpvr)

Provides access to Live TV, Program Guide, and Recordings from [NextPVR](https://www.nextpvr.com/).

**Links:**

* [GitHub](https://github.com/jellyfin/jellyfin-plugin-nextpvr)

#### [Open Subtitles](xref:server-plugins-open-subtitles)

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-opensubtitles.svg)](https://github.com/jellyfin/jellyfin-plugin-opensubtitles)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-opensubtitles.svg)](https://github.com/jellyfin/jellyfin-plugin-opensubtitles)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-opensubtitles.svg)](https://github.com/jellyfin/jellyfin-plugin-opensubtitles)

Download subtitles from the internet to use with your media files from [Open Subtitles](https://www.opensubtitles.org/). You can configure the languages it downloads on a per-library basis.

**Links:**

* [GitHub](https://github.com/jellyfin/jellyfin-plugin-opensubtitles)

#### Playback Reporting

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-playbackreporting.svg)](https://github.com/jellyfin/jellyfin-plugin-playbackreporting)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-playbackreporting.svg)](https://github.com/jellyfin/jellyfin-plugin-playbackreporting)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-playbackreporting.svg)](https://github.com/jellyfin/jellyfin-plugin-playbackreporting)

Collect and show user playback statistics, such as total time watched, media watched, time of day watched and time of week watched. Can keep information for as long as you want, or can cull older information automatically. Also allows you to manually query the data collected so you can generate your own reports.

**Links:**

* [GitHub](https://github.com/jellyfin/jellyfin-plugin-playbackreporting)

#### Reports

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-reports.svg)](https://github.com/jellyfin/jellyfin-plugin-reports)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-reports.svg)](https://github.com/jellyfin/jellyfin-plugin-reports)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-reports.svg)](https://github.com/jellyfin/jellyfin-plugin-reports)

Generate reports of your media library.

**Links:**

* [GitHub](https://github.com/jellyfin/jellyfin-plugin-reports)

#### TMDb Box Sets

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-tmdbboxsets.svg)](https://github.com/jellyfin/jellyfin-plugin-tmdbboxsets)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-tmdbboxsets.svg)](https://github.com/jellyfin/jellyfin-plugin-tmdbboxsets)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-tmdbboxsets.svg)](https://github.com/jellyfin/jellyfin-plugin-tmdbboxsets)

Automatically create movie box sets based on TMDb collections. Configerable minimum number of films to be considered a boxset. Boxsets are created as collections, and includes a schedueld task to ensure that new media is automatically put into boxsets.

**Links:**

* [GitHub](https://github.com/jellyfin/jellyfin-plugin-tmdbboxsets)

#### Trakt

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-trakt.svg)](https://github.com/jellyfin/jellyfin-plugin-trakt)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-trakt.svg)](https://github.com/jellyfin/jellyfin-plugin-trakt)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-trakt.svg)](https://github.com/jellyfin/jellyfin-plugin-trakt)

Record your watched media with [Trakt](https://trakt.tv).

**Links:**

* [GitHub](https://github.com/jellyfin/jellyfin-plugin-trakt)

#### TVHeadend

[![Language](https://img.shields.io/github/languages/top/jellyfin/jellyfin-plugin-tvheadend.svg)](https://github.com/jellyfin/jellyfin-plugin-tvheadend)
[![Contributors](https://img.shields.io/github/contributors/jellyfin/jellyfin-plugin-tvheadend.svg)](https://github.com/jellyfin/jellyfin-plugin-tvheadend)
[![License](https://img.shields.io/github/license/jellyfin/jellyfin-plugin-tvheadend.svg)](https://github.com/jellyfin/jellyfin-plugin-tvheadend)

Manage TVHeadEnd from Jellyfin. Click [here](xref:server-plugins-tvheadend) for plugin support.

**Links:**

* [GitHub](https://github.com/jellyfin/jellyfin-plugin-tvheadend)

### 3rd-Party Plugins

#### Antennas

Takes your tuners in TVHeadEnd and emulates a HDHomeRun, in order to connect to Jellyfin's Live TV and DVR features. It requires additional setup and configuration, but is a useful alternative to the TVHeadEnd plugin.

**Links:**

* [GitHub](https://github.com/TheJF/antennas)

#### Merge Versions

Automatically group every repeated movie.

**Links:**

* [GitHub](https://github.com/danieladov/jellyfin-plugin-mergeversions)

#### Skin Manager

Download and manage the most popular skins.

**Links:**

* [GitHub](https://github.com/danieladov/jellyfin-plugin-skin-manager)

#### Intros

Download flashy intros from prerolls.video for your movies.

**Links:**

* [GitHub](https://github.com/dkanada/jellyfin-plugin-intros)

#### YouTube Metadata

Downloads metadata of YouTube videos with a YouTube API key.

**Links:**

* [GitHub](https://github.com/ankenyr/jellyfin-youtube-metadata-plugin)

#### Last.FM

Enables audio scrobbling to Last.FM as well as a metadata fetcher source.

**Links:**

* [GitHub](https://github.com/jesseward/jellyfin-plugin-lastfm)

#### Kinopoisk metadata plugin

Fetches metadata from <https://kinopoisk.ru>. This site is popular in the Russian-speaking community and contains almost no English-language information. Can provide movies and series rating, description, actors and staff, trailers and so on.

**Links:**

* [GitHub](https://github.com/LinFor/jellyfin-plugin-kinopoisk)

#### Shokofin

A plugin to integrate your Shoko database with the Jellyfin media server.

**Links:**

* [GitHub](https://github.com/ShokoAnime/Shokofin)

#### Ani-Sync

Ani-Sync lets you synchorinze/scrobble your Jellyfin Anime watch progress to popular services like MyAnimeList, AniList, Kitsu.

**Links:**

* [GitHub](https://github.com/vosmiic/jellyfin-ani-sync)

## Repositories

### Official Jellyfin Plugin Repositories

#### Default Repository

* Manifest
  * [https://repo.jellyfin.org/releases/plugin/manifest-stable.json](https://repo.jellyfin.org/releases/plugin/manifest-stable.json)

### 3rd-Party Plugin Repositories

#### dkanada's Repo

* Manifest
  * [https://raw.githubusercontent.com/dkanada/jellyfin-plugin-intros/master/manifest.json](https://raw.githubusercontent.com/dkanada/jellyfin-plugin-intros/master/manifest.json)
* Included Plugins
  * [Intros](https://github.com/dkanada/jellyfin-plugin-intros)

#### danieladov's Repo

* Manifest
  * [https://raw.githubusercontent.com/danieladov/JellyfinPluginManifest/master/manifest.json](https://raw.githubusercontent.com/danieladov/JellyfinPluginManifest/master/manifest.json)
* Included Plugins
  * [Merge Versions](https://github.com/danieladov/jellyfin-plugin-mergeversions)
  * [Skin Manager](https://github.com/danieladov/jellyfin-plugin-skin-manager)
  * [Theme Songs](https://github.com/danieladov/jellyfin-plugin-themesongs)

#### k-matti's Repo

* Manifest
  * [https://raw.githubusercontent.com/k-matti/jellyfin-plugin-repository/master/manifest.json](https://raw.githubusercontent.com/k-matti/jellyfin-plugin-repository/master/manifest.json)
* Included Plugins
  * [SMS Notifications](https://github.com/k-matti/jellyfin-plugin-sms)
  * [NapiSub](https://github.com/k-matti/jellyfin-plugin-napi)

#### LinFor's Repo

* Manifest
  * [https://raw.githubusercontent.com/LinFor/jellyfin-plugin-kinopoisk/master/dist/manifest.json](https://raw.githubusercontent.com/LinFor/jellyfin-plugin-kinopoisk/master/dist/manifest.json)
* Included Plugins
  * [Kinopoisk metadata plugin](https://github.com/LinFor/jellyfin-plugin-kinopoisk)

#### ShokoAnime's Repo

* Manifest
  * [https://raw.githubusercontent.com/ShokoAnime/Shokofin/master/manifest.json](https://raw.githubusercontent.com/ShokoAnime/Shokofin/master/manifest.json)
* Included Plugins
  * [Shokofin](https://github.com/ShokoAnime/Shokofin)

#### 9p4's Single-Sign-On (SSO) Repo

* Manifest
  * [https://raw.githubusercontent.com/9p4/jellyfin-plugin-sso/manifest-release/manifest.json](https://raw.githubusercontent.com/9p4/jellyfin-plugin-sso/manifest-release/manifest.json)
* Included Plugins
  * [9p4's Single Sign On Plugin](https://github.com/9p4/jellyfin-plugin-sso)

#### Ani-Sync Repo

* Manifest
  * [https://raw.githubusercontent.com/vosmiic/jellyfin-ani-sync/master/manifest.json](https://raw.githubusercontent.com/vosmiic/jellyfin-ani-sync/master/manifest.json)
* Included Plugins
  * [Ani-Sync](https://github.com/vosmiic/jellyfin-ani-sync)
