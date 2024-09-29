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

## Lyrics

Lyrics must be contained in the same folder and match the filename for their corresponding item. For example: The lyric file for `01 Death Eternal.mp3` must be `01 Death Eternal.lrc`, `01 Death Eternal.elrc` or `01 Death Eternal.txt`.

```txt
Music
└── Some Artist
    └── Album A
        ├── Song 1.flac
        ├── Song 1.lrc
        ├── Song 2.flac
        ├── Song 2.lrc
        ├── Song 3.flac
        └── Song 3.lrc
```

Lyrics can be jumped to within Jellyfin's UI, meaning it's possible for a user to click on any line and jump straight to the corresponding timestamp where the line appears in the song. The lyrics file can be synchronised or unsynchronised. It can have some extra metadata, but won't be shown in the Jellyfin client.

- Synchronized lyrics are interactive, enabling users to click on any line to jump directly to the corresponding timestamp in the song. You have the option to either manually synchronize the text, which can be time-consuming and may lack accuracy, or utilize lyrics synchronization software such as MiniLyrics. A synchronised lyrics file would likely look something like the following:

```txt
[ar: Some Artist]
[ti: Song 1]
[al: Album 1]
[by: Author]
[length: 2:57]
[00:10.89]Line 1
[00:14.58]Line 2
[00:16.78]Line 3
[00:21.03]Line 4
[00:24.86]Line 5
(...)
```

- Unsynchronized lyrics are easier to implement, but will be harder for users to sing along. Such a file would look something like this:

```txt
Line 1
Line 2
Line 3
Line 4
Line 5
(...)
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
- `.flac` files with embedded WebP images or ID3 tags may fail to play in Chromium based browsers (Chrome, Edge, Opera, Brave etc.) or Firefox. Please enable `Always remux FLAC audio files` in the client settings if you encounter this issue.

:::tip Alternate containers

Problematic files can be remuxed to `.mka` containers with ffmpeg with this command:

```sh
ffmpeg -i <Input File> -c:a copy <Output File>.mka
```

Do note that the metadata may be messed up and images might not carry over, so the metadata will have to be restored either manually or using another program.

:::
