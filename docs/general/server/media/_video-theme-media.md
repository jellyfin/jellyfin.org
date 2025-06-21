<!-- markdownlint-disable MD041 -->

### Theme Media

Theme media gives browsing your library a more audio-visual touch by playing theme songs and/or theme videos in the background while you're looking at your media listings.

:::tip

For these to play, users need to enable the option in their clients. In the WebUI and WebUI-based clients this is found in the User settings under Display > Library > Theme Songs, and Theme Videos, respectively. Implementations in third-party clients may differ.

:::

:::note

Any type of media and codec that Jellyfin supports is allowed. Like with regular playback, the server will transcode if the client does not support the media.

:::

:::note

In case both Theme Videos and Theme Music are found, Theme Videos will be preferred when enabled and Theme Music will not play.

In the WebUI and WebUI-based clients, if there are multiple theme media found, they will be shuffled when opening the listing. [This cannot be changed](https://github.com/jellyfin/jellyfin-web/pull/5714).

:::

#### Videos

- backdrops/\*

:::tip

Since transcoding can result in delay of theme media playback, Web-standard formats like WebM (VP9/Opus) are recommended for a smooth experience, since they generally direct play.

:::

#### Music

- theme.ext
- theme-music/\*

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
