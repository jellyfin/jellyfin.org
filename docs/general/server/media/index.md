---
uid: server-media
title: Media
---

# Media

## Special characters in file names

File names containing special characters are known to cause problems. The following characters are known to cause issues: `<`, `>`, `:`, `"`, `/`, `\`, `|`, `?`, `*`. Jellyfin does not support the use of these characters in file names.

## External Images

| Type     | Allowed Names                                  |
| -------- | ---------------------------------------------- |
| Primary  | folder, poster, cover, default                 |
| Backdrop | backdrop, fanart, background, art, extrafanart |
| Logo     | logo                                           |
| Banner   | banner                                         |
| Thumb    | thumb, landscape                               |

## Excluding a directory

Directories, and their respective media files, can be excluded from the library scan. This can be achieved by placing a `.ignore` file in the directory you want to exclude. As a result, the directory and it's subdirectories will be excluded from being scanned.

:::tip

When placing a `.ignore` file inside a directory, make sure to refresh / rescan the metadata afterwards for it to be applied.

:::

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

:::caution

Currently, placing a `.ignore` file inside an [`Extras`](/docs/general/server/media/shows#extras-folders) directory [does not work](https://github.com/jellyfin/jellyfin/issues/9571).

:::
