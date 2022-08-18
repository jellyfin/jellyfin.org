---
uid: clients-web-config
title: Jellyfin Web Configuration
---

# Jellyfin Web Configuration

## Editing

The Jellyfin Web default interface can be configured using the `config.json` file in the webroot. Where this is and how to edit it depends on the installation method.

We recommend obtaining the [stable](https://github.com/jellyfin/jellyfin-web/blob/release-10.7.z/src/config.json) or the [unstable](https://github.com/jellyfin/jellyfin-web/blob/master/src/config.json) default version of the file to pre-populate your configuration directory before starting Jellyfin for the first time; unlike most other components of this directory, it will not be created automatically.

### Debian/Ubuntu/Fedora/CentOS Packages

The configuration can be found at `/usr/share/jellyfin/web/config.json`. This file is registered as a configuration file by the Debian packages, and any changes to the defaults will be handled by `apt` on upgrade.

### Docker

Overriding the default `config.json` can be done with an additional volume parameter to your `docker run` command, e.g.

```sh
--volume /path/to/config/web-config.json:/jellyfin/jellyfin-web/config.json
```

> [!NOTE]
> If the config.json file doesn't exist on the first run, Docker will map it to a directory instead of a file, which won't work.

## Customizations

### Custom Menu Links

Jellyfin 10.8 adds the ability to specify custom links to be inserted in the navigation menu via the `config.json` file.
Links are configured with a `name`, `url`, and optional `icon` property.
The icon is specified using the name of an icon from the [Material Design Icons](https://jossef.github.io/material-design-icons-iconfont/) used in Jellyfin Web.
By default the "link" icon will be used.

```json
"menuLinks": [
    {
        "name": "Custom Link",
        "url": "https://jellyfin.org"
    },
    {
        "name": "Custom Link w. Custom Icon",
        "icon": "attach_money",
        "url": "https://demo.jellyfin.org/stable"
    }
]
```

## Privacy-focused changes

Our default settings for the Jellyfin Web `config.json` file include some features that privacy-focused or completely-offline users may want to disable. Each option is detailed below.

### Google Chromecast

By default, Jellyfin Web includes Chromecast-from-browser support. This requires downloading files from Google servers to support this functionality.

To disable it, edit `config.json` and remove the line:

```json
"plugins/chromecastPlayer/plugin"
```

in the `plugins` section. Be sure to remove the last comma from the line above if this is the last line in the list.

### YouTube Trailers

By default, Jellyfin Web includes functionality to auto-load movie trailers from YouTube. This functionality is disabled within Jellyfin by default, but the resources are included in the Web config to make enabling the feature easy.

To disable it, edit `config.json` and remove the line:

```json
"plugins/youtubePlayer/plugin"
```

in the `plugins` section.
