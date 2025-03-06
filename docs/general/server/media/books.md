---
uid: server-media-books
title: Books
---

# Books

:::note

How Jellyfin handles books are undergoing a major redesign. Information on this page is very likely to change with future releases.

:::

The bookshelf plugin is required for books libraries.

Books should be organized by type (Audiobooks, Books, Comics), then optionally by Author. Each book should be in their own folder.

```txt
Books
├── Audiobooks
│   ├── Author
│   │   ├── Book1
│   │   │   └── Book1.flac
│   │   └── Book2
│   │       └── Book2.mp3
│   └── Book3
│       ├── Book3.aac
│       ├── content.opf
│       └── cover.jpg
├── Books
│   └── Author
│       ├── Book4
│       │   └── Book4.epub
│       ├── Book5
│       │   └── Book5.epub
│       ├── Book6
│       │   ├── Book6.epub
│       │   ├── cover.png
│       │   └── metadata.opf
│       └── Book7
│           └── Book7.pdf
└── Comics
    ├── Plastic Man (1944)
    │   └── Plastic Man #002 (1944).cbz
    ├── Attack on Titan (2012)
    │   └── Attack on Titan #001 (2012).pdf
    └── Comic (2008)
        ├── ComicInfo.xml
        └── Comic #001 (2008).cbr
```

For audiobooks, most common audio extensions are supported. For other books, the following formats are supproted: azw, azw3, cb7, cbr, cbt, cbz, epub, mobi, pdf, zip, rar, 7z. Read-along audiobooks are not supported by Jellyfin.

## Metadata

Online metadata is not supported for the books library type.

For media in audio formats, the metadata is read from the embedded tags of the audio files. FLAC files with WebP embedded images or ID3 tags might fail to play on some browsers. Enable the `Always remux flac option` in the settings if you are experiencing this problem.

For books in epub format, embedded metadata can be provided, For other formats, the metadata has to be provided in an external `content.opf`, `metadata.opf` or `ComicInfo.xml` file. The ComicInfo (from ComicRack) and ComicBookInfo (from ComicBookLover) formats are supported for `ComicInfo.xml` files.

Additionally, information about year and issue number can be provided in the file names, as seen in the example above. For comics or magazines with issues across multiple years, the year of the first issue should be used.

The files above can contain info about what images to use for cover images. Alternatively, They can be provided as external image files named in a specific manner, as listed below.

| Type    | Names                       |
| ------- | --------------------------- |
| Primary | `folder`, `poster`, `cover` |
| Banner  | `banner`                    |
| Logo    | `logo`                      |
| Thumb   | `thumb`, `landscape`        |
