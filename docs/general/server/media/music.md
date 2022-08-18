---
uid: server-media-music
title: Music
---

# Music

The most common organization scheme for music is separation by artist and then album.

```txt
/Music
    /Artist
        /Album
            01 - Song.mp3
            02 - Song.mp3
```

You can also separate your music into artist folders or with no folder structure at all.

```txt
/Music
    /Artist
        01 - Song.flac
        02 - Song.flac
    08 - Song.ogg
    09 - Song.ogg
```

Individual songs have no required parameters for filenames since the information will be scraped from metadata.

## Discs

Albums with several discs will be fine with the metadata tags, but you can also use subfolders for the discs. The number can be appended after a space, hyphen, or directly after one of the following keywords.

* Disc
* Disk
* CD
* Vol
* Volume

```txt
/Music
    /Artist
        /Album
            /Disc 1
                01 - Song.mp3
                02 - Song.mp3
            /Disc 2
                01 - Song.mp3
                02 - Song.mp3
```

## Images

Images will be scraped from album or artist folders, and they can also be embedded in the music files themselves. The supported filenames are listed below for each respective image.

### Primary

* folder
* poster
* cover
* default

### Art

* clearart

### Backdrop

Multiple backdrop images can be used to cycle through several over time. Simply append a number to the end of the filename directly after or after a hyphen.

* backdrop
* fanart
* background
* art
* extrafanart

### Banner

* banner

### Disc

* disc
* cdart

### Logo

* logo

### Thumb

* thumb
* landscape
