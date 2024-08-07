---
uid: server-transcoding-downmix
title: Stereo Downmix
---

# Stereo Downmix

These settings will control how the server downmixes surround sound into stereo when the client only supports stereo sound.

## Stereo Downmix Algorithm

Algorithms used to downmix multi-channel audio to stereo. Each algorithm has its own design goal and has its own strength and weakness. Pick the algorithm that best fit your use case and preference.

### None

Don't use any custom algorithm; instead, use ffmpeg's built-in channel downmixing system. This is the default and safest setting. It guarantees that as long as the input channel layout is supported by ffmpeg, it will always find a way to downmix it to stereo output. A common misconception is that this mode just discards all other channels, which is incorrect. ffmpeg has its own mechanism to build a downmixing matrix and will apply that when possible. When other custom algorithms cannot support the input layout, Jellyfin will fallback to this mode.

**Strengths:**

- Supports all channel layouts that ffmpeg can handle.
- Produces satisfactory mixing results for most use cases.

**Weaknesses:**

- The auto-generated matrix may produce weaker volume levels compared to the original.
- The result might not be well balanced, leading to too low perceived dialog compared to music and sound effects.

### Dave750

A custom mixing algorithm created by [Dave_750 on SuperUser](https://superuser.com/a/1375875). This algorithm divides the center and LFE channels into left and right channels and applies a -3dB gain to the front and back channels to balance the volume. The original algorithm supports only 5.1 inputs, but the Jellyfin implementation extends it to support 7.1 inputs by using AC-4 cascading downmixing.

**Strengths:**

- Maintains the overall volume level effectively.
- Inclusion of the LFE channel can enhance sound effects for some inputs.

**Weaknesses:**

- Due to the low gain coefficient applied to the center channel, dialogues might sound too quiet compared to music.
- Including the LFE channel can have a negative impact because this channel often contains duplicated signals from other channels, which may cause the bass to be overpowering.

### NightmodeDialogue

A custom mixing algorithm created by [Robert Collier on the Doom9 forum](https://forum.doom9.org/showthread.php?t=168267). This algorithm strongly emphasizes the center channel and reduces the volume level for all other channels. The original algorithm supports only 5.1 inputs, but the Jellyfin implementation extends it to support 7.1 inputs by using AC-4 cascading downmixing.

**Strengths:**

- Produces very clear dialogues.
- Music and sound effects are minimized, allowing you to focus on voices.

**Weaknesses:**

- Too quite sound effects is not ideal for movies.
- Conversations not fully mixed into the center channel will also sound much quieter.

### RFC7845

A standardized downmixing algorithm defined in [RFC7845 Section 5.1.1.5](https://datatracker.ietf.org/doc/html/rfc7845#section-5.1.1.5). This algorithm splits the surround channels between both the left and right stereo channels with gains to maintain perceived intensity, focusing on the front channels. It supports the 3.0, quadraphonic, 5.0, 5.1, 6.1, and 7.1 channel layouts, and includes the LFE channel when available.

**Strengths:**

- Maintains perceived intensity excellently.
- Focus on front channels and inclusion of LFE makes it a good choice for music videos.

**Weaknesses:**

- The original spatial sound is compromised, as all surround channels are equally split into both stereo channels, making the surround sound more like a louder center channel.
- Not ideal for movies due to the loss of spatial mixing and a too-quiet center channel, which can cause sound effects and music to potentially overpower dialogues.

### AC-4

A standardized downmixing algorithm originally created for AC-4 audio, defined in [ETSI TS 103 190-1, Section 6.2.17](https://www.etsi.org/deliver/etsi_ts/103100_103199/10319001/01.03.01_60/ts_10319001v010301p.pdf). Jellyfin's implementation uses the spec-defined default values, applying -3dB gains to both center and surround channels, and -∞dB gain to the LFE channel, effectively discarding it. It supports 3.0, 5.0, 5.1, 7.0, and 7.1 inputs.

**Strengths:**

- A widely adopted industry standard, producing results close to commercial ATSC 3.0 systems.
- Maintains both volume level and auditory spatial attention well.

**Weaknesses:**

- Does not excel as much as other algorithms in their specific strengths.

## Audio boost when downmixing

This option applies a volume gain in normalized ratio when performing a stereo downmix. The valid range is 0.5 to 3. A value of 1 means the original volume level is maintained, while a value of 2 means the volume is increased to 200%. The default value is 2, which is suitable for the default ffmpeg built-in downmixing. If you change the downmix algorithm, remember to adjust this value accordingly, as different algorithms produce different volume levels. Reduce this value to 1 if you're unsure, and increase it if the result is too quiet.
