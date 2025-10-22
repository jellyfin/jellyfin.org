---
uid: jellyfin-Android
title: Jellyfin for Android
---
import Link from '@docusaurus/Link';

# Jellyfin for Android

[Jellyfin for Android](https://github.com/jellyfin/jellyfin-android) is an Android app that connects to Jellyfin instances and integrates with the [official web client](https://github.com/jellyfin/jellyfin-web). It is compatible with most android devices including Android TV, Phones and Tablets.

## Features

- Android Native integration of the Web client
- Chromecast support (when installed from proprietary release flavor)
- Saved Credentials for multiple server/users
- Android auto for music only **limited functionality**

## Release Flavors

There are two flavors (variants) of the Jellyfin Android app:

- The proprietary version comes with Google Chromecast support
- The libre version comes without Google Chromecast support

The proprietary version is available on [Google Play](https://play.google.com/store/apps/details?id=org.jellyfin.mobile) and the [Amazon Appstore](https://www.amazon.com/gp/aw/d/B081RFTTQ9), while the libre version is available on [F-Droid](https://f-droid.org/en/packages/org.jellyfin.mobile/).

## Requirements

:::caution
Since the Android app is just an Client for a Jellyfin server, all of these instructions assume that you already have a server up and running.
[Set it up now](../installation/index.mdx) if you haven't already.
:::

- A Jellyfin server running version 10.10 or newer.
- Device running android.
- Ability to install apps either through Google Play, Amazon Appstore or to direct install APK.
- Disabling Battery optimizations for the application (if you wish to play media while the screen is off)

## Setup

When First launching the application, you will be presented with the Connection page.
You will be prompted to enter the Host URL to reach your jellyfin server. ex: [http://your_local_IP_address:8096](http://your_local_IP_address:8096 )

On newer android versions, you may observe a notification that requests to disable battery optimizations, selecting OK will bring you to the OS settings in order to Allow background usage.

You must then enter your login Credentials. Checking the Remember me box will have the credentials saved to get to you media faster.
You are now ready to enjoy your media.

## Multiple Jellyfin Servers support

The Android application has the ability to store multiple server credentials and facilitate switching between them. To add other servers, access the top left menu and select Select Server. You can now enter a new server URL and login, check the Remember me box. Now when entering the Select server section, press on choose server and see all logged in servers available to choose from. Only one server can be used at a time.

## Client Settings

This section is specific to the android application and is not found on the Traditionnal web client. Changes made here only affect the installed instance of the application and not server settings.  

The Client settings can be reached through the Settings page by selecting the top left Menu button or top right user icon then settings.

Client Settings Menu layout:

### Music Player

| **Setting** | **Description** |
| :-------------------- | :----------- |
| Dismissable player notification | Make player notification removable either only when paused or always  |

### Video player

| **Setting** | **Description** |
| :----------- | :----------- |
| Video player type | Choose Video Player used for playback <ul><li>Web Player</li></ul><ul>Default HTML video player from the Web UI</ul><ul><li>Integrated Player</li></ul><ul>Based on ExoPlayer, supports more video formats and codecs, and is more integrated into the OS, supports Pip</ul><ul><li>External Player</li></ul><ul>External video playback apps like MX Player and VLC</ul>|
| Start landscape mode videos in landscape orientation| **only available when integrated player selected.**<ul>  Set initial rotation of video playback</ul>|
| Brightness and volume gestures | **only available when integrated player selected.** <ul>Enable vertical swipe gestures on video playback. The left screen area is brightness and the right screen area is volume</ul>|
| Remember display brightness | **only available when integrated player selected.**  <ul>When enabled brightness set during last playback will be used for next playback. otherwise system brightness is used as starting point</ul>|
| Background audio | **only available when integrated player selected.**     <ul>Allow playing videos in background with audio-only</ul>|
| Allow SSA/ASS subtitles in direct play | **only available when integrated player selected.**   <ul>Prevent transcoding and show subtitles with basic styling only. Advanced subtitle styling will not be available if enabled</ul>|
| External player | **only available when external player selected.**  <ul>choose which installed android application will provide the playback</ul>|
| Customize subtitle style | Change the subtitle style from Android OS settings |

### Downloads

| **Setting** | **Description** |
| ----------- | ----------- |
| Allowed Network Types | Allow downloading when on: <ul><li>WiFi Only</li></ul><ul>Media will be downloaded over WiFi only</ul><ul><li>Mobile Data</li></ul><ul>Media will be downloaded over WiFi and mobile networks</ul><ul><li>Mobile Data & Roaming</li></ul><ul>Media will be downloaded over WiFi, mobile and roaming networks</ul> |
| Download location | Set the device path where the downloaded files are saved  |

## Downloading content

:::danger
Downloading while on Mobile Data or Roaming may result in charges from your provider. You are responsible to ensure your data plan is suitable.
:::
You can download any media from your server onto the android device. on a media item press the overflow menu button (3 dots) and choose download. If a download allowed type has not been set through settings, a prompt will ask you to select from the options WiFi, Mobile data, mobile and roaming networks, see [Client settings](../clients/Jellyfin-for-Android#downloads) for more information
> NOTE:
> Jellyfin for Android is an online only media player, downloaded content requires a different player on the device for playback

## Chromecast support

is available for Proprietary flavors only [see above](../clients/Jellyfin-for-Android#release-flavors). Allows for cast of media and remote control.

## Troubleshooting

- The app is stuck on the Connect to Server screen after setup

> make sure the server is reachable, the same URL should be able to reach the server on a web browser. Note that this application does not make your server accessible outside your network, [see here](../post-install/networking/#external-access) for information about external access
