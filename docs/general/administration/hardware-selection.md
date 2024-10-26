---
uid: admin-hardware-selection
title: Hardware Selection
---

# Selecting Appropriate Hardware

This page covers what you need to know in order to select appropriate hardware for a Jellyfin server and take full advantage of its features (e. g. hardware acceleration).

## TL;DR

Below is a list of recommended specs to run Jellyfin. Even though Jellyfin will work on even lower end hardware, the following specs are recommended for a good experience.

### Shared Items

Some component recommendations do not change regardless of the hardware configuration:

- Storage: 100GB SSD for your OS, Jellyfin files and transcoding cache.<sup>1</sup> Consider adding more on Windows 11, or if you have many large media files that need transcoding.
- Networking: Gigabit Ethernet Adapter or faster, WiFi or Powerline not recommended.
- Internet Connection: At least 20mbps upload bandwidth for remote access.<sup>2</sup>

<sup>1</sup>Your largest media file times the max number of concurrent streams all your users will consume can be used as a rule of thumb for the transcoding file size. <br />
<sup>2</sup>If you have less than 100mbps of total upload bandwidth, a bandwidth limit of 70% of your upload speed for Jellyfin is recommended to avoid affecting normal internet usage. This option can be found in the dashboard.

### Hardware Encoder Quality

Different vendors have different hardware encoder implementations and produce different results. Usually, newer generations within the same vendor will provide better results. The following is a quick comparison on the quality between vendors on modern products.

Apple ≥ Intel ≥ Nvidia >>> AMD<sup>\*</sup>

<sup>\*</sup> This only represents the default Jellyfin settings. The quality may be different depending on your exact configuration.

### Server with Integrated Graphics

If you are not planning to use a dedicated graphics card, the following specs are recommended:

- CPU: Intel Core i5-11400, Intel Pentium Gold G7400, Intel N100, Apple M series or newer (excluding Intel J/M/N/Y series up to 11th gen)
- RAM: 8GB System RAM (Consider adding more on Windows 11)
- Graphics: Intel UHD 710, Apple M series or newer

AMD is **NOT** recommended if you plan to use integrated graphics for Jellyfin.

:::caution

Intel 7-10th gen CPUs have been removed from this list, since the toolkit for these generations has been deprecated by Intel. QSV on Linux for these iGPUs may stop working in a few years. You will be required to switch to VA-API when that happens.

:::

### Server with Dedicated Graphics

If you are planning to use a dedicated graphics card (including upgrading an old system with a dedicated GPU), the following specs are recommended:

- CPU: Intel Core i5-2300， AMD FX-8100 or better (Geekbench 6 Multicore 1500 or better), CPU Vendor / Performance will **NOT** affect hardware encode speed or quality
- RAM: 8GB (4GB should be enough for a server running Linux without a GUI)
- Graphics: Intel Arc A series or newer, Nvidia GTX16/RTX20 series or newer (Excluding GTX1650), **AMD is NOT recommended**.

Intel Drivers are much easier to install on Linux, with many distributions including them by default. If you do not need CUDA for other applications, it is highly recommended that you stick with Intel Graphics on Linux.

### Servers without GPUs

Not having a GPU is **NOT** recommended for Jellyfin, as video transcoding on the CPU is very performance demanding. HDR
to SDR tone-mapping can make the situation even worse. Depending on your configuration, you may end up in situations
where a Ryzen 9 5950X cannot handle even a single video stream. Please read [the section below for more details](/docs/general/administration/hardware-selection#software-hdr-to-sdr-tone-mapping)

### Low Power Servers

For users with expensive power or running servers on battery power:

- Intel 12th gen or above N series platforms
- Apple M Series mac mini
- Rockchip RK3588 / RK3588S SBC (**Advanced Users Only**)

### Potentially Problematic Hardware

These hardware platforms might lead to a poor Jellyfin experience. Please be careful to avoid them when shopping for hardware.

- Intel "Atom" CPUs: Intel J/M/N/Y series low power CPUs up to 11th gen use a different architecture than higher end parts, leading to subpar performance despite what their names might suggest. Please be careful about these parts when shopping for a system to run Jellyfin.
- Prebuilt NAS devices: The software environment on most Prebuilt NAS devices often causes 3rd party software to be hard to install and not work properly. They also often have low end processors that are too slow for a good Jellyfin experience (Intel Atom, Realtek ARM CPUs etc.).
- Most Single Board Computers (SBC): Most SBCs (Including Raspberry Pis and **especially the Pi 5**) are too slow to provide a good Jellyfin experience since they often lack proper support for hardware acceleration. If You really want to run Jellyfin on an SBC, please look at models based on the following platforms: Rockchip RK3588 / RK3588S, Intel Core, Intel 12th gen N series
- AMD Graphics: AMD Graphics have poor encoder quality and poor driver support. **This applies even on Linux**.
- Low end GPUs: Certain low end GPUs (eg. GT1030, RX6400) don't have hardware encoding available. These models can't be used for Jellyfin hardware acceleration.

## Detailed Guide

### CPU

The CPU will be responsible for many tasks, notably:

- Transcoding Audio
- Decoding video in unsupported codecs

Audio codecs are very lightweight and most CPUs should be able to handle them without issues (Ryzen 5950X FLAC -> AAC transcoding runs at ~110x real time). Please note that they will only use one core.

Video in unsupported codecs are usually older formats that are easier to decode. Assuming hardware acceleration is properly configured, any modern CPU with 4 threads should be able to handle the workload.

However, newer codecs can also require software decoding if there are no available hardware decoders. HEVC, VP9 and AV1 can be **VERY** demanding even on modern CPUs if hardware acceleration isn't available. This is why a hardware platform capable of HEVC 10bit hardware decoding is strongly recommended.

In our custom `jellyfin-ffmpeg` fork, the dav1d decoder is enabled, leading to faster software decoding compared to HEVC or VP9. However, it will still use significantly more resources compared to software decoding H.264 or older codecs. Since we have a more efficient AV1 software decoder, and AV1 media isn't common yet, you shouldn't worry about AV1 when shopping for hardware.

#### Integrated Graphics

Integrated graphics can be useful for transcoding video. Please refer to [the GPU section](/docs/general/administration/hardware-selection#graphics-cards-gpus) for a guide.

#### Resizable BAR

[Resizable Bar (ReBAR)](https://www.intel.com/content/www/us/en/support/articles/000090831/graphics.html) is a PCI Express feature that optimizes access to PCIe devices. This feature requires support from both the platform and the device. Intel 10th gen or above and AMD Ryzen 3000 Series or above have support for this feature.

In BIOS settings of motherboards, it may also be called `Smart Access Memory` or `Clever Access Memory`

When using Intel ARC Graphics, Resizable BAR is recommended. Disabling it will result in a 10% reduction in transcoding performance. However, given how fast the media engine on Intel ARC is, this will not be a problem for the vast majority of users.

#### Software HDR to SDR Tone-mapping

If there is no GPU available, the CPU can also be used to tone-map HDR content to SDR. **This can be very demanding on
the CPU, therefore a GPU is ALWAYS recommended.** When using software tone-mapping, a software encoder will always be
used. Tone-mapping 4K 60fps Dolby Vision content to 4K 60fps H264 SDR requires a Ryzen 9 5950X for faster than real time
transcoding. If you would like to output in H265 or AV1, you may end up in situations where no current desktop CPUs have
enough performance.

### System Memory (RAM)

As a general rule of thumb, at least 8GB is recommended for most configurations. For a Linux server running without a GUI, 4GB should be enough.

It is recommended to add more memory on Windows 11 due to the OS being heavier.

### Graphics Cards (GPUs)

With modern systems, the media engines are usually located on the GPUs. Therefore, the available hardware acceleration options are determined by the choice of GPU.

Encoder Quality: Apple ≥ Intel ≥ Nvidia >>> AMD<sup>\*</sup>

<sup>\*</sup> This only represents the default Jellyfin settings. The quality may be different depending on your exact configuration.

Intel is always recommended on non-apple hardware for the following reasons:

- Intel provides a good quality encoder, slightly better than Nvidia and significantly better than AMD.
- Intel drivers and the compute environment is much easier to setup than both Nvidia and AMD

AMD is not recommended because of poor quality H.264 and H.265(HEVC) output, as well as being hard to setup the compute environment. While AMD has significantly improved AV1 encoder quality. However you are still more likely to transcode to H.264 or H.265 than to AV1 due to compatibility.

A list of common codecs can be found [here](/docs/general/clients/codec-support/)

The following is a list of video codecs Jellyfin supports transcoding to:

- H.264 (Most common transcode target)
- H.265 (Limited supported by clients)
- AV1 (New in 10.9, supported by most modern browsers)

For decoding support, the more codecs the better. However, there are only a few codecs that media is commonly available in. The most important one to look for is HEVC 10bit decoding support, as it can be very demanding on the CPU to decode.

#### Intel Graphics

Please refer to [this table](https://en.wikipedia.org/wiki/Intel_Quick_Sync_Video#Hardware_decoding_and_encoding) for supported codecs.

Intel CPUs with a model description that ends with F don't have integrated graphics. These are intended to be used with a dedicated graphics card. Please beware if you intend to use Intel integrated graphics.

If you are planning to use Linux with Intel 12/13th Gen integrated graphics or ARC, these GPUs only work on Linux Kernel 6.2 or newer. Please check your distribution to make sure it has a supported Linux Kernel version. Please read [Known Intel limitations on Linux](/docs/general/administration/hardware-acceleration/known-issues#intel-on-linux) for more info.

:::caution

Intel 10th gen and older integrated graphics are losing support for QSV on Linux due to the SDK for these platforms being deprecated by Intel. If you own 7-10th gen CPUs with integrated graphics, please continue to use them for Jellyfin. If you are making a purchase decision, please choose a newer CPU if you plan on using Intel integrated graphics.

:::

#### Nvidia Graphics

Please refer to [this table](https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new) for supported codecs.

Certain low end cards (e.g. GT 1030) don't have encoding hardware. Please be careful when choosing a GPU.

#### AMD Graphics

AMD graphics is not recommended for Jellyfin, but the information is still provided for convenience. Please refer to [this article](https://en.wikipedia.org/wiki/Video_Coding_Engine) for supported codecs.

Certain low end cards (e.g. RX 6400, RX 6500) don't have encoding hardware. Please be careful when choosing a GPU.

Many AMD CPUs don't have integrated graphics. These are intended to be used with a dedicated graphics card.

For Ryzen 1000 ~ 5000 Series, desktop CPUs with a model description that ends with G have integrated graphics while other desktop CPUs do NOT. For Ryzen 7000 Series, desktop CPUs with a model description that ends with F do NOT have integrated graphics while others do.

Please check the product page of your CPU for more info.

#### Apple Silicon

Supported codecs are listed below:

| Codec       | M1, M2 Family | M3 Family      |
| ----------- | ------------- | -------------- |
| H.264 8bit  | ✅            | ✅             |
| H.264 10bit | 🔶            | 🔶             |
| H.265 8bit  | ✅            | ✅             |
| H.265 10bit | ✅            | ✅             |
| VP9 8bit    | 🔶            | 🔶             |
| VP9 10bit   | 🔶            | 🔶             |
| AV1         | ❌            | ❌<sup>1</sup> |

✅ = Encode + Decode, 🔶 = Decode Only, ❌ = Not Supported.

<sup>1</sup> Although the hardware does support AV1 decoding, [ffmpeg does not support it yet](https://trac.ffmpeg.org/ticket/10642).

:::caution

No Apple Silicon media engine drivers currently exist for non-macOS operating systems. You will NOT be able to use hardware acceleration if you are running [Asahi Linux](https://asahilinux.org/).

:::

#### Rockchip VPU

Currently only the VPU on RK3588/3588S SoC is recommended. It can handle most common video codecs, including AV1 decode.

Supported codecs are listed below:

| Codec          | RK3588/3588S |
| -------------- | ------------ |
| MPEG1/2/4 8bit | 🔶           |
| VC1 8bit       | ❌           |
| H.264 8bit     | ✅           |
| H.264 10bit    | 🔶           |
| H.265 8bit     | ✅           |
| H.265 10bit    | 🔶           |
| VP8 8bit       | 🔶           |
| VP9 8bit       | 🔶           |
| VP9 10bit      | 🔶           |
| AV1            | 🔶           |

✅ = Encode + Decode, 🔶 = Decode Only, ❌ = Not Supported.

### Storage

There are two general types of storage that can be used on a Jellyfin server. Media libraries and Jellyfin files require different performance characteristics.

#### Media Storage

Anything with higher sequential access speed than bitrate of media will work. This storage can be a network share or a cloud storage service mounted on the Jellyfin host if desired.

#### Jellyfin Files

Jellyfin files will see lots of random access, therefore SSDs are recommended for Jellyfin files. AVOID mechanical drives that use [SMR (Shingled Magnetic Recording)](https://en.wikipedia.org/wiki/Shingled_magnetic_recording) as they will result in a VERY poor experience.

### Networking

Networking is for connecting your Jellyfin server to other devices. It is recommended that the server be connected to the internet via Ethernet cables. Wi-Fi or Powerline solutions are NOT recommended.
