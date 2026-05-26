---
uid: server-metadata-media-segments
title: Media segments
---

Media segments (first introduced in 10.10) are a type of metadata for media files stored in Jellyfin. Unlike chapters, which have no type, media segments can contain type information, allowing different actions based on the type of each segment.

A video that is 16 minutes (00:16:00) long could have the following segments:

1. From 00:00:00 until 00:03:08 there is an `Intro` segment.
2. From 00:08:03 until 00:08:59 there is a `Commercial` segment.
3. From 00:14:30 until 00:16:00 there is an `Outro` segment.

Jellyfin can store this information and provide it to clients. Clients can then decide what they want to do with the provided information.

## Getting started

There's a few steps to follow if you want to use media segments:

1. Install one or multiple media segment providers. Read the [plugins section](#plugins) below to find out more.
2. Run the `Media segment scan` task in the dashboard to create segments immediately, this task also runs automatically in the background.
3. Set actions for the different segment types, the way you do this differs per client, but they are generally found in the playback settings of the client.

## Creating media segments

Media segments are provided by plugins. In general, they include a `begin` and `end`-Timestamp, followed by a `type.`

### Plugins

Plugins can utilize this system to store their information about intros, outros, commercials and all other types of segments. This information can then be used by clients to provide actions, such as a "skip" button in their user interface. This approach generalizes how segments are handled, so more platforms can be easily supported, without custom modifications to clients.

There is an official `Chapter Segments Provider` plugin that creates media segments based on chapters and chapter-names.

### Types

The following types are currently available:

- Commercial
- Preview
- Recap
- Outro
- Intro
