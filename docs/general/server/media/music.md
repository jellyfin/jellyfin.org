---
uid: server-media-music
title: Music
---

# Music

Albums are organized in folders, with one folder containing one and only one album. Jellyfin does not care how you organize albums together, as long as each album is contained within one folder. Filenames generally do not matter since the info will be scraped from the embedded metadata of the tracks. If no other metadata was found, Jellyfin uses the file names as track titles.

```txt
Music
├── Some Artist
│   ├── Album A
│   │   ├── Song 1.flac
│   │   ├── Song 2.flac
│   │   └── Song 3.flac
│   └── Album B
│       ├── Track 1.m4a
│       ├── Track 2.m4a
│       └── Track 3.m4a
└── Album X
    ├── Whatever You.mp3
    ├── Like To.mp3
    ├── Name Your.mp3
    └── Music Files.mp3
```

While Jellyfin generally doesn't use the file names for identification, file names containing special characters can still cause problems. The following characters are known to cause issues: `<`, `>`, `:`, `"`, `/`, `\`, `|`, `?`, `*`

## Discs

Albums with several discs are identified by the metadata tags with the `disc number` and `total discs` fields. Place the tracks for all discs in one folder.

```txt
Album
├── Disc 1 Track 1.ogg
├── Disc 1 Track 2.ogg
├── Disc 2 Track 1.ogg
├── Disc 3 Track 1.ogg
├── Disc 3 Track 2.ogg
└── Disc 3 Track 3.ogg
```

## Images

Images can come from a few different sources. For music, there are 3 image types, as shown in this image.

![Album View](/images/docs/server/media/music/album-images.png)

### External images

Images can be provided as external files within the media folders. When provided, they should be placed alongside the media files. In case they are provided, they will take precedence over other sources.

If a cover image is not provided, Jellyfin will fallback to the first track with an embedded album image. If no backdrop or logo types are available, Jellyfin will fallback to these images of the album artist instead.

```txt
Album
├── cover.jpg
├── backdrop.webp
├── logo.png
├── Track 1.wav
├── Track 2.wav
└── Track 3.wav
```

| Type     | Allowed Names                                  |
| -------- | ---------------------------------------------- |
| Primary  | folder, poster, cover, default                 |
| Backdrop | backdrop, fanart, background, art, extrafanart |
| Logo     | logo                                           |

Multiple backdrop images can be used to cycle through several over time. Simply append a number to the end of the filename directly after or after a hyphen.

## File Extensions / Containers

Jellyfin supports most common music formats, with some exceptions:

- MP4 with only audio: `.mp4` files won't be recognized as music. Please rename them to `.m4a`.
- MKV / WebM with only audio: `.mkv` and `.webm` files won't be recognized as music. Please rename them to `.mka`.
- WebA: `.weba` files aren't supported. Please rename them to `.mka`
- `.flac` files with embedded WebP images may fail to play in Chromium based browsers (Chrome, Edge, Opera, Brave etc.).
- `.flac` files with ID3 tags won't play in Firefox.

:::tip Alternate containers

Problematic files can be remuxed to `.mka` containers with ffmpeg with this command:

```sh
ffmpeg -i <Input File> -c:a copy <Output File>.mka
```

Do note that the metadata may be messed up and images might not carry over, so the metadata will have to be restored either manually or using another program.

:::
