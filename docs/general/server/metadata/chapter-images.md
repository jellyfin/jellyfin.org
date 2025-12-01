---
uid: server-metadata-chapter-images
title: Chapter Images
---
NOTE: Not to be confused with chapters, which are the ticks you see in the timeline when watching a video. Chapter Images must be enabled; chapters can be displayed even when Chapter Images are disabled.

# Chapter Images
Chapter images are a type of metadata for video media files stored in Jellyfin. They are images that correspond with chapters and give a preview of the video at that timestamp.
Jellyfin stores the chapter data in `/config/metadata/library/<id>/<id>/chapters'.

# Getting Started
The feature is enabled per library. There are 2 ways to get to the library settings
1. When you add a new library, pick a video Content type, then scroll down to the bottom where you see "Chapter Images"
2. Click the 3 dots of an existing library and scroll down to the bottom where you see "Chapter Images"

## Enable chapter image extraction
This will enable the Chapter image feature.

## Extract chapter images during the library scan
This will change the scheduled extraction to happen in the "Scan Media Library" task instead of the "Extract Chapter Images" task.

# Other Settings
In the dashboard, you can configure other behaviours of the chapter image feature. These settings are found in Libraries -> Metadata

## Interval
This creates chapters at a given interval (0 will disable dummy chapters) if no chapters are detected in the media file.
NOTE: Not recommended to use small values here. This could slow down starting the video stream as the GUI will try to render all the chapters on the timeline.

## Resolution
This will set the resolution of the image files that are extracted
