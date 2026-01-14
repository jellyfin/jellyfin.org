---
uid: clients-codec-support
title: Codec Support
---

# [Codec Tables](https://en.wikipedia.org/wiki/List_of_codecs "Wikipedia's list of all codecs")

The goal is to Direct Play all media. This means the container, video, audio and subtitles are all compatible with the client. If the media is incompatible for any reason, Jellyfin will use FFmpeg to [convert the media](http://howto-pages.org/ffmpeg/) to a format that the client can process. Direct Stream will occur if the audio, container or subtitles happen to not be supported. If the video codec is unsupported, this will result in video transcoding. Subtitles can be tricky because they can cause Direct Stream (subtitles are remuxed) or video transcoding (burning in subtitles) to occur. This is the most intensive CPU component of transcoding. Decoding is less intensive than encoding.

## [Video Compatibility](https://en.wikipedia.org/wiki/Comparison_of_video_container_formats "Wikipedia's video codec tables")

[Breakdown of video codecs.](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs)

[Test your browser's compatibility for any codec profile.](https://cconcolato.github.io/media-mime-support/)

| Sorted by efficiency (excluding bit depth)                                                                         | Chrome         | Edge           | Firefox         | Safari          | Android        | Android TV     | iOS            | SwiftFin (iOS)  | [Roku](https://developer.roku.com/docs/specs/media/streaming-specifications.md) | Kodi | Jellyfin Media Player |
| ------------------------------------------------------------------------------------------------------------------ | -------------- | -------------- | --------------- | --------------- | -------------- | -------------- | -------------- | --------------- | ------------------------------------------------------------------------------- | ---- | --------------------- |
| [MPEG-4 Part 2/SP](https://en.wikipedia.org/wiki/DivX)                                                             | ❌             | ❌             | ❌              | ❌              | ❌             | ❌             | ❌             | ✅              | ✅                                                                              | ✅   | ✅                    |
| [MPEG-4 Part 2/ASP](<https://en.wikipedia.org/wiki/MPEG-4_Part_2#Advanced_Simple_Profile_(ASP)>)                   | ❌             | ❌             | ❌              | ❌              | ❌             | ❌             | ❌             | ✅              |                                                                                 | ✅   | ✅                    |
| [H.264 8Bit](https://caniuse.com/#feat=mpeg4 'H264 Browser Support Reference')                                     | ✅             | ✅             | ✅              | ✅              | ✅             | ✅             | ✅             | ✅              | ✅                                                                              | ✅   | ✅                    |
| [H.264 10Bit](https://caniuse.com/#feat=mpeg4 'H264 Browser Support Reference')                                    | ✅             | ✅             | ❌              | 🔶<sup>12</sup> | ✅             | ✅             | ❌             | ✅              | ❌                                                                              | ✅   | ✅                    |
| [H.265 8Bit](https://caniuse.com/#feat=hevc 'HEVC Browser Support Reference')                                      | 🔶<sup>8</sup> | ✅<sup>7</sup> | ✅<sup>15</sup> | 🔶<sup>1</sup>  | 🔶<sup>2</sup> | ✅<sup>5</sup> | 🔶<sup>1</sup> | ✅<sup>6</sup>  | 🔶<sup>9</sup>                                                                  | ✅   | ✅                    |
| [H.265 10Bit](https://caniuse.com/#feat=hevc 'HEVC Browser Support Reference')                                     | 🔶<sup>8</sup> | ✅<sup>7</sup> | ✅<sup>15</sup> | 🔶<sup>1</sup>  | 🔶<sup>2</sup> | 🔶<sup>5</sup> | 🔶<sup>1</sup> | ✅<sup>6</sup>  | 🔶<sup>9</sup>                                                                  | ✅   | ✅                    |
| [VP9](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#VP9 'V9 Browser Support Reference')  | ✅             | ✅             | ✅              | ✅<sup>10</sup> | ✅<sup>3</sup> | 🔶<sup>3</sup> | ❌             | ✅<sup>13</sup> | ✅                                                                              | ✅   | ✅                    |
| [AV1](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#AV1 'AV1 Browser Support Reference') | ✅             | ✅             | ✅              | 🔶<sup>11</sup> | ✅             | 🔶<sup>4</sup> | ❌             | 🔶<sup>14</sup> | ✅                                                                              | ✅   | ✅                    |

<sup>1</sup>HEVC is only supported in MP4, M4V, and MOV containers.
<br />
<sup>2</sup>Android playback is currently broken. Client reports that HEVC is supported and attempts to Direct Stream.
<br />
<sup>3</sup>May be (partially) dependent on Hardware support (can be compensated with CPU decoding on Android). Most new Android phones in the higher price range and many "4K" Android TV devices have VP9 hardware decoding support. Refer to you manufacturer for supported codecs.
<br />
<sup>4</sup>Needs at least Android TV 10.
<br />
<sup>5</sup>As of <a href="https://github.com/jellyfin/jellyfin-androidtv/pull/671">version 0.12</a>, HEVC is enabled on all devices running Android 5.0+, but early generations of the Amazon Fire may not work yet. 10Bit may be supported depending on your device. Before Client 0.12, HEVC support was enabled on specific devices.
<br />
<sup>6</sup>HEVC decoding is supported on Apple devices with the A8X chip or newer and at least iOS 14.
<br />
<sup>7</sup>HEVC decoding is only supported on Windows 10 with the HEVC Video Extension from the Microsoft <a href="https://www.microsoft.com/store/productId/9NMZLZ57R3T7">store</a>.
<br />
<sup>8</sup>Chromium 107 does support HEVC decoding when HEVC hardware decoding is available.
<br />
<sup>9</sup>HEVC decoding is only supported on 4K devices.
<br />
<sup>10</sup>VP9 decoding on Safari requires at least Safari 14.
<br />
<sup>11</sup>AV1 decoding is only available on devices with A17 or M3 series chips or newer and requires at least Safari 17.
<br />
<sup>12</sup>Need to be manually enabled in Settings > Playback > Enable H.264 High 10 Profile. Playback on Apple Silicon Macs with macOS version < 14 and Intel Macs with all macOS versions may result in blank frames if this is enabled.
<br />
<sup>13</sup>VP9 is only available with Swiftfin (VLCKit) player.
<br />
<sup>14</sup>AV1 is enabled by default for Swiftfin (VLCKit). AV1 is disabled by default but can be enabled for Native (AVKit) using Custom Device Profiles. Enabling AV1 may result in a poor experience for SOCs prior to A17.
<br />
<sup>15</sup>Requires Firefox 134+ for Windows, 136+ for macOS, and 137+ for Linux. On Windows 11 22H2+ and Windows 10 1507-1709, you can play H.265 (HEVC) video natively. Windows 10 1803+ and Windows 11 21H2 need the [HEVC video extension from Microsoft Store](https://apps.microsoft.com/detail/9nmzlz57r3t7). Linux requires system ffmpeg for support.

[Format Cheatsheet:](https://en.wikipedia.org/wiki/MPEG-4#MPEG-4_Parts)

| [MPEG-2<br />Part 2](https://en.wikipedia.org/wiki/H.262/MPEG-2_Part_2) | [MPEG-4<br />Part-2](https://en.wikipedia.org/wiki/MPEG-4_Part_2)<sup>1</sup> | [MPEG-4<br />Part-10](https://en.wikipedia.org/wiki/Advanced_Video_Coding) | [MPEG-4<br />Part-14](https://en.wikipedia.org/wiki/MPEG-4_Part_14) | [MPEG-H<br />Part 2](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding) |
| :---------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :-----------------------------------------------------------------: | :------------------------------------------------------------------------------: |
|                                  H.262                                  |                                 MPEG-4 SP/ASP                                 |                                   H.264                                    |                      MP4 Container<sup>2</sup>                      |                                      H.265                                       |
|                              MPEG-2 Video                               |                                     DivX                                      |                                 MPEG-4 AVC                                 |                                                                     |                                       HEVC                                       |
|                                DVD-Video                                |                                     DX50                                      |                                                                            |                                                                     |                                                                                  |

<sup>1</sup><a href="https://www.afterdawn.com/glossary/term.cfm/mpeg_4_part_10">MPEG-4 Part-2 vs Part-10</a>
<br />
<sup>2</sup><a href="https://en.wikipedia.org/wiki/MPEG-4_Part_17">MPEG-4 Part 17: MP4TT Subtitles</a>

### HDR Support

HDR is only supported on a very limited range of devices:

- iOS Devices with an HDR capable internal display can display HDR content when using a browser or the Jellyfin iOS App (not Swiftfin) as long as the codec is supported by the client. All of them support HEVC and VP9, while AV1 is supported on newer devices. HDR10, Dolby Vision and HLG are supported.

- Android devices running either the official Android App or using Chrome can display HDR content if the device supports HDR and the source format. Format support depends on device.

- Macs running macOS that support HDR can play HDR content when using Safari, Chrome or Firefox on an HDR capable display as long as the source codec is supported. Safari has the most complete support, including HDR10, Dolby Vision (including P5) and HLG. Chrome and Firefox only support HDR10. Chrome supports HDR10 on HEVC, VP9 and AV1. Firefox only supports HDR on VP9 and AV1 content. Please refer to [the list of Macs that support HDR](https://support.apple.com/en-us/102205) to check if your device is supported. On non-Apple displays, other HDR formats will be tone-mapped to HDR10 by the client device.

- Windows PCs with an HDR display with HDR enabled in the settings using Edge or Chrome. Dolby Vision only works in Edge and requires [the Dolby Vision add-on from the Microsoft Store](https://apps.microsoft.com/detail/9pltg1lwphlf) to be installed. Edge generally produces better colors than Chrome when playing HDR content.

- Android TV devices with HDR support running the official Android TV App. HDR format support depends on the specific device you are running.

- WebOS devices (Newer LG Smart TVs) running the official WebOS client supports HDR. However, [mkv containers are known to cause issues](https://github.com/jellyfin/jellyfin-web/issues/4678). Please enable the force remux mkv to mp4 option in the client settings as a workaround.

- Some Chromium-based browsers on Linux will attempt Client-side HDR to SDR tonemapping. This generally looks very bad. There will be no server side involvement when this is happening.

Devices not listed above do not support HDR on any official client. Any HDR content will have to be converted to SDR by the server for proper playback on these clients. For more info, please refer to our [tone-mapping documentation](/docs/general/post-install/transcoding/#hdr-to-sdr-tone-mapping)

## [Audio Compatibility](https://en.wikipedia.org/wiki/Comparison_of_video_container_formats#Audio_coding_formats_support "Wikipedia's audio codec tables")

If the audio codec is unsupported or incompatible (such as playing a 5.1 channel stream on a stereo device), the audio codec must be transcoded. This is not nearly as intensive as video transcoding.

|                                    Codec                                    |     Chrome     | Edge | Firefox |        Safari        | Android | Android TV |         iOS          | SwiftFin (iOS) |      Roku      | Kodi | Desktop |
| :-------------------------------------------------------------------------: | :------------: | :--: | :-----: | :------------------: | :-----: | :--------: | :------------------: | :------------: | :------------: | :--: | :-----: |
|                                    FLAC                                     |       ✅       |  ✅  |   ✅    |          ✅          |   ✅    |     ✅     |          ✅          |       ✅       |       ✅       |  ✅  |   ✅    |
|                                     MP3                                     | 🔶<sup>1</sup> |  ✅  |   🔶    |          ✅          |   ✅    |     ✅     |          ✅          |       ✅       |       ✅       |  ✅  |   ✅    |
|                                     AAC                                     |       ✅       |  ✅  |   ✅    |          ✅          |   ✅    |     ✅     |          ✅          |       ✅       |       ✅       |  ✅  |   ✅    |
| [AC3](https://www.loc.gov/preservation/digital/formats/fdd/fdd000209.shtml) |       ✅       |  ✅  |   ❌    |          ✅          |   ✅    |     ✅     |          ✅          |       ✅       |                |  ✅  |   ✅    |
|    [EAC3](https://en.wikipedia.org/wiki/Dolby_Digital_Plus)<sup>2</sup>     |       ✅       |  ✅  |   ✅    |          ✅          |   ✅    |     ✅     |          ✅          |       ✅       |                |  ✅  |   ✅    |
|                             VORBIS<sup>3</sup>                              |       ✅       |  ✅  |   ✅    |    ✅<sup>8</sup>    |   ✅    |     ❌     |    ✅<sup>8</sup>    |       ✅       |       ✅       |  ✅  |   ✅    |
|                               DTS<sup>4</sup>                               |       ❌       |  ❌  |   ❌    |          ❌          |   ✅    |     ✅     |          ❌          |       ✅       | ✅<sup>6</sup> |  ✅  |   ✅    |
|                                    OPUS                                     |       ✅       |  ✅  |   ✅    | ✅<sup>5, 7, 8</sup> |   ✅    |     ✅     | ✅<sup>5, 7, 8</sup> |       ✅       |       ✅       |  ✅  |   ✅    |
|                                    ALAC                                     |       ❌       |  ❌  |   ❌    |          ✅          |   ❌    |     ❌     |          ✅          |                |                |      |   ✅    |

[Format Cheatsheet:](https://en.wikipedia.org/wiki/Moving_Picture_Experts_Group#External_links)

|            [MPEG-1](https://en.wikipedia.org/wiki/MPEG-1)            |           [MPEG-2](https://en.wikipedia.org/wiki/MPEG-2)            |
| :------------------------------------------------------------------: | :-----------------------------------------------------------------: |
| [MP2 (layer 2)](https://en.wikipedia.org/wiki/MPEG-1_Audio_Layer_II) | [AAC (Part 7)](https://en.wikipedia.org/wiki/Advanced_Audio_Coding) |
|          [MP3 (layer 3)](https://en.wikipedia.org/wiki/MP3)          |                                                                     |

<sup>1</sup>MP3 Mono is incorrectly reported as unsupported and will transcode to AAC.
<br />
<sup>2</sup>Only EAC3 2.0 has been tested.
<br />
<sup>3</sup>OGG containers are not supported and will cause VORBIS to convert.
<br />
<sup>4</sup>Only DTS Mono has been tested.
<br />
<sup>5</sup>Safari only supports opus in <code>.caf</code> files
<br />
<sup>6</sup>Supported via passthrough on all devices. Native support for AC3 & E-AC3 on Roku TVs & Ultra.
<br />
<sup>7</sup>iOS 17 / macOS 14 and above supports stereo Opus in MP4 containers.
<br />
<sup>8</sup>iOS 18.4 / macOS 15.4 and above supports Vorbis and Opus in OGG containers.

ATSC Standard for [AC-3 and EAC-3](https://www.atsc.org/wp-content/uploads/2015/03/A52-201212-17.pdf).

## [Subtitle Compatibility](https://en.wikipedia.org/wiki/Comparison_of_video_container_formats#Subtitle/caption_formats_support "Wikipedia's subtitle codec tables")

Subtitles can be a subtle issue for transcoding. Containers have a limited number of subtitles that are supported. If subtitles need to be transcoded, it will happen one of two ways: they can be converted into another format that is supported, or burned into the video due to the subtitle transcoding not being supported. Burning in subtitles is the most intensive method of transcoding. This is due to two transcodings happening at once; applying the subtitle layer on top of the video layer.

Here is a [breakdown](https://www.afterdawn.com/guides/archive/subtitle_formats_explained.cfm) of common subtitle formats.

|                         Subtitle Format                          |     Format     | TS  | MP4 | MKV | AVI |
| :--------------------------------------------------------------: | :------------: | :-: | :-: | :-: | :-: |
|    [SubRip Text (SRT)](https://en.wikipedia.org/wiki/SubRip)     |      Text      | ❌  | 🔶  | ✅  | 🔶  |
| [WebVTT (VTT)](https://en.wikipedia.org/wiki/WebVTT)<sup>1</sup> |      Text      | ❌  | ❌  | ✅  | 🔶  |
|                             ASS/SSA                              | Formatted Text | ❌  | ❌  | ✅  | 🔶  |
|                        VobSub<sup>2</sup>                        |    Picture     | ✅  | ✅  | ✅  | 🔶  |
|                            MP4TT/TXTT                            |      XML       | ❌  | ✅  | ❌  | ❌  |
|                              PGSSUB                              |    Picture     | ❌  | ❌  | ✅  | ❌  |
|                     EIA-608/708<sup>3</sup>                      |    Embedded    | ✅  | ✅  | ✅  | ❌  |

<sup>1</sup>VTT are supported in an <a href="https://helpx.adobe.com/adobe-media-server/dev/webvtt-subtitles-captions.html">HLS Stream</a>.
<br />
<sup>2</sup>DVB-SUB <a href="https://forum.videohelp.com/threads/261451-Difference-between-SUB-and-IDX-file">(SUB + IDX)</a> is another name for VobSub files.
<br />
<sup>3</sup>EIA-608/708 subtitles are embedded in private channels (channel 21) in a MPEG video codec. EIA-608 are standard CC subtitles with the black bar background, while EIA-708 are typically SDH.

### Types of Subtitles

There are many variations of subtitles. Closed, open, burned-in, forced, SDH, and CC are among the common types of subtitles. The format (such as SubRIP or VobSUB) does not matter for the type of subtitle.

#### Closed Subtitles

This is the generic name for subtitles that can be turned on or off. This can be Forced, SDH, CC or normal subtitles.

#### Burned-in

Open subtitles (also known as burned-in subtitles) are subtitles that have been permanently placed in the video and cannot be turned off. Open subtitles are the most common type of subtitles, where the subtitles are part of the video stream and cannot be toggled on or off.

#### SDH and Closed Captioning

SDH and CC are subtitles for the Deaf and Hard of Hearing. They include extra content such as background noises. SDH and CC are not defined by a specific type of subtitle, just by their intent. If using an OTA Tuner and DVR, the subtitles will be embedded into the video and transcoding them before extracting the subtitles will destroy the subtitles.

#### Forced

"Forced subtitles are common on movies and only provide subtitles when the characters speak a foreign or alien language, or a sign, flag, or other text in a scene is not translated in the localization and dubbing process. In some cases, foreign dialogue may be left untranslated if the movie is meant to be seen from the point of view of a particular character who does not speak the language in question." - [Wikipedia](https://en.wikipedia.org/wiki/Subtitles#Categories)

### Extracting Subtitles

To extract subtitles, the following commands can be used. The section `0:s:0` means the first subtitle, so `0:s:1` would be the second subtitle.

#### SSA/ASS Subtitles

```bash
ffmpeg -dump_attachment:t "" -i file.mkv -map 0:s:1 -c:s ass extracted-subtitle.ass
```

#### Recorded OTA Content

Content recorded OTA will typically have subtitles [embedded](https://aberdeen.io/blog/2009/06/18/the-basics-of-608-vs-708-captions/) into the video codec itself. These subtitles are typically EIA-608 for analog and EIA-708 for digital.

```bash
ffmpeg -f lavfi -i "movie=Ronin (1998).ts[out+subcc]" -map 0:1  "Ronin (1998).srt"
```

### Fonts

Text-based subtitle formats require fonts to render properly. Please refer to [Fonts](/docs/general/administration/configuration#fonts) for how to install them.

## [Container Compatibility](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers)

If the container is unsupported, this will result in remuxing. The video and audio codec will remain intact but wrapped in a supported container. This is the least intensive process. Most video containers will be remuxed to use the HLS streaming protocol and TS containers. Remuxing shouldn't be a concern even for an RPi3.

|                               Container                               | Chrome | Edge | Firefox | Safari | Android | Android TV | Kodi | Roku |
| :-------------------------------------------------------------------: | :----: | :--: | :-----: | :----: | :-----: | :--------: | :--: | :--: |
|    [MP4](https://en.wikipedia.org/wiki/MPEG-4_Part_14)<sup>1</sup>    |   ✅   |  ✅  |   ✅    |   ✅   |   ✅    |     ✅     |  ✅  |  ✅  |
|    [MKV](https://en.wikipedia.org/wiki/Matroska)<sup>2, 3, 8</sup>    |   ❌   |  ✅  |   ❌    |   ❌   |   ✅    |     ✅     |  ✅  |  ✅  |
|     [WebM](https://en.wikipedia.org/wiki/WebM)<sup>3, 5, 6</sup>      |   ✅   |  ✅  |   ✅    |   ✅   |   ✅    |     ✅     |  ✅  |  ✅  |
| [TS](https://en.wikipedia.org/wiki/MPEG_transport_stream)<sup>4</sup> |   ✅   |  ✅  |   ✅    |   ✅   |   ✅    |     ✅     |  ✅  |  ✅  |
|        [OGG](https://en.wikipedia.org/wiki/Ogg)<sup>5, 7</sup>        |   ✅   |  ✅  |   ✅    |   ✅   |   ✅    |     ✅     |  ✅  |  ✅  |

<sup>1</sup>MP4 containers are one of the few containers that will not remux.
<br />
<sup>2</sup>MKV containers can hold nearly any codec, but are not compatible with streaming in Firefox and will remux.
<br />
<sup>3</sup>MKV containers are improperly labeled as WebM in Firefox during playback.
<br />
<sup>4</sup>TS is one of the primary containers for streaming for Jellyfin.
<br />
<sup>5</sup>WebM and OGG have limited codec support (by design), refer to <a href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers#WebM">this</a> for WebM and <a href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers#Ogg">this</a> for OGG.
<br />
<sup>6</sup>WebM on Safari requires at least Safari 14.
<br />
<sup>7</sup>OGG on Safari requires at least iOS 18.4 / macOS 15.4
<br />
<sup>8</sup>MKV support in Firefox is currently disabled in Jellyfin, as there are significant issues making it unusable for Jellyfin. [1](https://bugzilla.mozilla.org/show_bug.cgi?id=2000420) [2](https://bugzilla.mozilla.org/show_bug.cgi?id=1991746)
