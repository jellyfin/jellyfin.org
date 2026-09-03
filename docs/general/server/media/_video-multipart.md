<!-- markdownlint-disable MD041 -->

## Multiple Parts

Content that is split into multiple files can be stacked together if named correctly. Files should be named as follows:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue={props.defaultTab} queryString="libType">
<TabItem value="movies" label="Movies">
```txt
Movie Name (2010)
├── Movie Name-cd1.mkv
├── Movie Name-cd2.mkv
└── Movie Name-cd3.mkv
```
</TabItem>
<TabItem value="shows" label="Shows">
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

This does not work with multiple versions or merging.
