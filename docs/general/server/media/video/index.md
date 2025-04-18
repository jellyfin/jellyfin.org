---
uid: server-media-video-index
title: Video Content
---

# Video Content

Video content covers all content that is in Video form, namely movies, TV shows and music videos.

Most common video formats are supported by Jellyfin, such as `mp4` and `mkv`. In addition, `VIDEO_TS` and `BDMV` folders are supported.

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
    ├── Movie (2021) [imdbid-tt12801262] - 2160p.mp4
    ├── Movie (2021) [imdbid-tt12801262] - 1080p.mp4
    └── Movie (2021) [imdbid-tt12801262] - Directors Cut.mp4
```

## TV Shows

## Music Videos

## Extras

## File Suffixes

## Multiple Versions
