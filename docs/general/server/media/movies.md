---
uid: server-media-movies
title: Movies
---

# Movies

Movies should usually be in the library root directory or in a subfolder for the individual films. The subfolders allow for organization of metadata and images. Adding the year at the end in parentheses will yield the best results when scraping metadata.

> [!TIP]
> In order to help with identifying a movie, Jellyfin can make use of media provider identifiers. This can be specified in your movie's folder name, for example: `Film (2010) [imdbid-tt0106145]` or `Film (2018) [tmdbid-65567]`

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

## Multiple Versions of a Movie

Multiple versions of a movie can be stored together and presented as a single title. Place each movie version in the same folder and give each version a name with the folder name as a prefix as seen below.

```txt
Movies
└── Best_Movie_Ever (2019)
    ├── Best_Movie_Ever (2019) - 1080P.mp4
    ├── Best_Movie_Ever (2019) - 720P.mp4
    └── Best_Movie_Ever (2019) - Directors Cut.mp4
```

To distinguish between versions, each filename needs to have a space, hyphen, space, and then a label. Labels are not predetermined and can be made up by the user.

> [!Note]
> The hyphen is required. Periods, commas and other characters are not supported.

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

> [!Note]
> The first movie version in the list is the one selected by default.

#### Examples of Sorting

* `1080p`, `2160p`, `360p`, `480p`, `720p` → `2160p`, `1080p`, `720p`, `480p`, `360p`
* `Extended Cut`, `Cinematic Cut`, `Director's Cut` → `Cinematic Cut`, `Director's Cut`, `Extended Cut`

> [!Note]
> To group media manually, long-click or right-click media to highlight then select additional media to merge. Use the new bar that appears to 'Group Versions'.

## Movie Extras

Movie extras can include deleted scenes, interviews, and other various things that you would want to include alongside your movie. Jellyfin supports several different methods of adding these files.

### Extras Folders

One of the cleanest ways of adding extras is to place them in subfolders within your movie folder.

Supported folder types are:

* `behind the scenes`
* `deleted scenes`
* `interviews`
* `scenes`
* `samples`
* `shorts`
* `featurettes`
* `extras` - Generic catch all for extras of an unknown type.
* `trailers`

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

* `trailer`
* `sample`
* `theme` - Audio file of the theme song

```txt
Movies
└── Best_Movie_Ever (2019)
    ├── Best_Movie_Ever (2019) - 1080P.mp4
    ├── sample.mp4
    ├── theme.mp3
    └── trailer.mp4
```

### File Suffix

If you would rather keep everything in a single folder, you can append special suffixes to the filename which Jellyfin picks up and uses to identify the file as an extra. Note that, with a few noted exceptions, these suffexes **DO NOT** contain any spaces.

<!-- markdownlint-disable MD038 -->
* `-trailer`
* `.trailer`
* `_trailer`
* ` trailer` - This is a space followed by the word `trailer`
* `-sample`
* `.sample`
* `_sample`
* ` sample` - This is a space followed by the word `sample`
* `-scene`
* `-clip`
* `-interview`
* `-behindthescenes`
* `-deleted`
* `-featurette`
* `-short`
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

## Images

### Poster

* folder.ext
* poster.ext
* cover.ext
* default.ext
* movie.ext

Examples:

Movie (2010)/poster.jpg

### Backdrop

* backdrop.ext
* fanart.ext
* background.ext
* art.ext
* extrafanart/*.ext

Examples:

Movie (2010)/fanart.jpg *for the first backdrop image*

Movie (2010)/extrafanart/fanart1.jpg, Movie (2010)/extrafanart/fanart2.jpg, *etc for additional backdrop images*

### Logo

* logo.ext
* clearlogo.ext

Example:

Movie (2010)/logo.png
