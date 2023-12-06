---
title: 'Android Developers Rejoice'
description: 'We have a brand new web wrapper for Android sans Cordova!'
authors: dkanada
date: 2020-10-05
slug: android-next
---

This will be a net benefit for users and developers alike!

<!-- truncate -->

Everyone will enjoy the native video player spearheaded by [Stampede10343](https://github.com/Stampede10343) and [vitorsemeano](https://github.com/vitorsemeano) over the course of several months.
[Maxr1998](https://github.com/Maxr1998) valiantly ported the Cordova portions to Kotlin (and a bit of Java) which means Android developers will feel right at home with the new codebase!

### Migration

The new release will be a drop-in replacement for the deprecated Cordova client, meaning you can just update from GitHub, Google Play, or Amazon App Store as you would have previously.
One minor issue is that you'll have to add your server and credentials again since we couldn't pull the information from Cordova.
Local user settings such as the theme will also be reset after the update.
Azure has also been updated so the releases will be automatically built, and Weblate now points to the new codebase.
Older versions will remain on [our repository](https://repo.jellyfin.org) for the time being but don't expect them to stay forever, so if you have some reason to stash the older APKs download them soon!

> Please note that this client has a new set of translations, so if you speak more than one language head on over to Weblate to help out the new client!

### ExoPlayer

The key feature for this release is ExoPlayer, so we've reserved a whole section for news regarding the player and its functionality.
It's currently disabled by default since there may be small issues, but it works quite well in our experience.
The main features missing at the moment are bitrate limiting and SyncPlay, but they should get added eventually.

There is a new section in the user settings for the native client from which you can enable ExoPlayer, among other options.
A toggle for the notification dismissal was also added for customization.
Of course, using ExoPlayer means support for more codecs during video playback as well!
H265 should be working without transcodes, and several other problematic codecs are now much less troublesome with the new update.

> Note that the included device profile still needs some tweaking to actually mark every codec that the phone supports as supported to the server. You can follow the progress on this at [jellyfin/jellyfin-android#28](https://github.com/jellyfin/jellyfin-android/issues/28).

### Future

The goal is to use a mobile-first interface for ExoPlayer so we can focus more on desktop for the normal web player.
Bigger, easier clickable buttons and double tap to seek are some of the changes setting the new interface apart from the HTML5 video player.
As usual, since this is a volunteer project we don't actually have set milestones, so if you want something done, the quickest method is to add it yourself!
Head over to [Matrix](https://matrix.to/#/+jellyfin:matrix.org) or Freenode and get in touch with the Android developers if you'd like to talk about adding a new feature.
Our [GitHub](https://github.com/jellyfin/jellyfin-android) is also an excellent place to discuss long term changes for the new client now that a more modern build process is in place.
