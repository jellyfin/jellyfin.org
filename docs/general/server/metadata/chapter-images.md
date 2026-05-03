---
uid: server-metadata-chapter-images
title: Chapter Images
---

:::note

Not to be confused with chapters, which are the ticks you see in the timeline when watching a video. Chapter Images must be enabled to be displayed; chapters can be displayed even when Chapter Images are disabled.

:::

Chapter images are a type of metadata for video media files stored in Jellyfin. They are images that correspond to chapters and give a preview of the video at that timestamp.

Jellyfin stores the chapter images within the metadata directory, which should be located inside your server's config directory.

## Getting Started

The feature is enabled per library. There are 2 ways to get to the library settings
1. When you add a new library, pick a video Content type, then navigate to "Chapter Images"
2. Click the 3 dots of an existing library and then navigate to "Chapter Images"

### Enable chapter image extraction

This will enable the Chapter image feature.

### Extract chapter images during the library scan

This will change the scheduled extraction to happen in the "Scan Media Library" task instead of the "Extract Chapter Images" task.

:::note

Extracting chapter images can be computationally intensive and slow down library scans significantly - especially on large libraries.

:::

## Other Settings

In the dashboard, you can configure other behaviours of the chapter image feature. These settings are found in Libraries -> Metadata

### Interval

This creates dummy chapters at a given interval (0 will disable dummy chapters) if no chapters are detected in the media file. The value is in seconds.

:::note 

Not recommended to use small values here. Small intervals could slow down video playback as Jellyfin's webUI video player will try to render all the chapters on the timeline.

:::

### Resolution

This will set the resolution of the image files that are extracted. These images are used in a small preview window and will never take up the full screen, so setting a high resolution here is not necessary.
