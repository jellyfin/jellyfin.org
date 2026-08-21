---
uid: server-live-tv-internet-radio
title: Internet Radio
sidebar_position: 3
---

# Internet Radio

It is possible to add Internet radio stations (e.g. shoutcast) to Jellyfin by utilizing the Live TV M3U Tuner device type. Directly entering links into the M3U tuner is supported, but it depends on the provider.

If the M3U is not supported, it is most like due to missing headers in the link. Create a new M3U file containing the following data.

```#EXTM3U
#EXTINF:0,Radio Freccia
https://streamingv2.shoutcast.com/radiofreccia
```

Note that the line that starts with `#EXTINF:0,<title>` is needed for each radio URL to give it a 'channel' entry under Live TV \ Channels. Failing to add this line will cause the station to not show up under Live TV \ Channels.

Next, head over to the Jellyfin administration page, go to Live TV, add new tuner device, choose M3U Tuner as Tuner type and navigate to your M3U file. Hit Save and let Jellyfin complete the Refresh Guide task (automatically started when saving a new tuner). You should now be able to play your radio station from under Live TV \ Channels.

:::note

Adding an M3U HTTP link instead of a locally created M3U file will almost certainly fail, in part because the `#EXTINF:` directive is part of the IPTV standard, which is required to name the channel for Jellyfin to list it under Live TV \ Channels. Pretty much no Internet radio will include this directive in their M3U files. Besides that, many radio stations use AJAX to dynamically update the M3U-files while listening, something that is not handled by Jellyfin.

## Internet Radio Streams

Internet radio can be added to Jellyfin in "Shows" library by using `.strm`-files.

### `strm` File Structure

The file shall just contain the address of the internet stream, e.g. `http://streams.radiobob.de/bob-wacken/mp3-192/mediaplayer`.

Save the file with a meaningful name `.strm`, e.g. `Bob Wacken.strm`.

## Folder Structure

Radio stations and radio shows can get organized accordingly

```
Shows
├── Radio Streams
│   ├── Radio station B
│   │   ├── Bob Wacken.strm
│   ├── Radio station B
│   │   ├── Radio Show 1.strm
│   │   ├── Radio Show 2.strm
│   │   └── Radio Show 3.strm
│   ├── Radio station C
│   │   ├── Radio Show 1.strm
│   │   ├── Radio Show 2.strm
│   │   └── Radio Show 3.strm
```

Radio stations will get displayed as "Seasons" and radio shows as "Episode".

Folder structure by Genre

```
Shows
├── Radio Streams
│   ├── Heavy Metal
│   │   ├── Bob Wacken.strm
│   ├── Alternative
│   │   ├── Radio Stream 1.strm
│   │   ├── Radio Stream 2.strm
│   │   └── Radio Stream 3.strm
│   ├── Classic
│   │   ├── Radio Stream 1.strm
│   │   ├── Radio Stream 2.strm
│   │   └── Radio Stream 3.strm
│   ├── News
│   │   ├── Radio Stream 1.strm
│   │   ├── Radio Stream 2.strm
│   │   └── Radio Stream 3.strm
```


:::
