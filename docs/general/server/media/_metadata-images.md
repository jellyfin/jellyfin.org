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

| Type       | Description                        | Allowed Names                                  |
| ---------- | ---------------------------------- | ---------------------------------------------- |
| Primary    | The primary cover image            | folder, poster, cover, default                 |
| Art        | Unused                             | art                                            |
| Backdrop   | Background image in media page     | backdrop, fanart, background, art, extrafanart |
| Banner     | Unused                             | banner                                         |
| Logo       | Logo displayed on the top          | logo                                           |
| Thumb      | Thumbnail for homepage, video only | thumb                                          |
| Disc       | Unused                             | disc                                           |
| Box        | Unused                             | box                                            |
| Screenshot | Deprecated                         | screenshot                                     |
| Menu       | Unused                             | menu                                           |
| Chapter    | Unused                             | chapter                                        |
| BoxRear    | Unused                             | boxrear                                        |
| Profile    | Unused                             | profile                                        |

Multiple backdrop images can be used to cycle through several over time. Simply append a number to the end of the filename directly after or after a hyphen, e.g. `backdrop-1.jpg`, `backdrop2.jpg`.

Below is a screenshot showing the 3 main types of images in Jellyfin

![Album Image View](/images/docs/server/media/music/album-images.png)
