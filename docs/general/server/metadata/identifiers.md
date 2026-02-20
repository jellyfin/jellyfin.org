---
uid: metadata-provider-identifiers
title: Metadata Provider Identifiers
---

# Metadata Provider Identifiers

To improve the accuracy of media identification, you can manually specify a metadata provider identifier for each movie or show. Each metadata provider uses a unique identifier for its content, and adding these identifiers greatly improves media identification. Identifiers can be specified in your movie/show file or folder name. Multiple identifiers can be specified. For example:

```txt
Movies
├── Best_Movie_Ever (1994) [tmdbid-680] [imdbid-1234]
│   ├── Best_Movie_Ever (1994) [tmdbid-680].mp4
└── Movie (2021) [imdbid-tt12801262]
    └── Movie (2021) [imdbid-tt12801262].mp4
Shows
└── Series Name (2018) [tvdbid-79168]
    ├── Season 01
    |   ├── Series Name B S01E01.mkv
    |   └── Series Name B S01E02.mkv
    └── Season 02
        ├── Series Name B S02E01-E02.mkv
        └── Series Name B S02E03.mkv
```

## Supported Metadata Providers

The following metadata providers are supported:

- [The Movie DB (TMDB)](https://www.themoviedb.org/)
- [The TV Database (TVDB)](https://www.thetvdb.com/) (Shows Only)
- [OMDb API (OMDB)](https://www.omdbapi.com/) (English Only)

## Finding Metadata Provider Identifiers

Below are instructions on how to find metadata provider identifiers for each supported provider.

### The Movie Database (TMDB)

The identifier is found in the URL of the title. For example:

URL: `https://www.themoviedb.org/movie/569094-spider-man-across-the-spider-verse`

Identifier: `[tmdbid-569094]`

### The TV Database (TVDB)

The identifier is found on the main page of the title. For example:

![How to find The TVDB media identifier](/images/docs/tvdb-media-identifier-example.png)

Identifier: `[tvdbid-266189]`

### OMDb API (OMDB)

OMDB provider uses Internet Movie Database (IMDB) IDs as identifiers. The identifier is found in the URL of the title. For example:

URL: `https://www.imdb.com/title/tt9362722/`

Identifier: `[imdbid-tt9362722]`
