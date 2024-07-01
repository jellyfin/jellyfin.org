---
uid: server-media-lyrics
title: Lyrics
---

# Lyrics
Lyrics are contained in the same folder and must match the filenames for their corresponding item. For example: The lyric file for `01 Death Eternal.mp3` must be `01 Death Eternal.lrc` or `01 Death Eternal.txt`.

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

The Lyrics file can be synchronized or unsynchronized. It can have some extra metadata, but that won't be registered by Jellyfin.

### Synchronized
You can either synchronize lyrics by hand (which can be time consuming and not precise) or use any lrics synchronization software, like minilyrics.
![Sychronized Lyrics](https://github.com/JustJamie4realz/jellyfin.org/assets/92894671/443d2b4f-3d69-4d0a-8b55-dbcafef741fc)

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
You can leave lyrics unsynchronized if you don't have the time to make lyrics by hand or don't have the software to do so.
![Unsynchronized Lyrics](https://github.com/JustJamie4realz/jellyfin.org/assets/92894671/c9d6673a-3807-4eaa-8d0d-e2542c8924cc)

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
