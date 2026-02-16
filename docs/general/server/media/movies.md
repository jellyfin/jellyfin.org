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

### Naming

The folder containing the movie should be named in the following format:

```txt
Movie Name (year) [metadata provider id]
```

The `year` and `metadata provider id` fields are optional, but they will help identify media more reliably.

The video files within the folder should have the same name as the folder. I.e. if the folder is named `Super Fun Movie`, the video file within should be named `Super Fun Movie.mp4` (or any other extension), optionally with tags defined below.

- Example with name only: `Jellyfin Documentary.mkv`
- Example with year: `Jellyfin Documentary (2030).mkv`
- Example with metadata provider id: `Jellyfin Documentary [imdbid-tt00000000].mkv`
- Example with both year and metadata provider id: `Jellyfin Documentary (2030) [imdbid-tt00000000].mkv`

import VideoMetadataProviders from './\_video-metadata-providers.md';

<VideoMetadataProviders />

import ExternalStreams from './\_video-external-streams.md';

<ExternalStreams defaultTab="movies"/>

import Multiversion from './\_video-multiversion.md';

<Multiversion />

import Video3D from './\_video-3d.md';

<Video3D defaultTab="movies"/>

import Multipart from './\_video-multipart.md';

<Multipart defaultTab="movies"/>

import ExternalExtras from './\_video-external-extras.md';

<ExternalExtras defaultTab="movies"/>

import MetadataImages from './\_metadata-images.md';

<MetadataImages defaultTab="movies"/>
