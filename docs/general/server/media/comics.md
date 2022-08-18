---
uid: server-media-comics
title: Comics
---

# Comics / Mangas

Comics and mangas, from now on referred to as comics, should usually be in the library root directory or in a subfolder for the individual comics. The subfolders allow for organization of metadata and images. They use the "Books" library type and metadata is provided with the Bookshelf plugin.

> [!Note]
> For the best reading experience, it is recommended to store comics in the comic book archive or pdf format. This is due to issues when trying to read comics stored in the epub format. Please note, that Jellyfin 10.8 and later saves your reading position for comics in the comic book archive format, but does not save whether you finished the comic or not.

## Naming

> [!Note]
> The Bookshelf plugin does not provide an online metadata provider that is specific to comics. Metadata can either be provided from the same providers used for books or from local files.

For best results, it is recommended to name the files similar to the following schema where the volume number and issue number are used **interchangeable**.

```txt
Series_Name #IssueNumber (of Count) (PubYear).ext
Series_Name (SeriesYear) #IssueNum (of Count) (PubYear).ext
```

- Count = Total number of issues
- PubYear = Publication year of the issue
- SeriesYear = Start year of the series
- .ext = file extension, e.g. `.cbz` or `.cbr`. For a list of supported file extensions, please refer to the [section on books](xref:server-media-books).

Take a look at the following example:

```txt
Comics
├── Plastic Man #002 (1944).cbz
├── Attack on Titan #001 (2012).cbz
└── Comic (2008)
    ├── ComicInfo.xml
    └── Comic #001 (2008).cbr
```

Placing comics into a subfolder allows the placement of a `ComicInfo.xml` file for metadata parsing. Currently, Jellyfin does not support this for a series as a whole, but only for individual comics.

## Local Metadata for "Comic Book Archive's"

Should your files **not** correspond to either `.cbz` or `.cbr` files, please refer to the [section on books](xref:server-media-books) to see what is supported.

The following metadata formats are supported:

- ComicInfo (from ComicRack)
- ComicBookInfo (from ComicBookLover)

> [!Note]
> The ComicBookInfo format is supported when using the Bookshelf plugin version 8 or later.

Should the ComicInfo be used, please make sure that the comic provides the metadata. If it does not, a `ComicInfo.xml` file can be placed in the same folder as the comic and the metadata will be parsed from this file.

> [!Note]
> For comics using the `.cbr` format, it is required to place a `ComicInfo.xml` file inside the folder. This file should contain the metadata of that comic.
