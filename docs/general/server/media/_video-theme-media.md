<!-- markdownlint-disable MD041 -->

### Theme Media

Theme media gives browsing your library a more audio-visual touch by playing theme songs and/or Theme videos in the background while you're looking at your media listings.

:::tip

For these to play, users need to enable the option in their clients. In the WebUI and WebUI-based clients this is found in the User settings under Display > Libraries > Theme songs, and Theme videos, respectively. Implementations in third-party clients may differ.

:::

In case both Theme songs and Theme videos are found, Theme videos will be preferred when enabled and Theme songs will not play.

In the WebUI and WebUI-based clients, if there are multiple theme media found, they will be shuffled when opening the listing. This cannot be changed.

#### Songs

- theme.ext
- theme-music/\*

#### Videos

- backdrops/\*

:::tip

Since transcoding can result in delay of theme media playback, Web-standard formats like WebM (VP9/Opus) are recommended for a smooth experience, since they generally direct play.

:::

#### Example

```txt
Movies
└── Best_Movie_Ever (2019)
    ├── backdrops
    │   └── bluray-menu.ext
    ├── theme.ext
    └── theme-music
        └── awesome-soundtrack-song.ext
```

```txt
Shows
└── Series Name (2010)
    ├── backdrops
    │   ├── S1Intro.ext
    │   └── S2Intro.ext
    ├── Season 01
    │   ├── backdrops
    │   │   └── S1Intro.ext
    │   └── theme-music
    │       └── S1Intro.ext
    ├── Season 02
    │   ├── backdrops
    │   │   └── S2Intro.ext
    │   └── theme.ext
    ├── theme.ext
    └── theme-music
        ├── intro-song.ext
        └── outro-song.ext
```
