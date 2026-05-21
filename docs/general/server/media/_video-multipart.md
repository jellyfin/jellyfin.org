<!-- markdownlint-disable MD041 -->

## Multiple Parts

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value='movies' label='Movies'>
    For movies, files should be named as follows:

    ```txt
    Movie Name (2010)
    ├── Movie Name-cd1.mkv
    ├── Movie Name-cd2.mkv
    └── Movie Name-cd3.mkv
    ```

  </TabItem>
  <TabItem value='shows' label='Shows'>
    For episodes, files should be named as follows:

    ```txt
    Series Name A (2025)
    └──Season 1
        ├── Series Name A (2025) S01E01-part-1.mkv
        └── Series Name A (2025) S01E01-part-2.mkv
    ```

  </TabItem>
</Tabs>

The separator is optional between `<parttype>` and `<partnumber>`. `<partnumber>` can be any number, or the letters a-d.

Supported part types are:

- `cd`
- `dvd`
- `part`
- `pt`
- `disc`
- `disk`

Supported separators are:

<!-- markdownlint-disable MD038 -->

- ` ` (space)
- `.` (period)
- `-` (dash)
- `_` (underscore)

Multiple parts can also be used in conjunction with multiple versions (stacked multi-versions).

```txt
Series Name
└── Season 01
    ├── Series Name S01E01 - 1080p - part1.mkv
    ├── Series Name S01E01 - 1080p - part2.mkv
    └── Series Name S01E01 - 4K.mkv
```
