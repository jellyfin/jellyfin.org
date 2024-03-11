---
title: 'A Note About Privacy and Expo for iOS'
description: 'Providing transparency to the community'
authors: anthonylavado
date: 2021-04-17
slug: a-note-about-privacy-and-expo
---

When it comes to Jellyfin, we guarantee that there is no involuntary tracking, from the server to the mobile apps. This still remains true, even with today's update to the Apple App Store.

<!-- truncate -->

In developing the Jellyfin Mobile app for iOS, we use a Javascript framework known as [Expo](https://expo.io). This framework is an integrated way of using [React Native](https://reactnative.dev) to create mobile apps. For a variety of technical reasons, this has been the best way for us to deliver an iOS app, even with its current restrictions.

Starting with an update in December 2020, Apple has required all developers to submit Privacy Information with any new app, or any update to an app. There is an article covering these "privacy badges" available on Apple's website: "[HT211970 - About privacy information on the App Store...](https://support.apple.com/en-ca/HT211970)". As of our last Jellyfin Mobile update, we believed we were in the clear here - the Jellyfin app does not contain any code to track you or report any data. We declared this in our update information, and received the "Data Not Collected" badge.

However, we learned that Expo has an issue that prevents this from being true. In February, we were contacted by Apple, and received a notice that our badge was incorrect, and needs to be updated. We inquired into this further with Expo, in their forums: "[Mail from App Store Connect about Facebook App Events](https://forums.expo.io/t/mail-from-app-store-connect-about-facebook-app-events/48927)". When we use Expo to build the app (their "managed" workflow), their compiler automatically includes base code for a variety of different items, which includes code that can be used to provide analytics and tracking information. Even though we don't use any of these functions, this code is included in the final app binary, so we are now forced to declare that app can access the Device Identifier.

## I want to stress again: **We do not track any user activity or collect any data.**

You can verify this by reviewing the code base here on GitHub: "[jellyfin/jellyfin-expo](https://github.com/jellyfin/jellyfin-expo)". Expo's current build process includes code that _could_ be used for tracking, but it is never activated by our code, and we do not use it at all. Because this code is ultimately in the app, we have to update the badge on the App Store listing. As Expo explains on their [publishing details page](https://docs.expo.io/distribution/app-stores/#ios-specific-guidelines):
>Note: No data is sent to Branch, Facebook, Segment, or Amplitude from your app unless you explicitly do so using the APIs.

In the [forum thread](https://forums.expo.io/t/mail-from-app-store-connect-about-facebook-app-events/48927), Expo has committed to a future update allowing their automated build service to only include the code modules that you actively use, which would allow us to return to the "Data Not Collected" badge. In an effort to help improve the app and add more features, we are looking to "eject" from Expo in the future, which means we can completely control the build process by ourselves.

---

Thank you for using Jellyfin and supporting us this far. Our iOS app is largely developed only by one contributor, [@thornbill](https://github.com/thornbill), who gives generously of his spare time to develop the app and make it better all the time. He, along with a few of our [contributors](https://github.com/orgs/jellyfin/people) have donation pages setup either through GitHub Sponsors, or other sites like LiberaPay, Patreon and more. If you'd like to support any of them, please see their profiles for more information. If you'd like to support Jellyfin as a whole (infrastructure and equipment costs only), you can visit our public ledger on [OpenCollective](https://opencollective.com/jellyfin). We're pretty well covered for now, so consider donating to contributors first.

Stay tuned for future posts talking about app updates, how we are committed to protecting privacy with Jellyfin, and on our contributor community, including how you can support them and development.

Best,
Anthony
