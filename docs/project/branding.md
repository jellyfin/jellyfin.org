---
uid: contrib-branding
title: Branding
---

# Branding

## Usage of the Jellyfin name & logo

The name "Jellyfin" and the primary logo (two integrated triangular shapes, a stylized "fin") are trademarks in Canada, the United States, the European Union, and China of "Jellyfin, Inc.", an Ontario, Canada-based not-for-profit corporation.

A perpetual, no cost license is hereby granted to all members of the Jellyfin organization ("team") and projects under [our GitHub account](https://github.com/jellyfin) to use the name and logo in furtherance of the Jellyfin project.

For all others, you are **not** free to use the name "Jellyfin" or our logo without the explicit permission of the [project leadership team](/docs/general/about#core-team), with the following exceptions:

- Any instance of the Jellyfin software running for any purpose **accessible for no fee to its users** is granted an implicit license to use the name and logo for that purpose. If you charge for access to your server in any form, you are **required to change the branding of the server** in some way to clearly identify that the server owner is not "Jellyfin" as a project, and provide at least one method of contact for the server. For Jellyfin 10.10.x or before, you may use the Login Disclaimer field for this purpose; for Jellyfin 10.11.x and newer, you may use the Login Disclaimer and/or change the logo and name of the instance for this purpose. For example, a login disclaimer such as `This server is run by https://someprovider.org. For assistance, please see https://someprovider.org/contact.` is acceptable.

- The name "Jellyfin" **may** be used within another project as an affix to demonstrate compatibility; for example "_Awesome Client for Jellyfin_" is permitted. You may **not** use the name directly, in a way that makes the program appear to be an official client; for example "_Jellyfin MyPlatform_" is not permitted. Using subcomponents of the name (i.e. "Jelly", or "fin") coupled with additional words are permitted; for example, "Jellyseer", "Audiofin", or the like.

- All 3rd party projects **should** use their own logo to clearly differentiate it, but **exceptions may be granted** for free-and-libre-open-source (FLOSS) projects by contacting the leadership team, with a goal towards official project status. The logo _colours_ are not subject to trademark, and the purple-blue gradient theme may be used with another logo shape for identification as part of the Jellyfin ecosystem without limitation.

- Any **fork** of Jellyfin or an official client application for public distribution **must** use a different name and logo.

- The name "Jellyfin" and the logo **may** be used to describe or name communities or groups for users of the software, for instance community groups on social media or other sites.

- The name "Jellyfin" and the logo **may** be used to describe the program in any form of media without restriction.

- Any other uses shall be judged on a good-faith basis; if unsure, please contact the leadership team for advice.

## Writing Style

The name "Jellyfin" is always written thus. It is not "JellyFin", "Jelly Fin", or any similar form.

As a general rule, "Jellyfin" should always be capitalized, but language, file, or system conventions may trump this convention. Specific examples include:

- Writing referring to the project in the abstract should use capitalized `Jellyfin` at all times. `I contribute to Jellyfin and you should too!`
- C# class and project names, including their files and directories, should use capitalized `Jellyfin` as required by the C# case standards (camelCase or PascalCase). `Jellyfin.LiveTv`, `Jellyfin.sln`
- Other code elements, where the code formatting or style requires lowercase, should use lowercase `jellyfin`. `jellyfinWebComponentsBowerPath`
- The Git repository and non-C# files inside of it should use lowercase `jellyfin` for convenience on case-sensitive filesystems. `build-jellyfin.ps1`
- The final output binary, initscripts, and package names should use lowercase `jellyfin` for similar reasons as above. `jellyfin.dll`, `jellyfin_3.5.2-1_all.deb`, `jellyfin.zip`
- Configuration directories can use either depending on operating system conventions. `/var/lib/jellyfin`, `AppData/Jellyfin`
- The logo has no strict rules for capitalization, the style is dependent on aesthetics and font choice.

## Icons and Visual Assets

:::warning

Jellyfin is currently rebranding, as such these guidelines (including the logo) are outdated. Join our [#jellyfin-ui-ux](https://matrix.to/#/#jellyfin-ui-ux:matrix.org) chat on Matrix for any questions.

:::

All iconography and other resources can be found in the [jellyfin-ux](https://github.com/jellyfin/jellyfin-ux) repository.

- Icons
- Banners
- Fonts

### Logo

When using the full version of the logo, the text should only be placed to the right of the icon.

![The logo should have the text placed on the right of the icon.](/images/docs/branding-logo-yes-side.png#hidden--dark-mode)
![The logo should have the text placed on the right of the icon.](/images/docs/branding-logo-dark-theme-yes-side.png#hidden--light-mode)
![The logo should never have the text placed below the icon.](/images/docs/branding-logo-no-below.png#hidden--dark-mode)
![The logo should never have the text placed below the icon.](/images/docs/branding-logo-dark-theme-no-below.png#hidden--light-mode)

The design for the logo uses a gradient for the infill, and if the non-transparent logo is chosen there is an optional background color.

- Gradient Start: `#AA5CC3`
- Gradient End: `#00A4DC`
- Background Color: `#000B25`

### Theme

- Background Color: `#101010`
- Accent Color: `#00A4DC`

### Fonts

The banner uses the [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) font.
