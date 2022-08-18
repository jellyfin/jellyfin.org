---
uid: contrib-branding
title: Branding
---

# Branding

## Usage of the Jellyfin name

You are free to use the Jellyfin name to promote your project, with some restrictions:

* Do not use the Jellyfin name in a way that would make the average user think you are associated with the project, unless permission was given by the Project Leader or Leadership Team.
* Only include the Jellyfin name in your project's name in a way that makes it clear you are not affiliated with the Jellyfin project, and to indicate compatibility with Jellyfin (For example *Awesome Client for Jellyfin*).
* Do not use the Jellyfin name in any context that promotes, allows or encourages piracy.
* Do not wrongfully claim to be part of the Jellyfin team.

## Writing Style

As a general rule, Jellyfin should always be capitalized, but language, file, or system conventions trump Jellyfin naming conventions.

Specific examples include:

* Writing referring to the project in the abstract should use capitalized `Jellyfin` at all times. `I contribute to Jellyfin and you should too!`
* C# class and project names, including their files and directories, should use capitalized `Jellyfin` as required by the C# case standards (camelCase or PascalCase). `Jellyfin.LiveTv`, `Jellyfin.sln`
* Other code elements, where the code formatting or style requires lowercase, should use lowercase `jellyfin`. `jellyfinWebComponentsBowerPath`
* The Git repository and non-C# files inside of it should use lowercase `jellyfin` for convenience on case-sensitive filesystems. `build-jellyfin.ps1`
* The final output binary, initscrips, and package names should use lowercase `jellyfin` for similar reasons as above. `jellyfin.dll`, `jellyfin_3.5.2-1_all.deb`, `jellyfin.zip`
* Configuration directories can use either depending on operating system conventions. `/var/lib/jellyfin`, `AppData/Jellyfin`
* The logo has no strict rules for capitalization, the style is dependent on aesthetics and font choice.

## Icons and Other Assets

All iconography and other resources can be found in the [jellyfin-ux](https://github.com/jellyfin/jellyfin-ux) repository.

* Icons
* Banners
* Fonts

### Logo

When using the full version of the logo, the text should only be placed to the right of the icon.

![The logo should have the text placed on the right of the icon.](~/images/branding-logo-yes-side.png) ![The logo should never have the text placed below the icon.](~/images/branding-logo-no-below.png)

The design for the logo uses a gradient for the infill, and if the non-transparent logo is chosen there is an optional background color.

* Gradient Start: `#AA5CC3`
* Gradient End: `#00A4DC`
* Background Colour: `#000B25`

### Theme

* Background Colour: `#101010`
* Accent Colour: `#00A4DC`

### Fonts

The banner uses the [Quicksand](https://fonts.google.com/specimen/Quicksand) font.
