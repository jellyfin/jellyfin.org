---
uid: server-media
title: Media
---

# Media

## Special characters in file names

File names containing special characters are known to cause problems. The following characters are known to cause issues: `<`, `>`, `:`, `"`, `/`, `\`, `|`, `?`, `*`. Jellyfin does not support the use of these characters in file names.

## External metadata and images

External metadata can be provided using NFO files for most library types. Jellyfin uses the NFO format from Kodi.

subfolders of media. The following table shows the image types and their correspondning file names.

| Type     | Allowed Names                                  |
| -------- | ---------------------------------------------- |
| Primary  | folder, poster, cover, default, movie          |
| Backdrop | backdrop, fanart, background, art, extrafanart |
| Logo     | logo                                           |
| Banner   | banner                                         |
| Thumb    | thumb, landscape                               |

## Excluding a directory

Directories, and their respective media files, can be excluded from the library scan. This can be achieved by placing a `.ignore` file in the directory you want to exclude. As a result, the directory and it's subdirectories will be excluded from being scanned.

:::tip

When placing a `.ignore` file inside a directory, make sure to refresh / rescan the metadata afterwards for it to be applied.

:::

The example given below results in the directories `Season 03` and `OST` being ignored:

```txt
Shows
└── Series (2010)
    ├── Season 01
    │   ├── ...
    ├── Season 02
    │   ├── ...
    ├── Season 03
    │   ├── .ignore
    │   └── ...
    └── OST
        ├── .ignore
        └── ...
```

:::caution

Currently, placing a `.ignore` file inside an [`Extras`](/docs/general/server/media/shows#extras-folders) directory [does not work](https://github.com/jellyfin/jellyfin/issues/9571).

:::

## Movies

Movies should be organized into subfolders for the individual films. The year can be added in parentheses, and metadata provider IDs can be added in square brackets.

```txt
Movies
├── Best_Movie_Ever (2019)
│   ├── Best_Movie_Ever (2019) - 1080P.mp4
│   ├── Best_Movie_Ever (2019) - 720P.mp4
│   └── Best_Movie_Ever (2019) - Directors Cut.mp4
├── Film (2021) [imdbid-tt12801262]
│   ├── Film (2021) [imdbid-tt12801262].mkv
│   └── Film (2021) [imdbid-tt12801262].nfo
└── Film (2010)
    ├── Film-cd1.avi
    └── Film-cd2.avi
```

### Disc images

Disc image formats such as `.iso` or `.bin` files are not supported. They should be extracted into BDMV (BD) / VIDEO_TS (DVD) folders, or be remuxed into video file formats such ask `.mkv`.

### Multiple versions

Multiple versions of a movie can be stored together and presented as a single title. Place each movie version in the same folder and give each version a name with the folder name as a prefix as seen below.

To distinguish between versions, each filename needs to have a space, hyphen, space, and then a label. Periods, commas and other characters are not supported. Labels are not predetermined and can be made up by the user.

If labels are not added to the end of filenames as shown above, each file will be treated as a unique movie and not a version of the same movie.

Movie versions are presented in an alphabetically sorted list. An exception applies to resolution names, which are sorted in descending order from highest to lowest resolution. A version name qualifies as a resolution name when ending with either a `p` or an `i`. The first movie version in the list is the one selected by default.

Multiple versions can be grouped together manually .To group media manually, long-click or right-click media to highlight then select additional media to merge. Use the new bar that appears to 'Group Versions'.

```txt
Best_Movie_Ever (2019)
├── Best_Movie_Ever (2019) - 1080P.mp4
├── Best_Movie_Ever (2019) - 720P.mp4
└── Best_Movie_Ever (2019) - Directors Cut.mp4
```

### Multipart movies

Movies that are split into multiple files can be stacked together if named correctly. Files should be named as follows:

- `Movie Name (2010)/Movie Name<separator><parttype><separator><partnumber>.mkv`

The separator is optional between `<parttype>` and `<partnumber>`. `<partnumber>` can be any number, or the letters a-d.

Supported part types are: `cd`, `dvd`, `part`, `pt`, `disc`, `disk`

Supported separators are: `(space)`, `. (period)`, `- (dash)`, `_ (underscore)`

This does not work in conjunction with multiple versions or merging.

```txt
Film (2010)
├── Film-cd1.avi
└── Film-cd2.avi
```

### Movie Extras

Movie extras can include deleted scenes, interviews, and other various things that you would want to include alongside your movie. Extras can be placed in subfolders within movie folders, or identified with special file names.

#### Extras Folders

The cleanest way of adding extras is to place them in subfolders within your movie folder. Supported folder types are: `behind the scenes`, `deleted scenes`, `interviews`, `scenes`, `samples`, `shorts`, `featurettes`, `clips`, `trailers`, `other`, `extras`. The `other` and `extra` types are a generic catch-all type for all unknown extras.

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

#### File Name

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

#### File Suffix

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

### 3D Movies

The parser can recognize 3D files automatically if the proper tags are added to the file name, or you can manually assign the 3D attribute to a file using Jellyfin's metadata editor to select the correct 3D format. The metadata editor is accessible from the context menu on each item.

To identify 3D content by filename, the first tag is `3D`, which must be combined with one of the following tags to specify the specific 3D format:

- `hsbs` = half side by side
- `fsbs` = full side by side
- `htab` = half top and bottom
- `ftab` = full top and bottom
- `mvc` = Multiview Video Coding

The tags are case-insensitive and must be surrounded by either a space, hyphen `-`, dot `.` or underscore `_`.

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

There is no tag for anaglyph 3D content.

### Images

Poster, Backdrop and Logo files are placed as external files by default. Primary, Backdrop and Logo types are supported. They may also be embedded into video containers that support it (such as mkv) and will be read out by the `Embedded Image Extractor` if enabled as an `Image Extractor` on the library configuration page.
