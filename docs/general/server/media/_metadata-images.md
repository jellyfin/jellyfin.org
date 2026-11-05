<!-- markdownlint-disable MD041 -->

## Metadata Images

Images can either be provided as external files within the media folders, or embedded in the media files themselves. When external images are provided, they should be placed alongside the media files. When they are provided, they will take precedence over other sources.

Similar to media folders, an artist image can be placed in the root of an artist’s folder. It will be shown both when browsing artists and on the artist’s detail page.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue={props.defaultTab}>
  <TabItem value='music' label='Music'>
    ```txt
    Artist
    ├── Album
    │   ├── cover.jpg
    │   ├── backdrop.webp
    │   ├── logo.png
    │   ├── Track 1.m4a
    │   └── Track 2.m4a
    └── folder.jpg
    ```
    When no images are provided for music, Jellyfin will take the cover image from the first track that has an embedded cover image.
  </TabItem>
  <TabItem value="movies" label='Movies'>
    ```txt
    Movie (2035)
    ├── cover.jpg
    ├── backdrop.webp
    ├── logo.png
    └── Movie (2035).mp4
    ```
  </TabItem>
  <TabItem value='shows' label='Shows'>
    ```txt
    Series Name B (2018)
    ├── cover.jpg
    ├── thumbnail.jpg
    └── Season 01
        ├── backdrop.webp
        ├── cover.jpg
        ├── logo.png
        ├── Series Name B S01E01.mkv
        ├── Series Name B S01E01-thumb.jpg
        ├── Series Name B S01E02.mkv
        └── Series Name B S01E02-thumb.jpg
    ```
  </TabItem>
</Tabs>

Image types:

| Type     | Description                                                                             |
| -------- | --------------------------------------------------------------------------------------- |
| Primary  | The primary cover/artist image                                                          |
| Backdrop | Background image in media page <sup>1</sup>                                             |
| Banner   | Displayed when browsing library in banner mode. Video only. <sup>2</sup>                |
| Logo     | Logo displayed on the top of a media item.                                              |
| Thumb    | Thumbnail for homepage and for browsing library in thumb mode. Video only. <sup>2</sup> |

<sup>1</sup>Multiple backdrop images can be used to cycle through several over time. Simply append a number to the end of the filename directly after or after a hyphen, e.g. `backdrop-1.jpg`, `backdrop2.jpg`.

<sup>2</sup>These can be added to both video and audio content, but are not used by any client for audio content.

<details>
<summary>Filenames, their respective types and supported media types</summary>

Unless otherwise noted, all filenames can be used either standalone (e.g. `logo.png`) or as a suffix (e.g. `movie-logo.png`)

| Filename                    | Type     | Movies          | Series | Season | Episode | Music | Artist |
| --------------------------- | -------- | --------------- | ------ | ------ | ------- | ----- | ------ |
| poster                      | Primary  | ✅ <sup>2</sup> | ✅     | ✅     |         | ✅    |        |
| folder                      | Primary  | ✅ <sup>2</sup> | ✅     | ✅     |         | ✅    | ✅     |
| cover                       | Primary  | ✅ <sup>2</sup> | ✅     | ✅     |         | ✅    |        |
| default                     | Primary  | ✅ <sup>2</sup> | ✅     | ✅     |         | ✅    |        |
| movie                       | Primary  | ✅ <sup>2</sup> |        |        |         |       |        |
| show                        | Primary  |                 | ✅     |        |         |       |        |
| jacket                      | Primary  |                 |        |        |         | ✅    |        |
| thumb (suffix) <sup>1</sup> | Primary  |                 |        |        | ✅      |       |        |
| backdrop                    | Backdrop | ✅ <sup>2</sup> | ✅     | ✅     |         | ✅    |        |
| fanart                      | Backdrop | ✅ <sup>2</sup> | ✅     | ✅     |         | ✅    |        |
| background                  | Backdrop | ✅ <sup>2</sup> | ✅     | ✅     |         | ✅    |        |
| art                         | Backdrop | ✅ <sup>2</sup> | ✅     | ✅     |         | ✅    |        |
| extrafanart (folder)        | Backdrop | ✅ <sup>2</sup> | ✅     | ✅     |         | ✅    |        |
| banner                      | Banner   | ✅              | ✅     | ✅     |         | ✅    |        |
| logo                        | Logo     | ✅ <sup>2</sup> | ✅     | ✅     |         | ✅    |        |
| clearlogo                   | Logo     | ✅ <sup>2</sup> | ✅     | ✅     |         | ✅    |        |
| landscape                   | Thumb    | ✅              | ✅     | ✅     |         | ✅    |        |
| thumb                       | Thumb    | ✅              | ✅     | ✅     |         | ✅    |        |

<sup>1</sup> For example: `S01E01 Some Episode-thumb.jpg` <br />
<sup>2</sup> These file names can also be embedded in supported media containers (e.g. mkv) and will be used when the `Embedded Image Extractor` source is enabled for movies.

</details>

Below is a screenshot showing the 3 main types of images in Jellyfin

![Album Image View](/images/docs/server/media/music/album-images.png)

<details>
  <summary>Unused types are listed below. While they are unused by official clients, they may be used by 3rd party clients.</summary>

| Type       | Description        |
| ---------- | ------------------ |
| Art        | Unused             |
| Disc       | Unused             |
| Box        | Unused             |
| Menu       | Unused             |
| Chapter    | Unused             |
| BoxRear    | Unused             |
| Profile    | Unused             |
| Screenshot | Unused, Deprecated |

| Filename | Type | Movies | Series | Season | Episode | Music |
| -------- | ---- | ------ | ------ | ------ | ------- | ----- |
| disc     | Disc | ✅     |        |        |         | ✅    |
| cdart    | Disc | ✅     |        |        |         | ✅    |
| discart  | Disc | ✅     |        |        |         |       |
| clearart | Art  | ✅     | ✅     | ✅     |         | ✅    |

</details>
