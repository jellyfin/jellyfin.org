---
uid: admin-hardware-selection
title: Hardware Selection
---

# Selecting Appropriate Hardware

This page covers what you need to know in order to select appropriate hardware for a Jellyfin server and take full advantage of its features (e. g. hardware acceleration).

## TL;DR

For a Jellyfin server, the following is recommended:

### Normal Server

- CPU (With dGPU): Intel Core i5-2300, AMD Ryzen 3 1200 or better. (Geekbench 6 Multicore 1500 or better). *CPU vendor will not have a meaningful impact on quality and/or speed of transcoding.*
- CPU (Without dGPU): Intel Pentium G4560, Intel Core i3-7100 or better. (Intel 7th gen or newer Pentium or better, excluding J and N series)
- RAM: 8GB or more
- Storage: 60GB SSD storage for Jellyfin files and transcoding cache.
- Graphics: Intel HD 6xx (7th gen integrated graphics) or newer, Nvidia GTX 16 / RTX 20 series or newer (excluding GTX 1650). Intel is recommended over Nvidia. AMD and Apple Silicon are not recommended.

:::note Intel "Atom" CPUs

Atom CPUs in this guide refer to any Intel Atom CPUs, as well as other low powered Intel CPUs such as J/M/N/Y series from other product lines. (eg. Pentium N5105, Pentium N6000, Core i3 N305). While these CPUs are branded as products from other product lines, they use the same microarchitecture as Intel's low powered chipsets and may be significantly less powerful and have less features than their names might otherwise suggest.

:::

:::note These are Recommended Specs

These specs are the **recommended** specs to run Jellyfin. They are not minimum requirements, and it is certainly possible to run Jellyfin on lower end hardware.

:::

:::caution Pre-built NAS Devices

Many pre-built NAS devices are underpowered. Please check your specs against the above recommendations for a good experience.

:::

:::tip Upgrading an Existing System

Intel ARC GPUs are recommended when upgrading an existing system to be used as a Jellyfin server. In cases where Intel ARC is not feasible, Nvidia graphics is recommended. Please select an appropriate GPU according to the recommended specs above.

:::

:::tip Fully Utilizing Intel-based Macs

It is recommended that Intel-based macs be used with Windows or Linux installed to host Jellyfin. Many hardware acceleration features aren't available on MacOS due to the custom [jellyfin-ffmpeg](https://github.com/jellyfin/jellyfin-ffmpeg) fork not being available.

:::

### Low Power Applications

For low power applications, Intel 12th gen or newer Atom CPUs with integrated graphics are recommended. It is also recommended that [Low Power Encoding](/docs/general/administration/hardware-acceleration/intel/#low-power-encoding) be setup.

:::caution SBCs (Single Board Computers)

Most SBCs use low powered chipsets, often with less than ideal driver support from the chipset vendors. They are generally too slow for a good experience and/or have broken hardware acceleration support. Please avoid using SBCs such as Raspberry Pis (Including newer Raspberry Pi 5 Models) to run Jellyfin.

:::

## Detailed Guide

### CPU

The CPU will be responsible for many tasks, notably:

- Transcoding Audio
- Decoding video in unsupported codecs

Audio codecs are very lightweight and most CPUs should be able to handle them without issues. Video in unsupported codecs are usually older formats that are easier to decode. Assuming hardware acceleration is properly configured, any modern CPU with 4 threads should be able to handle the workload.

:::caution

Newer codecs can also require software decoding if there are no available hardware decoders. High bitrate HEVC content such as commonly found in 4k HDR can be very demanding even on modern CPUs. Please considering adding a modern GPU with 10bit HEVC decoding support. HDR to SDR tone-mapping is also currently not available without hardware acceleration.

:::

#### Integrated Graphics

Integrated graphics can be useful for transcoding video. Please refer to [the GPU section](/docs/general/administration/hardware-selection#graphics-cards-gpus) for a guide.

#### Resizable BAR

[Resizable Bar (ReBAR)](https://www.intel.com/content/www/us/en/support/articles/000090831/graphics.html) is a PCI Express feature that optimizes access to PCIe devices. This feature requires support from both the platform and the device. Intel 10th gen or above and AMD Ryzen 3000 Series or above have support for this feature.

When using Intel ARC Graphics, Resizable BAR is recommended. Disabling it will result in a 10% reduction in transcoding performance. However, given how fast the media engine on Intel ARC is, this will not be a problem for the vast majority of users.

### System Memory (RAM)

As a general rule of thumb, at least 8GB is recommended, though significantly smaller amounts may work.

:::tip Integrated Graphics

When using Integrated graphics, the integrated graphics processer usually uses a part of system memory as video memory. It is recommended that a dual channel configuration be used and additional capacity be installed.

:::

### Graphics Cards (GPUs)

With modern systems, the media engines are usually located on the GPUs. Therefore, the available hardware acceleration options are determined by the choice of GPU.

Encoder Quality: Intel > Nvidia > AMD > Apple

Intel graphics is recommended over Nvidia graphics because of the quality. AMD or Apple Silicon are not recommended since they produce poor quality H.264 and H.265(HEVC) output.

:::note A Note on AMD AV1 Encoders

With AV1, AMD has significantly improved the quality of their encoders. However, Jellyfin currently (as of 10.8.10) does NOT support transcoding to AV1. Even after Jellyfin adds support for transcoding to AV1, transcoding to H.264 or H.265(HEVC) is still more likely due to AV1 being in the early stages of adoption.

:::

A list of common codecs can be found [here](/docs/general/clients/codec-support/)

The following is a list of codecs Jellyfin supports transocding to:

- H.264 (Most common transcode target)
- H.265 (Limited supported by clients)

:::note AV1 Support

Jellyfin currently (as of 10.8.10) does NOT support transcoding to AV1 as a target. However, this might change in the future. Source content in AV1 will transcode to other codecs normally if needed.

:::

For decoding support, the more codecs the better. However, there are only a few codecs that media is commonly available in, as listed above.

#### Intel Graphics

Please refer to [this table](https://en.wikipedia.org/wiki/Intel_Quick_Sync_Video#Hardware_decoding_and_encoding) for supported codecs.

:::caution F series CPUs

Intel CPUs with a model description that ends with F don't have integrated graphics. These are intended to be used with a dedicated graphics card.

:::

:::note Intel 12th Gen, 13th Gen and ARC Support

If you are planning to use Linux with Intel 12/13th Gen integrated graphics or ARC, these GPUs only work on Linux Kernel 6.2 or newer. Please check your distribution to make sure it has a supported Linux Kernel version. It is also recommended that `jellyfin-ffmpeg6` be installed instead of the default `jellyfin-ffmpeg5` on these hardware platforms.

:::

#### Nvidia Graphics

Please refer to [this table](https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new) for supported codecs.

:::caution Low End Cards

Certain low end cards (e.g. GT 1030) don't have encoding hardware. Please be careful when choosing a GPU.

:::

#### AMD Graphics

Please refer to [this article](https://en.wikipedia.org/wiki/Video_Coding_Engine) for supported codecs.

:::caution Low End Cards

Certain low end cards (e.g. RX 6400, RX 6500) don't have encoding hardware. Please be careful when choosing a GPU.

:::

:::caution Integrated Graphics

Many AMD CPUs don't have integrated graphics. These are intended to be used with a dedicated graphics card.

For Ryzen 1000 ~ 5000 Series, desktop CPUs with a model description that ends with G have integrated graphics while other desktop CPUs do NOT. For Ryzen 7000 Series, desktop CPUs with a model description that ends with F do NOT have integrated graphics while others do.

Please check the product page of your CPU for more info.

:::

#### Apple Silicon

Supported codecs are listed below:

| Codec       | M1, M2 Family | M3 Family |
| ----------- | ------------- | --------- |
| H.264 8bit  | ✅            | ✅        |
| H.264 10bit | 🔶            | 🔶        |
| H.265 8bit  | ✅            | ✅        |
| H.265 10bit | ✅            | ✅        |
| VP9 8bit    | 🔶            | 🔶        |
| VP9 10bit   | 🔶            | 🔶        |
| AV1         | ❌            | 🔶        |

✅ = Encode + Decode, 🔶 = Decode Only, ❌ = Not Supported.

:::caution

Many hardware acceleration features are not available on macOS for Jellyfin, as the custom [jellyfin-ffmpeg](https://github.com/jellyfin/jellyfin-ffmpeg) fork isn't available for macOS. No Apple Silicon media engine drivers exist for other operating systems currently. You will NOT be able to use hardware acceleration if you are running [Asahi Linux](https://asahilinux.org/).

:::

### Storage

There are two general types of storage that can be used on a Jellyfin server. Media libraries and Jellyfin files require different performance characteristics.

#### Media Storage

Anything with higher sequential access speed than bitrate of media will work. This storage can be a network share or a cloud storage service mounted on the Jellyfin host if desired.

#### Jellyfin Files

Jellyfin files will see lots of random access, therefore SSDs are recommended for Jellyfin files. AVOID mechanical drives that use [SMR (Shingled Magnetic Recording)](https://en.wikipedia.org/wiki/Shingled_magnetic_recording) as they will result in a VERY poor experience.

### Networking

Networking is for connecting your Jellyfin server to other devices. It is recommended that the server be connected to the internet via Ethernet cables. Wi-Fi or Powerline solutions are NOT recommended.
