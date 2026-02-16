---
uid: faq
title: FAQ
sidebar_position: 102
---

# Frequently Asked Questions

## Why fork Emby? Why did you start this project?

We explain the rationale for our fork on our [about page](/docs/general/about).

## Why don't you support my favorite client or feature?

Chances are, we would like to support it, but it has not been implemented yet.
Jellyfin is an entirely volunteer-driven project, so until a developer is able and willing to implement a feature, it likely will not be done.
We track community feature requests on [our Fider instance](https://features.jellyfin.org), so please check that out, upvote the features you like, and add your own requests. Note that the Fider does not guarantee prioritization, but instead provides developers a way of seeing what features might be popular to decide whether to work on them or not. This does unfortunately mean that even highly-soughtafter features might not be implemented until someone both interested and able to work on them comes along.
If you're a developer and are interested in helping out, [please hack away](/developers/docs/contributing) and let us know [on Matrix](/docs/general/getting-help) so we can help.

## When will release \{X} happen? When will feature \{X} be available?

We make releases only when the team feels that it is ready, to provide our users with the best and most stable experience we can.
To that end, releases happen when we feel there has been sufficient testing without new issues being found.
Releases are also subject to the availability of the people who manage the builds and publishes for different platforms. Please remember we are all volunteers and there are no fixed timelines to our releases.

## I'm having problems with Jellyfin, how do I get help?

Please see our [getting help](/docs/general/getting-help) page for details on where to engage the community.

## Why is my media not showing up in Jellyfin?

This normally comes down to one of the following issues:

1. [File permissions](https://wikipedia.org/wiki/File-system_permissions) are not properly configured on your media.
2. Your media does not follow the organizational requirements for Jellyfin's scanner to properly identify media. (Valid organization schemes can be found in the documentation for [Movies](/docs/general/server/media/movies), [Shows](/docs/general/server/media/shows), [Music](/docs/general/server/media/music), and others.)
   If it's not one of these, please consider asking for help as it might be a bug.

## How can I contribute to this project?

Please see our [contributing guide](/developers/docs/contributing) page for details on how to get started.
We are always looking for C# and frontend developers, mobile app developers, translators, and documentation writers to help!

## How do I request a new feature?

Please see our [requesting features](/developers/docs/contributing/issues#requesting-features) page for details in requesting a new feature in Jellyfin.

## How do I support this project?

All we can ask is you [use Jellyfin](/docs/general/installation), [report any bugs](/developers/docs/contributing/issues#reporting-bugs), and tell your friends about us!
Really, we're just people volunteering our time to help build a better media system, so joining the community is the best way to show your support.
We do offer a donations page [on OpenCollective](https://opencollective.com/jellyfin), however please note that these funds are **only** used for infrastructure. All our developers are unpaid volunteers on principle. Many individual developers that are active in the project accept [donations](/developers/docs/contributing/direct-donations) however.
