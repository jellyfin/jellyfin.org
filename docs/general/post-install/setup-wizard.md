---
uid: postinstall-setup-wizard
title: Setup Wizard Walkthrough
sidebar_position: 1
---

# Setup Wizard Walkthrough

This page will guide you through each step of the setup wizard.

## Select Language

Select your preferred language for the rest of the setup. This setting only affects the client you are using. Server-wide language settings will be configured later.
![Setup Wizard Language Prompt](/images/docs/post-install/setup-wizard/setup-wizard-1-language.png)

## Setup Administrator Account

Set up an administrator account for managing the server. Choose a strong password for better security. You are able to create more user and administrator accounts once you finish the setup wizard.
![Setup Wizard Admin Account Page](/images/docs/post-install/setup-wizard/setup-wizard-2-admin-account.png)

## Add Media Libraries

Add media libraries at this page. Click on the + to add a library. Alternatively, click on "Next" without adding anything to skip this step and add media later.
![Setup Wizard Add Media Library Page](/images/docs/post-install/setup-wizard/setup-wizard-3-media-main.png)

In the popup, chose a type on the "Content Type" dropdown, and set a display name in the "Display Name" field. Then, add some folders using the + button. If you don't see your media folders listed, you might have permission issues. You can get help on our [forum](https://forum.jellyfin.org/) or [chat rooms](/contact). Read more about media libraries at the [media libraries' documentation](/docs/general/server/libraries/).
![Setup Wizard Add Media Library Popup](/images/docs/post-install/setup-wizard/setup-wizard-4-media-popup.png)

## Set a Preferred Metadata Language

Select a preferred language and region for metadata fetching as the server-wide default. Metadata from other language / regions may be fetched if metadata is not available with your preferred settings. This can be further customized on a per-library basis.
![Setup Wizard Metadata Language Page](/images/docs/post-install/setup-wizard/setup-wizard-5-metadata-lang.png)

## Networking Settings

Some basic options for networking can be set on this page. For most users, it is recommended to **enable** the "Allow remote access to this server" option, and **disable** the "Enable automatic port mapping" option.
![Setup Wizard Networking Page](/images/docs/post-install/setup-wizard/setup-wizard-6-networking.png)

## Next Steps

You have finished the setup wizard. Below is a list of items you should configure in order to get the best experience:

- [Setup remote access to use Jellyfin when you are not at home](./networking/index.md#external-access)
- [Setup hardware acceleration to improve performance and/or save power](./transcoding/hardware-acceleration/index.md)

![Setup Wizard Completion Page](/images/docs/post-install/setup-wizard/setup-wizard-7-complete.png)
