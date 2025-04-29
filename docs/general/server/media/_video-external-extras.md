<!-- markdownlint-disable MD041 -->

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
