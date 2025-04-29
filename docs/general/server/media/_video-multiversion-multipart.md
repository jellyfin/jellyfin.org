## Multiple Versions

Multiple versions of the same video can be stored together in the library using a file suffix in Movie and Music Video library types. The part before any suffixes **MUST** be exactly the same, including any years and/or metadata provider IDs.

```txt
Movie (2021) [imdbid-tt12801262]
├── Movie (2021) [imdbid-tt12801262] - 2160p.mp4
├── Movie (2021) [imdbid-tt12801262] - 1080p.mp4
└── Movie (2021) [imdbid-tt12801262] - Directors Cut.mp4
```

To distinguish between versions, each filename needs to have a space, hyphen, space, and then a label. Labels are not predetermined and can be made up by the user. The hyphen is required. Periods, commas and other characters are not supported.

Labels can optionally be placed between brackets with the same result as seen below.

```txt
Movies
└── Best_Movie_Ever (2019)
    ├── Best_Movie_Ever (2019) - [1080P].mp4
    ├── Best_Movie_Ever (2019) - [720P].mp4
    └── Best_Movie_Ever (2019) - [Directors Cut].mp4
```

If labels are not added to the end of filenames, as shown above, each file will be treated as a unique movie and not a version of the same movie.

Movie versions are presented in an alphabetically sorted list. An exception applies to resolution names, which are sorted in descending order from highest to lowest resolution. A version name qualifies as a resolution name when ending with either a `p` or an `i`. The first movie version in the list is the one selected by default. An example of sorting as seen below.

- `1080p`, `2160p`, `360p`, `480p`, `720p` → `2160p`, `1080p`, `720p`, `480p`, `360p`
- `Extended Cut`, `Cinematic Cut`, `Director's Cut` → `Cinematic Cut`, `Director's Cut`, `Extended Cut`

To group media manually, long-click or right-click media to highlight then select additional media to merge. Use the new bar that appears to 'Group Versions'.

## 3D Videos

3D Videos are identified using flags in the file name. To identify 3D content by filename, the first tag is `3D`, which must be combined with one of the following tags to specify the specific 3D format:

| Format                 | Tag           |
| ---------------------- | ------------- |
| half side by side      | `hsbs`        |
| full side by side      | `fsbs`        |
| half top and bottom    | `htab`        |
| full top and bottom    | `ftab`        |
| Multiview Video Coding | `mvc`         |
| Anaglyph               | Not Supported |

The tags are case-insensitive and must be surrounded by either a space, hyphen `-`, dot `.` or underscore `_`.

```txt
Awesome 3D Movie (2022).3D.FTAB.mp4
Awesome 3D Movie (2022)_3D_htab.mp4
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

## Multiple Parts

Content that are split into multiple files can be stacked together if named correctly in Movie and Music Video library types. Files should be named as follows:

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

<!-- markdownlint-disable MD038 -->

- ` ` (space)
- `.` (period)
- `-` (dash)
- `_` (underscore)

This does not work in conjunction with multiple versions or merging.
