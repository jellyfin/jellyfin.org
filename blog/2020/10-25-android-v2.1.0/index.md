---
title: 'Android v2.1.0 - Jellyfin in your car!'
description: 'Listen to your music while driving with the new Android update'
authors: nielsvanvelzen
date: 2020-10-25
slug: android-v2.1.0
---

Jellyfin for Android version 2.1 is here with support for Android Auto.

<!-- truncate -->

A new version of the Android app: version 2.1 has just been released! This update contains some quality of life improvements, some bugfixes and new features.
It's been only a few weeks since 2.0 but we couldn't wait to bring these new exiting changes to you. Let's start with the most awesome feature.

## Android Auto

Starting with this update we now support playing music in cars. This change was contributed by [@Spacetech](https://github.com/Spacetech) and we are excited to release it. Right now it supports browsing your music library in multiple categories: latest, albums, artists, songs and genres. It allows shuffling your albums and shows thumbnails when available.

<video controls loop autoPlay muted playsInline className="inline justify" height="500">
 <source src={require("./android-auto.webm").default} type="video/webm" />
</video>

_**Note:** since we do not have offline-support at the moment all music playback needs an active network connection to work. Be aware this may cause additional charges in your mobile plan._

## Connectivity issues

Some users reported issues when connecting to their server. We've made some improvements to fix those problems:

- When your server uses an outdated version a warning is shown.
- If the webui fails to load we now show a proper error allowing you to change the server address.
- Users with self-signed certificates should be able to use the app again.
- And lastly, when your device name includes special characters they are now removed to fix the "endless loading" issue.

## Playback improvements

The native video player (ExoPlayer) now supports zooming using gestures so you can remove the black bars from the video. We made some changes to which audio codecs are supported to prevent unnecessary transcoding. We also made some big changes to the structure of the app to fix an issue where you weren't able to return to the app after leaving Picture-in-Picture mode.

There is a new option in the settings to select which external player to use. The listed players should also report playback status back to Jellyfin to track what you watch and allow the app to resume playback. Issues with subtitles (especially external subtitles) should now be less common.

## F-Droid

We have added the required metadata for F-Droid to our repository. We are currently working with the F-Droid team to get the app in their repository - we will post an additional announcement when this is ready.

## Release Notes

Full release notes available on [GitHub](https://github.com/jellyfin/jellyfin-android/releases/tag/v2.1.0).

## Download Now

<a className="margin-right--md" href="https://play.google.com/store/apps/details?id=org.jellyfin.mobile">
  <img width="153" alt="Jellyfin on Google Play" src="/images/store-icons/google-play.png" />
</a>

<a href="https://www.amazon.com/gp/product/B081RFTTQ9">
  <img width="153" alt="Jellyfin on Amazon App Store" src="/images/store-icons/amazon.png" />
</a>

Direct downloads are always available from [our repository](https://repo.jellyfin.org/releases/client/android/).

## Contributors

We are grateful to all contributors this release:

- [@Maxr1998](https://github.com/Maxr1998) - [Sponsor](https://github.com/sponsors/Maxr1998)
- [@nielsvanvelzen](https://github.com/nielsvanvelzen) - [Sponsor](https://github.com/sponsors/nielsvanvelzen)
- [@vitorsemeano](https://github.com/vitorsemeano)
- [@ferferga](https://github.com/ferferga) - [Sponsor](https://github.com/sponsors/ferferga)
- [@CarlosOlivo](https://github.com/CarlosOlivo)
- [@Spacetech](https://github.com/Spacetech)
- [@h1dden-da3m0n](https://github.com/h1dden-da3m0n)
- [@IzzySoft](https://github.com/IzzySoft)
