---
uid: server-media-music
title: Music
---

# Music

You should organize albums into folders, with one folder containing one and only one album. Jellyfin does not care how you organize albums together, as long as each album is contained within one folder. Filenames generally do not matter since the info will be scraped from the embedded metadata of the tracks. If no other metadata was found, Jellyfin uses the file names as track titles.

```txt
Music
├── Artist 1
│   ├── Album A
│   │   ├── Song 1.flac
│   │   ├── Song 2.flac
│   │   └── Song 3.flac
│   └── Album B
│       ├── Track 1.m4a
│       ├── Track 2.m4a
│       └── Track 3.m4a
└── Album X
    ├── Whatever You.mp3
    ├── Like To.mp3
    ├── Name Your.mp3
    └── Music Files.mp3
```
:::caution Special Characters in File Names

While Jellyfin generally doesn't use the file names for indentification, files containing special characters can still cause problems.

The following characters are known to cause issues:
- < (less than)
- \> (greater than)
- : (colon)
- " (double quote)
- / (forward slash)
- \ (backslash)
- | (vertical bar or pipe)
- ? (question mark)
- \* (asterisk)
:::

## Discs

Albums with several discs are identified by the metadata tags. Please place the tracks for all disks in one folder

```txt
Album
├── Disc 1 Track 1.ogg
├── Disc 1 Track 2.ogg
├── Disc 2 Track 1.ogg
├── Disc 3 Track 1.ogg
├── Disc 3 Track 2.ogg
└── Disc 3 Track 3.ogg
```

## Images

Images will be scraped from album or artist folders, and they can also be embedded in the music files themselves. The supported filenames are listed below for each respective image.

### Primary

- folder
- poster
- cover
- default

### Art

- clearart

### Backdrop

Multiple backdrop images can be used to cycle through several over time. Simply append a number to the end of the filename directly after or after a hyphen.

- backdrop
- fanart
- background
- art
- extrafanart

### Banner

- banner

### Disc

- disc
- cdart

### Logo

- logo

### Thumb

- thumb
- landscape

## File Extensions / Containers

Jellyfin should support most common music formats. Exceptions as follows:

- MP4 with only audio: `.mp4` files won't be recognized as music. Please rename them to `.m4a`.
- `.flac` files with embedded WebP images may fail to play in Chromium based browsers (Chrome, Edge, Opera, Brave etc.).
