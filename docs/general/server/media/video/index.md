---
uid: server-media-video-index
title: Video Content
---

# Video Content

Video content covers all content that is in Video form, namely movies, TV shows and music videos.

Most common video formats are supported by Jellyfin, such as `mp4` and `mkv`. In addition, `VIDEO_TS` and `BDMV` folders are supported for movies and music videos.

`.iso` files and other disc image formats should work but are not supported. It is recommended that disc image formats be remuxed into `mkv` containers, or extracted into `VIDEO_TS` or `BDMV` folders.

File names containing special characters WILL cause problems. The following characters are known to cause issues: `<`, `>`, `:`, `"`, `/`, `\`, `|`, `?`, `*`

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

### Show Specials

Show specials can be added in the `Season 00` folder. If supported by your metadata provider those files will be matched. In case your metadata provider does not provide information about the special, it is recommended to use a name which describes the content of the special instead of naming it `Series Name S00Exy.mkv`. This is done to avoid wrong metadata being pulled for the special and to provide a proper presentation.

:::note

Episode numbering for specials may vary from metadata provider to metadata provider.

:::

Specials can also be shown within a season if so desired. This can be helpful when they are part of a continued storyline during the season. This requires 2 settings:

1. The option `Display specials within their series they aired in` under `Dashboard -> Library -> Display` must be enabled
2. The season and episode they aired before/after must be set within the metadata.
   - These can be set in the Metadata editor or in an NFO using the `airsbefore_season`, `airsafter_season`, and `airsbefore_episode` tags.
   - When the `Airs before season` field is set but `Airs before episode` is not set, the special will play at the start of the specified season, before the first episode.
   - The `Airs before season` can also be combined with the `Airs before episode` field to insert it as a mid-season special before the specified episode. For example, if `Airs before season` is set to `2` and `Airs before episode` is set to `7`, the special will play between S02E06 and S02E07.
   - With `Airs after series`, set the Special will be shown (and played) at the end of the specified Season. This will take priority over the `Airs before season/episode` fields if they are set.
   - When multiple specials have the same position, they will play in the order in which they are stored in the specials season. For example, if S00E01 and S00E03 both have `Airs before season` set to `3` and `Airs before episode` set to `7`, the order the content will play in is: S03E06 → S00E01 → S00E03 → S03E07.

Note that this will show them in both the `Specials` season, in addition to the season specified.

## Music Videos

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

## File Suffixes

### Multiple Versions

Multiple versions of the same video can be stored together in the library using a file suffix. The part before any suffixes **MUST** be exactly the same, including any years and/or metadata provider IDs.

```txt
Movie (2021) [imdbid-tt12801262]
├── Movie (2021) [imdbid-tt12801262] - 2160p.mp4
├── Movie (2021) [imdbid-tt12801262] - 1080p.mp4
└── Movie (2021) [imdbid-tt12801262] - Directors Cut.mp4
```

## Extras

Extras can be added to movies, show series, show seasons, and music videos in a few different ways, as listed below.

### Extras Folders

One of the cleanest ways of adding extras is to place them in subfolders within your media folders.

Supported folder types are:

- `behind the scenes`
- `deleted scenes`
- `interviews`
- `scenes`
- `samples`
- `shorts`
- `featurettes`
- `clips`
- `other` - Generic catch all for extras of an unknown type.
- `extras` - Generic catch all for extras of an unknown type.
- `trailers`

```txt
Best_Movie_Ever (2019)
├── Best_Movie_Ever (2019) - 1080P.mp4
├── Best_Movie_Ever (2019) - 720P.mp4
├── Best_Movie_Ever (2019) - Directors Cut.mp4
├── behind the scenes
│   ├── Making of the Best Movie Ever.mp4
│   └── Finding the right score.mp4
├── interviews
│   └── Interview with the Director.mp4
└── extras
    └── Home recreation.mp4
```

### File Name

Some types of extras support a special option if you only have a single of that type. These options are to name the filename a specific word when stored in the same folder.

Supported filenames are:

- `trailer`
- `sample`
- `theme` - Audio file of the theme song

```txt
Best_Movie_Ever (2019)
├── Best_Movie_Ever (2019) - 1080P.mp4
├── sample.mp4
├── theme.mp3
└── trailer.mp4
```

### File Suffix

If you would rather keep everything in a single folder, you can append special suffixes to the filename which Jellyfin picks up and uses to identify the file as an extra. Note that, with a few noted exceptions, these suffixes **DO NOT** contain any spaces.

<!-- markdownlint-disable MD038 -->

- `-trailer`
- `.trailer`
- `_trailer`
- ` trailer` - This is a space followed by the word `trailer`
- `-sample`
- `.sample`
- `_sample`
- ` sample` - This is a space followed by the word `sample`
- `-scene`
- `-clip`
- `-interview`
- `-behindthescenes`
- `-deleted`
- `-deletedscene`
- `-featurette`
- `-short`
- `-other`
- `-extra`
<!-- markdownlint-enable MD038 -->

```txt
Best_Movie_Ever (2019)
├── Best_Movie_Ever (2019) - 1080P.mp4
├── That clip that I want everyone to see-clip.mp4
├── Release Trailer-trailer.mp4
├── Preview Trailer.trailer.avi
├── Release Trailer 2_trailer.avi
├── Teaser.sample.mp4
├── Favorite Scene-scene.mp4
├── The Best Ever-clip.mp4
├── Making of The Best Movie Ever-behindthescenes.mp4
├── Not the best scene-deleted.mp4
├── Theme Song Music Video-featurette.mp4
└── Art of the Best Movie Ever-short.mp4
```
