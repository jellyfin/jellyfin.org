---
id: server-media-subtitles
title: Subtitles
---

# Subtitles

Subtitles will usually be embedded in video files, but the server also supports external subtitles. Supported formats include ass, srt, ssa, sub, idx, and vtt files.

Normally the server will only attempt to scan for local files, but if any subtitle plugins are installed there is also support for downloading remote subtitles automatically.

## Formatting

Jellyfin will search for subtitles that exactly match the video filename. They can optionally include a language code or name that will get picked up as well.

```txt
/Movies
    /Film (1946)
        Film.mkv
        Film.vtt
        Film.de.vtt
        Film.german.vtt
```

## Default

Subtitles can be labeled as default by appending `.default` at the end of the filename.

```txt
/Movies
    /Film (1986)
        Film.mkv
        Film.srt
        Film.default.srt
```

### Forced

Subtitles can be set to forced by appending `.forced` or `.foreign` to the end of the file.

```txt
/Movies
    /Film (2010)
        Film.mkv
        Film.ass
        Film.forced.ass
        Film.foreign.ass
```
