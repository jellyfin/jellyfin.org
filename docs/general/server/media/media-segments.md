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

Jellyfin can store this information and provide it to clients. Clients can then decide what they want to do with the provided information, such as displaying a "skip" button to allow convenient skipping.

## Creating media segments

Media segments are provided by plugins. [Read more](#plugin-support)

## Clients

Media segments are currently only supported by the web client.

The server is only responsible for delivering the segment metadata to the client; it is up to each client to decide what to do with the information. For example, a client may implement a "skip intro" button when it encounters an "intro"-type segment. Because it is still a new feature, client support is very sparse and will take some time to become more wide-spread.

## Plugin support

Plugins can utilize this system to store their information about intros, outros, commercials and all other types of segments. This information can then be used by clients to provide actions, such as a "skip" button in their user interface. This approach generalizes how segments are handled, so plugins no longer need to inject JavaScript into the web client to get intro skipping, and similar functionality can be achieved without custom modifications to other clients.

There is an official `Chapter Segments Provider` plugin that creates media segments from chapters.

This does _NOT_ make the existing plugins obsolete, as we still rely on them to generate the segments. They would simply have to be updated to work with the media segments system.
