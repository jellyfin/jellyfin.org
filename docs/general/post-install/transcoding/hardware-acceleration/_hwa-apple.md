<!-- markdownlint-disable MD041 -->

This tutorial guides you on setting up full video hardware acceleration on Apple Macs via VideoToolbox.

## Acceleration Methods

[VideoToolbox](https://developer.apple.com/documentation/videotoolbox) is the only available method on macOS. Please look at our guides for [Intel](./?method=intel) or [AMD](./?methodamd) if you have installed Windows or Linux on your Intel Mac.

To achieve full acceleration, [Metal](https://developer.apple.com/metal/) is required.

## Tone-mapping Methods

Hardware accelerated HDR to SDR tone-mapping is supported on all Macs from 2017 and later, with the exception of the MacBook Air (13-inch, 2017).

There are two different methods that can be used. Pros and cons are listed below:

1. **Metal**

   - Pros: Supports Dolby Vision P5, detailed fine-tuning options.

   - Cons: Slower on low end GPUs, especially on Intel iGPUs.

2. **VideoToolbox Native**

   - Pros: Lower power consumption, less dependency on GPU performance, good visual quality without manual fine-tuning.

   - Cons: Lack of tuning options, does not support Dolby Vision P5.

When both methods are enabled, VideoToolbox Native will be used for most videos, and Metal will only be used as a fallback for Dolby Vision Profile 5 videos.

## Select System Hardware

Hardware accelerated transcoding is supported on all Macs that support [VideoToolbox](https://developer.apple.com/documentation/videotoolbox). This includes most 2011 and later Macs.<sup>\*</sup>

Full acceleration is available on most Macs from 2017 and later, with the exception of the MacBook Air (13-inch, 2017).

To have native Apple Silicon support, Jellyfin server 10.9.0+ and `jellyfin-ffmpeg6` 6.0.1-5 or higher is required.

While hardware acceleration via VideoToolbox might work on older series Macs, it is not officially supported.

If your Mac does not have an internal display, you may need to connect it to a monitor or use a dummy plug to prevent the GPU from being throttled.

<sup>\*</sup> VideoToolbox may fallback to software decoding/encoding or stop working when the task exceeds its hardware capability. The older your Mac, the more this will occur. Macs from 2017 and later, especially Apple Silicon Macs are strongly recommended.

### Transcode H.264

AVC / H.264 8-bit is still widely used due to its excellent compatibility. Most GPUs after 2011 can decode and encode it.

Any VideoToolbox-supported Mac supports decoding and encoding H.264 8-bit.

### Transcode HEVC

HEVC / H.265 remains the first choice for storing 4K 10-bit, HDR and Dolby Vision video. It has mature software encoding support thanks to [x265](https://x265.readthedocs.io/en/master/), as well as the widely implemented hardware encoding support in most GPUs released after 2016.

Macs from 2017 and later, excluding the MacBook Air (13-inch, 2017), support decoding and encoding HEVC.

### Transcode AV1

There is no hardware accelerated path for AV1 on macOS at the moment. Although the M3 series added AV1 decoding support, [ffmpeg does not support it yet](https://trac.ffmpeg.org/ticket/10642).

### Performance Consideration

An Apple Silicon-based Mac is preferred in most cases. Even an entry-level M1 can handle three 4K 24fps Dolby Vision HEVC 10-bit transcoding tasks simultaneously while performing tone-mapping to SDR.<sup>1</sup> <sup>2</sup>

The "Max" variant chips come with an additional video encoding engine. VideoToolbox can utilize this extra engine even when there is only a single transcoding session, enabling support for 4K 120fps transcoding and tone-mapping.<sup>1</sup>

The "Ultra" variant chips feature 2 video decoding engines and 4 video encoding engines, effectively doubling the capability compared to the "Max" variant chips.

On legacy Intel Macs, you may encounter performance issues with tone-mapping using Metal on 4K videos if your Mac doesn't have an AMD GPU. However, it is still adequate for transcoding SDR videos.

<sup>1</sup> Using prefer speed encoder preset.

<sup>2</sup> The simultaneous session count is a soft limit. You can run more sessions if you want, but the transcoding performance of each session may be reduced to a point where video playback starts to stutter.

## macOS Setups

**macOS 12 and later** are officially supported. Older versions might work, but are not supported.

### Configure

- Enable VideoToolbox in the Jellyfin Dashboard under the Playback section and deselect unsupported codecs for your Mac.
- Check `Enable VideoToolbox Tone mapping` if you want to use VideoToolbox native tone-mapping.
- Check `Enable Tone mapping` if you want to use Metal-based tone-mapping.
- Optionally, select an `Encoding Preset`. The `veryslow`, `slower`, `slow`, and `medium` presets prioritize quality, while `fast`, `faster`, `veryfast`, `superfast`, and `ultrafast` prioritize speed. The default `Auto` setting prioritizes speed.

### Verify

1. Play a video in the Jellyfin web client and trigger video transcoding by setting a lower resolution or bitrate.

2. Open the "Activity Monitor" and search for ffmpeg.

3. If ffmpeg is not using a few hundred percent CPU, then hardware acceleration is working. It is normal to see the GPU usage close to 0. For pure transcoding, everything is performed on a dedicated accelerator, and that will not count as GPU usage under macOS.
