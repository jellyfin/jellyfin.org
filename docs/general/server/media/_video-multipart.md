<!-- markdownlint-disable MD041 -->

## Multiple Parts

Content that are split into multiple files can be stacked together if named correctly. Files should be named as follows:

```txt
Movie Name (2010)
├── Movie Name-cd1.mkv
├── Movie Name-cd2.mkv
└── Movie Name-cd3.mkv
```

```txt
Show (2025)
└──Season 1
    ├── S01E01-part-1.mkv
    └── S01E01-part-2.mkv
```

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

This does not work in conjunction with multiple versions or merging.
