---
uid: server-media-excluding-directory
title: Excluding a directory
---

# Excluding a directory

Directories, and their respective media files, can be excluded from the library scan. This can be achieved by placing a `.ignore` file in the directory you want to exclude. As a result, the directory, and its subdirectories, will be excluded from being scanned and shown to the end user.

:::tip

When placing a `.ignore` file inside a directory, make sure to refresh/ rescan the metadata afterwards for it to be applied.

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
