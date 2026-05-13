---
title: Device Profiles
sidebar_position: 7
---
# Device Profiles

Device profiles in Jellyfin define the media playback and transcoding capabilities of a client device. They are used by the server to determine how to deliver media to each client, optimizing for direct play when possible and falling back to transcoding when necessary.

## What is a Device Profile?

A device profile is an object that describes:

- **Maximum Bitrate**: The highest bitrate (in bits per second) the device can handle for streaming or static playback.
- **Direct Play Formats**: The containers, codecs, and protocols the device can play natively, without transcoding.
- **Transcoding Formats**: The formats and codecs the device supports when the server must transcode media.
- **Other Capabilities**: Additional options such as maximum audio channels, supported resolutions, or platform-specific quirks.

Device profiles allow Jellyfin to deliver the best possible experience for each device, minimizing unnecessary transcoding and ensuring compatibility.

## Example Structure

While the exact structure may vary by implementation, a typical device profile includes:

```json
{
	"Name": "Example Device",
	"MaxStreamingBitrate": 20000000,
	"DirectPlayProfiles": [
		{ "Container": "mp4", "Type": "Video" },
		{ "Container": "mp3", "Type": "Audio" }
	],
	"TranscodingProfiles": [
		{ "Container": "ts", "AudioCodec": "aac", "VideoCodec": "h264", "Type": "Video" }
	]
}
```

## How Device Profiles Are Used

1. **Client Sends Profile**: When a client connects, it provides its device profile to the server (or the server uses a default profile for known devices).
2. **Server Evaluates Media**: When a user requests playback, the server checks the device profile to see if the media can be sent directly or needs to be transcoded. See [Media Info](./media-info.md) for more details.
3. **Optimized Delivery**: The server streams the media in the best format supported by the device, using direct play whenever possible.

## See Also

- [Jellyfin TypeScript SDK - DeviceProfile](https://typescript-sdk.jellyfin.org/interfaces/generated-client.DeviceProfile.html)
