---
title: Audio
sidebar_position: 9
---

# Audio

When playing audio, the client must decide whether to use transcoding or perform a direct play. This is determined by the [playback info response](./media-info.md) from the server.

### 1. Use the Transcoding URL (if provided)

If the playback info response includes a `transcodingUrl` (or `TranscodingUrl` in the media source), use this URL to fetch the audio stream. This means the server will transcode the media to a format compatible with the [device profile](./device-profiles.md).

See [Media Info](./media-info.md) for additional details.

### 2. Direct Play with the Audio API

If no transcoding URL is provided, the client can perform direct play using the [Audio API stream operation](https://api.jellyfin.org/#tag/Audio/operation/GetAudioStream). The direct play URL is constructed as follows:

- **Endpoint:** `/Audio/{itemId}/stream`
- **Query Parameters:**
	- `playSessionId`: The sessionId returned by the posted playback info operation (required for authentication).
	- `static=true`: Ensures that transcoding or remixing is not performed.
	- `startTimeTicks=0`: (optional) Start at the beginning

### Notes

- Always use the `sessionId` (or `playSessionId`) returned by the posted playback info operation for authentication.
- The `static=true` parameter ensures the server does not transcode or remux the file for direct play.
- Always use the transcoding URL if it was provided, instead of building a URL manually.

For more details, see the [Jellyfin Audio API Swagger page](https://api.jellyfin.org/#tag/Audio/operation/GetAudioStream).

