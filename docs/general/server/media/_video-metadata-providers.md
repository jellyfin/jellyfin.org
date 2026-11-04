<!-- markdownlint-disable MD041 -->

### Metadata providers

Jellyfin fetches information about the media automatically from external metadata providers for most types of content.
Movies and shows can be named with a metadata provider ID to improve matching.

```txt
Movie Name (year) [metadata provider id]
Series Name (year) [metadata provider id]
```

Seasons and episodes can also include metadata provider IDs.

```txt
Series Name (year) [metadata provider id]
└── Season 01 [metadata provider id]
   └── S01E01 [metadata provider id].mkv
```

Read more about it in the [metadata provider identifiers section](/docs/general/server/metadata/identifiers.md).
