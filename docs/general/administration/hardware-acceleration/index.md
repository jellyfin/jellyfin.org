---
uid: admin-hardware-acceleration
title: Hardware Acceleration
---

# Hardware Acceleration

The Jellyfin server can offload on the fly video transcoding by utilizing an integrated or discrete graphics card ([GPU](https://en.wikipedia.org/wiki/Graphics_processing_unit)) suitable to accelerate this workloads very efficiently without straining your CPU.

## Supported Acceleration Methods

The Jellyfin server uses a modified version of [FFmpeg](http://ffmpeg.org/) as its transcoder, namely [jellyfin-ffmpeg](https://github.com/jellyfin/jellyfin-ffmpeg). It enables the Jellyfin server to access the fixed-function video codecs, video processors and [GPGPU](https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units) computing interfaces provided by vendor of the installed GPU and the operating system.

The supported and validated video [hardware acceleration (HWA)](https://trac.ffmpeg.org/wiki/HWAccelIntro) methods are:

- **Intel** Quick Sync Video (QSV)

- **NVIDIA** NVDEC/NVENC (NVENC)

- **AMD** Advanced Media Framework (AMF)

- **Intel/AMD** Video Acceleration API (VA-API, Linux only)

- **Apple** Video Toolbox (macOS only)

- **Raspberry Pi** Video4Linux2 (V4L2, Linux only)

## Full & Partial Acceleration

The transcoding pipeline usually has multiple stages, which can be simplified to:

- Video Decoding

- Video Deinterlacing (optional)

- Video Scaling & Format conversion (optional)

- Video HDR/DV Tone-mapping (optional)

- Video Subtitle burn-in (optional)

- Video Encoding

- Zero-copy in above stages

:::note

Some of these stages cannot be GPU accelerated due to software, hardware or driver limitations.

Partial acceleration may result in slightly higher CPU usage and lower transcoding speed.

:::

Jellyfin 10.8 supports full acceleration on mainstream Intel, NVIDIA and AMD (Windows only) GPUs.

Jellyfin 10.9 enables full acceleration for AMD Vega and newer GPUs on Linux via VA-API and Vulkan interop.

Using [jellyfin-ffmpeg](https://github.com/jellyfin/jellyfin-ffmpeg/releases) with Jellyfin is highly recommended, which has a `-Jellyfin` suffix in the version string.

```shell
$ /usr/lib/jellyfin-ffmpeg/ffmpeg

ffmpeg version 5.1.2-Jellyfin Copyright (c) 2000-2022 the FFmpeg developers
  built with gcc 12.2.0 (crosstool-NG 1.25.0.90_cf9beb1)
...
```

:::caution

Using FFmpeg binaries downloaded from somewhere else will result in partial acceleration.

Jellyfin-ffmpeg usually ships with our deb package, official Docker images and Windows installers.

The only exception is when using a portable installation or an unsupported distro, then it's required to manually download and set it in Jellyfin.

:::

## Configure & Verify Hardware Acceleration

There are some preparations that need to be done before enabling hardware acceleration.

The specific configuration steps may vary between GPU vendors, installation methods, and operating systems.

On Linux you can check available GPU using the `lspci` command:

```shell
lspci -nn | grep -Ei "3d|display|vga"
```

Or using `lshw`:

```shell
lshw -C display
```

### Intel QSV & VA-API

Click [Intel GPU](/docs/general/administration/hardware-acceleration/intel).

### AMD AMF & VA-API

Click [AMD GPU](/docs/general/administration/hardware-acceleration/amd).

### NVIDIA NVENC

Click [NVIDIA GPU](/docs/general/administration/hardware-acceleration/nvidia).

### Raspberry Pi V4L2

:::caution

As of **Jellyfin 10.8** hardware acceleration on Raspberry Pi via `OpenMAX OMX` was dropped and is no longer available.

This decision was made because Raspberry Pi is currently migrating to a `V4L2` based hardware acceleration, which is already available in Jellyfin but does not support all features other hardware acceleration methods provide due to lacking support in FFmpeg. Jellyfin will fallback to software de/encoding for those usecases.

The current state of hardware acceleration support in FFmpeg can be checked on the [rpi-ffmpeg repository](https://github.com/jc-kynesim/rpi-ffmpeg).

:::

## Enable Hardware Acceleration

Hardware acceleration options can be found in the Admin Dashboard under the **Transcoding** section of the **Playback** tab.

Select a valid hardware acceleration method from the drop-down menu and a device if applicable.
Supported codecs need to be indicated by checking the boxes in **Enable hardware decoding for** and **Hardware encoding options**.

The hardware acceleration is available immediately for media playback. No server restart is required.

## Remote Hardware Acceleration

If your Jellyfin server does not support hardware acceleration, but you have another machine that does, you can leverage [rffmpeg](https://github.com/joshuaboniface/rffmpeg) to delegate the transcoding to another machine.

:::note

Currently Linux-only and requires SSH between the machines, as well as shared storage for media and the Jellyfin data directory.

:::

## Hardware Accelerated Tone-mapping

Jellyfin supports hardware accelerated tone-mapping of HDR10 and HLG to SDR.

Dolby Vision (P5 & P8) to SDR tone-mapping is supported in Jellyfin 10.8 and requires jellyfin-ffmpeg 5.0.1-5 or newer.

:::note

- Intel VPP HDR10 tone-mapping is supported on Intel QSV and VA-API on Linux.

- VPP is prefered if both tone-mapping options are enabled.

:::

| OS/Platform    | NVIDIA NVENC | AMD AMF | Intel QSV | Intel VA-API | AMD VA-API | Software |
| -------------- | ------------ | ------- | --------- | ------------ | ---------- | -------- |
| Windows        | ✔️           | ✔️      | ✔️       | N/A          | N/A        | WIP      |
| Windows Docker | ✔️           | N/A     | N/A       | N/A          | N/A        | WIP      |
| Linux          | ✔️           | ✔️      | ✔️       | ✔️           | ✔️         | WIP      |
| Linux Docker   | ✔️           | ✔️      | ✔️       | ✔️           | ✔️         | WIP      |

## Tips For Hardware Acceleration

- Avoid H.264 / AVC 10-bit videos

  :::tip

  The hardware decoding of H.264 / AVC 10-bit (High 10 profile) video is not supported by any Intel, NVIDIA and AMD GPU. Jellyfin will always fallback to software decoding for it. Consider upgrading such video to H.265 / HEVC 10-bit (Main 10 profile).

  :::

- iGPU / APU Prefer dual-channel memory

  :::tip

  Integrated GPUs take up a portion of system memory as their video memory, which means using dual-channel memory can double the video memory bandwidth. This can be useful while computing intensive workloads such as hardware HDR/DV tone-mapping.

  :::

- Use SSD or RamDisk for caching

  :::tip

  On modern GPUs the peak throughput of video transcoding can be limited by the I/O speed of your hard drives. In this case, an SSD or RamDisk can be used for caching the transcoded temporary video segments.

  :::

- Tune encoder presets to trade off quality for speed

  :::tip

  Hardware encoder presets can greatly affect encoding speed. You can lower this preset in the Jellyfin dashboard to sacrifice encoding quality to maximize speed, or raise the preset to optimize encoding quality on an overkill GPU.

  :::
