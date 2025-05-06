---
uid: server-media-movies
title: Movies
---

# Movies

Movies can be added to a Jellyfin server using the "Movies" library type.

import VideoHeader from './\_video-header.md';

<VideoHeader />

## Organization

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

import ExternalStreams from './\_video-external-streams.md';

<ExternalStreams />

import Multiversion from './\_video-multiversion.md';

<Multiversion />

import Video3D from './\_video-3d.md';

<Video3D />

import Multipart from './\_video-multipart.md'

<Multipart />

import ExternalExtras from './\_video-external-extras.md';

<ExternalExtras />

import ExternalImages from './\_external-images.md';

<ExternalImages />
