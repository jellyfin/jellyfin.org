---
id: clients-web-config
title: Jellyfin Web Configuration
---

# Jellyfin Web Configuration

## Editing

The Jellyfin Web default interface can be configured using the `config.json` file in the webroot. Where this is and how to edit it depends on the installation method.

### Debian/Ubuntu/Fedora/CentOS Packages

The configuration can be found at `/usr/share/jellyfin/web/config.json`. This file is registered as a configuration file by the Debian packages, and any changes to the defaults will be handled by `apt` on upgrade.

### Docker

Overriding the default `config.json` can be done with an additional volume parameter to your `docker run` command, e.g.

```sh
--volume /path/to/config/web-config.json:/jellyfin/jellyfin-web/config.json
```

We would recommend obtaining the [latest copy of the file](https://github.com/jellyfin/jellyfin-web/blob/master/src/config.json) to pre-populate your configuration directory before starting Jellyfin for the first time; unlike most other components of this directory, it will not be created automatically on first run.

## Privacy-focused changes

Our default settings for the Jellyfin Web `config.json` file include some features that privacy-focused or completely-offline users may with to disable. Each option is detailed below.

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
