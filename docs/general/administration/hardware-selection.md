---
uid: admin-hardware-selection
title: Hardware Selection
---

# Selecting Appropriate Hardware

The following is intended to help you choose appropriate hardware for a Jellyfin server and take full advantage of its features (e.g. hardware acceleration).

## Simple Guide

Below is a list of recommended specs to run Jellyfin. Whilst Jellyfin can work on relatively low-end hardware, the following specs are recommended for a good experience.

### Shared Items

Some component recommendations do not change regardless of the hardware configuration:

- Storage: 100GB SSD for your OS, Jellyfin files and transcoding cache.<sup>1</sup> Consider adding more on Windows 11, or if you have many large media files that need transcoding.
- Networking: Gigabit Ethernet Adapter or faster, WiFi or Powerline not recommended.
- Internet Connection: At least 20 Mbps upload bandwidth for remote access.<sup>2</sup>

<sup>1</sup>Your largest media file times the max number of concurrent streams all your users will consume can be used as a rule of thumb for the transcoding file size. <br />
<sup>2</sup>If you have less than 100 Mbps of total upload bandwidth, a bandwidth limit of 70% of your upload speed for Jellyfin is recommended to avoid affecting internet usage outside of Jellyfin. This option can be found in the Jellyfin Server `Dashboard`.

### Hardware Encoder Quality

Different vendors have different hardware encoder implementations and produce different results. Usually, newer generations within the same vendor will provide better results. The following is a quick comparison on the quality between vendors on modern products.

Apple ≥ Intel ≥ NVIDIA >>> AMD<sup>\*</sup>

<sup>\*</sup> This only represents the default Jellyfin settings. The quality may be different depending on your exact configuration.

### Server with Integrated Graphics

If you do not intend to use a dedicated graphics card, the following specs are recommended:

- CPU: Intel Core i5-11400, Intel Pentium Gold G7400, Intel N100, Apple M series or newer (excluding Intel J/M/N/Y series up to 11th gen)
- RAM: 8GB System RAM (Consider adding more on Windows 11)
- Graphics: Intel UHD 710, Apple M series or newer

AMD is **NOT** recommended if you intend to use integrated graphics for Jellyfin.

:::caution

Intel 7-10th gen CPUs have been removed from this list, since the toolkit for these generations has been deprecated by Intel. If you own a 7-10th gen CPU with integrated graphics, please continue to use them for Jellyfin, as they are still perfectly capable of performing the task. If you are making a purchase decision, you may wish to consider alternatives.

:::

### Server with Dedicated Graphics

If you intend to use a dedicated graphics card (including upgrading an old system with a dedicated GPU), the following specs are recommended:

- CPU: Intel Core i5-2300，AMD FX-8100 or better (Geekbench 6 Multicore 1500 or better), CPU Vendor / Performance will **NOT** affect hardware encode speed or quality
- RAM: 8GB. (4GB may be sufficient for a Linux server without its own GUI.)
- Graphics: Intel Arc A series or newer, NVIDIA GTX16/RTX20 series or newer (Excluding GTX1650), **AMD is NOT recommended**.

Intel Drivers are much easier to install on Linux, with many distributions including them by default. If you do not need CUDA for other applications, it is highly recommended that you stick with Intel Graphics on Linux.

:::caution

Intel ARC B-series cards require ReBar to be enabled. This means you must use it on a platform with Intel 10th gen, AMD Ryzen 3000 series or newer. Intel ARC A-series cards do not require ReBar to function, however, ReBar should be enabled for optimal performance.

:::

### Servers without GPUs

Not having a GPU is **NOT** recommended for Jellyfin, as video transcoding on the CPU is very performance demanding. HDR
to SDR tone-mapping can make the situation even worse. Depending on your configuration, you may end up in situations
where a Ryzen 9 5950X cannot handle even a single video stream. Please read [the section below for more details](/docs/general/administration/hardware-selection#software-hdr-to-sdr-tone-mapping)

### Low Power Servers

For users with expensive electricity, or running battery-powered servers:

- Intel 12th gen or above N series platforms
- Apple M Series Mac mini
- Rockchip RK3588 / RK3588S SBC (**Advanced Users Only**)

### Potentially Problematic Hardware

These hardware platforms might lead to a poor Jellyfin experience. Please be careful to avoid them when shopping for hardware.

- Intel "Atom" CPUs: Intel J/M/N/Y series low power CPUs up to 11th gen use a different architecture than higher end parts, leading to subpar performance despite what their names might suggest. It is advised to avoid using these parts in a Jellyfin Server.
- Prebuilt NAS Appliances: The software environment on most prebuilt NAS appliances often makes third-party software more challenging to install, sometimes even preventing it from working properly despite a successful installation. They may have low-end processors that are too slow for an acceptable Jellyfin experience. (e.g. Intel Atom, Realtek ARM CPUs, etc.).
- Most Single Board Computers (SBC): Most SBCs (including the Raspberry Pi, **especially the Raspberry Pi 5**) are too slow to provide an acceptable Jellyfin experience as they often lack proper support for hardware acceleration. If you really want to run Jellyfin on an SBC, you may wish to consider models based on the following platforms: Rockchip RK3588 / RK3588S, Intel Core, Intel 12th gen N series
- AMD Graphics: AMD Graphics have poor encoder quality and poor driver support. **This applies even on Linux**.
- Low-end GPUs: Certain low-end GPUs (e.g. GT1030, RX6400) are not capable of hardware encoding. These models cannot be used for hardware acceleration for a Jellyfin Server.

## Detailed Guide

### CPU

The CPU will be responsible for many tasks, notably:

- Transcoding Audio
- Decoding video in unsupported codecs

Whilst most audio codecs will only utilize a single core, they are very lightweight and most CPUs should be able to handle them without issues. (e.g. a Ryzen 5950X transcoding `FLAC -> AAC` runs at ~110x real-time.)

Video in unsupported codecs are usually older formats that are easier to decode. Assuming hardware acceleration is properly configured, any modern CPU with 4 threads should be able to handle the workload.

However, newer codecs can also require software decoding if there are no available hardware decoders. HEVC, VP9 and AV1 can be **VERY** demanding even on modern CPUs if hardware acceleration is not available on a Jellyfin Server. This is why a hardware platform capable of HEVC 10bit hardware decoding is strongly recommended.

In our custom `jellyfin-ffmpeg` fork, the dav1d decoder is enabled, leading to faster software decoding compared to HEVC or VP9. However, it will still use significantly more resources compared to software decoding H.264 and older codecs. Since we have a more efficient AV1 software decoder, and AV1 media isn't common yet, you shouldn't worry about AV1 when choosing components for your Jellyfin Server.

#### Integrated Graphics

Integrated graphics can be useful for transcoding video. For more information, please refer to [the GPU section](/docs/general/administration/hardware-selection#graphics-cards-gpus).

#### Resizable BAR

[Resizable Bar (ReBAR)](https://www.intel.com/content/www/us/en/support/articles/000090831/graphics.html) is a PCI Express feature that optimizes access to PCIe devices. This feature requires support from both the platform and the device. Support for this feature is respectively available beginning with Intel 10th gen and AMD Ryzen 3000 Series.

In BIOS settings of motherboards, it may also be called `Smart Access Memory` or `Clever Access Memory`

When using Intel ARC Graphics, Resizable BAR is recommended. Disabling it will result in a 10% reduction in transcoding performance. However, given how fast the media engine on Intel ARC is, this should not be a problem for the average deployment.

#### Software HDR to SDR Tone-mapping

If there is no GPU available on a Jellyfin Server, the CPU can also be used to tone-map HDR content to SDR. **This can be very demanding on
the CPU, therefore a GPU is ALWAYS recommended.** When using software tone-mapping, a software encoder will always be
used. Tone-mapping 4K 60fps Dolby Vision content to 4K 60fps H264 SDR requires a Ryzen 9 5950X for faster than real-time
transcoding. You may find current desktop CPUs do not offer adequate performance if you seek to provide streams in H.265 or AV1.

### System Memory (RAM)

As a general recommendation, at least 8GB is recommended for the average deployment. For a Linux server running without a GUI, 4GB may be enough.

It is recommended to add more memory when using Windows 11 due to the OS being heavier.

### Graphics Cards (GPUs)

With modern systems, the media engines are usually located on the GPUs. Therefore, the available hardware acceleration options are determined by the choice of GPU.

Encoder Quality: Apple ≥ Intel ≥ NVIDIA >>> AMD<sup>\*</sup>

<sup>\*</sup> This only represents the default Jellyfin settings. The quality may be different depending on your exact configuration.

Intel is always recommended on non-Apple hardware for the following reasons:

- Intel provides a good quality encoder, slightly better than NVIDIA and significantly better than AMD.
- Intel drivers and the compute environment is much easier to setup than both NVIDIA and AMD

AMD is not recommended due to poor quality H.264 and H.265 (HEVC) output, as well as being hard to set up the compute environment. While AMD has significantly improved AV1 encoder quality, you are still more likely to transcode to H.264 or H.265 than to AV1 due to the hardware capabilities of the average Jellyfin client.

A list of common codecs can be found in the [codec support documentation](/docs/general/clients/codec-support/).

The following is a list of video codecs Jellyfin supports transcoding to:

- H.264 (most common transcode target)
- H.265 (Jellyfin clients have limited support)
- AV1 (new in Jellyfin v10.9, supported by most modern browsers)

A greater number of codecs is desirable for decoding support. With that said, media is generally available in a small number of codecs. The most important one to look for is HEVC 10bit decoding support, as decoding can be CPU intensive.

#### Intel Graphics

Please refer to [this table](https://en.wikipedia.org/wiki/Intel_Quick_Sync_Video#Hardware_decoding_and_encoding) for supported codecs.

Intel CPUs with a model name that ends with `F` do not have integrated graphics. These are intended to be used with a dedicated graphics card, meaning that if you wish to use Intel integrated graphics, this is not an appropriate choice of component for your Jellyfin Server.

If you intend to use Linux with Intel 12/13th gen integrated graphics or ARC, these GPUs only work on Linux Kernel 6.2 or newer. Please check your distribution to make sure it has a supported Linux Kernel version. Further information: [Known Intel limitations on Linux](/docs/general/post-install/transcoding/hardware-acceleration/known-issues#intel-on-linux).

:::caution

Intel 10th gen and older integrated graphics are losing support for QSV on Linux due to the SDK for these platforms being deprecated by Intel. If you own 7-10th gen CPUs with integrated graphics, please continue to use them for Jellyfin. If you are making a purchase decision, you may wish to consider a newer CPU if you plan on using Intel integrated graphics.

:::

#### NVIDIA Graphics

Please refer to [this table](https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new) for supported codecs.

Certain low-end cards (e.g. GT 1030) do not have encoding hardware. Please be careful when choosing a GPU.

#### AMD Graphics

AMD graphics is not recommended for Jellyfin, this information is solely provided for reference. Further reading on AMD VCE supported codecs: [https://en.wikipedia.org/wiki/Video_Coding_Engine](https://en.wikipedia.org/wiki/Video_Coding_Engine).

Certain low-end cards (e.g., RX 6400, RX 6500) do not have encoding hardware. Please be careful when choosing a GPU.

Many AMD CPUs do not have integrated graphics. These are intended to be used with a dedicated graphics card.

For Ryzen 1000 - 5000 Series, only desktop CPUs with a model description that ends with `G` have integrated graphics—other Ryzen 1000-5000 desktop CPUs do NOT.

For Ryzen 7000 Series, desktop CPUs with a model description that ends with `F` do NOT have integrated graphics, whereas the rest do.

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

<sup>1</sup> Although the hardware does support AV1 decoding, [ffmpeg does not yet support it](https://trac.ffmpeg.org/ticket/10642).

:::caution

No Apple Silicon media engine drivers currently exist for non-macOS operating systems. You will NOT be able to use hardware acceleration if the server is running [Asahi Linux](https://asahilinux.org/).

:::

#### Rockchip VPU

Currently only the VPU on RK3588/3588S SoC is recommended, which can handle most common video codecs, including AV1 decode.

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

There are two general types of storage that can be used on a Jellyfin Server. Media files and Jellyfin files respectively require specific hardware to optimize performance.

#### Media Storage

Anything with higher sequential access speed than bitrate of media is acceptable. If desired, this storage may be a network share, or a cloud storage service mounted on the Jellyfin Server host.

#### Jellyfin Files

The files for Jellyfin itself (i.e., not your media files) will see a lot of random access, therefore SSDs are recommended for these files. AVOID mechanical drives that use [SMR (Shingled Magnetic Recording)](https://en.wikipedia.org/wiki/Shingled_magnetic_recording) as they will result in a VERY poor experience.

### Networking

Networking is for connecting your Jellyfin server to other devices. It is recommended that the Jellyfin Server be connected to your network via Ethernet cable for optimal performance. Wi-Fi or Powerline solutions for a Jellyfin Server are NOT recommended and will result in an especially poor experience.

Jellyfin Server is not designed to be exposed directly to the internet. Ensure it remains protected behind a properly configured firewall or other secure network environment.
