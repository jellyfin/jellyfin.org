---
title: 'Updating our iOS App'
description: 'Framework updates and minimum system requirements'
authors: anthonylavado
date: 2022-06-08
slug: ios-update-150
---

With [Jellyfin Mobile](https://apps.apple.com/us/app/jellyfin-mobile/id1480192618?mt=8), our main iOS App, we have updated some frameworks that adjust our minimum iOS version.

<!-- truncate -->

Our main iOS app has been built using [Expo](http://expo.dev). It offers a unique take on a "managed" React Native experience that allows anyone to develop an app for iOS, even without using a Mac. It allowed us to get an app out quickly, and use the web interface that is a part of every Jellyfin install.

As time goes on, we keep Expo up to date in order to take advantage of security fixes, and help us use new features in the app itself. With our next app release, we move to [Expo 43](https://blog.expo.dev/expo-sdk-43-aa9b3c7d5541), which fully supports iOS 15, but must also drop support for iOS 10 and 11.

As a result, starting with version 1.5.0 of our Apple app, **iOS/iPadOS 12 or newer is required.**

If your device is still on an older version of iOS, and you currently have the app downloaded, your experience will stay mostly the same for now. The installed version isn't being removed from the store, so you can still re-install it if needed - but your device won't receive any updates for it. As time goes on, and you update your Jellyfin server, you may encounter unexpected behaviour with the older iOS app.

If you haven't downloaded it before, or are running into issues, you can try a few different options:

- If your server is local (on your home network), try [VLC media player](https://apps.apple.com/ca/app/vlc-media-player/id650377962). It still supports devices as old as iOS 9, and can access the DLNA server built-in to Jellyfin.
- If your server is remote, or you have the DLNA server disabled, you can try using Safari to access the normal Jellyfin interface.

If you can't seem to get anything to work, feel free to get in touch and visit us in chat, or on Reddit. We've got a great community of users who are always willing to help, and we're usually around as well. All the links are available on our [contact page](https://jellyfin.org/contact/).

---

Thank you for using Jellyfin and supporting us this far.

Our iOS app is largely worked on by only one contributor, [@thornbill](https://github.com/thornbill), who gives generously of his spare time to develop the app and make improvements to it and our web interface. He, along with a few of our [contributors](https://github.com/orgs/jellyfin/people) have donation pages setup either through GitHub Sponsors, or other sites like LiberaPay, Patreon and more. If you'd like to support any of them, please see their profiles for more information.

If you'd like to support Jellyfin as a whole (infrastructure and equipment costs only), you can visit our public ledger on [OpenCollective](https://opencollective.com/jellyfin). We're pretty well covered for now, so consider donating to contributors first.
