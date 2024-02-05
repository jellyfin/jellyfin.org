---
uid: server-media-music
title: Music
---

# Music

You should organize albums into folders, with one folder containing one and only one album. <br/>
Jellyfin does not care how you organize albums together, as long as each album is contained within one folder. <br/>
Filenames do not matter since the info will be scraped from the embedded metadata of the tracks.

```txt
Music
├── Artist 1
│   ├── Album A
│   │   ├── Track 1.flac
│   │   ├── Track 2.flac
│   │   └── Track 3.flac
│   └── Album B
│       ├── Track 1.m4a
│       ├── Track 2.m4a
│       └── Track 3.m4a
└── Album X
    ├── Track 1.mp3
    ├── Track 2.mp3
    ├── Track 3.mp3
    └── Track 4.mp3
```

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
