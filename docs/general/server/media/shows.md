---
uid: server-media-shows
title: TV Shows
---

# TV Shows

TV Shows can be added to Jellyfin using the "Shows" library type.

import VideoHeader from './\_video-header.md';

<VideoHeader />

## Organization

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

Each video file may contain multiple episodes. However, they will be shown as a single entry containing metadata from multiple episodes. It is recommended that the video files be split into individual episodes using a tool like [MKVToolNix](https://mkvtoolnix.download)

### Naming

The series folder should be named in the following format:

```txt
Series Name (year) [metadata provider id]
```

The `year` and `metadata provider id` fields are optional, but they will help identify media more reliably.

- Example with name only: `Jellyfin Documentary.mkv`
- Example with year: `Jellyfin Documentary (2030)`
- Example with metadata provider id: `Jellyfin Documentary [imdbid-tt00000000]`
- Example with both year and metadata provider id: `Jellyfin Documentary (2030) [imdbid-tt00000000]`

The Season folders should be named `Season *`, with `*` being any number. Do not abbreviate the `Season` name to `S01` or `SE01`. For the best results, please pad the season number with `0`s at the front to make sure each entry has the same number of digits. For example: `Season 5` -> `Season 05`. Also do not mix Season folders with episodes in the Shows folder.

import VideoMetadataProviders from './\_video-metadata-providers.md';

<VideoMetadataProviders />

import ExternalStreams from './\_video-external-streams.md';

<ExternalStreams defaultTab="shows"/>

import ExternalExtras from './\_video-external-extras.md';

<ExternalExtras defaultTab="shows"/>

### Show Specials

Show specials can be added in the `Season 00` folder. If supported by your metadata provider those files will be matched. In case your metadata provider does not provide information about the special, it is recommended to use a name which describes the content of the special instead of naming it `Series Name S00Exy.mkv`. This is done to avoid wrong metadata being pulled for the special and to provide a proper presentation.

Episode numbering for specials may vary from metadata provider to metadata provider.

Specials can also be shown within a season if so desired. This can be helpful when they are part of a continued storyline during the season. This requires 2 settings:

1. The option `Display specials within their series they aired in` under `Dashboard -> Library -> Display` must be enabled
2. The season and episode they aired before/after must be set within the metadata.
   - These can be set in the Metadata editor or in an NFO using the `airsbefore_season`, `airsafter_season`, and `airsbefore_episode` tags.
   - When the `Airs before season` field is set but `Airs before episode` is not set, the special will play at the start of the specified season, before the first episode.
   - The `Airs before season` can also be combined with the `Airs before episode` field to insert it as a mid-season special before the specified episode. For example, if `Airs before season` is set to `2` and `Airs before episode` is set to `7`, the special will play between S02E06 and S02E07.
   - With `Airs after series`, set the Special will be shown (and played) at the end of the specified Season. This will take priority over the `Airs before season/episode` fields if they are set.
   - When multiple specials have the same position, they will play in the order in which they are stored in the specials season. For example, if S00E01 and S00E03 both have `Airs before season` set to `3` and `Airs before episode` set to `7`, the order the content will play in is: S03E06 → S00E01 → S00E03 → S03E07.

Note that this will show them in both the `Specials` season, as well as the season specified.

import Video3D from './\_video-3d.md';

<Video3D defaultTab="shows"/>

import Multipart from './\_video-multipart.md';

<Multipart defaultTab="shows"/>

import MetadataImages from './\_metadata-images.md';

<MetadataImages defaultTab="shows"/>
