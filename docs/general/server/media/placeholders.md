---
uid: server-media-placeholders
title: Media Placeholders
---

Media placeholders let you add video items to a Jellyfin library without providing a playable video file.
These can be used to represent media that is unavailable, not currently present, or otherwise should exist in the library without an actual video file.

Create an empty file using the normal naming convention for the media, with `.disc` as the file extension.

For example:

```txt
Movies
└── Blade Runner (1982)
    └── Blade Runner (1982).disc
```

Jellyfin will add the movie to the library as a placeholder. The contents of the `.disc` file are not used.

## Placeholder Types

An optional type can be added immediately before `.disc`:

```txt
Blade Runner (1982).dvd.disc
Blade Runner (1982).bluray.disc
Blade Runner (1982).vhs.disc
```

<!-- cSpell:disable -->

The following types are recognized:

| Keyword  | Type    |
| -------- | ------- |
| `dvd`    | DVD     |
| `hddvd`  | HD DVD  |
| `bluray` | Blu-ray |
| `brrip`  | Blu-ray |
| `bd25`   | Blu-ray |
| `bd50`   | Blu-ray |
| `vhs`    | VHS     |
| `hdtv`   | TV      |
| `pdtv`   | TV      |
| `dsr`    | TV      |

<!-- cSpell:enable -->

The type is optional. Any file ending in `.disc` is recognized as a placeholder.

The type must be directly before `.disc`. For example, `MyMovie.bluray.disc` is recognized as a Blu-ray placeholder, while `MyMovie.bluray.custom.disc` is still a placeholder but does not have a recognized type.

Other supported naming information can be combined with a placeholder as long as the placeholder type remains directly before `.disc`:

```txt
Movie (2020).3D.MVC.bluray.disc
```

## Episodes

Placeholders can also be used for episodes by following the normal [TV show naming conventions](./shows.md):

```txt
Shows
└── Example Show (2020)
    └── Season 01
        └── Example Show S01E01.dvd.disc
```

## Client Behavior

Jellyfin adds placeholders to the library like other media items, allowing them to have metadata and artwork. The item is marked as a placeholder instead of playable media.
