# Advanced Hardware Selection Guide

The following article is intended to help you understand the deeper mechanics behind the basic recommended specifications.

## Detailed Guide

### CPU

The CPU will be responsible for many tasks, notably:

- Transcoding Audio
- Decoding video in unsupported codecs

Whilst most audio codecs will only utilize a single core, they are very lightweight and most CPUs should be able to handle them without issues. (e.g. a Ryzen 5950X transcoding `FLAC -> AAC` runs at ~110x real-time.)

Video in unsupported codecs are usually older formats that are easier to decode. Assuming hardware acceleration is properly configured, any modern CPU with 4 threads should be able to handle the workload.

It is generally recommended to use dedicated hardware to handle newer codecs, as they are increasingly heavy in order to reduce bandwidth and file sizes for the same quality. This makes them very demanding even on relatively modern CPUs if there is no hardware acceleration available. Therefore hardware acceleration is strongly recommended.

Decode speed (approx.): MJPEG (Fastest) ~ MPEG-2 > H264 >> AV1 (dav1d) ≥ VP9 ~ H265 (slowest)

#### Integrated Graphics

Integrated graphics can be useful for transcoding video. For more information, please refer to [the GPU section](#graphics-cards-gpus).

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

:::note

The quality of transcoded video is highly dependent on the target codecs used by your client and your GPU architecture. Make sure you have verified them so you can choose the GPU best suited for your use case.

:::

With modern systems, the media engines are usually located on the GPUs. Therefore, the available hardware acceleration options are determined by the choice of GPU.

Encoder Quality: NVIDIA (RTX 50) ≥ Intel (Arc-B) ≥ Apple ≥ Intel ≥ NVIDIA ≥ AMD ≥ AMD H.264 (RX 9000) >>> AMD H.264<sup>\*</sup>

<sup>\*</sup> This only represents the default Jellyfin settings. The quality may be different depending on your exact configuration.

NVIDIA [Blackwell (RTX 50) NVENC](https://en.wikipedia.org/wiki/NVENC#Versions) represents the state of the art in hardware encoder quality. It introduces more optimized encoding tools, allowing it to deliver significant quality gains over its predecessor, Ada (RTX 40), and even Intel Arc Battlemage. The most visible difference is that Intel's encoder is more likely to produce blocky artifacts when processing dark details.

Intel is always recommended on non-Apple hardware for the following reasons:

- Intel provides a good quality encoder, slightly better than pre-Blackwell NVIDIA and significantly better than AMD H.264.
- Intel drivers and the compute environment is much easier to setup than NVIDIA.

AMD is the least preferred choice due to its sub-par H.264 encoders prior to RDNA4 (RX 9000). While its H.265 (HEVC) and AV1 encoders offer noticeable improvements, they still lag behind Intel and NVIDIA. Since the average Jellyfin client relies heavily on H.264 hardware decoding, you will inevitably transcode to H.264 most of the time, making AMD's weakness a major bottleneck.

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

AMD graphics are the least preferred choice for Jellyfin, this information is solely provided for reference. Further reading on AMD VCN & VCE supported codecs:

- [https://en.wikipedia.org/wiki/Video_Core_Next](https://en.wikipedia.org/wiki/Video_Core_Next)
- [https://en.wikipedia.org/wiki/Video_Coding_Engine](https://en.wikipedia.org/wiki/Video_Coding_Engine)

Certain low-end cards (e.g., RX 6400, RX 6500) do not have encoding hardware. Please be careful when choosing a GPU.

Many AMD CPUs do not have integrated graphics. These are intended to be used with a dedicated graphics card.

For Ryzen 1000 - 5000 Series, only desktop CPUs with a model description that ends with `G` have integrated graphics—other Ryzen 1000-5000 desktop CPUs do NOT.

For Ryzen 7000 Series, desktop CPUs with a model description that ends with `F` do NOT have integrated graphics, whereas the rest do.

Please check the product page of your CPU for more info.

#### Apple Silicon

All Apple Silicon systems provide good output quality and have mostly the same capabilities. M3 or newer supports AV1 decoding. For Intel-based macs please refer to the Intel and AMD GPU sections.

#### Rockchip VPU

Currently only the VPU on RK3588/3588S SoC is recommended, which can handle most common video codecs, including AV1 decode.

### Storage

There are two general types of storage that can be used on a Jellyfin Server. Media files and Jellyfin files respectively require specific hardware to optimize performance.

#### Media Storage

Anything with higher sequential access speed than bitrate of media is acceptable. If desired, this storage may be a network share, or a cloud storage service mounted on the Jellyfin Server host.

#### Jellyfin Files

The files for Jellyfin itself (i.e., not your media files) will see a lot of random access, therefore SSDs are recommended for these files. AVOID mechanical drives that use [SMR (Shingled Magnetic Recording)](https://en.wikipedia.org/wiki/Shingled_magnetic_recording) as they will result in a VERY poor experience.

### Networking

Networking is for connecting your Jellyfin server to other devices. It is recommended that the Jellyfin Server be connected to your network via Ethernet cable for optimal performance. Wi-Fi or Powerline solutions for a Jellyfin Server are NOT recommended and will result in an especially poor experience.

Jellyfin Server is not designed to be exposed directly to the internet. Ensure it remains protected behind a properly configured firewall or other secure network environment.
