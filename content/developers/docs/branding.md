---
uid: contrib-branding
title: Jellyfin branding
sidebar_position: 3
---

# Branding

## Usage of the Jellyfin name

The name "Jellyfin" is reserved for the Jellyfin project itself and its official clients. The server (including WebUI) is called "Jellyfin", composed of the "Jellyfin [API] Server" and "Jellyfin Web[UI]". Official clients are, generally, called "Jellyfin for X", where "X" is a platform (e.g. "Jellyfin for Android TV").

3rd party developers should **not** use the name Jellyfin directly. Additionally, we **discourage** projects from using the combination of "Jelly[word]" or "[word]fin" to avoid confusion; while there are numerous exceptions over the years, we strongly request that you develop your own unique name for your project. You **may** reference Jellyfin in a subtitle, description, etc. as an indication of interoperability. For example, "Floostream, a Jellyfin client" is ideal.

Do not use the Jellyfin name in the promotion of piracy or to affiliate yourself erroneously with the project or impersonate the project. If you run a public server (which, by default, will use Jellyfin branding), please see [our server policy](/docs/general/community-standards/servers).

## Usage of the Jellyfin logo

Do **not** use the Jellyfin logo as your logo for any project, service, or group without the expressed permission of the Jellyfin team, i.e. the rounded-triangle-within-a-triangle shape. Do not simply rotate the logo shape, or include it inside of another logo; these count too. To help facilitate a common design language even among 3rd party clients, we **do permit** the use of our colour gradient on your logo; we simply request that you use a unique logo design/shape.

Do not use the Jellyfin logo in the promotion of piracy or to affiliate yourself erroneously with the project or impersonate the project.

## Writing Style

As a general rule, Jellyfin should always be capitalized, but language, file, or system conventions trump Jellyfin naming conventions. Avoid "JellyFin".

Specific examples include:

- Writing referring to the project in the abstract should use capitalized `Jellyfin` at all times. `I contribute to Jellyfin and you should too!`
- Code elements should be formatted according to the specifications of the language in use.
- Git repositories and files using the name should use lowercase `jellyfin` for convenience on case-sensitive filesystems. `build-jellyfin.ps1`, `jellyfin_3.5.2-1_all.deb`, etc.
- Configuration directories can use either depending on operating system conventions. `/var/lib/jellyfin`, `AppData/Jellyfin`

## Icons and Other Assets

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
