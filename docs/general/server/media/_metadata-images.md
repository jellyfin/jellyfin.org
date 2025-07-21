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

| Type       | Description                        |
| ---------- | ---------------------------------- |
| Primary    | The primary cover image            |
| Art        | Unused                             |
| Backdrop   | Background image in media page     |
| Banner     | Unused                             |
| Logo       | Logo displayed on the top          |
| Thumb      | Thumbnail for homepage, video only |
| Disc       | Unused                             |
| Box        | Unused                             |
| Screenshot | Unused, Deprecated                 |
| Menu       | Unused                             |
| Chapter    | Unused                             |
| BoxRear    | Unused                             |
| Profile    | Unused                             |

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
| logo                        | Logo     | ✅     | ✅     | ✅     |         | ✅    |
| clearlogo                   | Logo     | ✅     | ✅     | ✅     |         | ✅    |
| banner                      | Banner   | ✅     | ✅     | ✅     |         | ✅    |
| landscape                   | Thumb    | ✅     | ✅     | ✅     |         | ✅    |
| thumb                       | Thumb    | ✅     | ✅     | ✅     |         | ✅    |
| disc                        | Disc     | ✅     |        |        |         | ✅    |
| cdart                       | Disc     | ✅     |        |        |         | ✅    |
| discart                     | Disc     | ✅     |        |        |         |       |
| clearart                    | Art      | ✅     | ✅     | ✅     |         | ✅    |

<sup>1</sup> For example: `S01E01 Some Episode-thumb.jpg`

Multiple backdrop images can be used to cycle through several over time. Simply append a number to the end of the filename directly after or after a hyphen, e.g. `backdrop-1.jpg`, `backdrop2.jpg`.

Below is a screenshot showing the 3 main types of images in Jellyfin

![Album Image View](/images/docs/server/media/music/album-images.png)
