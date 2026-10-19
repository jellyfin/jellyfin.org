<!-- markdownlint-disable MD041 -->

## External Subtitles and Audio Tracks

External Subtitles and audio tracks can be added with file suffixes.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue={props.defaultTab} queryString="libType">
<TabItem value="movies" label="Movies">
```txt
Movies
└── Film (1986)
    ├── Film.mkv
    ├── Film.default.srt
    ├── Film.default.en.forced.ass
    ├── Film.forced.en.dts
    ├── Film.en.sdh.srt
    └── Film.English Commentary.en.mp3
```
</TabItem>
<TabItem value="shows" label="Shows">
```txt
Shows
└── Series Name A (2021)
    └── Season 1
        ├── Series Name A (2021) S01E01 Title.avi
        ├── Series Name A (2021) S01E01 Title.ja.ass
        └── Series Name A (2021) S01E01 Title.commentary.ja.aac
```
</TabItem>
</Tabs>

Each title/flag field can be a generic string, or a special flag. A file can have multiple flags, separated with `.`

| Type             | Flag                |
| ---------------- | ------------------- |
| Default          | `default`           |
| Forced           | `forced`, `foreign` |
| Hearing Impaired | `sdh`, `cc`, `hi`   |

`hi` collides with the Hindi language abbreviation. `hi` by itself will resolve as a Hindi language track, while `hi` in addition to another language identifier (such as `title.en.hi.srt`) will use the other language and tag it as hearing impaired.

Flags are ignored on containers with more than one stream.

Any arbitrary text not parsable to a language or flag will be combined and used as the title of the stream (if there is not a stream title already embedded in the file metadata). The last file in the above example will be parsed as an English mp3 audio stream with the title `English Commentary`.
