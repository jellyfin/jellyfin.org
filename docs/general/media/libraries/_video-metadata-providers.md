<!-- markdownlint-disable MD041 -->

### Metadata providers

Jellyfin fetches information about the media automatically from external metadata providers. The following metadata providers are supported:

- [TheMovieDB (TMDB)](https://www.themoviedb.org/)
- [TheTVDB (TVDB)](https://www.thetvdb.com/) (Shows Only)
- [OMDb API (OMDB)](https://www.omdbapi.com/) (English Only)

Movies and show series can be named with a metadata provider ID to improve matching. They can be added to a file name in the following format:

- `[imdbid-tt12345678]`
- `[tmdbid-12345]`
- `[tvdbid-67890]`

Multiple IDs can be added in the same file / folder. e.g. `Jellyfin Documentary [imdbid-tt00000000] [tmdbid-00000].mkv`
