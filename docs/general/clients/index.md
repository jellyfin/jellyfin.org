---
uid: clients-index
title: Clients
---

# Clients

Clients connect your devices to your Jellyfin server and let you view your content on any supported device. You can find a list of clients below with their current development status.

> [!NOTE]
> If you are interested in helping out, please see our [contribution guide](xref:contrib-index) and feel free to contact us for more information!
>
> If they aren't on this page, some clients can be found at the [jellyfin-archive organization on GitHub](https://github.com/jellyfin-archive).

Do you have a client that interfaces with Jellyfin and want to see it listed here? Please [submit a pull request](https://github.com/jellyfin/jellyfin-docs)!

## Browsers

Our goal is to provide support for the two most recent versions of these browsers.

- Firefox
- Firefox ESR
- Chrome
- Chrome for Android
- Safari for MacOS and iOS
- Edge

Older browsers may be supported as a result of the needs of specific web-based clients, but full functionality is not guaranteed on their desktop version.

## Android

### Jellyfin for Android

The official Jellyfin Android app, which supports Android 5 and above.

**Status:** ⭐ Active

**Links:**

<a href="https://play.google.com/store/apps/details?id=org.jellyfin.mobile">
<img width="153" src="https://jellyfin.org/images/store-icons/google-play.png" alt="Jellyfin on Google Play"/>
</a>
<a href="https://www.amazon.com/gp/aw/d/B081RFTTQ9">
<img width="153" src="https://jellyfin.org/images/store-icons/amazon.png" alt="Jellyfin on Amazon Appstore"/>
</a>
<a href="https://f-droid.org/en/packages/org.jellyfin.mobile/">
<img width="153" src="https://jellyfin.org/images/store-icons/fdroid.png" alt="Jellyfin on F-Droid"/>
</a>

- [GitHub](https://github.com/jellyfin/jellyfin-android)
- [Download](https://jellyfin.org/clients/#android)

### Jellyfin for Android TV and Amazon Fire TV

Jellyfin Android TV is the official Jellyfin client for Android TV, NVIDIA Shield, and Amazon Fire TV devices.

**Status:** ⭐ Active

**Links:**

<a href="https://play.google.com/store/apps/details?id=org.jellyfin.androidtv">
<img width="153" src="https://jellyfin.org/images/store-icons/google-play.png" alt="Jellyfin for Android TV on Google Play"/>
</a>
<a href="https://www.amazon.com/gp/aw/d/B07TX7Z725">
<img width="153" src="https://jellyfin.org/images/store-icons/amazon.png" alt="Jellyfin for Android TV on Amazon Appstore"/>
</a>

- [GitHub](https://github.com/jellyfin/jellyfin-androidtv)
- [Download](https://jellyfin.org/clients/#androidtv)

### Gelli

Native music player for Android devices with transcoding support, gapless playback, favorites, playlists, and many other features. The code is based on a relatively recent version of Phonograph and contributions are welcome!

**Status:** ⭐ Active, 3rd-Party

**Links:**

<a href="https://f-droid.org/packages/com.dkanada.gramophone/">
<img width="153" src="https://jellyfin.org/images/store-icons/fdroid.png" alt="Gelli on F-Droid"/>
</a>

- [GitHub](https://github.com/dkanada/gelli)
- [Download](https://github.com/dkanada/gelli/releases)

### Yatse

A third party remote control for Jellyfin with support for Chromecast playback.

**Status:** ⭐ Active, 3rd-Party

**Links:**

- [Website](https://yatse.tv)

### MrMC

A third party app with direct play and HDR support. Available on Android, Android TV, Fire TV, and iOS/Apple TV.

**Status:** ⭐ Active, 3rd-Party

**Links:**

- [Website](https://mrmc.tv)

### Findroid

Findroid is a third-party Android application for Jellyfin that provides a native user interface to browse and play movies and series.

**Status:** ⭐ Active, 3rd-Party

**Links:**

<a href='https://play.google.com/store/apps/details?id=dev.jdtech.jellyfin'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="153"/>
</a>
<a href='https://apt.izzysoft.de/fdroid/index/apk/dev.jdtech.jellyfin'><img alt='Get it on IzzyOnDroid' src='https://gitlab.com/IzzyOnDroid/repo/-/raw/master/assets/IzzyOnDroid.png' width="153"/>
</a>

- [Github](https://github.com/jarnedemeulemeester/findroid)

## Roku

### Jellyfin for Roku

The official Jellyfin Roku app.

**Status:** ⭐ Active

**Links:**

<a href='https://channelstore.roku.com/details/592369/jellyfin'><img alt='Get it on the Roku Store' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Roku_logo.svg/1280px-Roku_logo.svg.png' width="200"/></a>

- [GitHub](https://github.com/jellyfin/jellyfin-roku)

## Cross-Platform Clients

### Jellyfin Media Player

Desktop client using jellyfin-web with embedded MPV player. Supports direct play of most file
formats on Windows, Mac OS, and Linux. Media plays within the same window using the
jellyfin-web interface unlike Jellyfin Desktop. Supports audio passthrough. Based on Plex Media Player.

**Status:** ⭐ Active

**Links:**

- [Github](https://github.com/jellyfin/jellyfin-media-player)
- [Binary Releases](https://github.com/jellyfin/jellyfin-media-player/releases)
- [Flathub](https://flathub.org/apps/details/com.github.iwalton3.jellyfin-media-player)

### Jellyfin Audio Player

A third party standalone music streaming app for iOS and Android. This client includes full support for background audio and casting.

**Status** ✅ In Development, 3rd-Party

**Links:**

- [GitHub](https://github.com/leinelissen/jellyfin-audio-player)
- [TestFlight install for iOS](https://testflight.apple.com/join/cf2AMDpx)
- [Download for Android](https://github.com/leinelissen/jellyfin-audio-player/releases)

### Jellyfin MPV Shim

Provides background cast client using MPV. The client has support for direct play of advanced codecs such as 10 bit HEVC with subtitles, many customizable options, and whole-season subtitle preference support.

**Status:** ⭐ Active

**Links:**

- [Github](https://github.com/jellyfin/jellyfin-mpv-shim)
- [Windows Release](https://github.com/jellyfin/jellyfin-mpv-shim/releases)
- [Flathub](https://flathub.org/apps/details/com.github.iwalton3.jellyfin-mpv-shim)

### Jellycli

Terminal player for Jellyfin, only for music at the moment.

**Status:** ⭐ Active, 3rd-Party

**Links:**

- [GitHub](https://github.com/tryffel/jellycli)

### Jellyfin-CLI

Terminal player for Jellyfin, written in Python.

**Status:** ⭐ Active, 3rd-Party

**Links:**

- [GitHub](https://github.com/marios8543/Jellyfin-CLI)
- [PyPI](https://pypi.org/project/Jellyfin-CLI)

### Jellyamp

Desktop client for listening to music from a Jellyfin server.

**Status:** ⭐ Active, 3rd-Party

**Links:**

- [Github](https://github.com/m0ngr31/jellyamp)

### Preserve

Music client inspired by players such as foobar2000 or Clementine. Available on desktop or web.

**Status:** ⭐ Active, 3rd-Party

**Links:**

- [GitLab](https://gitlab.com/tonyfinn/preserve)
- [Browser](https://preserveplayer.com)

### Finamp

A third party app for music playback. Supports offline mode/downloading songs.

**Status** ⭐ Active, 3rd-Party

**Links:**

<a href="https://play.google.com/store/apps/details?id=com.unicornsonlsd.finamp">
<img width="153" src="https://jellyfin.org/images/store-icons/google-play.png" alt="Finamp on Google Play"/>
</a>
<a href="https://apps.apple.com/us/app/finamp/id1574922594">
<img width="153" src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png" alt="Download on the App Store"/>
</a>
<a href="https://f-droid.org/packages/com.unicornsonlsd.finamp/">
<img width="153" src="https://jellyfin.org/images/store-icons/fdroid.png" alt="Finamp on F-Droid"/>
</a>

- [GitHub](https://github.com/UnicornsOnLSD/finamp)

## Web

### Web Scrobbler

Extension for browsers based on Chromium and Firefox that allows scrobble services like libre.fm and last.fm.

**Status:** ⭐ Active, 3rd-Party

**Links:**

- [GitHub](https://github.com/web-scrobbler/web-scrobbler)
- [Website](https://web-scrobbler.github.io)

## Linux

### Tauon Music Box

Tauon Music Box is a modern streamlined music player for desktop with a minimal interface that's packed with features! An emphasis on playlists and direct file importing puts you in control of your music collection.

**Status:** ⭐ Active, 3rd-Party

**Links:**

- [GitHub](https://github.com/Taiko2k/TauonMusicBox)
- [Flatpak](https://flathub.org/apps/details/com.github.taiko2k.tauonmb)
- [Website](https://tauonmusicbox.rocks)

### jftui

A terminal client for Jellyfin built as a REPL interface, that uses mpv for multimedia playback.

**Status:** ⭐ Active, 3rd-Party

**Links:**

- [GitHub](https://github.com/Aanok/jftui)

## Apple

### Jellyfin for iOS

The official Jellyfin iOS client.

**Status:** ⭐ Active

**Links:**

<a href='https://apps.apple.com/us/app/jellyfin-mobile/id1480192618'><img alt='Download on the App Store' src='https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png'/></a>

- [GitHub](https://github.com/jellyfin/jellyfin-expo)

### SwiftFin for iOS/tvOS

The Jellyfin app rewritten in Swift in order to support HDR and direct play capabilities for multiple formats.

**Status:** ✅ In Development

**Links:**

<a href='https://testflight.apple.com/join/oZd0QzWv'><img height='70' alt='Join the Beta on TestFlight' src='https://anotherlens.app/testflight-badge.png'/></a>

- [GitHub](https://github.com/jellyfin/SwiftFin)

### Infuse for iOS/Apple TV

A third party client with HDR support and direct play capabilities for multiple formats.

**Status:** ⭐ Active, 3rd-Party

**Links:**

<a href='https://apps.apple.com/app/id1136220934?mt=8'><img alt='Download on the App Store' src='https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png'/></a>

- [Website](https://firecore.com/infuse)

### MrMC for iOS/Apple TV

A third party app with direct play and HDR support. Available on iOS and Apple TV.

**Status:** ⭐ Active, 3rd-Party

**Links:**

- [Website](https://mrmc.tv)

## Kodi

### Jellyfin for Kodi

Kodi thick client for Jellyfin. This add-on syncs your Jellyfin metadata into Kodi's local database for a more native feel.

**Status:** ⭐ Active

**Links:**

- [GitHub](https://github.com/jellyfin/jellyfin-kodi)
- [Installing](xref:clients-kodi)

### JellyCon

Kodi thin client for Jellyfin. This add-on is fully dynamic and allows for fast user switching and is compatible with other Kodi sources.

**Status:** ⭐ Active

**Links:**

- [GitHub](https://github.com/jellyfin/jellycon)
- [Installing](xref:clients-kodi)

## LG WebOS

### Jellyfin for WebOS

The official Jellyfin WebOS app.

**Status:** ✅ In Development

**Links:**

- [GitHub](https://github.com/jellyfin/jellyfin-webos)

## Mopidy

### Mopidy-Jellyfin

An official plugin for Mopidy that uses Jellyfin as a backend.

**Status:** ⭐ Active

**Links:**

- [GitHub](https://github.com/jellyfin/mopidy-jellyfin)
- [Installing](xref:clients-mopidy)

## Samsung TV

### Jellyfin for Tizen

The official Jellyfin Samsung TV client for TVs running Tizen (2015 and above models).

**Status:** ✅ In Development

**Links:**

- [GitHub](https://github.com/jellyfin/jellyfin-tizen)

## UWP

### Jellyfin UWP Client

A wrapper around Jellyfin's web interface for UWP devices (Windows 10, Windows Phone 10, Xbox One, Windows IOT, etc.)

**Status:** ✅ In Development

**Links:**

- [GitHub](https://github.com/jellyfin/jellyfin-uwp)

### Videotape

A 3rd party UWP media player with support for Jellyfin.

**Status:** ⭐ Active, 3rd-Party

**Links:**

<a href='//www.microsoft.com/store/productId/9nlvh2ll4p1z?cid=storebadge&ocid=badge'><img alt='Get it from Microsoft' src='https://developer.microsoft.com/en-us/store/badges/images/English_get-it-from-MS.png' width="200"/></a>

- [Website](https://usuaia.com/videotape)

## Volumio

### Jellyfin for Volumio

A plugin for Volumio that uses Jellyfin as a backend.

**Status:** ⭐ Active

**Links:**

- [GitHub](https://github.com/patrickkfkan/volumio-jellyfin)

## Discord

### Discord Music Bot

A Discord bot that allows playing your Jellyfin music library in Discord voice channels.

**Status:** ⭐ Active

**Links:**

- [GitHub](https://github.com/kgt1/jellyfin-discord-music-bot)

## Popcorn Hour / Syabas

### Jellyfin-NMT

A proxy that generates YAMJ style HTML compatible with A-100/A-110 Popcorn Hour Network Media Tank devices.

**Status:** ⭐ Active

**Links:**

- [GitHub](https://github.com/SenorSmartyPants/jellyfin-nmt)
