---
uid: admin-configuration
title: Configuration
---

# Configuration

There are several entry points available for administrators to manage the configuration of their server. This section aims to outline all those configuration methods, explain what options are available, and what each option does.

> [!NOTE]
> The configuration options here are distinct from the [runtime settings](xref:server-settings) available from the Administrator Dashboard in the web client. The configuration options here are generally meant to be static and set before starting the server.

## Command Line Options

Documentation for the available command line options can be obtained by adding the `--help` flag when running the Jellyfin executable.

## Server Paths

The file paths used by the server are determined according the rules outline below. In general, the [XDG specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) is followed by default for non-Windows systems.

### Data Directory

This is the directory that will hold all Jellyfin data, and is also used as a default base directory for some other paths below. It is set from the following sources in order of decreasing precedence.

1. Command line option `--datadir`, if specified
2. Environment variable `JELLYFIN_DATA_DIR`, if specified
3. `<%APPDATA%>/jellyfin`, if running on Windows
4. `$XDG_DATA_HOME/jellyfin`, if `$XDG_DATA_HOME` exists
5. `$HOME/.local/share/jellyfin`

### Configuration Directory

This is the directory containing the server configuration files. It is set from the following sources in order of decreasing precedence.

1. Command line option `--configdir`, if specified
2. Environment variable `JELLYFIN_CONFIG_DIR`, if specified
3. `<Data Directory>/config`, if it exists or if running on Windows
4. `$XDG_CONFIG_HOME/jellyfin` if `$XDG_CONFIG_HOME` exists
5. `$HOME/.config/jellyfin`

### Cache Directory

This is the directory containing the server cache. It is set from the following sources in order of decreasing precedence.

1. Command line option `--cachedir`, if specified
2. Environment variable `$JELLYFIN_CACHE_DIR`, if specified
3. `<Data Directory>/cache`, if Windows
4. `$XDG_CACHE_HOME/jellyfin` if `$XDG_CACHE_HOME` exists
5. `$HOME/.cache/jellyfin`

### Web Directory

This is the directory containing the built files from a [web client](https://github.com/jellyfin/jellyfin-web) release. It is set from the following sources in order of decreasing precedence.

1. Command line option `--webdir`, if specified
2. Environment variable `$JELLYFIN_WEB_DIR`, if specified
3. `<Binary Directory>/jellyfin-web`, where `<Binary Directory>` is the directory containing the Jellyfin executable

> [!NOTE]
> This setting is only used when the server is configured to host the web client. See the `hostwebclient` option in the [Main Configuration Options](#main-configuration-options) section below for additional details.

### Log Directory

This is the directory where the Jellyfin logs will be stored. It is set from the following sources in order of decreasing precedence.

1. Command line option `--logdir`, if specified
2. Environment variable `$JELLYFIN_LOG_DIR`, if specified
3. `<Data Directory>/log`

## Main Configuration

The main server configuration is built upon the ASP .NET [configuration framework](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-3.1), which provides a tiered approach to loading configuration. The base directory to locate the configuration files is set using the [configuration directory](#configuration-directory) setting. The configuration sources are as follows, with later sources having higher priority and overwriting the values in earlier sources.

1. **Hard-coded default values**: These defaults are specified in the Jellyfin [source code](https://github.com/jellyfin/jellyfin/blob/master/Emby.Server.Implementations/ConfigurationOptions.cs) and cannot be changed.
2. **Default logging configuration file** (`logging.default.json`): This file should not be modified manually by users. It is reserved by the server to be overwritten with new settings on each new release.
3. **System-specific logging configuration file** (`logging.json`): This is the file you should change if you want to have a custom logging setup. Jellyfin uses the [Serilog](https://serilog.net/) logging framework, and you can read about the configuration options available in their [documentation](https://github.com/serilog/serilog-settings-configuration).

   > [!NOTE]
   > This file can be changed at runtime, which will automatically reload the configuration and apply the changes immediately.

4. **Environment variables**: The [documentation](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-3.1#environment-variables) provided by Microsoft explains how to set these configuration options via environment variables. Jellyfin uses its own custom `JELLYFIN_` prefix for these variables. For example, to set a value for the `HttpListenerHost:DefaultRedirectPath` setting, you would set a value for the `JELLYFIN_HttpListenerHost__DefaultRedirectPath` environment variable.
5. **Command line options**: Certain command line options are loaded into the configuration system and have the highest priority. The following command line options are mapped to associated configuration options.

    - `--nowebclient` sets the `hostwebclient` configuration setting to false
    - `--plugin-manifest-url` sets a value for the `InstallationManager:PluginManifestUrl` configuration setting

### Main Configuration Options

This section lists all the configuration options available and explains their function.

|Key|Default Value|Description|
|---|-------------|-----------|
|`hostwebclient`|`True`|Set to `True` if the server should host the web client.|
|`HttpListenerHost:DefaultRedirectPath`|`"web/index.html"` if `hostwebclient` is true; `"swagger/index.html"` if `hostwebclient` is false|The default redirect path to use for requests where the URL base prefix is invalid or missing|
|`InstallationManager:PluginManifestUrl`|`"https://repo.jellyfin.org/releases/plugin/manifest.json"`|The URL for the plugin repository JSON manifest.|
|`FFmpeg:probesize`|`"1G"`|Value to set for the FFmpeg `probesize` format option. See the FFmpg [documentation](https://ffmpeg.org/ffmpeg-formats.html#Format-Options) for more details.|
|`FFmpeg:analyzeduration`|`"200M"`|The value to set for the FFmpeg `analyzeduration` format option. See the FFmpg [documentation](https://ffmpeg.org/ffmpeg-formats.html#Format-Options) for more details.|
|`playlists:allowDuplicates`|`True`|Whether playlists should allow duplicate items or automatically filter out duplicates.|
|`PublishedServerUrl`|Server Url based on primary IP address|The Server URL to publish in udp Auto Discovery response.|
