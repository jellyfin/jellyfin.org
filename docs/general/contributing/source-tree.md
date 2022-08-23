---
uid: contrib-source-tree
title: Source Tree
---

# Source Tree

Jellyfin is a maze of clients, plugins, and other useful projects. These source trees can serve as an excellent tool to inform new developers about the structure of several projects.

## [Jellyfin Server](https://github.com/jellyfin/jellyfin)

1. .ci: `Azure Pipelines Build definitions`
2. DvdLib: `DVD Anaylzer`
3. Emby.Dlna: `DLNA support for the server`
   - Profiles: `DLNA Profiles for clients`
4. Emby.Drawing: `image processor managing the image encoder and image cache paths`
5. Emby.Naming: `parsers for the media filenames`
6. Emby.Notifications: `listening for events and sending the associated notification`
7. Emby.Photos: `metadata provider for photos`
8. Emby.Server.Implementations: `main implementations of the interfaces`
   - ScheduledTasks: `all scheduled tasks can be found here`
9. Jellyfin.Api: `Jellyfin API`
   - Controller: `API controllers answering the Jellyfin API requests`
   - Helpers:
     - MediaInfoHelper.cs: `logic for the stream builder that determines method of playback such as Direct Play or Transcoding`
10. Jellyfin.Data: `models used in the Entity Framework Core Database schema`
11. Jellyfin.Drawing.Skia: `image manipulation like resizing images, making image collages`
12. Jellyfin.Networking: `managing network interaces and settings`
13. Jellyfin.Server.Implementations: `like Emby.Server.Implementations, implementations using the EF Core Database`
14. Jellyfin.Server: `main server project that starts the whole server`
15. MediaBrowser.Common: `common methods used throughout the server`
16. MediaBrowser.Controller: `interface definitions`
17. MediaBrowser.LocalMetadata: `metadata provider and saver for local images, local Collections and Playlists`
18. MediaBrowser.MediaEncoding: `managing ffmpeg while interacting with the media files`
19. MediaBrowser.Model: `defining models used throughout the server`
20. MediaBrowser.Providers: `managing multiple metadata sources`
21. MediaBrowser.XbmcMetadata: `metadata provider and saver for local .nfo files`
22. RSSDP: [RSSDP library](https://github.com/Yortw/RSSDP)`, including custom changes, for the Simple Service Discovery (SSDP) protocol`
23. apiclient: `files used for generating the axios API client`
24. deployment: `files used while building Jellyfin for different plattforms`
25. tests: `multiple Unit Test projects testing Jellyfin functionality`
26. Dockerfile.* `Dockerfiles defining the Jellyfin Docker image`

## [Web Client](https://github.com/jellyfin/jellyfin-web)

1. src:
    - assets: `images, styles, splash screens, and any other static assets`
        - css: `all global stylesheets used throughout the client`
        - img: `images for things like device icons and logos`
        - splash: `progressive web apps will show these splash screens`
    - components: `custom elements used for different sections of the user interface`
        - playerstats.js: `display playback info in browsers and other clients that include the web source`
    - controllers: `scripts that handle the logic for different pages`
    - elements: `custom UI components that are used globally such as buttons or menus`
    - legacy: `currently used for all polyfills and scripts related to backwards compatibility`
    - libraries: `dependencies that we eventually want to remove and include during the build step`
    - scripts: `any script that isn't tied to a UI element or page but rather general functionality`
    - strings: `translations for the entire interface`
    - themes: `custom and bundled themes can be found here in their own directories`

## [Android](https://github.com/jellyfin/jellyfin-android)

1. res:
   - android:
2. src:
   - NativeShell:
     - res:
     - src:
       - RemotePlayerService.java: `handles the notification tile that can control playback`
     - www:
   - cordova:

## [Android TV](https://github.com/jellyfin/jellyfin-androidtv)

1. app:
   - src:
     - main:
       - java/org/jellyfin/androidtv:
         - constant: `constants/enums`
         - data:
           - compat: `classes ported from old apiclient to maintain compatibility in the app (Deprecated should be replaced/removed)`
           - eventhandling: `API webservice event handling`
           - model: `various data models`
           - querying: `extensions to the querying package in the apiclient (Should probably be replaced/removed)`
           - repository: `data repositories for shared access`
         - di: `dependency injection modules`
         - integration: `Android TV homescreen channel integrations`
         - preference: `interface for Android shared preferences`
         - ui:
           - browsing: `views for browsing items (rows, grids, etc.)`
           - home: `home screen views`
           - itemdetail: `item detail views`
           - itemhandling: `BaseItem views`
           - livetv: `live TV views`
           - playback: `media player views`
           - preference: `app preferences/settings views`
           - presentation: `presenters from MVP architecture`
           - search: `search views`
           - shared: `shared code for UI classes`
           - startup: `authentication views`
         - util: `various utilities`
       - res: `Android resource files for XML layouts, translations, images, etc.`

## [Kodi](https://github.com/jellyfin/jellyfin-kodi)

1. jellyfin_kodi
   - database: `manipulating the local Jellyfin sqlite database`
   - dialogs: `code behind popup menus for user interaction`
   - entrypoint: `main add-on settings page`
   - helper: `small helper functions, mostly formatting or reused functions`
   - jellyfin: `interacting with the server`
   - objects:
     - kodi: `handling local Kodi media types and database`
2. resources:
   - language: `string files for localization`
   - skins: `design of popup menus for user interaction`
