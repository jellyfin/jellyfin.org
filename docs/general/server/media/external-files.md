---
uid: server-media-external-files
title: External files
---

# External files

Audio and subtitles will usually be embedded within your video container file (e.g. mkv), but the server also supports loading audio and subtitle streams from external files.
The server supports reading either single files or containers like mka (Matroska Audio) or mks (Matroska Subtitle) with one or more streams.

> [!Note]
> External audio files and containers are supported on Jellyfin 10.8 and later.

## Naming

Jellyfin will search for external files that exactly match the video filename.
They can optionally include a language which will only be used if the language cannot be determined from the file metadata.
They can also include the `forced` (or `foreign`) and `default` flags to mark the streams accordingly.
Those flags are ignored on containers with more than one stream.
Flags and language need to be appended to the video filename with `.` as delimiter.

If multiple languages are defined within the filename the last one will be used and the others ignored.
Any arbitrary text not parsable to a language or flag will be combined and used as the title of the stream.

### Simple example

```txt
/Movies
    /Film (1946)
        Film.mkv
        Film.vtt
        Film.aac
        Film.de.srt
        Film.en.dts
        Film.german.ac3
```

## Extended example with flags and stream title

```txt
/Movies
    /Film (1986)
        Film.mkv
        Film.mka
        Film.mks
        Film.en.ac3
        Film.default.srt
        Film.default.en.forced.ass
        Film.forced.forced.en.dts
        Film.English Commentary.en.mp3
```

> [!Note]
> The last file will parse to an English mp3 audio stream with the title `English Commentary`.
