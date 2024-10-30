---
uid: server-media-media-segments
title: Media segments
---

# Media segments

Media segments are a type of metadata for media files stored in Jellyfin. Unlike chapters, which have no type, media segements can contain type information, allowing different actions based on the type of a given time segment.

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
2. From 00:08:03 until 00:08:59 there is a `Commercial` segment.
3. From 00:14:30 until 00:16:00 there is an `Outro` segment.

Jellyfin can store this information and provide it to clients. Clients can then decide what they want to do with the provided information.

## Creating media segments

Media segments are provided by plugins. [Read more](#plugin-support)

## Clients

Media segments are currently only supported by the web client.

Upon receiving media segment information from the server, clients can choose to provide any number of actions based on the segment type, such as showing a "skip" button to skip the section. Because it is still a new feature, client support is very sparse and will take some time to become more wide-spread.

## Plugin support

Plugins can utilize this system to store their information about intros, outros, commercials and all other types of segments. This information can then be used by clients to provide actions, such as a "skip" button in their user interface. This approach generalizes how segments are handled, so more platforms can be easily supported, without custom modifications to clients.

There is an official `Chapter Segments Provider` plugin that creates media segments from chapters.
