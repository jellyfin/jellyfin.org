---
uid: admin-hardware-acceleration-apple
title: Apple Mac
---

# HWA Tutorial On Mac

This tutorial guides you on setting up full video hardware acceleration on Apple Macs via VideoToolbox.

## Acceleration Methods

[VideoToolbox](https://developer.apple.com/documentation/videotoolbox) is the only available method on macOS.

To achieve full acceleration, [Metal](https://developer.apple.com/metal/) and OpenCL are also required.

## Tone-mapping Methods

Hardware accelerated HDR to SDR tone-mapping is supported on all Macs from 2017 and later, with the exception of the MacBook Air (13-inch, 2017).

There are two different methods that can be used. Pros and cons are listed below:

1. **OpenCL**

   - Pros: Supports Dolby Vision P5, detailed fine-tuning options.

   - Cons: Slower, requires more powerful GPUs.

2. **VideoToolbox Native**

   - Pros: Lower power consumption, less dependency on GPU performance, good visual quality without manual fine-tuning.

   - Cons: Lack of tuning options, potential performance issues on Intel Macs, does not support Dolby Vision P5.

When both methods are enabled, VideoToolbox Native will be used for most videos, and OpenCL will only be used as a fallback for Dolby Vision Profile 5 videos.

## Select System Hardware

Hardware accelerated transcoding is supported on all Macs that support [VideoToolbox](https://developer.apple.com/documentation/videotoolbox). This includes most 2011 and later Macs.<sup>*</sup>

Full acceleration is available on most Macs from 2017 and later, with the exception of the MacBook Air (13-inch, 2017).

To have native Apple Silicon support, Jellyfin server 10.9.0+ and `jellyfin-ffmpeg6` 6.0.1-4 or higher is required.

While hardware acceleration via VideoToolbox might work on older series Macs, it is not officially supported.

<sup>*</sup> VideoToolbox may fallback to software decoding/encoding when the task exceeds its hardware capability. The older your Mac, the more this will occur. Macs from 2017 and later are strongly recommended.

### Transcode H.264

AVC / H.264 8-bit is still widely used due to its excellent compatibility. Most GPUs after 2011 can decode and encode it.

Any VideoToolbox-supported Mac supports decoding and encoding H.264 8-bit.

### Transcode HEVC

HEVC / H.265 remains the first choice for storing 4K 10-bit, HDR and Dolby Vision video. It has mature software encoding support thanks to [x265](https://x265.readthedocs.io/en/master/), as well as the widely implemented hardware encoding support in most GPUs released after 2016.

Macs from 2017 and later, excluding the MacBook Air (13-inch, 2017), support decoding and encoding HEVC.

### Transcode AV1

There is no hardware accelerated path for AV1 on macOS at the moment. Although the M3 series added AV1 decoding support, [ffmpeg does not support it yet](https://trac.ffmpeg.org/ticket/10642).

## macOS Setups

**MacOS 12 and later** are officially supported. Older versions might work, but are not supported.

### Configure

- Enable VideoToolbox in Jellyfin and uncheck the unsupported codecs.

### Verify

1. Play a video in the Jellyfin web client and trigger video transcoding by setting a lower resolution or bitrate.

2. Open the "Activity Monitor" and search for ffmpeg.

3. If ffmpeg is not using a few hundred percent CPU, then hardware acceleration is working.

:::note

It would be normal if you see the GPU usage close to 0. For pure transcoding, everything is performed on a dedicated accelerator, and that will not count as GPU usage under macOS.

:::
