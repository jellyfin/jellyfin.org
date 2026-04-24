---
title: Media Info
sidebar_position: 8
---
## Fetching Playback Info with Device Profiles

Once a [device profile](./device-profiles.md) is created, it can be used to request playback information for a media item from the Jellyfin server. This is done using the [Post Playback Info](https://api.jellyfin.org/#tag/MediaInfo/operation/GetPostedPlaybackInfo) operation.

## How It Works

1. **Send Device Profile**: The client sends its device profile along with the media item ID to the server.
2. **Server Decision**: The server evaluates the device profile and the media item to determine if direct play is possible or if transcoding is required.
3. **Playback Info Response**: The server responds with playback details, including URLs for direct play or transcoding, and a session ID.

## Key Fields in the Response

- **transcodingUrl**: If transcoding is required, this field contains the URL to fetch the transcoded media stream. If direct play is possible, this may be omitted or a direct stream URL will be provided instead.
- **sessionId**: This is required when fetching the media stream. The sessionId provided in the request to fetch the stream must match the ID returned by the playback info call for authentication.

## Example (TypeScript SDK)

Here is an example of how to fetch playback info using a device profile with the TypeScript SDK:

```ts
import { getApi } from 'your-app/stores';
import { DeviceProfile } from '@jellyfin/sdk/lib/generated-client/models';
import { getMediaInfoApi } from '@jellyfin/sdk/lib/utils/api';

async function fetchMediaInfo(deviceProfile: DeviceProfile, itemId: string) {
	const api = getApi();
	const { data } = await getMediaInfoApi(api).getPostedPlaybackInfo({
		itemId,
		playbackInfoDto: { DeviceProfile: deviceProfile },
	});
	return data;
}

// Usage:
// const playbackInfo = await fetchMediaInfo(profile, 'itemId');
// const url = playbackInfo.transcodingUrl || playbackInfo.mediaSources[0]?.path;
// const sessionId = playbackInfo.sessionId;
```

## Notes

- Always provide the correct sessionId when fetching the media stream.
- The server will return the optimal playback method based on the device profile and media item.

For more details, see the [Jellyfin API documentation](https://api.jellyfin.org/#tag/MediaInfo/operation/GetPostedPlaybackInfo).


