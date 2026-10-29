<!-- markdownlint-disable MD041 -->

Most common video formats are supported by Jellyfin, such as `mp4` and `mkv`. In addition, `VIDEO_TS` and `BDMV` folders are supported for movies and music videos. `VIDEO_TS` or `BDMV` folders do not support multiple versions, multiple parts or external subtitle/audio tracks.

`.iso` files and other disc image formats should work, but are not supported. It is recommended that disc image formats be remuxed into `mkv` containers, or extracted into `VIDEO_TS` or `BDMV` folders.

File names should match the name listed by your metadata provider whenever possible. However, certain characters cannot be used as they are reserved by jellyfin. Including them WILL cause problems. The following characters are known to cause issues: `<`, `>`, `:`, `"`, `/`, `\`, `|`, `?`, `*`
