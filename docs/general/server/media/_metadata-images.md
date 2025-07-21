<!-- markdownlint-disable MD041 -->

## Metadata Images

Images can be provided as external files within the media folders, or embedded in the media files for music. When external imaged are provided, they should be placed alongside the media files. When they are provided, they will take precedence over other sources.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value='music' label='Music'>
    ```txt
    Album
    ├── cover.jpg
    ├── backdrop.webp
    ├── logo.png
    ├── Track 1.m4a
    └── Track 2.m4a
    ```
    When no images are provided for music, Jellyfin will take the cover image from the first track that has an embedded cover image.
  </TabItem>
  <TabItem value='movies' label='Movies'>
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
        └── Series Name B S01E02.mkv
    ```
  </TabItem>
</Tabs>

Image types:

| Type     | Description                                                                             |
| -------- | --------------------------------------------------------------------------------------- |
| Primary  | The primary cover image                                                                 |
| Backdrop | Background image in media page                                                          |
| Banner   | Displayed when browsing library in banner mode. Video only. <sup>1</sup>                |
| Logo     | Logo displayed on the top of a media item.                                              |
| Thumb    | Thumbnail for homepage and for browsing library in thumb mode. Video only. <sup>1</sup> |

<sup>1</sup>These can be added to both video and audio content, but are not used by any client for audio conent.

Filenames, their respective types and supported media types:

| Filename                    | Type     | Movies | Series | Season | Episode | Music |
| --------------------------- | -------- | ------ | ------ | ------ | ------- | ----- |
| poster                      | Primary  | ✅     | ✅     | ✅     |         | ✅    |
| folder                      | Primary  | ✅     | ✅     | ✅     |         | ✅    |
| cover                       | Primary  | ✅     | ✅     | ✅     |         | ✅    |
| default                     | Primary  | ✅     | ✅     | ✅     |         | ✅    |
| movie                       | Primary  | ✅     |        |        |         |       |
| show                        | Primary  |        | ✅     |        |         |       |
| jacket                      | Primary  |        |        |        |         | ✅    |
| thumb (suffix) <sup>1</sup> | Primary  |        |        |        | ✅      |       |
| backdrop                    | Backdrop | ✅     | ✅     | ✅     |         | ✅    |
| fanart                      | Backdrop | ✅     | ✅     | ✅     |         | ✅    |
| background                  | Backdrop | ✅     | ✅     | ✅     |         | ✅    |
| art                         | Backdrop | ✅     | ✅     | ✅     |         | ✅    |
| extrafanart (folder)        | Backdrop | ✅     | ✅     | ✅     |         | ✅    |
| banner                      | Banner   | ✅     | ✅     | ✅     |         | ✅    |
| logo                        | Logo     | ✅     | ✅     | ✅     |         | ✅    |
| clearlogo                   | Logo     | ✅     | ✅     | ✅     |         | ✅    |
| landscape                   | Thumb    | ✅     | ✅     | ✅     |         | ✅    |
| thumb                       | Thumb    | ✅     | ✅     | ✅     |         | ✅    |

<sup>1</sup> For example: `S01E01 Some Episode-thumb.jpg`

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

Multiple backdrop images can be used to cycle through several over time. Simply append a number to the end of the filename directly after or after a hyphen, e.g. `backdrop-1.jpg`, `backdrop2.jpg`.

Below is a screenshot showing the 3 main types of images in Jellyfin

![Album Image View](/images/docs/server/media/music/album-images.png)
