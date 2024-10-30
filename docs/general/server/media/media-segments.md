---
uid: server-media-media-segments
title: Media Segments
---

# Media Segments

Media segments are sections of media files with a defined type, stored within Jellyfin. They are different from chapters in that chapters don't have any defined type.

## Types

The following types are currently available:

- Commercial
- Preview
- Recap
- Outro
- Intro

## An example

A video that is 16 minutes (00:16:00) long could have the following segments:

1. From 00:00:00 until 00:03:08 there is an `Intro` segment.
2. From 00:08:03 until 00:08:59 there is an `Commercial` segment.
3. From 00:14:30 until 00:16:00 there is an `Outro` segment.

Jellyfin can store this information and provide it via the MediaSegment API to clients. Clients can then decide what they wants to do with the provided information, such as displaying a "skip" button to allow convenient skipping.

## Creating Media Segments

As of Jellyfin 10.10, media segments can only be created by plugins. There is an official `Chapter Segments Provider` plugin that creates media segments from chapters.

## Clients

Media segments are currently supported in the web interface and the Android TV[^1] app.

[^1]: Available starting from 0.18, soon [in beta](/posts/android-betas)

The server simply delivers the information about where the segment is in the video and of what type it is, it remains up the individual client to decide what to do with that information. Since media segments is a new feature, please do not expect many clients to support it.

## Plugin support

Plugins can utilize this system to store their information about Intros, Outros, Commercials and all other types of segments. This information can then be used by clients to provide actions, such as a "Skip" button in their UI. This approach generalizes how segments are handled, so plugins no longer need to inject javascript into the WebUI to get IntroSkipping, and similar functionality can be achieved without custom modifications to other clients.

This does _NOT_ make the existing plugins obsolete, however as we still rely on them to generate the segments. They would simply have to be updated to work with the media segments system.
