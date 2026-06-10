---
uid: admin-hardware-acceleration-amd
title: AMD GPU
---

# HWA Tutorial On AMD GPU

This tutorial guides you on setting up full video hardware acceleration on AMD integrated GPU and discrete GPU via AMF or VA-API. If you are on macOS, please use [VideoToolbox](./apple.md) instead.

## Acceleration Methods

Hardware accelerated transcoding is supported on AMD GPUs since GCN architecture.

On Windows **AMF** is the only available method.

On Linux there are two methods:

- **VA-API** - Preferred on all GPUs, full acceleration on Polaris(RX400/500)+ GPUs, open source.

- **AMF** - Not recommended, limited support, hardware encoder only, closed source.

The [AMF](https://github.com/GPUOpen-LibrariesAndSDKs/AMF) interface on Windows is based on DXVA/D3D11VA but on Linux it is based on their Pro Vulkan and OpenCL stack, which is a closed source solution. We only provide full hardware acceleration for it on Windows.

The VA-API interface on Linux is an open source implementation. This open driver stack embraces Intel's [Libva](https://github.com/intel/libva) standard and exposes their video hardware via the [Mesa](https://gitlab.freedesktop.org/mesa/mesa) Gallium RadeonSI driver. And thanks to the developers of RADV Vulkan driver, we can interop between the VA-API and Vulkan on Polaris+ GPUs, which make it possible for us to use Vulkan compute to achieve full hardware acceleration on Linux.

:::note

- Unlike NVIDIA NVENC, there is no concurrent encoding sessions limit on AMD GPU.

- AMF and VA-API support headless server on both Windows and Linux, which means a connected monitor is not required.

:::

## Tone-mapping Methods

Hardware accelerated HDR/DV to SDR tone-mapping is supported on **all AMD GPUs that have HEVC 10-bit decoding**.

There are two different methods that can be used on Windows and/or Linux. Pros and cons are listed below:

1. **OpenCL**
   - Pros - Supports Dolby Vision P5, detailed fine-tuning options, widely supported hardware.

   - Cons - Zero-copy is not supported on Linux.

2. **Vulkan**
   - Pros - Supports Dolby Vision P5, libplacebo renderer, ROCm OpenCL runtime is not required.

   - Cons - Linux only, zero-copy only supports Polaris+ GPUs.

## Select GPU Hardware

For beginners, please refer to the [Hardware Selection Guide](/docs/general/administration/hardware-selection) for tips on selecting hardware. For expert users, please continue reading this section.

:::caution

Most AMD dGPUs come with video encoders but be careful with certain models - RX 6400/6500 series don't have video encoders.

:::

AMD Ryzen APU (G/GE/H/HS/HX suffixed models) and Zen 4 based processors have integrated graphics.

Best to check the video codec support via the [AMD product specifications](https://www.amd.com/en/products/graphics/radeon-for-creators/video-editing.html#tabs-b6a36ad588-item-0cb6dbfc4b-tab) before buying a GPU for hardware acceleration.

### Transcode H.264

AVC / H.264 8-bit is still widely used due to its excellent compatibility. All AMD GPUs that support AMF or VA-API can decode and encode it.

- **Decoding & Encoding H.264 8-bit** - Any AMD GPU supporting AMF or VA-API

### Transcode HEVC

HEVC / H.265 remains the first choice for storing 4K 10-bit, HDR and Dolby Vision video. It has mature software encoding support thanks to [x265](https://x265.readthedocs.io/en/master/), as well as the widely implemented hardware encoding support in most GPUs released after 2016.

The HEVC support on AMD is complicated:

- **Decoding HEVC 8-bit** - Radeon R9 Fury and newer (Fiji)

- **Encoding HEVC 8-bit** - Radeon RX 400 series (Polaris) and newer

- **Decoding HEVC 10-bit** - Radeon RX 400 series (Polaris) and newer

- **Encoding HEVC 10-bit** - Ryzen 4000 series APU (Renoir), Radeon RX 5000 series (Navi 1x) and newer

### Transcode AV1

AV1 is a royalty-free, future-proof video codec. It saves a lot of storage space and network bandwidth due to smaller file size. The downside is that decoding and encoding is very demanding on the CPU. Hardware acceleration makes it possible to transcode AV1 streams on the fly. AV1 encoding is supported in Jellyfin 10.9 and newer.

AMD added support for AV1 acceleration in their latest GPUs:

- **Decoding AV1 8/10-bit** - Radeon RX 6000 series (Navi 2x), Ryzen 6000 mobile APU and newer (except RX 6400/6500)

- **Encoding AV1 8/10-bit** - Radeon RX 7000 series (Navi 3x), Ryzen 7000/8000, AI 7/9 HX mobile APU, Ryzen 8000G desktop APU and newer

### Transcode Other Codecs

Please refer to these links:

- [X.org RadeonFeature](https://www.x.org/wiki/RadeonFeature/)

- [GitHub - GPUOpen-LibrariesAndSDKs/AMF](https://github.com/GPUOpen-LibrariesAndSDKs/AMF)

### Speed And Quality

Due to the lack of B-frame support, the encoding quality of the AMD H.264 hardware encoder has been unsatisfactory. Although RX 6000/VCN3.0 brings back the B-frame support, the quality improvement is not great.

The AMD HEVC encoder is far better than the AMD H.264 encoder, and the new AMD AV1 encoding support on RX 7000/VCN4.0 seems to be the savior of AMD encoding quality. Nonetheless they are currently no match for Intel QSV and NVIDIA NVENC. VCN4.0 additionally improved the encoding speed drastically. The encoding quality has been greatly improved in VCN5.0, and it also fixes the issue in VCN4.0 where the AV1 encoder required a height of 64 (1080p wrongly encoded as 1082p with black pixels).

Encoding speed and quality:

- VCN5(RX 9000) >> VCN4(RX 7000) > VCN3/VCN2(RX 6000/RX 5000/Renoir) > VCN1/VCE(Raven/Picasso/GCN GPUs)

## Windows Setups

Windows 10 64-bit and newer is recommended. **AMF is not available in Windows Docker and WSL/WSL2.**

### Known Issues And Limitations On Windows

Please refer to [this section](./known-issues.md#amd-on-windows) for known issues and limitations.

### Configure On Windows Host

1. Wipe the old driver with [DDU](https://www.wagnardsoft.com/) if you upgraded from a pre-GCN AMD GPU without doing a fresh installation.

2. Clean install the latest driver from [AMD Drivers and Support](https://www.amd.com/en/support).

3. Don't allow the GPU to be preempted by the Windows Remote desktop session.
   - Type `gpedit.msc` in Win+R shortcut key dialog and run to open the "Local Group Policy Editor".

   - Navigate in the left tree **[Computer Configuration > Administrative Templates > Windows Components]**

   - Here you can find **[Remote Desktop Services > Remote Desktop Session Host > Remote Session Environment]**

   - On the right side, double click the **[Use hardware graphics adapters for all Remote Desktop Services sessions]**

   - Set **[Disabled]** in the pop-up dialog window and click **[OK]**, reboot the system.

   ![Remote desktop GPU setup](/images/docs/hwa-gpedit-mstsc.png)

4. Enable AMF in Jellyfin and uncheck the unsupported codecs.

### Verify On Windows

1. Play a video in the Jellyfin web client and trigger a video transcoding by setting a lower resolution or bitrate.

2. Open the "Task Manager" and navigate to the GPU page.

3. Check the occupancy of the engines as follows.

   :::note

   Duplicate engine names indicate the GPU may have multiple video engines.

   :::
   - **3D** - 2D/3D engine or GPGPU workload

   - **Copy** - Blitter/Copy engine workload

   - **Video Codec** - Video decoder or encoder workload

   - **Video Decode** - Video decoder workload

   - **Video Encode** - Video encoder workload

   - **Compute** - GPGPU workload

   ![Verify AMD On Windows](/images/docs/hwa-amd-taskmgr.png)

## Linux Setups

A 64-bit Linux distribution is required. **The supported GPU varies by kernel and firmware versions.**

### Known Issues And Limitations On Linux

Please refer to [this section](./known-issues.md#amd-on-linux) for known issues and limitations.

### Configure On Linux Host

#### Debian And Ubuntu Linux

The `jellyfin-ffmpeg*` deb package required by Jellyfin comes with all necessary user mode Mesa drivers.

Besides that you only need to configure the permission of the `jellyfin` user.

:::note

Root permission is required.

:::

1. Assuming you have added the jellyfin repository to your apt source list and installed the `jellyfin-server` and `jellyfin-web`.

2. Install the `jellyfin-ffmpeg7` package. Remove the deprecated `jellyfin` meta package if it breaks the dependencies:

   ```shell
   sudo apt update && sudo apt install -y jellyfin-ffmpeg7
   ```

3. Make sure at least one `renderD*` device exists in `/dev/dri`. Otherwise upgrade your kernel or enable the iGPU in the BIOS.
   Note the permissions and group available to write to it, in this case it is `render` and `video`:

   ```shell
   $ ls -l /dev/dri

   total 0
   drwxr-xr-x  2 root root        120 Mar  5 05:15 by-path
   crw-rw----+ 1 root video  226,   0 Mar  5 05:15 card0
   crw-rw----+ 1 root video  226,   1 Mar  5 05:15 card1
   crw-rw----+ 1 root render 226, 128 Mar  5 05:15 renderD128
   crw-rw----+ 1 root render 226, 129 Mar  5 05:15 renderD129
   ```

4. Add the `jellyfin` user to the `render` and `video` group, then restart the `jellyfin` service:

   :::note

   On some releases, the group may be `input`.

   :::

   ```shell
   sudo usermod -aG render jellyfin
   sudo usermod -aG video jellyfin
   sudo systemctl restart jellyfin
   ```

5. Check the supported VA-API codecs:

   :::note

   `Mesa Gallium driver` indicates that the VA-API interface is supported.

   :::

   ```shell
   sudo /usr/lib/jellyfin-ffmpeg/vainfo --display drm --device /dev/dri/renderD128

   libva info: VA-API version 1.17.0
   libva info: Trying to open /usr/lib/jellyfin-ffmpeg/lib/dri/radeonsi_drv_video.so
   libva info: Found init function __vaDriverInit_1_17
   libva info: va_openDriver() returns 0
   Trying display: drm
   vainfo: VA-API version: 1.17 (libva 2.17.0)
   vainfo: Driver version: Mesa Gallium driver 23.1.0-devel for AMD Radeon RX Vega (vega10, LLVM 15.0.7, DRM 3.49, 6.1.14-1)
   vainfo: Supported profile and entrypoints
   ...
   ```

   `VAEntrypointVLD` means that your card is capable to decode this format, `VAEntrypointEncSlice` means that you can encode to this format.

   | Jellyfin Setting | VA-API Profil                                                                                          |
   | ---------------- | ------------------------------------------------------------------------------------------------------ |
   | H264             | VAProfileH264Baseline<br/>VAProfileH264Main<br/>VAProfileH264High<br/>VAProfileH264ConstrainedBaseline |
   | HEVC             | VAProfileHEVCMain                                                                                      |
   | MPEG2            | VAProfileMPEG2Simple<br/>VAProfileMPEG2Main                                                            |
   | VC1              | VAProfileVC1Simple<br/>VAProfileVC1Main<br/>VAProfileVC1Advanced                                       |
   | VP8              | VAProfileVP8Version0<br/>VAProfileVP8Version1<br/>VAProfileVP8Version2<br/>VAProfileVP8Version3        |
   | VP9              | VAProfileVP9Profile0                                                                                   |
   | AV1              | VAProfileAV1Profile0                                                                                   |
   | HEVC 10bit       | VAProfileHEVCMain10                                                                                    |
   | VP9 10bit        | VAProfileVP9Profile2                                                                                   |

6. Check the Vulkan runtime status:

   ```shell
   sudo /usr/lib/jellyfin-ffmpeg/ffmpeg -v debug -init_hw_device drm=dr:/dev/dri/renderD128 -init_hw_device vulkan@dr

   [AVHWDeviceContext @ 0x557f13a57bc0] GPU listing:
   [AVHWDeviceContext @ 0x557f13a57bc0]     0: AMD Radeon RX Vega (RADV VEGA10) (discrete) (0x687f)
   [AVHWDeviceContext @ 0x557f13a57bc0]     1: llvmpipe (LLVM 15.0.7, 256 bits) (software) (0x0)
   [AVHWDeviceContext @ 0x557f13a57bc0] Device 0 selected: AMD Radeon RX Vega (RADV VEGA10) (discrete) (0x687f)
   [AVHWDeviceContext @ 0x557f13a57bc0] Queue families:
   [AVHWDeviceContext @ 0x557f13a57bc0]     0: graphics compute transfer sparse (queues: 1)
   [AVHWDeviceContext @ 0x557f13a57bc0]     1: compute transfer sparse (queues: 4)
   [AVHWDeviceContext @ 0x557f13a57bc0] Using device extension VK_KHR_push_descriptor
   [AVHWDeviceContext @ 0x557f13a57bc0] Using device extension VK_KHR_sampler_ycbcr_conversion
   [AVHWDeviceContext @ 0x557f13a57bc0] Using device extension VK_KHR_synchronization2
   [AVHWDeviceContext @ 0x557f13a57bc0] Using device extension VK_KHR_external_memory_fd
   [AVHWDeviceContext @ 0x557f13a57bc0] Using device extension VK_EXT_external_memory_dma_buf
   [AVHWDeviceContext @ 0x557f13a57bc0] Using device extension VK_EXT_image_drm_format_modifier
   [AVHWDeviceContext @ 0x557f13a57bc0] Using device extension VK_KHR_external_semaphore_fd
   [AVHWDeviceContext @ 0x557f13a57bc0] Using device extension VK_EXT_external_memory_host
   ...
   ```

7. If you wish to use the second GPU, change `renderD128` to `renderD129` in the Jellyfin dashboard.

8. Enable VA-API in Jellyfin and uncheck the unsupported codecs based on the vainfo output.

#### Linux Mint

Linux Mint uses Ubuntu as its package base.

You can follow the configuration steps of [Debian And Ubuntu Linux](./amd.md#debian-and-ubuntu-linux) but install all Jellyfin packages `jellyfin-server`, `jellyfin-web` and `jellyfin-ffmpeg7` manually from the [Jellyfin Server Releases Page](https://repo.jellyfin.org/releases/server/). Also make sure you choose the correct codename by following the [official version maps](https://linuxmint.com/download_all.php).

#### Arch Linux

:::note

Root permission is required.

:::

1. Install the Archlinux/extra [`jellyfin-ffmpeg`](https://archlinux.org/packages/extra/x86_64/jellyfin-ffmpeg/) package:

   ```shell
   sudo pacman -Syu jellyfin-ffmpeg
   ```

2. User mode Mesa drivers are required to be manually installed for VA-API and RADV Vulkan:
   - [libva-mesa-driver](https://archlinux.org/packages/extra/x86_64/libva-mesa-driver/)

   - [vulkan-radeon](https://archlinux.org/packages/extra/x86_64/vulkan-radeon/)

   ```shell
   sudo pacman -Syu libva-mesa-driver vulkan-radeon
   ```

3. Check the VA-API codecs:

   ```shell
   sudo pacman -Syu libva-utils
   sudo vainfo --display drm --device /dev/dri/renderD128
   ```

4. Check the Vulkan runtime status:

   ```shell
   sudo /usr/lib/jellyfin-ffmpeg/ffmpeg -v debug -init_hw_device drm=dr:/dev/dri/renderD128 -init_hw_device vulkan@dr
   ```

5. Check to the remaining parts of [Debian And Ubuntu Linux](./amd.md#debian-and-ubuntu-linux).

#### Other Distros

We provide **portable** [jellyfin-ffmpeg](https://github.com/jellyfin/jellyfin-ffmpeg) binaries for distros that don't have a regular maintainer.

They can be downloaded from one of these links:

- [Jellyfin repository](https://repo.jellyfin.org/releases/ffmpeg/)

- [Releases · jellyfin/jellyfin-ffmpeg · GitHub](https://github.com/jellyfin/jellyfin-ffmpeg/releases)

:::note

Minimum requirements for glibc and Linux versions:

- x86_64 / amd64 - glibc >= 2.28, Linux >= 4.18 (most distros released in 2018 and later)

:::

Extract and install it to the correct path, change the FFmpeg path in the Jellyfin dashboard to match it:

:::note

Root permission is required.

:::

```shell
cd ~/
mkdir -p jellyfin-ffmpeg
wget https://repo.jellyfin.org/releases/ffmpeg/<VERSION>/jellyfin-ffmpeg_<VERSION>_portable_linux64-gpl.tar.xz
tar -xvf jellyfin-ffmpeg_<VERSION>_portable_linux64-gpl.tar.xz -C jellyfin-ffmpeg
sudo mv jellyfin-ffmpeg /usr/lib
sudo ldd -v /usr/lib/jellyfin-ffmpeg/ffmpeg
```

Install other necessary Mesa driver packages and their dependencies that contain these key words:

- Mesa libva vaapi driver - RadeonSI

- Mesa vulkan driver - RADV

### Configure With Linux Virtualization

#### Official Docker

The official Docker image comes with all necessary user mode Mesa drivers.

What you need to do is pass the host's `render` group id to Docker and modify the configurations to meet your requirements.

:::note

Root permission is required.

:::

1. Query the ids of the `render` and `video` groups on the host system and use it in the Docker CLI or docker-compose file:

   :::note

   On some releases, the group may be `input`.

   :::

   ```shell
   getent group render | cut -d: -f3
   getent group video | cut -d: -f3
   ```

2. Use Docker command line **or** docker compose:
   - Example command line:

     ```shell
     docker run -d \
      --name=jellyfin \
      --volume /path/to/config:/config \
      --volume /path/to/cache:/cache \
      --volume /path/to/media:/media \
      --user 1000:1000 \
      --group-add="122" \ # Change this to match your "render" host group id and remove this comment
      --net=host \
      --restart=unless-stopped \
      --device /dev/dri/renderD128:/dev/dri/renderD128 \
      jellyfin/jellyfin
     ```

   - Example docker-compose configuration file written in YAML:

     ```yaml
     services:
       jellyfin:
         image: jellyfin/jellyfin
         user: 1000:1000
         group_add:
           - '122' # Change this to match your "render" host group id and remove this comment
         network_mode: 'host'
         volumes:
           - /path/to/config:/config
           - /path/to/cache:/cache
           - /path/to/media:/media
         devices:
           - /dev/dri/renderD128:/dev/dri/renderD128
     ```

3. If you wish to use the second GPU on your system, change `renderD128` to `renderD129`.

4. For trying out the unstable build, change `jellyfin/jellyfin` to `jellyfin/jellyfin:unstable` on your own risk.

5. Check the VA-API codecs:

   ```shell
   docker exec -it jellyfin /usr/lib/jellyfin-ffmpeg/vainfo --display drm --device /dev/dri/renderD128
   ```

6. Check the Vulkan runtime status:

   ```shell
   docker exec -it jellyfin /usr/lib/jellyfin-ffmpeg/ffmpeg -v debug -init_hw_device vulkan
   ```

7. Enable VA-API in Jellyfin and uncheck the unsupported codecs.

#### Linuxserver.io Docker

LSIO Docker images are maintained by [linuxserver.io](https://www.linuxserver.io/), please refer their docs from [GitHub - linuxserver/docker-jellyfin](https://github.com/linuxserver/docker-jellyfin).

:::note

The paths of Jellyfin config and data folders in the official and LSIO Docker images are different. So they cannot be easily exchanged.

:::

#### Other Virtualizations

Other Virtualizations are not verified and may or may not work on AMD GPU.

Refer to the [HWA Tutorial On Intel GPU - Configure With Linux Virtualization](./intel.md#configure-with-linux-virtualization) for more information.

### Verify On Linux

There is no reliable way to read the occupancy of the VCE/UVD/VCN engines on AMD GPU on Linux.

But you can still verify this by reading other engines with the `radeontop` tool.

:::note

Root permission is required.

:::

1. Install the `radeontop` package. The name varies between distros.
   - On Debian & Ubuntu:

     ```shell
     sudo apt update && sudo apt install -y radeontop
     ```

   - On Arch Linux:

     ```shell
     sudo pacman -Syu radeontop
     ```

2. Play a video in the Jellyfin web client and trigger a video transcoding by setting a lower resolution or bitrate.

3. Use `radeontop` command to check the occupancy of 3D engines.
