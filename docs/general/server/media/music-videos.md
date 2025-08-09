---
uid: server-media-music-videos
title: Music Videos
---

# Music Videos

Music videos can be added to a Jellyfin server using the "Music Videos" library type.

import VideoHeader from './\_video-header.md';

<VideoHeader />

## Organization

Music videos are organized mostly the same as movies, with a few key differences - no external metadata providers are available by default, and multi layer folders are supported.

```txt
MusicVideos
├── Folder 1
│   ├── Folder 1.1
│   │   └── Song 1
│   │       ├── Song 1 Version 1.mp4
│   │       ├── Song 1 Version 2.mp4
│   │       └── Song 1 Version 3.mp4
│   ├── Song 2
│   │   ├── Song 2 Version 1.mp4
│   │   ├── Song 2 Version 1.nfo
│   │   ├── Song 2 Version 2.mp4
│   │   └── Song 2 Version 2.nfo
│   └── Song 3
│       ├── Song 3.mkv
│       └── Song 3.nfo
└── Song 4
    └── Song 4.avi
```

### Naming

The folders and video files can be named however you want, since no metadata fetching is performed. The folder and file names will be displayed as the name of the item in Jellyfin.

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
