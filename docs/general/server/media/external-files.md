---
uid: server-media-external-files
title: External files
---

# External files

Audio and subtitles will usually be embedded within your video container file (e.g. mkv), but the server also supports loading audio and subtitle streams from external files.
The server supports reading either single files or containers like mka (Matroska Audio) or mks (Matroska Subtitle) with one or more streams.

:::note

External audio files and containers are supported on Jellyfin 10.8 and later.

:::

## Naming

Jellyfin will search for external files that exactly match the video filename.
They can optionally include a language which will only be used if the language cannot be determined from the file metadata.

If multiple languages are defined within the filename the last one will be used and the others ignored.

### Simple example

```txt
/Movies
    /Film (1946)
        Film.mkv
        Film.vtt
        Film.aac
        Film.mka
        Film.mks
        Film.en.ac3
        Film.de.srt
        Film.en.dts
        Film.german.ac3
```

### Naming Flags

Additional flags can be appended to the filename (separated by the `.` delimiter) to add metadata. Supported metadata and flags are:

- Default: `default`
  - Marks the stream as the default.
- Forced: `forced`, `foreign`
  - Marks the subtitle stream as forced, typically used for translation of segments of audio/text that differ from the primary language.
- Hearing Impaired (Jellyfin 10.9+): `sdh`, `cc`, `hi`
  - Indicates that the subtitle stream has additional information to help viewers that are hearing impaired.

:::note

`hi` collides with the Hindi language abbreviation. `hi` by itself will resolve as a Hindi language track, while `hi` in conjunction with another language identifier (such as `title.en.hi.srt`) will use the other language and tag it as hearing impaired.

:::

Flags are ignored on containers with more than one stream.

Any arbitrary text not parsable to a language or flag will be combined and used as the title of the stream (if there is not a stream title already embedded in the file metadata).

### Extended example with flags and stream title

```txt
/Movies
    /Film (1986)
        Film.mkv
        Film.default.srt
        Film.default.en.forced.ass
        Film.forced.en.dts
        Film.en.sdh.srt
        Film.English Commentary.en.mp3
```

:::note

The last file will parse to an English mp3 audio stream with the title `English Commentary`.

:::
