---
uid: admin-hardware-acceleration-intel
title: Intel GPU
---

# HWA Tutorial On Intel GPU

This tutorial guides you on setting up full video hardware acceleration on Intel integrated GPUs and ARC discrete GPUs via QSV and VA-API. If you are on macOS, please use [VideoToolbox](./apple.md) instead.

## Acceleration Methods

Hardware accelerated transcoding is supported on most Intel GPUs.

On Windows **QSV** is the only available method.

On Linux there are two methods:

- **QSV** - **Preferred on mainstream GPUs**, for better performance

- **VA-API** - Required by pre-Broadwell legacy GPUs, for compatibility

:::note

Linux VA-API supports nearly all Intel GPUs.

Linux QSV [supported platforms](https://github.com/intel/media-driver#supported-platforms) are limited to Broadwell (5th gen Core) and newer.

:::

The QSV interface provided by Intel [OneVPL](https://github.com/intel/vpl-gpu-rt) / [MediaSDK](https://github.com/Intel-Media-SDK/MediaSDK) is a high-level implementation based on Linux VA-API and Windows DXVA/D3D11VA providing better performance and more fine-tuning options on supported platforms.

QSV can be used together with VA-API and DXVA/D3D11VA for a more flexible hybrid transcoding pipeline.

:::caution

**ICL** (Ice Lake) / **JSL** (Jasper Lake) / **EHL** (Elkhart Lake) and older generations are losing support for QSV on Linux, since the MediaSDK runtime has been deprecated by Intel, and may stop working in a few years, by which point you will have to switch to VA-API. Please use newer hardware if you are shopping for hardware.

Please read [deprecation notice](https://github.com/Intel-Media-SDK/MediaSDK) and [legacy platforms support](https://github.com/intel/compute-runtime/blob/master/LEGACY_PLATFORMS.md) for more info.

:::

:::note

- Unlike NVIDIA NVENC, there is no concurrent encoding sessions limit on Intel iGPU and ARC dGPU.

- QSV and VA-API support headless server on both Windows and Linux, which means a connected monitor is not required.

:::

## Tone-mapping Methods

Hardware accelerated HDR/DV to SDR tone-mapping is supported on **all Intel GPUs that have HEVC 10-bit decoding**.

There are two different methods that can be used on Windows and/or Linux. Pros and cons are listed below:

1. **OpenCL**
   - Pros - Supports Dolby Vision P5, detailed fine-tuning options, widely supported hardware.

   - Cons - The OpenCL runtime sometimes need to be manually installed on Linux.

2. **QSV VPP**
   - Pros - Lower power consumption, realized by Intel fixed-function LUT hardware.

   - Cons - Poor tuning options, limited supported GPU models, **currently only available on Linux**.

:::note

The `Prefer OS native DXVA or VA-API hardware decoders` feature toggles between the native decoders and the QSV decoders. Dolby Vision support requires that this option be checked.

:::

## Select GPU Hardware

For beginners, please refer to the [Hardware Selection Guide](/docs/general/administration/hardware-selection) for tips on selecting hardware. For expert users, please continue reading this section.

:::caution

Do not use models of Intel processors ending with "F" - those do not have an integrated GPU.

:::

Quick Sync Video support can be checked via the [Intel ark website](https://ark.intel.com/content/www/us/en/ark.html) prior to buying a new GPU suitable for hardware acceleration.

### Transcode H.264

AVC / H.264 8-bit is still widely used due to its excellent compatibility. All Intel GPUs that support QSV can decode and encode it.

- **Decoding & Encoding H.264 8-bit** - Any Intel GPU that supports Quick Sync Video (QSV)

### Transcode HEVC

HEVC / H.265 remains the first choice for storing 4K 10-bit, HDR and Dolby Vision video. It has mature software encoding support thanks to [x265](https://x265.readthedocs.io/en/master/), as well as the widely implemented hardware encoding support in most GPUs released after 2016.

Intel GPUs are no exception:

- **Decoding & Encoding HEVC 8-bit** - Gen 9 Skylake (6th Gen Core) and newer

- **Decoding & Encoding HEVC 10-bit** - Gen 9.5 Kaby Lake (7th Gen Core), Apollo Lake, Gemini Lake (Pentium and Celeron) and newer

:::note

Note that the 6th Gen Core with HD 5xx iGPUs lacks 10-bit support, it's best to choose 7th Gen and newer processors, which usually have HD / UHD 6xx series iGPUs.

:::

### Transcode AV1

AV1 is a royalty-free, future-proof video codec. It saves a lot of storage space and network bandwidth due to smaller file size. The downside is that decoding and encoding is very demanding on the CPU. Hardware acceleration makes it possible to transcode AV1 streams on the fly. AV1 encoding is supported in Jellyfin 10.9 and newer.

Intel added support for AV1 acceleration in their latest GPUs:

- **Decoding AV1 8/10-bit** - Gen 12 Tiger Lake (11th Gen Core) and newer

- **Encoding AV1 8/10-bit** - Gen 12.5 DG2 / ARC A-series, Gen 12.7 Meteor Lake (14th Gen Core Mobile / 1st Gen Core Ultra) and newer

:::note

Note that Jasper Lake and Elkhart Lake processors are 10th Gen Pentium/Celeron/Atom, which don't have AV1 acceleration.

:::

### Transcode Other Codecs

Please refer to these links:

- [Intel Media Capabilities documentation](https://www.intel.com/content/www/us/en/docs/onevpl/developer-reference-media-intel-hardware/1-1/overview.html)

- [Linux media-driver/iHD capabilities](https://github.com/intel/media-driver#decodingencoding-features)

- [Linux vaapi-driver/i965 capabilities](https://github.com/intel/intel-vaapi-driver/blob/master/README)

### Speed And Quality

Intel improves the speed and video quality of its fixed-function encoders between each generation of graphics architectures.

They can be divided into 4 tiers by their performance：

- **Entry-Level** - HD / UHD 600, 605 and 61x

  :::tip

  These iGPUs usually come from mini PC boxes or NASes and they can transcode HEVC 10-bit and apply tone-mapping filters. You can't expect much due to performance and power constraints, but it's still adequate for personal use.

  :::

- **Mainstream** - HD / UHD 620, 630, Iris 640, 655 and the Gen 11 graphics

  :::tip

  These iGPUs have more computing power than entry-level, which makes them capable of multiple 4k HDR HEVC 10-bit transcoding at the same time. Note that the Gen 11 graphics have a slightly improved encoder quality over Gen 9.

  :::

- **High-Performance** - UHD 7xx series and Iris Xe graphics

  :::tip

  These GPUs use Gen 12 XeLP architecture with AV1 hardware decoding, [significantly improved video quality and speed](https://github.com/intel/media-delivery/blob/master/doc/benchmarks/intel-iris-xe-max-graphics/intel-iris-xe-max-graphics.md). Models like the UHD 770 and Iris Xe feature a second MFX video engine, which enhances its concurrent transcoding capabilities.

  :::

- **Hardcore** - ARC A & B-series discrete and integrated GPU

  :::tip

  ARC A-series GPUs use Gen 12.5 XeHPG architecture, which continues to improve on the basis of XeLP, supports [AV1 hardware encoding and improved H.264 and HEVC encoding](https://github.com/intel/media-delivery/blob/master/doc/benchmarks/intel-data-center-gpu-flex-series/intel-data-center-gpu-flex-series.rst). This makes it competitive with the medium preset of the x264 and x265 software encoders. All ARC A-series GPU models come with two MFX video engines. The encoding quality on the ARC B-series is similar to its predecessor, but with slightly improved encoding speeds.

  :::

### OneVPL And MediaSDK

[OneVPL](https://github.com/intel/vpl-gpu-rt) is a new QSV implementation to supersede [MediaSDK](https://github.com/Intel-Media-SDK/MediaSDK). Both provide the Quick Sync Video (QSV) runtime.

Intel supports OneVPL on Gen 12+ graphics (11th Gen Core and newer processor, namely Tiger Lake & Rocket Lake).

:::note

- The most notable difference is that OneVPL supports the new AV1 hardware encoder on ARC GPU.

- [FFmpeg 6.0](http://ffmpeg.org/download.html#release_6.0) enables OneVPL. This process is seamless for the end users.

:::

### ARC GPU Support

Jellyfin server support Intel ARC **Alchemist/A-series** discrete GPU on both Windows and Linux **6.2+**. For using ARC **Battlemage/B-series** discrete GPU on Linux, kernel version **6.12+** is required. Windows is also supported, just install the GPU driver.

You only need to follow the [Windows Setups](./intel.md#windows-setups) and [Linux Setups](./intel.md#linux-setups) to configure and verify it.

:::tip

- [Resizable-BAR](https://www.intel.com/content/www/us/en/support/articles/000090831/graphics.html) is only mandatory for hardware acceleration on ARC **B-series** cards, or the media driver will crash the transcoder. For ARC **A-series** cards, the media driver can tolerate not having it enabled but it's also recommended to enable Resizable-BAR if the processor, motherboard and BIOS support it, to achieve the best performance.

- [ASPM](https://www.intel.com/content/www/us/en/support/articles/000092564/graphics.html) should be enabled in the BIOS if supported. This greatly reduces the idle power consumption of the ARC GPU.

- Low-Power encoding is used by default on ARC GPUs. **GuC & HuC firmware can be missing on older distros**, you might need to manually download it from the [Kernel firmware git](https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/i915).

- Old kernel build configs [may not have the MEI modules enabled](https://gitlab.freedesktop.org/drm/intel/-/issues/7732), which are necessary for using ARC GPU on Linux.

- Starting from ARC **Battlemage/B-series** discrete GPUs, Intel has enabled the **xe** kernel driver by default on new GPUs (Xe-2 and newer architectures) to replace the long-standing **i915** kernel driver. Low-power encoding, GuC and HuC firmware are automatically enabled, and users should not refer to settings like `i915.enable_guc=xxx`, which are no longer relevant.

:::

## Windows Setups

Windows 10 64-bit and newer is recommended. **QSV is not available on Windows Docker and WSL/WSL2.**

### Known Issues And Limitations On Windows

Please refer to [this section](/docs/general/post-install/transcoding/hardware-acceleration/known-issues#intel-on-windows) for known issues and limitations

### Configure On Windows Host

1. Wipe the old driver with [DDU](https://www.wagnardsoft.com/) if you upgraded from a pre-6th Gen Intel processor without doing a fresh installation.

2. Clean install the latest EXE or INF driver from [Intel download center](https://www.intel.com/content/www/us/en/download-center/home.html).

3. Don't allow the GPU to be preempted by the Windows Remote desktop session.
   - Type `gpedit.msc` in Win+R shortcut key dialog and run to open the "Local Group Policy Editor".

   - Navigate in the left tree **[Computer Configuration > Administrative Templates > Windows Components]**

   - Here you can find **[Remote Desktop Services > Remote Desktop Session Host > Remote Session Environment]**

   - On the right side, double click the **[Use hardware graphics adapters for all Remote Desktop Services sessions]**

   - Set **[Disabled]** in the pop-up dialog window and click **[OK]**, reboot the system.

   ![Remote desktop GPU setup](/images/docs/hwa-gpedit-mstsc.png)

4. Enable QSV in Jellyfin and uncheck the unsupported codecs.

### Verify On Windows

1. Play a video in the Jellyfin web client and trigger a video transcoding by setting a lower resolution or bitrate.

2. Open the "Task Manager" and navigate to the GPU page.

3. Check the occupancy of the engines as follows.

   :::note

   Duplicate engine names indicate the GPU may have multiple MFX video engines.

   :::
   - **3D** - 2D/3D engine, QSV VPP or GPGPU workload

   - **Copy** - Blitter/Copy engine workload

   - **Video Decode** - QSV decoder or encoder workload

   - **Video Processing** - QSV VPP processor workload

   - **Compute** - GPGPU or QSV VPP workload (only available on ARC / DG2+)

   ![Verify Intel On Windows](/images/docs/hwa-intel-taskmgr.png)

## Linux Setups

A 64-bit Linux distribution is required. **The supported GPU varies by kernel and firmware versions.**

### Known Issues And Limitations On Linux

Please refer to [this section](/docs/general/post-install/transcoding/hardware-acceleration/known-issues#intel-on-linux) for known issues and limitations

### Configure On Linux Host

#### Debian And Ubuntu Linux

The `jellyfin-ffmpeg*` deb package comes with all necessary user mode Intel media drivers except OpenCL (see below).

:::note

Root permission is required.

:::

1. Assuming you have added the jellyfin repository to your apt source list and installed the `jellyfin-server` and `jellyfin-web`, if you choose to use vanilla ffmpeg, instead of jellyfin-ffmpeg, you will need to install the following [intel packages](https://github.com/intel/media-driver/wiki).

   :::note
   If you are running Debian, you will need to add "non-free" to your apt config.
   :::

2. Install the `jellyfin-ffmpeg7` package. Remove the deprecated `jellyfin` meta package if it breaks the dependencies:

   ```shell
   sudo apt update && sudo apt install -y jellyfin-ffmpeg7
   ```

3. Make sure at least one `renderD*` device exists in `/dev/dri`. Otherwise upgrade your kernel or enable the iGPU in the BIOS.

   :::note

   Note the permissions and group available to write to it, in this case it is `render`:

   :::

   ```shell
   $ ls -l /dev/dri

   total 0
   drwxr-xr-x  2 root root        120 Mar  5 05:15 by-path
   crw-rw----+ 1 root video  226,   0 Mar  5 05:15 card0
   crw-rw----+ 1 root video  226,   1 Mar  5 05:15 card1
   crw-rw----+ 1 root render 226, 128 Mar  5 05:15 renderD128
   crw-rw----+ 1 root render 226, 129 Mar  5 05:15 renderD129
   ```

4. Add the `jellyfin` user to the `render` group, then restart `jellyfin` service:

   :::note

   On some releases, the group may be `video` or `input` instead of `render`.

   :::

   ```shell
   sudo usermod -aG render jellyfin
   sudo systemctl restart jellyfin
   ```

5. Check the version of `intel-opencl-icd` thats the Linux distro provides:

   :::note

   This package may not be available for newer distros since it [currently relies on LLVM 14](https://github.com/intel/intel-graphics-compiler/issues/289), which may not available in releases like Debian Trixie. If this is the case a release from the [Intel compute-runtime repository](https://github.com/intel/compute-runtime/releases) may be used instead.

   :::

   ```shell
   $ apt policy intel-opencl-icd

   intel-opencl-icd:
     Installed: (none)
     Candidate: 22.14.22890-1
   ...
   ```

6. If the version is newer than `22.xx.xxxxx` just install it. For the latest products like N95/N100 and Arc A380, support is provided in `23.xx.xxxxx` and newer. Otherwise install from [Intel compute-runtime repository](https://github.com/intel/compute-runtime/releases).

   ```shell
   sudo apt install -y intel-opencl-icd
   ```

7. Check the supported QSV / VA-API codecs:

   :::note
   - `iHD driver` indicates support for the QSV and VA-API interfaces.

   - `i965 driver` indicates only support for the VA-API interface, which should only be used on pre-Broadwell platforms.

   :::

   ```shell
   sudo /usr/lib/jellyfin-ffmpeg/vainfo --display drm --device /dev/dri/renderD128

   libva info: VA-API version 1.17.0
   libva info: Trying to open /usr/lib/jellyfin-ffmpeg/lib/dri/iHD_drv_video.so
   libva info: Found init function __vaDriverInit_1_17
   libva info: va_openDriver() returns 0
   Trying display: drm
   vainfo: VA-API version: 1.17 (libva 2.17.0)
   vainfo: Driver version: Intel iHD driver for Intel(R) Gen Graphics - 23.1.2 (xxxxxxx)
   vainfo: Supported profile and entrypoints
   ...
   ```

8. Check the OpenCL runtime status:

   ```shell
   sudo /usr/lib/jellyfin-ffmpeg/ffmpeg -v verbose -init_hw_device vaapi=va:/dev/dri/renderD128 -init_hw_device opencl@va

   [AVHWDeviceContext @ 0x55cc8ac21a80] 0.0: Intel(R) OpenCL HD Graphics / Intel(R) Iris(R) Xe Graphics [0x9a49]
   [AVHWDeviceContext @ 0x55cc8ac21a80] Intel QSV to OpenCL mapping function found (clCreateFromVA_APIMediaSurfaceINTEL).
   [AVHWDeviceContext @ 0x55cc8ac21a80] Intel QSV in OpenCL acquire function found (clEnqueueAcquireVA_APIMediaSurfacesINTEL).
   [AVHWDeviceContext @ 0x55cc8ac21a80] Intel QSV in OpenCL release function found (clEnqueueReleaseVA_APIMediaSurfacesINTEL).
   ...
   ```

9. If you wish to use the second GPU, change `renderD128` to `renderD129` in the Jellyfin dashboard.

10. Enable QSV or VA-API in Jellyfin and uncheck the unsupported codecs.

#### Linux Mint

Linux Mint uses Ubuntu as its package base.

You can follow the configuration steps of [Debian And Ubuntu Linux](./intel.md#debian-and-ubuntu-linux) but install all Jellyfin packages `jellyfin-server`, `jellyfin-web` and `jellyfin-ffmpeg7` manually from the [Jellyfin Server Releases Page](https://repo.jellyfin.org/releases/server/). Also make sure you choose the correct codename by following the [official version maps](https://linuxmint.com/download_all.php).

#### Arch Linux

:::note

Root permission is required.

:::

1. Install the Archlinux/extra [`jellyfin-ffmpeg`](https://archlinux.org/packages/extra/x86_64/jellyfin-ffmpeg/) package:

   ```shell
   sudo pacman -Syu jellyfin-ffmpeg
   ```

2. User mode Intel media drivers and the OpenCL runtime are required to be manually installed for enabling QSV / VA-API:
   - [intel-media-driver](https://archlinux.org/packages/extra/x86_64/intel-media-driver/)

   - [intel-media-sdk](https://archlinux.org/packages/extra/x86_64/intel-media-sdk/)

   - [onevpl-intel-gpu](https://archlinux.org/packages/extra/x86_64/onevpl-intel-gpu/)

   - [intel-compute-runtime](https://archlinux.org/packages/extra/x86_64/intel-compute-runtime/)

   - [libva-intel-driver](https://archlinux.org/packages/extra/x86_64/libva-intel-driver/)

3. Check the QSV / VA-API codecs and the OpenCL runtime status:

   ```shell
   sudo pacman -Syu libva-utils
   sudo vainfo --display drm --device /dev/dri/renderD128
   sudo /usr/lib/jellyfin-ffmpeg/ffmpeg -v verbose -init_hw_device vaapi=va:/dev/dri/renderD128 -init_hw_device opencl@va
   ```

4. Check to the remaining parts of [Debian And Ubuntu Linux](./intel.md#debian-and-ubuntu-linux).

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

Install other necessary Intel driver packages and their dependencies that contain these key words:

- Intel media driver - iHD

- Intel vaapi driver - i965

- Intel media sdk - MFX

- Intel oneVPL-intel-gpu - VPL

- Intel compute runtime - OpenCL

### Configure With Linux Virtualization

#### Official Docker

The official Docker image comes with all necessary user mode Intel media drivers and the OpenCL runtime.

What you need to do is pass the host's `render` group id to Docker and modify the configurations to meet your requirements.

1. Query the id of the `render` group on the host system and use it in the Docker CLI or docker-compose file:

   :::note

   On some releases, the group may be `video` or `input` instead of `render`.

   :::

   ```shell
   getent group render | cut -d: -f3
   ```

2. Use docker command line **or** docker compose:
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

5. Check the QSV and VA-API codecs:

   ```shell
   docker exec -it jellyfin /usr/lib/jellyfin-ffmpeg/vainfo
   ```

6. Check the OpenCL runtime status:

   ```shell
   docker exec -it jellyfin /usr/lib/jellyfin-ffmpeg/ffmpeg -v verbose -init_hw_device vaapi=va -init_hw_device opencl@va
   ```

7. Enable QSV or VA-API in Jellyfin and uncheck the unsupported codecs.

#### Linuxserver.io Docker

LSIO Docker images are maintained by [linuxserver.io](https://www.linuxserver.io/), please refer their docs from [GitHub - linuxserver/docker-jellyfin](https://github.com/linuxserver/docker-jellyfin).

:::note

The paths of Jellyfin config and data folders in the official and LSIO Docker images are different. So they cannot be easily exchanged.

:::

#### Kubernetes

This follows the same principles as for the Docker, with one small change that your container within the pod must run as **privileged**.

The devices in Kubernetes are added as host path mounts, they are not separated into separate volumes like in the Docker example.

1. Example Kubernetes (API version 1) configuration file written in YAML:

   ```yaml
   # Example of an incomplete deployment spec
   apiVersion: apps/v1
   kind: Deployment
   metadata: ...
   spec:
     template:
       metadata: ...
       spec:
         securityContext:
           runAsUser: 1000 # Similar to "user: 1000:1000" on Docker
           runAsGroup: 1000
           supplementalGroups:
             - 122 # Change this to match your "render" host group id and remove this comment
         containers:
           - name: 'jellyfin'
             image: ...
             ports: ...
             env: ...
             securityContext:
               privileged: true # Container must run as privileged inside of the pod
             volumeMounts:
               - name: 'render-device'
                 mountPath: '/dev/dri/renderD128'
         volumes:
           - name: 'render-device'
             hostPath:
               path: '/dev/dri/renderD128'
   ```

2. When the pod starts, you can check the QSV and VA-API codecs.

   If you get `error: failed to initialize display`, double check that the `supplementalGroups` are correct.

   ```shell
   kubectl exec <JELLYFIN_POD_NAME> -- /usr/lib/jellyfin-ffmpeg/vainfo
   ```

3. Enable QSV or VA-API in Jellyfin and uncheck the unsupported codecs.

#### LXC And LXD Container

:::caution

This has been tested with LXC 3.0 and may or may not work with older versions.

:::

1. Query the id of the `render` group on the host system.

   :::note

   On some releases, the group may be `video` or `input` instead of `render`.

   :::

   ```shell
   getent group render | cut -d: -f3
   ```

2. Install the required drivers on the host system.

3. Add your GPU to the container:

   ```shell
   lxc config device add <CONTAINER_NAME> gpu gpu gid=<GID_OF_HOST_RENDER_GROUP>
   ```

4. Make sure you have the required devices within the container:

   ```shell
   $ lxc exec jellyfin -- ls -l /dev/dri

   total 0
   crw-rw---- 1 root video 226,   0 Jun  4 02:13 card0
   crw-rw---- 1 root video 226,   0 Jun  4 02:13 controlD64
   crw-rw---- 1 root video 226, 128 Jun  4 02:13 renderD128
   ```

5. Configure Jellyfin to use QSV or VA-API acceleration and change the default GPU `renderD128` if necessary.

#### LXC On Proxmox

1. Make sure your GPU is available as a DRI render device on the Proxmox host, e.g. `/dev/dri/renderD128`.
   If not, [install the necessary drivers](#debian-and-ubuntu-linux) on the host.

2. **Proxmox VE 8 or Newer**:

   Setup a `Device Passthrough` for the render device via the `Resources` section of the web interface.
   Be sure to set the correct GID via the advanced options of the dialog, e.g. `989` for the `render` group.
   GIDs can be looked up in `/etc/group` inside the LXC.

   :::note

   You must be logged in as `root`. Other administrator accounts are not allowed to perform this action.

   :::

   **Proxmox VE 7 or Older**:

   :::note
   - Jellyfin needs to run in a **privileged** LXC container.

   - An existing unprivileged container can be converted to a privileged container by taking a backup and restoring it as privileged.

   :::

   Add your GPU to the container by editing `/etc/pve/lxc/<CONTAINER_ID>.conf`.

   You may need to change the GIDs in the examples below to match those used on your host.

   :::caution

   This has been tested on Proxmox VE 7.1 - on previous versions you may need to change `cgroup2` to `cgroup`.

   :::

   ```conf
   lxc.cgroup2.devices.allow: c 226:0 rwm
   lxc.cgroup2.devices.allow: c 226:128 rwm
   lxc.mount.entry: /dev/dri/renderD128 dev/dri/renderD128 none bind,optional,create=file
   ```

3. Restart your container and [install the required drivers in your container](#configure-on-linux-host).

4. Add the `jellyfin` user to the group you chose in Step 2, i.e. the group that owns the DRI render device inside the LXC.

5. Configure Jellyfin to use QSV or VA-API acceleration and change the default GPU `renderD128` if necessary.

### Verify On Linux

:::note

Root permission is required.

:::

1. Install the `intel-gpu-tools` package **on the host system**, which is used for debugging Intel graphics driver on Linux. The name varies between distros.
   - On Debian & Ubuntu:

     ```shell
     sudo apt update && sudo apt install -y intel-gpu-tools
     ```

   - On Arch Linux:

     ```shell
     sudo pacman -Syu intel-gpu-tools
     ```

2. Play a video in Jellyfin web client and trigger a video transcoding by setting a lower resolution or bitrate.

3. Use `intel_gpu_top` command to check the occupancy of the engines as follows:

   :::note

   Duplicate engine names indicate the GPU may have multiple MFX video engines.

   :::
   - **Render/3D** - 2D/3D engine, QSV VPP or GPGPU workload

   - **Blitter** - Blitter/Copy engine workload

   - **Video** - QSV decoder or encoder workload

   - **VideoEnhance** - QSV VPP processor workload

   - **Compute** - GPGPU or QSV VPP workload (only available on ARC / DG2+)

   ```shell
   sudo intel_gpu_top

   intel-gpu-top: Intel Tigerlake (Gen12) @ /dev/dri/card0 -   86/ 349 MHz;  54% RC6
           441 irqs/s

            ENGINES     BUSY                                                MI_SEMA MI_WAIT
          Render/3D   19.86% |████████▊                                   |      0%      0%
            Blitter    0.00% |                                            |      0%      0%
              Video    2.17% |█                                           |      0%      0%
       VideoEnhance    3.52% |█▋                                          |      0%      0%

      PID              NAME    Render/3D        Blitter          Video        VideoEnhance
   ...
   ```

## Low-Power Encoding

Intel video encoders on Gen 9+ graphics support two encoding modes:

- Low-Power / LP encoding (VDEnc + HuC)

- non Low-Power / LP encoding (PAK + media kernel + VME)

Low-Power encoding can offload the GPU usage with the help of the [HuC firmware](https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/i915).

This can be useful for speeding up the OpenCL based HDR/DV tone-mapping.

:::tip

More detail information about Intel video hardware can be found [on the Intel media driver repo](https://github.com/intel/media-driver#components-and-features).

:::

### LP Mode Hardware Support

:::note

Gen X refers to [Intel graphics architecture](https://en.wikipedia.org/wiki/Intel_Graphics_Technology) instead of the CPU generation. (i.e. Gen 9 graphics ≠ 9th Gen processors)

:::

- Gen 9.x SKL+ graphics - Support non-LP and LP (H.264 only) encoding.

- Gen 11 ICL graphics - Support both two encoding modes.

- Gen 11 JSL/EHL graphics - Only support LP encoding mode.

- Gen 12 TGL/DG1+ graphics - Support both two encoding modes.

- Gen 12.5 DG2/ARC A-Series - Only support LP encoding mode.

- Gen 12.7 MTL/ARL, Gen 13 (or Gen 20?) LNL/BMG and newer - Only support LP encoding mode.

### LP Mode System Support

- Windows supports two modes by default. No additional configuration is required.

- Linux supports two modes only on Gen 12 ADL+ by default.

  On older platforms LP mode can be configured manually by passing a parameter to the i915 kernel driver.

### Configure And Verify LP Mode On Linux

:::caution

The setup is not necessary unless you are using an Intel **Jasper Lake** or **Elkhart Lake** processor, or you want faster OpenCL tone-mapping speed on Linux.

:::

:::note

Root permission is required.

:::

1. Install the latest linux firmware packages **on the host system**. The name varies between distros.
   - On Debian:

     ```shell
     sudo apt update && sudo apt install -y firmware-linux-nonfree
     ```

   - On Ubuntu:

     ```shell
     sudo apt update && sudo apt install -y linux-firmware
     ```

   - On Arch Linux:

     ```shell
     sudo pacman -Syu linux-firmware
     ```

   - Pull firmwares from Linux repository directly:

     ```shell
     cd ~/
     git clone --depth=1 https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git
     sudo mkdir -p /usr/lib/firmware
     sudo cp -r linux-firmware/i915 linux-firmware/xe /usr/lib/firmware
     ```

2. Add the required i915 kernel parameter on the host system to enable loading GuC and HuC firmware:
   - Check the kernel module in use, goto step 3 if **xe** kernel driver is in use.

   :::note

   **ARC Battlemage/B-series, Core Ultra 200V-series (Lunar Lake) and newer GPUs (Xe-2 and newer architectures)**, have switch to using the **xe** kernel driver instead of the **i915** driver. This step is no longer relevant.

   :::

   ```shell
   lspci -knn | grep -E "i915|xe|VGA|Display"

   00:02.0 Display controller [0380]: Intel Corporation Alder Lake-P GT2 [Iris Xe Graphics] [8086:46a6] (rev 0c)
           Kernel driver in use: i915
           Kernel modules: i915, xe
   03:00.0 VGA compatible controller [0300]: Intel Corporation DG1 [Iris Xe MAX Graphics] [8086:4905] (rev 01)
           Kernel driver in use: i915
           Kernel modules: i915, xe
   ```

   - Enable GuC loading HuC firmware in **i915** kernel driver:

   :::note

   **DG1, 12th (ADL-P), 13th, 14th generation and ARC Alchemist/A-series GPUs** have enabled `enable_guc=3` by default. This step should be skipped on these GPUs, otherwise you will disable some features that are enabled by default.

   :::

   ```shell
   sudo mkdir -p /etc/modprobe.d
   sudo sh -c "echo 'options i915 enable_guc=2' >> /etc/modprobe.d/i915.conf"
   ```

3. Update the initramfs and grub. The commands varies between distros.
   - On Debian & Ubuntu:

     ```shell
     sudo update-initramfs -u && sudo update-grub
     ```

   - On Arch Linux:

     ```shell
     sudo mkinitcpio -P && sudo update-grub
     ```

4. Reboot the system and check the GuC & HuC status with the following commands, make sure there is no FAIL or ERROR in the outputs.

   ```shell
   sudo reboot
   sudo dmesg | grep -E "i915|xe"
   sudo sh -c "cat /sys/kernel/debug/dri/0/gt*/uc/guc_info"
   sudo sh -c "cat /sys/kernel/debug/dri/0/gt*/uc/huc_info"
   ```

   - If you get a `No such file or directory` error when running the last two commands, try querying a `dri` device with a different number, for example `1`:

     ```shell
     sudo sh -c "cat /sys/kernel/debug/dri/1/gt*/uc/guc_info"
     sudo sh -c "cat /sys/kernel/debug/dri/1/gt*/uc/huc_info"
     ```

   - On very old kernels (4.16-) the last two commands can be like this:

     ```shell
     sudo cat /sys/kernel/debug/dri/0/i915_guc_load_status
     sudo cat /sys/kernel/debug/dri/0/i915_huc_load_status
     ```

5. Now you can safely enable the Intel Low-Power encoder in the Jellyfin dashboard.

:::tip

Extended readings for more distros:

- [Intel graphics - ArchWiki](https://wiki.archlinux.org/title/intel_graphics)

- [skylake-tuning-linux - GitHub](https://gist.github.com/Brainiarc7/aa43570f512906e882ad6cdd835efe57)

:::
