---
id: server-media-shows
title: Shows
---

# Shows

The most common naming scheme for shows is categorizing the files by series and then season. Another common method is simply using series folders, especially for shows that are organized by air date and those without seasons. Adding the year at the end in parentheses will yield the best results when scraping metadata.

```txt
Shows
├── Series (2010)
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

## Images

### Poster

* folder.ext
* poster.ext
* cover.ext
* default.ext

Examples:

Series (2010)/poster.jpg *for series or movie poster*

Series (2010)/Season 01/season1-poster.jpg *for season poster*

### Backdrop

* backdrop.ext
* fanart.ext
* background.ext
* art.ext
* extrafanart.ext

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

Example:

Series (2010)/logo.png
