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
- `theme-music`
- `backdrops`

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue={props.defaultTab} queryString="libType">
<TabItem value="movies" label="Movies">
```txt
Best_Movie_Ever (2019)
├── Best_Movie_Ever (2019).mp4
├── behind the scenes
│   └── Finding the right score.mp4
└── extras
    └── Home recreation.mp4
```
</TabItem>
<TabItem value="shows" label="Shows">
```txt
Awesome TV Show (2024)
├── Season 1
│   ├── Awesome TV Show (2024) S01E01 episode name.mp4
│   ├── trailers
│   │   └── trailer1.mp4
│   ├── theme-music
│   │   ├── Season 01 OP.mp3
│   │   └── Season 01 ED.flac
│   └── backdrops
│        └── S1Intro.mkv
├── interviews
│   └── Interview with the Director.mp4
└── theme-music
    └── Series Opening.wav
```
</TabItem>
</Tabs>

### File Name

Some types of extras support a special option if you only have a single of that type. These options are to name the filename a specific word when stored in the same folder.

Supported filenames are:

- `trailer`
- `sample`
- `theme` - Audio file of the theme song

<Tabs defaultValue={props.defaultTab} queryString="libType">
<TabItem value="movies" label="Movies">
```txt
Best_Movie_Ever (2019)
├── Best_Movie_Ever (2019) - 1080P.mp4
└── theme.mp3
```
</TabItem>
<TabItem value="shows" label="Shows">
```txt
Awesome TV Show (2024)
├── Season 1
│   ├── Awesome TV Show (2024) S01E01 episode name.mp4
│   └── theme.flac
└── sample.mp4
```
</TabItem>
</Tabs>

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

<Tabs defaultValue={props.defaultTab} queryString="libType">
<TabItem value="movies" label="Movies">
```txt
Best_Movie_Ever (2019)
├── Best_Movie_Ever (2019) - 1080P.mp4
├── Preview Trailer.trailer.mp4
└── Making of The Best Movie Ever-behindthescenes.mp4
```
</TabItem>
<TabItem value="shows" label="Shows">
```txt
Series Name A (2024)
├── Season 1
│   ├── Series Name A (2024) S01E01 episode name.mp4
│   └── Preview Trailer.trailer.mp4
└── making of Series Name A-behindthescenes.mp4
```
</TabItem>
</Tabs>
