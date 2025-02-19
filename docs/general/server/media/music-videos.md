---
uid: server-media-music-videos
title: Music Videos
---

# Music videos

The `Music Videos` library type can be used to organize music videos.

The music videos are organized into folders, and the folder structure will be presented
directly to the users.

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

No metadata scraping from online providers will be performed. By default, the file names will be used as the title, and the last modified date of the files on the file system will be used as the release date. Jellyfin can be configured to use Embedded titles when they are present instead.

NFO files can be provided to provide information such as Title, Artist and Release Date. NFO files will take priority over other sources when they are present.
