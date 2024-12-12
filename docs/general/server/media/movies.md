---
uid: server-media-movies
title: Movies
---

# Movies

Movies should usually be in the library root directory or in a subfolder for the individual films. The subfolders allow for organization of metadata and images. Adding the year at the end in parentheses will yield the best results when scraping metadata.

:::tip

In order to help with identifying a movie, Jellyfin can make use of media provider identifiers. This can be specified in your movie's file or folder name, for example: `Film (2010) [imdbid-tt0106145].mp4` or `Film (2018) [tmdbid-65567]`

:::

```txt
Movies
├── Film (1990).mp4
├── Film (1994).mp4
├── Film (2008)
│   └── Film.mkv
└── Film (2010)
    ├── Film-cd1.avi
    └── Film-cd2.avi
```

:::caution ISO Files and other Disc Images

While Jellyfin _should_ work with .iso files and other images, it is **explicitly** unsupported. It is recommended that those be extracted to BDMV or VIDEO_TS folders or remuxed to .mkv video files. Regardless of the source format, menus are not supported and only the main titles will be played.

:::

## Multiple Versions of a Movie

Multiple versions of a movie can be stored together and presented as a single title. Place each movie version in the same folder and give each version a name with the folder name as a prefix as seen below.

:::note

The prefix has to be an exact match of the folder name for the versioning to work, that includes any media provider identifiers such as `[imdbid-tt12801262]`

:::

```txt
Movies
├── Best_Movie_Ever (2019)
│   ├── Best_Movie_Ever (2019) - 1080P.mp4
│   ├── Best_Movie_Ever (2019) - 720P.mp4
│   └── Best_Movie_Ever (2019) - Directors Cut.mp4
└── Movie (2021) [imdbid-tt12801262]
    ├── Movie (2021) [imdbid-tt12801262] - 2160p.mp4
    ├── Movie (2021) [imdbid-tt12801262] - 1080p.mp4
    └── Movie (2021) [imdbid-tt12801262] - Directors Cut.mp4
```

To distinguish between versions, each filename needs to have a space, hyphen, space, and then a label. Labels are not predetermined and can be made up by the user.

:::note

The hyphen is required. Periods, commas and other characters are not supported.

:::

Additionally, labels can be placed between brackets with the same result as seen below.

```txt
Movies
└── Best_Movie_Ever (2019)
    ├── Best_Movie_Ever (2019) - [1080P].mp4
    ├── Best_Movie_Ever (2019) - [720P].mp4
    └── Best_Movie_Ever (2019) - [Directors Cut].mp4
```

If labels are not added to the end of filenames, as shown above, each file will be treated as a unique movie and not a version of the same movie.

### Order of Versions

Movie versions are presented in an alphabetically sorted list. An exception applies to resolution names, which are sorted in descending order from highest to lowest resolution. A version name qualifies as a resolution name when ending with either a `p` or an `i`.

:::note

The first movie version in the list is the one selected by default.

:::

#### Examples of Sorting

- `1080p`, `2160p`, `360p`, `480p`, `720p` → `2160p`, `1080p`, `720p`, `480p`, `360p`
- `Extended Cut`, `Cinematic Cut`, `Director's Cut` → `Cinematic Cut`, `Director's Cut`, `Extended Cut`

:::note

To group media manually, long-click or right-click media to highlight then select additional media to merge. Use the new bar that appears to 'Group Versions'.

:::

## Movies Split Across Multiple Parts

Movies that are split into multiple files can be stacked together if named correctly. Files should be named as follows:

- `Movie Name (2010)/Movie Name<separator><parttype><separator><partnumber>.mkv`

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

:::note

This does not work in conjunction with multiple versions or merging.

:::

## Movie Extras

Movie extras can include deleted scenes, interviews, and other various things that you would want to include alongside your movie. Jellyfin supports several different methods of adding these files.

### Extras Folders

One of the cleanest ways of adding extras is to place them in subfolders within your movie folder.

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
Movies
└── Best_Movie_Ever (2019)
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

Some types of extras support a special option if you only have a single of that type. These options are to name the filename a specific word when stored in the same folder as the movie.

Supported filenames are:

- `trailer`
- `sample`
- `theme` - Audio file of the theme song

```txt
Movies
└── Best_Movie_Ever (2019)
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
Movies
└── Best_Movie_Ever (2019)
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

## 3D Movies

The parser can recognize 3D files automatically if the proper tags are added to the file name, or you can manually assign the 3D attribute to a file using Jellyfin's metadata editor to select the correct 3D format. The metadata editor is accessible from the context menu on each item.

To identify 3D content by filename, the first tag is `3D`, which must be combined with one of the following tags to specify the specific 3D format:

- `hsbs` = half side by side
- `fsbs` = full side by side
- `htab` = half top and bottom
- `ftab` = full top and bottom
- `mvc` = Multiview Video Coding

The tags are case-insensitive and must be surrounded by either a space, hyphen `-`, dot `.` or underscore `_`.

```txt
Awesome 3D Movie (2022).3D.FTAB.mp4
```

```txt
Awesome 3D Movie (2022)_3D_htab.mp4
```

```txt
Awesome 3D Movie (2022)-3d-hsbs.mp4
```

Additionally, 3D filename tags can be combined with the grouping functionality documented above. All text before the hyphen must match the folder name.

```txt
Movies
└── Awesome 3D Movie (2022)
    ├── Awesome 3D Movie (2022) - 3D_FTAB.mp4
    ├── Awesome 3D Movie (2022) - 3D.hsbs.mp4
    └── Awesome 3D Movie (2022) - 1080p.mp4
```

:::note

There is no tag for anaglyph 3D content.

:::

## Images

The following files may also be embedded into video containers that support it (such as mkv) and will be read out by the `Embedded Image Extractor` if enabled as an `Image Extractor` on the library configuration page.

### Poster

- folder.ext
- poster.ext
- cover.ext
- default.ext
- movie.ext

Examples:

Movie (2010)/poster.jpg

### Backdrop

- backdrop.ext
- fanart.ext
- background.ext
- art.ext
- extrafanart/\*.ext

Examples:

Movie (2010)/fanart.jpg _for the first backdrop image_

Movie (2010)/extrafanart/fanart1.jpg, Movie (2010)/extrafanart/fanart2.jpg, _etc for additional backdrop images_

### Logo

- logo.ext
- clearlogo.ext

Example:

Movie (2010)/logo.png
