---
uid: server-media-excluding-directory
title: Excluding files and directories
---

# Excluding files and directory

Directories and files can be set for exclusion from Jellyfin media library scans, permitting you to include non-tracked files and directories within your media library. This is done by using `.ignore` (dot-ignore) files within your media library directories.

:::tip

When creating a `.ignore` file, ensure that you refresh/rescan the library afterwards for it to be applied.

:::

## Excluding whole directories

To exclude an entire directory, place an **empty** file named `.ignore` inside the directory. This directory, and all files and subdirectories within it, will be excluded.

The example given below results in the directories `Season 03` and `OST` being ignored:

```txt
Shows
└── Series (2010)
    ├── Season 01
    │   ├── ...
    ├── Season 02
    │   ├── ...
    ├── Season 03
    │   ├── .ignore
    │   └── ...
    └── OST
        ├── .ignore
        └── ...
```

## Excluding specific files or subdirectories

When a `.ignore` file is **not empty**, it is treated as a list of file/directory matches using the [same format as a Git `.gitignore` file](https://git-scm.com/docs/gitignore#_pattern_format).

:::caution

This is a new feature in Jellyfin 10.11.x and later; older versions did not care about the contents of `.ignore` files. Legacy non-empty `.ignore` files must be manually corrected or they will stop functioning as expected.

:::

For example, a `.ignore` containing the following:

```txt
*.avi
sample.mkv
specials/
```

Will trigger Jellyfin to ignore:

* any file that ends with `.avi`.
* any file named exactly `sample.mkv`.
* the subdirectory `specials` and all files under it.
