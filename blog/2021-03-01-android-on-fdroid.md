---
title: Android app now on F-Droid
author: 'Niels van Velzen'
author_url: https://github.com/nielsvanvelzen
author_image_url: https://avatars.githubusercontent.com/u/2305178?v=4
tags: [release, clients, android]
description: 'Available to download right now!'
---

We're happy to announce the immediate availability of the Android mobile app on the F-Droid store. The F-Droid version does not contain any proprietary libraries and builds are fully reproducible.

<!--truncate-->

## Missing features

Unfortunately, the library required for casting support is proprietary, meaning that it's not available under a free license and Google doesn't publish the source code. Because of that, we had to remove it in the F-Droid version. Fortunately, the remote control feature still works.

Additionally, the Android Auto integration does not work because Google does not allow apps to integrate with it when the app was not installed from the Google Play store.

## Download Now

<a href="https://play.google.com/store/apps/details?id=org.jellyfin.mobile" class="margin-right--md">
  <img width="153" alt="Jellyfin on Google Play" src="/static/img/store-icons/google-play.png" />
</a>

<a href="https://www.amazon.com/gp/product/B081RFTTQ9" class="margin-right--md">
  <img width="153" alt="Jellyfin on Amazon App Store" src="/static/img/store-icons/amazon.png" />
</a>

<a href="https://f-droid.org/en/packages/org.jellyfin.mobile/">
  <img width="153" alt="Jellyfin on F-Droid" src="/static/img/store-icons/fdroid.png" />
</a>

Direct downloads are always available from [our repository](https://repo.jellyfin.org/releases/client/android/).
