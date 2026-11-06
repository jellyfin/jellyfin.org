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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue={props.defaultTab} queryString="libType">
<TabItem value="movies" label="Movies">
```txt
Awesome 3D Movie (2022).3D.FTAB.mp4
Awesome 3D Movie (2022)_3D_htab.mp4
Awesome 3D Movie (2022)-3d-hsbs.mp4
```

Additionally, 3D filename tags can be combined with the grouping functionality in movie and music video libraries. All text before the hyphen must match the folder name.

```txt
Movies
└── Awesome 3D Movie (2022)
    ├── Awesome 3D Movie (2022) - 3D_FTAB.mp4
    ├── Awesome 3D Movie (2022) - 3D.hsbs.mp4
    └── Awesome 3D Movie (2022) - 1080p.mp4
```

</TabItem>
<TabItem value="shows" label="Shows">
```txt
Series Name A (2022) S01E01 Some Episode.3d.ftab.mp4
Series Name A (2022) S01E02 Some Other Episode.3d.ftab.mp4
Series Name A (2022) S01E03 Yet another episode.3d.hsbs.mp4
```
</TabItem>
</Tabs>

### 180° and 360° Videos

Videos with a 180° or 360° projection are identified with their own flags. These are not combined with the `3D` tag:

| Format                              | Flag                          |
| ----------------------------------- | ----------------------------- |
| 180° equirectangular side by side   | `180sbs`, `180lr`, `vr180`    |
| 180° equirectangular top and bottom | `180tab`, `180tb`, `180ou`    |
| 180° equirectangular monoscopic     | `180mono`                     |
| 360° equirectangular side by side   | `360sbs`, `360lr`             |
| 360° equirectangular top and bottom | `360tab`, `360tb`, `360ou`    |
| 360° equirectangular monoscopic     | `360mono`                     |
| 180° fisheye side by side           | `fisheye180`, `fisheye180sbs` |
| 180° fisheye monoscopic             | `fisheye180mono`              |
| MV-HEVC                             | `mvhevc`                      |

The projection and the layout may also be written as two separate tags, so both `180sbs` and `180.sbs` are recognized.

```txt
Awesome VR Movie (2022).180.sbs.mp4
Awesome VR Movie (2022)_360_TB.mp4
Awesome VR Movie (2022) - vr180.mp4
```

These flags only set the 3D format stored for the video so that clients know how to display it if they support these formats. The server does not change the projection when transcoding.
