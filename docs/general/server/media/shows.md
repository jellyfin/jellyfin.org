---
uid: server-media-shows
title: Shows
---

# Shows

The most common naming scheme for shows is categorizing the files by series and then season. Another common method is simply using series folders, especially for shows that are organized by air date and those without seasons. Adding the year at the end in parentheses will yield the best results when scraping metadata.

:::tip

In order to help with identifying a series, Jellyfin can make use of media provider identifiers. This can be specified in your show's folder name, for example: `Series (2018) [tmdbid-65567]` or `Series (2018) [tvdbid-65567]`

:::

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
    ├── Series Name B S01E01.mkv
    ├── Series Name B S01E02.mkv
    ├── Series Name B S02E01-E02.mkv
    └── Series Name B S02E03.mkv
```

:::note

Avoid special characters such as \* in M\*A\*S\*H, use MASH instead.

:::

:::note

Do not mix episodes inside season folders and episodes on the Series root folder.

Do not abbreviate the Season folder with `S01` or `SE01` or alike.

:::

:::note

Season folders shouldn't contain the series name, otherwise Jellyfin can in certain cases (Stargate SG-1 due to the dash and one, for instance) misdetect your episodes and put them all under the same season.

:::

## Show Specials

Show specials can be added in the `Season 00` folder. If supported by your metadata provider those files will be matched. In case your metadata provider does not provide information about the special, it is recommended to use a name which describes the content of the special instead of naming it `Episode S00Exy.mkv`. This is done to avoid wrong metadata being pulled for the special and to provide a proper presentation.

:::note

Episode numbering for specials may vary from metadata provider to metadata provider.

:::

## Episodes Split Across Multiple Parts

Episodes that are split into multiple files can be stacked together if named correctly. Files should be named as follows:

- `Series (2010)/Season 02/Series (2010) S02E01<separator><parttype><separator><partnumber>.mkv`

The separator is optional between `<parttype>` and `<partnumber>`. `<partnumber>` can be any number, or the letters a-d.

Supported part types are:

- `cd`
- `dvd`
- `part`
- `pt`
- `disc`
- `disk`

Supported separators are:

- `(space)`
- `. (period)`
- `- (dash)`
- `_ (underscore)`

## Show Extras

Show extras can include deleted scenes, interviews, and other various things that you would want to include alongside your show. Extras can be added at both the series and season level. Jellyfin supports several different methods of adding these files.

:::note

Season level extras are only supported when season folders are used.

:::

### Extras Folders

One of the cleanest ways of adding extras is to place them in subfolders within your show or season folder.

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
Shows
└── Series (2010)
    ├── Season 01
    │   ├── Episode S01E01.mkv
    │   ├── Episode S01E02.mkv
    │   ├── featurettes
    │   │   └── Some Featurette.mkv
    │   └── interviews
    │       └── Interview with the Director.mp4
    ├── Season 02
    │   ├── Episode S02E01.mkv
    │   ├── Episode S02E02.mkv
    │   └── behind the scenes
    │       └── Behind the Scenes.mp4
    └── extras
        └── Fantastic Extra.mkv
```

### File Suffix

If you would rather keep everything in a single folder, you can append special suffixes to the filename which Jellyfin picks up and uses to identify the file as an extra. Unless noted, these suffixes **DO NOT** contain any spaces.

<!-- markdownlint-disable MD038 -->

- `-trailer`
- `.trailer`
- `_trailer`
- ` trailer` - This is a space followed by the word `trailer`
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
Shows
└── Series (2010)
    ├── Season 01
    │   ├── Episode S01E01.mkv
    │   ├── Episode S01E02.mkv
    │   ├── Alternate Ending-deleted.mkv
    │   └── Interview with the Director-interview.mp4
    └── Fantastic Extra-extra.mkv
    └── Making the Show-featurette.mp4
```

:::note

Trailers support a special option if you only have a single file of that type per series/season. The option is to name the filename 'trailer.ext' when stored in the same folder as the series or season.

:::

## 3D Videos

Please refer to ['3D Movies' in the movies section](/docs/general/server/media/movies#3d-movies)

## Images

Posters, Backdrops, and Logos may also be embedded into video containers that support it (such as mkv) and will be read out by the `Embedded Image Extractor` if enabled as an `Image Extractor` on the library configuration page.

### Poster

- folder.ext
- poster.ext
- cover.ext
- default.ext
- show.ext

Examples:

- Series:
  - Series (2010)/poster.jpg
- Season posters:
  - Numbered seasons:
    - Series (2010)/Season 01/cover.jpg
    - Series (2010)/season1-poster.jpg
  - Specials:
    - Series (2010)/season-specials-poster.jpg

### Backdrop

- backdrop.ext
- fanart.ext
- background.ext
- art.ext
- extrafanart/\*.ext

Examples:

Series (2010)/fanart.jpg _for the first backdrop image_

Series (2010)/extrafanart/fanart1.jpg, Series (2010)/extrafanart/fanart2.jpg, _etc for additional backdrop images_

### Banner

- banner.ext

Example:

Series (2010)/banner.jpg

### Thumb

- thumb.ext
- landscape.ext

Examples:

Series (2010)/landscape.jpg

Series (2010)/Season 01/episode filename-thumb.jpg _for the thumbnail of an episode named "episode filename.mkv"_

### Logo

- logo.ext
- clearlogo.ext

Example:

Series (2010)/logo.png

## Other

### Theme Videos

- backdrops/\*

Example:

Series (2010)/backdrops/S1Intro.ext

### Theme Music

- theme.ext
- theme-music/\*

Examples:

Series (2010)/theme.ext

Series (2010)/theme-music/intro-song.ext
