---
uid: contrib-source-tree
title: Source Tree
---

# Source Tree

Jellyfin is a maze of clients, plugins, and other useful projects. These source trees can serve as an excellent tool to inform new developers about the structure of several projects.

## [Jellyfin Server](https://github.com/jellyfin/jellyfin)

1. .config: `DotNet version folder`
2. .devcontainer: `docker containers configuration to provide a featured development environment`
3. .github: `contains GitHub-specific files like workflows and actions`
4. .vscode: `workspace settings for Visual Studio code`
5. Emby.Naming: `parsers for the media filenames`
6. Emby.Photos: `metadata provider for photos`
7. Emby.Server.Implementations: `main implementations of the interfaces`
   - ScheduledTasks: `all scheduled tasks can be found here`
8. Jellyfin.Api: `Jellyfin API`
   - Controller: `API controllers answering the Jellyfin API requests`
   - Helpers:
     - MediaInfoHelper.cs: `logic for the stream builder that determines method of playback such as Direct Play or Transcoding`
9. Jellyfin.Data: `models used in the Entity Framework Core Database schema`
10. Jellyfin.Server.Implementations: `like Emby.Server.Implementations, implementations using the EF Core Database`
11. Jellyfin.Server: `main server project that starts the whole server`
12. MediaBrowser.Common: `common methods used throughout the server`
13. MediaBrowser.Controller: `interface definitions`
14. MediaBrowser.LocalMetadata: `metadata provider and saver for local images, local Collections and Playlists`
15. MediaBrowser.MediaEncoding: `managing ffmpeg while interacting with the media files`
16. MediaBrowser.Model: `defining models used throughout the server`
17. MediaBrowser.Providers: `managing multiple metadata sources`
18. MediaBrowser.XbmcMetadata: `metadata provider and saver for local .nfo files`
19. deployment/unraid/docker-templates: `docker template for unraid`
20. fuzz: `fuzz testing`
21. src: `source code directory where the main project files reside`
    - Emby.Drawing: image processor managing the image encoder and image cache paths
    - Jellyfin.Drawing.Skia: image manipulation like resizing images, making image collages
    - Jellyfin.Extensions: jellyfin extensions
    - Jellyfin.LiveTv: jellyfin LiveTv
    - Jellyfin.MediaEncoding.Hls: `jellyfin media encoding in HLS`
    - Jellyfin.MediaEncoding.Keyframes: jellyfin media encoding Keyframes
    - Jellyfin.Networking: `managing network interaces and settings`
22. tests: `multiple Unit Test projects testing Jellyfin functionality`

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
