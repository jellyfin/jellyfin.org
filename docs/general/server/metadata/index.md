---
uid: server-metadata-index
title: Metadata
---

# Metadata

Jellyfin can get metadata for your media through multiple sources. By default, Jellyfin ships with the following providers:

- The Movie Database (TMDb)
- The Open Movie Database API (OMDb API)[^1]
- [Local .nfo files](nfo)

[^1]: [OMDb API](https://www.omdbapi.com/) only provides English metadata.

There are more official providers available in our [Plugin Catalog](/docs/general/server/plugins#official-plugins), like TheTVDB, fanart.tv or AniDB. If you still can't find the provider you are looking for, you could even develop your own with our Plugin API.

:::caution Notice for Users in Mainland China 中国大陆地区用户请注意

Because of external factors, certain metadata providers may not be accessible in mainland China. <br />
由于外部因素，部分元数据提供者在中国大陆地区可能无法访问。

Below is a list of known inaccessible providers: <br />
下方为已知无法访问的提供者：

- The Movie Database (TMDb)
- TheTVDB

:::
