---
uid: server-media-video-index
title: Video Content
---

# Video Content

Video content covers all content that is in Video form, namely movies, TV shows and music videos.

Most common video formats are supported by Jellyfin, such as `mp4` and `mkv`. In addition, `VIDEO_TS` and `BDMV` folders are supported for movies and music videos.

`.iso` files and other disc image formats should work but are not supported. It is recommended that disc image formats be remuxed into `mkv` containers, or extracted into `VIDEO_TS` or `BDMV` folders.

## Movies

Movies should be organized into individual folders for each movie. The folder can optionally contain extra files.

```txt
Movies
├── Best_Movie_Ever (2019)
│   ├── Best_Movie_Ever (2019).mp4
│   ├── Best_Movie_Ever (2019).nfo
│   ├── Best_Movie_Ever (2019).en_us.srt
│   ├── cover.png
│   └── theme.mp3
└── Movie (2021) [imdbid-tt12801262]
    ├── backdrop.jpg
    └── VIDEO_TS
        ├── VIDEO_TS.BUP
        ├── VIDEO_TS.IFO
        ├── VIDEO_TS.VOB
        ├── VTS_01_0.BUP
        ├── VTS_01_0.IFO
        ├── VTS_01_0.VOB
        ├── VTS_01_1.VOB
        └── VTS_01_2.VOB
```

## TV Shows

Shows should be organized into series folders, then into season folders under each series.

```txt
Shows
├── Series Name A (2010)
│   ├── Season 00
│   │   ├── Some Special.mkv
│   │   ├── Series Name A S00E01.mkv
│   │   └── Series Name A S00E02.mkv
│   ├── Season 01
│   │   ├── Series Name A S01E01-E02.mkv
│   │   ├── Series Name A S01E03.mkv
│   │   └── Series Name A S01E04.mkv
│   └── Season 02
│       ├── Series Name A S02E01.mkv
│       ├── Series Name A S02E02.mkv
│       ├── Series Name A S02E03 Part 1.mkv
│       └── Series Name A S02E03 Part 2.mkv
└── Series Name B (2018)
    ├── Season 01
    |   ├── Series Name B S01E01.mkv
    |   └── Series Name B S01E02.mkv
    └── Season 02
        ├── Series Name B S02E01-E02.mkv
        └── Series Name B S02E03.mkv
```

Each video file may contain multiple episodes. However, only the metadata of the first episode will be shown in Jellyfin. It is recommended that the video files be split into individual episodes using a tool like [MKVToolNix](https://mkvtoolnix.download)

## Music Videos

## Extras

## File Suffixes

## Multiple Versions
