---
uid: server-media-lyrics
title: Lyrics
---

# Lyrics
Lyrics are contained in the same folder and must match the filenames for their corresponding item. For example: The lyric file for `01 Death Eternal.mp3` must be `01 Death Eternal.lrc`, `01 Death Eternal.elrc` or `01 Death Eternal.txt`.

```
Music
└── Some Artist
    └── Album A
        ├── Song 1.flac
        ├── Song 1.lrc
        ├── Song 2.flac
        ├── Song 2.lrc
        ├── Song 3.flac
        └── Song 3.lrc
```

The Lyrics file can be synchronized or unsynchronized. It can have some extra metadata, but won't be shown in the Jellyfin client.

### Synchronized
Synchronized lyrics are interactive, enabling users to click on any line to jump directly to the corresponding timestamp in the song. You have the option to either manually synchronize the text, which can be time-consuming and may lack accuracy, or utilize lyrics synchronization software such as MiniLyrics.

```
[ar: Camila Cabello]
[ti: She Loves Control]
[al: Camila]
[by: Jamie]
[length: 2:57]
[00:10.89]Cold, ′cause she has been here before
[00:14.58]She doesn't cry anymore
[00:16.78]No looking back
[00:21.03]No, she doesn′t go to the bar
[00:24.86]Too many lovers she's scarred
[00:26.82]And they want her back

[00:29.50]She loves control
[00:32.12]She wants it her way
...
```

### Unsynchronized
Unlike syncronized lyrics, unsyncronized lyrics are easier to implament, but will be harder for users to sing along.

```Unsynchronized
Dirty tissues, trust issues
Glasses on the sink, they didn't fix you
Lonely pillows in a strangers bed
Little voices in my head
Secret keeping, stop the bleeding
Lost a little weight because I wasn't eating
All the songs that I can't listen to, to tell the truth

Loving you was young, and wild, and free
Loving you was cool, and hot, and sweet
Loving you was sunshine, safe and sound
A steady place to let down my defenses
...
```
