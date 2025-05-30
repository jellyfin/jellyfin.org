<!-- markdownlint-disable MD041 -->

## 3D Videos

3D Videos are identified using flags in the file name. To identify 3D content by filename, the first tag is `3D`, which must be combined with one of the following tags to specify the specific 3D format:

| Format                 | Flag          |
| ---------------------- | ------------- |
| half side by side      | `hsbs`        |
| full side by side      | `fsbs`        |
| half top and bottom    | `htab`        |
| full top and bottom    | `ftab`        |
| Multiview Video Coding | `mvc`         |
| Anaglyph               | Not Supported |

The tags are case-insensitive and must be surrounded by either a space, hyphen `-`, dot `.`, or underscore `_`.

```txt
Awesome 3D Movie (2022).3D.FTAB.mp4
Awesome 3D Movie (2022)_3D_htab.mp4
Awesome 3D Movie (2022)-3d-hsbs.mp4
```

```txt
S01E01 Some Episode.3d.ftab.mp4
S01E02 Some Other Episode.3d.ftab.mp4
S01E03 Yet another episode.3d.hsbs.mp4
```

Additionally, 3D filename tags can be combined with the grouping functionality in movie and music video libraries. All text before the hyphen must match the folder name.

```txt
Movies
└── Awesome 3D Movie (2022)
    ├── Awesome 3D Movie (2022) - 3D_FTAB.mp4
    ├── Awesome 3D Movie (2022) - 3D.hsbs.mp4
    └── Awesome 3D Movie (2022) - 1080p.mp4
```
