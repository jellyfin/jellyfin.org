---
uid: server-media-shows
title: Shows
---

# Shows

The most common naming scheme for shows is categorizing the files by series and then season. Another common method is simply using series folders, especially for shows that are organized by air date and those without seasons. Adding the year at the end in parentheses will yield the best results when scraping metadata.

> [!TIP]
> In order to help with identifying a series, Jellyfin can make use of media provider identifiers. This can be specified in your show's folder name, for example: `Series (2010) [imdbid-tt0106145]` or `Series (2018) [tmdbid-65567]`

```txt
Shows
├── Series (2010)
│   ├── Season 00
│   │   ├── Some Special.mkv
│   │   ├── Episode S00E01.mkv
│   │   └── Episode S00E02.mkv
│   ├── Season 01
│   │   ├── Episode S01E01-E02.mkv
│   │   ├── Episode S01E03.mkv
│   │   └── Episode S01E04.mkv
│   └── Season 02
│       ├── Episode S02E01.mkv
│       └── Episode S02E02.mkv
└── Series (2018)
    ├── Episode S01E01.mkv
    ├── Episode S01E02.mkv
    ├── Episode S02E01-E02.mkv
    └── Episode S02E03.mkv
```

> [!NOTE]
> Avoid special characters such as \* in M\*A\*S\*H, use MASH instead.

> [!NOTE]
> Season folders shouldn't contain the series name, otherwise Jellyfin can in certain cases (Stargate SG-1 due to the dash and one, for instance) misdetect your episodes and put them all under the same season.

## Show Extras

Show extras, sometimes called specials, can be added in the `Season 00` folder. If supported by your metadata provider those files will be matched. In case your metadata provider does not provide information about the extra, it is recommended to use a name which describes the content of the special instead of naming it `Episode S00Exy.mkv`. This is done to avoid wrong metadata being pulled for the extra and to provide a proper presentation.

> [!NOTE]
> Episode numbering for specials may vary from metadata provider to metadata provider.

## Images

### Poster

* folder.ext
* poster.ext
* cover.ext
* default.ext
* show.ext

Examples:

* Series:
  * Series (2010)/poster.jpg
* Season posters:
  * Numbered seasons:
    * Series (2010)/Season 01/cover.jpg
    * Series (2010)/season1-poster.jpg
  * Specials:
    * Series (2010)/season-specials-poster.jpg

### Backdrop

* backdrop.ext
* fanart.ext
* background.ext
* art.ext
* extrafanart/*.ext

Examples:

Series (2010)/fanart.jpg *for the first backdrop image*

Series (2010)/extrafanart/fanart1.jpg, Series (2010)/extrafanart/fanart2.jpg, *etc for additional backdrop images*

### Banner

* banner.ext

Example:

Series (2010)/banner.jpg

### Thumb

* thumb.ext
* landscape.ext

Examples:

Series (2010)/landscape.jpg

Series (2010)/Season 01/episode filename-thumb.jpg *for the thumbnail of an episode named "episode filename.mkv"*

### Logo

* logo.ext
* clearlogo.ext

Example:

Series (2010)/logo.png

## Other

### Theme Videos

* backdrops/*

Example:

Series (2010)/backdrops/S1Intro.ext

### Theme Music

* theme.ext
* theme-music/*

Examples:

Series (2010)/theme.ext

Series (2010)/theme-music/intro-song.ext
