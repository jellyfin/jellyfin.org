---
uid: server-media-media-segments
title: Media Segments
---

## Media segments overview

First lets start with the basics of what a media segment is. A media segment exists only within our database and defines a timespan within a movie or episode with a certain type.

{/_ truncate _/}
We currently support the following types:

- Commercial
- Preview
- Recap
- Outro
- Intro

### An example

An episode that is 16 minutes (00:16:00) long could have the following segments:

1. from 00:00:00 until 00:03:08 there is an `Intro`
2. from 00:08:03 until 00:08:59 there is an `Commerical`
3. from 00:14:30 until 00:16:00 there is an `Outro`

Jellyfin can now store this information and provide it via the new MediaSegmentApi to clients.
What we did not implement in 10.10 however, is the creation of those segments.
Jellyfin only stores and provides this data to clients, but to generate it you need a plugin that provides this data to Jellyfin to be stored.

We did create a plugin to create segments based on Chapter names which sounds similar but is something different.
A Chapter is just any section of a video, but without any defined type.
A MediaSegment on the other hand is a section in a video, with a defined type.

## Plugin support

Media Segment plugins can now utilise our new system to store their information about Intros/Outros/Commercials and all other types of segments.
This information is then used by clients via our API to provide actions like a "Skip" button in their UI.
The big benefit here is that this approach generalises how Segments are handled, so gone are the days where you needed to inject javascript into the WebUI to get IntroSkipping.

This does _NOT_ make the existing plugins obsolete, however as we still rely on them to generate the segments in the first place.
But as more clients implement support, we can bring segments to more clients and provide for example IntroSkipping.

## Clients

Media segments are currently supported in the web interface and the Android TV[^1] app.

[^1]:
    Available starting from 0.18, soon [in beta](/posts/android-betas)
    The server however just delivers the information about where the segment is in the video and of what type it is, it remains up the individual client to decide what to do with that information.

As the whole system of Media Segments is quite new, please do not expect many clients to support it.

## Step by step

If you want to utilise Media Segments, you have to do the following:

1. Update your jellyfin server to 10.10.
2. Install a plugin that creates MediaSegments via the plugin catalog. For example our official "Chapter Segments Provider".
3. Restart the jellyfin server to enable the plugin.
4. Run the "Scan Mediasegments" scheduled task and wait for it to finish.

This will populate the MediaSegments for use by a client.
For the WebUI, you also need to set what should happen when there is a MediaSegment.
This needs to be set via each individual users "Profile -> Playback -> Media Segment Actions".

## The future

This is just the first step for MediaSegments.
The underlying architecture allows for much more which we are now able to explore.
We also allow for multiple plugins to provide segments, so you can pick any one plugin or all of them to provide the best experience.

## Addendum

Hi I am JPVenson and I would like to introduce myself as a new Server-Team member for the Jellyfin FOSS project.

I have been active for a bit now, first just as a Freelance software developer that created its own small media server because I didn't wanted to pay for other services but then quickly learned what it all takes.

After setting up Jellyfin, I stuck around in the chat and later started to help out as a community moderator, while submitting some features and bugfixes. However, with my last PR implementing Media Segments, I joined the Server Team to bring Jellyfin new features (and some bugs ;-)).

\- JPVenson
