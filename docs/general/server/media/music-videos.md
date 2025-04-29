---
uid: server-media-music-videos
title: Music videos
---

# Music Videos

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

import ExternalStreams from './\_video-external-streams.md';

<ExternalStreams />

import MultiversionMultipart from './\_video-multiversion-multipart.md';

<MultiversionMultipart />

import ExternalExtras from './\_video-external-extras.md';

<ExternalExtras />

import ExternalImages from './\_external-images.md';

<ExternalImages />
