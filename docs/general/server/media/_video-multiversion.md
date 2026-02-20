<!-- markdownlint-disable MD041 -->

## Multiple Versions

Jellyfin supports storing multiple versions of the same video within a single movie folder by using filename suffixes. Each file **must** begin exactly with the parent folder name - including any year and/or metadata provider IDs - before adding a version label. This prefix must match character-for-character; otherwise, the files will be treated as separate movies.

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

- Resolution sorting: `1080p`, `2160p`, `360p`, `480p`, `720p` → `2160p`, `1080p`, `720p`, `480p`, `360p`
- Named versions sorting: `Extended Cut`, `Cinematic Cut`, `Director's Cut` → `Cinematic Cut`, `Director's Cut`, `Extended Cut`

To group media manually, long-click or right-click media to highlight then select additional media to merge. Use the new bar that appears to 'Group Versions'.
