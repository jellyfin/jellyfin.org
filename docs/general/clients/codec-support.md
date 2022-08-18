---
uid: clients-codec-support
title: Codec Support
---

# [Codec Tables](https://en.wikipedia.org/wiki/List_of_codecs "Wikipedia's list of all codecs")

The goal is to Direct Play all media. This means the container, video, audio and subtitles are all compatible with the client. If the media is incompatible for any reason, Jellyfin will use FFmpeg to [convert the media](http://howto-pages.org/ffmpeg/) to a format that the client can process. Direct Stream will occur if the audio, container or subtitles happen to not be supported. If the video codec is unsupported, this will result in video transcoding. Subtitles can be tricky because they can cause Direct Stream (subtitles are remuxed) or video transcoding (burning in subtitles) to occur. This is the most intensive CPU component of transcoding. Decoding is less intensive than encoding.

## [Video Compatibility](https://en.wikipedia.org/wiki/Comparison_of_video_container_formats "Wikipedia's video codec tables")

[Breakdown of video codecs.](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs)

[Test your browser's compatibility for any codec profile.](https://cconcolato.github.io/media-mime-support/)

| Sorted by efficency (excluding bit depth) | Chrome | Edge | Firefox | Safari | Android | Android TV | iOS | SwiftFin (iOS) | [Roku](https://developer.roku.com/docs/specs/media/streaming-specifications.md) | Kodi | [Desktop](https://docs.jellyfin.org/general/clients/index.html#jellyfin-desktop) |
|-|-|-|-|-|-|-|-|-|-|-|-|
| [MPEG-4 Part 2/SP](https://en.wikipedia.org/wiki/DivX) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| [MPEG-4 Part 2/ASP](https://en.wikipedia.org/wiki/MPEG-4_Part_2#Advanced_Simple_Profile_(ASP)) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |  | ✅ | ✅ |
| [H.264 8Bit](https://caniuse.com/#feat=mpeg4 "H264 Browser Support Reference") | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| [H.264 10Bit](https://caniuse.com/#feat=mpeg4 "H264 Browser Support Reference") | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ |
| [H.265 8Bit](https://caniuse.com/#feat=hevc "HEVC Browser Support Reference") | ❌ | ✅<sup>7</sup> | ❌ | 🔶<sup>1</sup> | 🔶<sup>2</sup> | ✅<sup>5</sup> | 🔶<sup>1</sup> | ✅<sup>6</sup> | ✅ | ✅ | ✅ |
| [H.265 10Bit](https://caniuse.com/#feat=hevc "HEVC Browser Support Reference") | ❌ | ✅<sup>7</sup> | ❌ | 🔶<sup>1</sup> | 🔶<sup>2</sup> | 🔶<sup>5</sup> | 🔶<sup>1</sup> | ✅<sup>6</sup> | ✅ | ✅ | ✅ |
| [VP9](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#VP9 "V9 Browser Support Reference") | ✅ | ✅ | ✅ | ❌ | ✅<sup>3</sup> | 🔶<sup>3</sup> | ❌ | ❌ | ✅ | ✅ | ✅ |
| [AV1](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#AV1 "AV1 Browser Support Reference") | ✅ | ✅ | ✅ | ❌ | ✅ | 🔶<sup>4</sup> | ❌ | ❌ | ✅ | ✅ | ✅ |

<sup>1</sup>HEVC is only supported in MP4, M4V, and MOV containers.

<sup>2</sup>Android playback is currently broken. Client reports that HEVC is supported and attempts to Direct Stream.

<sup>3</sup>May be (partially) dependent on Hardware support (can be compensated with CPU decoding on Android). Most new Android phones in the higher price range and many "4K" Android TV devices have VP9 hardware decoding support. Refer to you manufacturer for supported codecs.

<sup>4</sup>Needs atleast Android TV 10

<sup>5</sup>As of [version 0.12](https://github.com/jellyfin/jellyfin-androidtv/pull/671), HEVC is enabled on all devices running Android 5.0+, but early generations of the Amazon Fire may not work yet. 10Bit may be supported depending on your device. Before Client 0.12, HEVC support was enabled on specific devices.

<sup>6</sup>HEVC decoding is supported on Apple devices with the A8X chip or newer and at least iOS 14

<sup>7</sup>HEVC decoding is only supported on Windows 10 with the HEVC Video Extension from the Microsoft [store](https://www.microsoft.com/store/productId/9NMZLZ57R3T7).

[Format Cheatsheet:](https://en.wikipedia.org/wiki/MPEG-4#MPEG-4_Parts)

|[MPEG-2<br>Part 2](https://en.wikipedia.org/wiki/H.262/MPEG-2_Part_2)|[MPEG-4<br>Part-2](https://en.wikipedia.org/wiki/MPEG-4_Part_2)<sup>1</sup>|[MPEG-4<br>Part-10](https://en.wikipedia.org/wiki/Advanced_Video_Coding)|[MPEG-4<br>Part-14](https://en.wikipedia.org/wiki/MPEG-4_Part_14)|[MPEG-H<br>Part 2](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding)|
|:---:|:---:|:---:|:---:|:---:|
|H.262|MPEG-4 SP/ASP|H.264|MP4 Container<sup>2</sup>|H.265|
|MPEG-2 Video|DivX|MPEG-4 AVC||HEVC|
|DVD-Video|DX50||||

<sup>1</sup>[MPEG-4 Part-2 vs Part-10](https://www.afterdawn.com/glossary/term.cfm/mpeg_4_part_10)

<sup>2</sup>[MPEG-4 Part 17: MP4TT Subtitles](https://en.wikipedia.org/wiki/MPEG-4_Part_17)

## [Audio Compatibility](https://en.wikipedia.org/wiki/Comparison_of_video_container_formats#Audio_coding_formats_support "Wikipedia's audio codec tables")

If the audio codec is unsupported or incompatible (such as playing a 5.1 channel stream on a stereo device), the audio codec must be transcoded. This is not nearly as intensive as video transcoding.

||Chrome|Edge|Firefox|Safari|Android|Android TV|iOS|SwiftFin (iOS) |Roku|Kodi|Desktop|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|FLAC|✅|✅|✅|✅|✅|✅|✅|✅|✅|✅|✅|
|MP3|🔶<sup>1</sup>|✅|🔶|✅|✅|✅|✅|✅|✅|✅|✅|
|AAC|✅|✅|✅|✅|✅|✅|✅|✅|✅|✅|✅|
|[AC3](https://www.loc.gov/preservation/digital/formats/fdd/fdd000209.shtml)|✅|✅|❌|✅|✅|✅|✅|✅||✅|✅|
|[EAC3](https://en.wikipedia.org/wiki/Dolby_Digital_Plus)<sup>2</sup>|✅|✅|✅|✅|✅|✅|✅|✅||✅|✅|
|VORBIS<sup>3</sup>|✅|✅|✅|❌|✅|❌|❌|✅|✅|✅|✅|
|DTS<sup>4</sup>|❌|❌|❌|❌|✅|✅|❌|✅|✅<sup>6</sup>|✅|✅|
|OPUS|✅|✅|✅|🔶<sup>5</sup>|✅|✅|🔶<sup>5</sup>|✅|✅|✅|✅|

[Format Cheatsheet:](https://en.wikipedia.org/wiki/Moving_Picture_Experts_Group#External_links)

|[MPEG-1](https://en.wikipedia.org/wiki/MPEG-1)|[MPEG-2](https://en.wikipedia.org/wiki/MPEG-2)|
|:---:|:---:|
|[MP2 (layer 2)](https://en.wikipedia.org/wiki/MPEG-1_Audio_Layer_II)|[AAC (Part 7)](https://en.wikipedia.org/wiki/Advanced_Audio_Coding)|
|[MP3 (layer 3)](https://en.wikipedia.org/wiki/MP3)||

<sup>1</sup>MP3 Mono is incorrectly reported as unsupported and will transcode to AAC.

<sup>2</sup>Only EAC3 2.0 has been tested.

<sup>3</sup>OGG containers are not supported and will cause VORBIS to convert.

<sup>4</sup>Only DTS Mono has been tested.

<sup>5</sup>Safari only supports opus in `.caf` files

<sup>6</sup>Supported via passthrough on all devices. Native support for AC3 & E-AC3 on Roku TVs & Ultra.

ATSC Standard for [AC-3 and EAC-3](https://www.atsc.org/wp-content/uploads/2015/03/A52-201212-17.pdf).

## [Subtitle Compatibility](https://en.wikipedia.org/wiki/Comparison_of_video_container_formats#Subtitle/caption_formats_support "Wikipedia's subtitle codec tables")

Subtiles can be a subtle issue for transcoding. Containers have a limited number of subtitles that are supported. If subtitles need to be transcoded, it will happen one of two ways: they can be converted into another format that is supported, or burned into the video due to the subtitle transcoding not being supported. Burning in subtitles is the most intensive method of transcoding. This is due to two transcodings happening at once; applying the subtitle layer on top of the video layer.

Here is a [breakdown](https://www.afterdawn.com/guides/archive/subtitle_formats_explained.cfm) of common subtitle formats.

||Format|TS|MP4|MKV|AVI|
|:---:|:---:|:---:|:---:|:---:|:---:|
|[SubRip Text (SRT)](https://en.wikipedia.org/wiki/SubRip)|Text|❌|🔶|✅|🔶|
|[WebVTT (VTT)](https://en.wikipedia.org/wiki/WebVTT)<sup>1</sup>|Text|❌|❌|✅|🔶|
|ASS/SSA|Formatted Text|❌|❌|✅|🔶|
|VobSub<sup>2</sup>|Picture|✅|✅|✅|🔶|
|MP4TT/TXTT|XML|❌|✅|❌|❌|
|PGSSUB|Picture|❌|❌|✅|❌|
|EIA-608/708<sup>3</sup>|Embedded|✅|✅|✅|❌|

<sup>1</sup>VTT are supported in an [HLS Stream](https://helpx.adobe.com/adobe-media-server/dev/webvtt-subtitles-captions.html).

<sup>2</sup>DVB-SUB [(SUB + IDX)](https://forum.videohelp.com/threads/261451-Difference-between-SUB-and-IDX-file) is another name for VobSub files.

<sup>3</sup>EIA-608/708 subtitles are embedded in private channels (channel 21) in a MPEG video codec. EIA-608 are standard CC subtitles with the black bar background, while EIA-708 are typically SDH.

### Types of Subtitles

There are many variations of subtitles. Closed, open, burned-in, forced, SDH, and CC are among the common types of subtitles. The format (such as SubRIP or VobSUB) does not matter for the type of subtitle.

#### Closed Subtitles

This is the generic name for subtitles that can be turned on or off. This can be Forced, SDH, CC or normal subtitles.

#### Burned-in

Open subtitles (also known as burned-in subtitles) are subtitles that have been permanently placed in the video and cannot be turned off. Open subtitles are the most common type of subtitles, where the subtitles are part of the video stream and cannot be toggled on or off.

#### SDH and Closed Captioning

SDH and CC are subtitles for the Deaf and Hard of Hearing. They include extra content such as background noises. SDH and CC are not defined by a specific type of subtitle, just by their intent. If using an OTA Tuner and DVR, the subtitles will be [embedded](https://evertz.com/resources/eia_608_708_cc.pdf) into the video and transcoding them before extracting the subtitles will destroy the subtitles.

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

## [Container Compatibility](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers)

If the container is unsupported, this will result in remuxing. The video and audio codec will remain intact, but wrapped in a supported container. This is the least intensive process. Most video containers will be remuxed to use the HLS streaming protocol and TS containers. Remuxing shouldn't be a concern even for an RPi3.

||Chrome|Edge|Firefox|Safari|Android|Android TV|Kodi|Roku|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|[MP4](https://en.wikipedia.org/wiki/MPEG-4_Part_14)<sup>1</sup>|✅|✅|✅|✅|✅|✅|✅|✅|
|[MKV](https://en.wikipedia.org/wiki/Matroska)<sup>2, 3</sup>|❌|✅|❌|❌|✅|✅|✅|✅|
|[WebM](https://en.wikipedia.org/wiki/WebM)<sup>3, 5</sup>|✅|✅|✅|❌|✅|✅|✅|✅|
|[TS](https://en.wikipedia.org/wiki/MPEG_transport_stream)<sup>4</sup>|✅|✅|✅|✅|✅|✅|✅|✅|
|[OGG](https://en.wikipedia.org/wiki/Ogg)<sup>5</sup>|✅|✅|✅|❌|✅|✅|✅|✅|

<sup>1</sup>MP4 containers are one of the few containers that will not remux.

<sup>2</sup>MKV containers can hold nearly any codec, but are not compatible with streaming in Firefox and will remux.

<sup>3</sup>MKV containers are improperly labeled as WebM in Firefox during playback.

<sup>4</sup>TS is one of the primary containers for streaming for Jellyfin.

<sup>5</sup>WebM and OGG have limited codec support (by design), refer to [this](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers#WebM) for WebM and [this](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers#Ogg) for OGG.
