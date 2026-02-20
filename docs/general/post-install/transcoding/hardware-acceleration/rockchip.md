---
uid: admin-hardware-acceleration-rockchip
title: Rockchip VPU
---

# HWA Tutorial On Rockchip VPU

This tutorial guides you on setting up full video hardware acceleration on Rockchip VPU via RKMPP.

:::warning

RKMPP hardware acceleration requires Jellyfin 10.9 or above.

:::

## Acceleration Methods

Hardware accelerated transcoding is supported and verified with the Rockchip VPU of RK3588/3588S SoC.

Linux is the only supported platform and **RKMPP** is the only available method.

RKMPP in Jellyfin includes two components: MPP and RGA. Jellyfin uses them to achieve a zero-copy transcoding pipeline.

Usually in ARM-based SoCs, the VPU is responsible for decoding and encoding video, while **the GPU is only responsible for graphics and computes**. For example, the **Mali-G610** GPU on the RK3588 SoC is only used for OpenCL-based HDR tone-mapping.

The [MPP](https://github.com/rockchip-linux/mpp) interface is part of the SDK and BSP kernel provided by Rockchip. Its kernel driver and user-mode runtime library are both open source implementations and do not rely on proprietary firmware. Rockchip has experimented with using the upstream V4L2 interface, but it cannot meet Rockchip's actual needs in their products. Until there is a mature transcoding solution in the Linux mainline, users need to use RKMPP.

The [RGA](https://github.com/airockchip/librga) interface is Rockchip's 2D post-processing unit, used for video scaling, pixel format conversion, subtitle burn-in, etc.

:::note

- Unlike NVIDIA NVENC, there is no concurrent encoding sessions limit on Rockchip VPU.

- RKMPP support headless server on Linux, which means a connected monitor is not required.

:::

## Tone-mapping Methods

Hardware accelerated HDR to SDR tone-mapping is **only** supported on **RK3588/3588S SoC due to hardware pixel format limitations**.

**OpenCL** is the only available tone-mapping method. It supports zero-copy.

## Select SoC/VPU Hardware

RK3588/3588S is currently the most recommended SoC. In addition to common codecs, it also supports **10-bit H.264 (High10)** and **AV1 decoding**, and has an H.264/HEVC **encoding speed** of up to **1080p@480fps or 4k@120fps**. Older chips may be supported but we were unable to test, such as RK356x and RK33xx. They have fairly limited encoding resolution support, as well as lacking of hardware HDR tone-mapping support. Best to check the datasheet of Rockchip SoC before purchasing a new SBC for hardware acceleration.

### Transcode H.264

AVC / H.264 8-bit is still widely used due to its excellent compatibility. All Rockchip SoCs that support RKMPP can decode and encode it.

- **Decoding & Encoding H.264 8-bit** - Any Rockchip SoCs supporting RKMPP.

- **Decoding H.264 10-bit** - Almost all Rockchip SoCs from RK33xx onwards.

### Transcode HEVC

HEVC / H.265 remains the first choice for storing 4K 10-bit, HDR and Dolby Vision video. It has mature software encoding support thanks to [x265](https://x265.readthedocs.io/en/master/), as well as the widely implemented hardware encoding support in most GPUs released after 2016.

The HEVC support on Rockchip is complicated:

- **Decoding HEVC 8-bit** - Almost all Rockchip SoCs from RK33xx onwards.

- **Encoding HEVC 8-bit** - Almost all Rockchip SoCs from RK35xx onwards.

- **Decoding HEVC 10-bit** - Almost all Rockchip SoCs from RK33xx onwards.

### Transcode AV1

AV1 is a royalty-free, future-proof video codec. It saves a lot of storage space and network bandwidth due to smaller file size. The downside is that decoding and encoding is very demanding on the CPU. Hardware acceleration makes it possible to transcode AV1 streams on the fly. AV1 encoding support in Jellyfin 10.9 and newer versions.

Rockchip added support for AV1 acceleration in their latest SoCs:

- **Decoding AV1 8/10-bit** - Rockchip RK3588/3588S and RK3576 SoC.

- **Encoding AV1 8/10-bit** - As of the RK3588 series, there is no Rockchip SoC that supports AV1 encoder.

### Transcode Other Codecs

Please refer to these links:

- [GitHub - rockchip-linux/mpp](https://github.com/rockchip-linux/mpp)

### Speed And Quality

- Rk3588/3588S supports up to 1080p@480fps or 4k@120fps transcoding.

- RK3576 has roughly half the transcoding capacity of RK3588. However, due to the pixel format limitations of its RGA hardware, it lacks tone-mapping capabilities.

- RK356x has the resolution limit of the encoder, which is 1080p@100fps. It cannot meet the needs of real-time 4k encoding.

- RK33xx and older are not recommended, their encoders are only H.264 1080p@30fps.

Due to the lack of test devices, we cannot compare the quality differences between different Rockchip SoC generations. Generally speaking, the newer the SoC, the better the encoding quality. From first impression, the VPU on RK3588 series can meet the quality requirements of real-time streaming media very well.

## Linux Setups

A 64-bit Linux distribution is recommended. **The Rockchip BSP kernel (6.1 or 5.10 LTS) is required.**

### Configure On Linux Host

#### Debian And Ubuntu Linux

The `jellyfin-ffmpeg*` deb package required by Jellyfin comes with all necessary user mode Rockchip MPP & RGA drivers.

Besides that you only need to install the OpenCL runtime (libmali) and configure the the device permissions.

:::note

Root permission is required.

:::

1. Assuming you have added the jellyfin repository to your apt source list and installed the `jellyfin-server`, `jellyfin-web` and `jellyfin-ffmpeg7`.

2. Make sure `dma_heap`, `dri`, `mpp_service` and `rga` exist in `/dev`. Otherwise upgrade your BSP kernel to 5.10 LTS and newer.

   ```shell
   $ ls -l /dev | grep -E "mpp|rga|dri|dma_heap"
   drwxr-xr-x  2 root       root          80 Jan  1  1970 dma_heap
   drwxr-xr-x  3 root       root         140 Jan 18 18:50 dri
   crw-rw----  1 root       video   241,   0 Jan 18 18:50 mpp_service
   crw-rw----  1 root       video    10, 122 Jan 18 18:50 rga
   ```

3. Add the following lines into `/etc/udev/rules.d/99-rk-device-permissions.rules`. Restart to make it take effect.

   ```shell
   KERNEL=="mpp_service", MODE="0660", GROUP="video"
   KERNEL=="rga", MODE="0660", GROUP="video"
   KERNEL=="system", MODE="0666", GROUP="video"
   KERNEL=="system-dma32", MODE="0666", GROUP="video"
   KERNEL=="system-uncached", MODE="0666", GROUP="video"
   KERNEL=="system-uncached-dma32", MODE="0666", GROUP="video" RUN+="/usr/bin/chmod a+rw /dev/dma_heap"
   ```

4. Add the `jellyfin` user to the `render` and `video` group, then restart the `jellyfin` service:

   :::note

   On some distros, the group may be `input`.

   :::

   ```shell
   sudo usermod -aG render jellyfin
   sudo usermod -aG video jellyfin
   sudo systemctl restart jellyfin
   ```

5. Install the ARM Mali OpenCL runtime (libmali) on host:

   :::note

   Only needed before using HDR tone-mapping on RK3588/3588S. This is done to ensure that the user space firmware and kernel driver versions match, otherwise OpenCL will not work properly.

   :::
   - For the 6.1 LTS kernel on [Ubuntu-Rockchip](https://github.com/Joshua-Riek/ubuntu-rockchip) & [Armbian](https://github.com/armbian) and the legacy 5.10 LTS kernel, install [v1.9-1-2131373](https://github.com/tsukumijima/libmali-rockchip/releases/download/v1.9-1-2131373/libmali-valhall-g610-g24p0-gbm_1.9-1_arm64.deb).

   - For the 6.1 LTS kernel on other SBC **vendor-made** distros, install [v1.9-1-55611b0](https://github.com/tsukumijima/libmali-rockchip/releases/download/v1.9-1-55611b0/libmali-valhall-g610-g13p0-gbm_1.9-1_arm64.deb).

6. Check the OpenCL runtime status:

   ```shell
   sudo /usr/lib/jellyfin-ffmpeg/ffmpeg -v debug -init_hw_device rkmpp=rk -init_hw_device opencl=ocl@rk

   arm_release_ver: g24p0-00eac0, rk_so_ver: 8
   [AVHWDeviceContext @ 0xaaaae8321360] 1 OpenCL platforms found.
   [AVHWDeviceContext @ 0xaaaae8321360] 1 OpenCL devices found on platform "ARM Platform".
   [AVHWDeviceContext @ 0xaaaae8321360] 0.0: ARM Platform / Mali-G610 r0p0
   [AVHWDeviceContext @ 0xaaaae8321360] cl_arm_import_memory found as platform extension.
   [AVHWDeviceContext @ 0xaaaae8321360] cl_khr_image2d_from_buffer found as platform extension.
   [AVHWDeviceContext @ 0xaaaae8321360] DRM to OpenCL mapping on ARM function found (clImportMemoryARM).
   ...
   ```

7. Enable RKMPP in Jellyfin and uncheck the unsupported codecs.

### Configure With Linux Virtualization

Before proceeding, please complete **steps 2 and 5** in the [Configure on Linux Host](#configure-on-linux-host) section above. This applies to both Docker and LXC setups.

#### Official Docker

The official Docker image comes with all necessary user mode Rockchip MPP & RGA & OpenCL drivers.

What you need to do is to pass the **device files** of VPU from host to Docker and enable the **privileged mode**.

:::note

Root permission is required.

:::

1. Use Docker command line: (the extensive device names between `for...done` is used to ensure backward compatibility)

   ```shell
   sudo docker run -d \
    --security-opt systempaths=unconfined \
    --security-opt apparmor=unconfined \
    --name=jellyfin \
    --volume /path/to/config:/config \
    --volume /path/to/cache:/cache \
    --volume /path/to/media:/media \
    --net=host \
    --restart=unless-stopped \
   `for dev in dri dma_heap mali0 rga mpp_service \
      iep mpp-service vpu_service vpu-service \
      hevc_service hevc-service rkvdec rkvenc vepu h265e ; do \
     [ -e "/dev/$dev" ] && echo " --device /dev/$dev"; \
    done` \
    jellyfin/jellyfin
   ```

2. Check the OpenCL runtime status, make sure you have installed the GPU firmware of the libmali.

   :::note

   Only needed before using HDR tone-mapping on RK3588/3588S.

   :::

   ```shell
   # Check the OpenCL (GPU firmware) on host with clinfo
   sudo apt update && sudo apt install -y clinfo && clinfo

   # Check the OpenCL runtime of Docker image with jellyfin-ffmpeg
   sudo docker exec -it jellyfin /usr/lib/jellyfin-ffmpeg/ffmpeg -v debug -init_hw_device rkmpp=rk -init_hw_device opencl=ocl@rk
   ```

3. Enable RKMPP in Jellyfin and uncheck the unsupported codecs.

#### LXC (Linux Containers)

This setup might be useful for those, who use RK3588/3588S SoC as [Proxmox](https://www.proxmox.com/en/) host, where LXC is the official and the only supported way of doing lightweight virtualization with the help of system containers (LXC) vs application containers (docker). As of today Proxmox team does not support ARM platforms as hosts - and probably will never do - however successful deployments on ARM devices [are possible](https://github.com/jiangcuo/Proxmox-Port?tab=readme-ov-file).

LXC setup idea is a bit similar to docker - you need to pass the **device files** of VPU from host to LXC and enable the **privileged mode** (see also important "_note_" below about privileged LXC containers).

1. To find the list of device files to pass inside container, use the next one-liner in Linux host:

   ```shell
   for dev in dri dma_heap mali0 rga mpp_service iep mpp-service vpu_service vpu-service hevc_service hevc-service rkvdec rkvenc vepu h265e ; do [ -e "/dev/$dev" ] && echo "device /dev/$dev";  done
   ```

   ```shell
   device /dev/dri
   device /dev/dma_heap
   device /dev/mali0
   device /dev/rga
   device /dev/mpp_service
   ```

   Example of the minimum required extra (not full) container configuration to make VPU hardware acceleration working is presented below:

   ```shell
   lxc.mount.entry: /dev/dri dev/dri none bind,optional,create=dir
   lxc.mount.entry: /dev/dma_heap dev/dma_heap none bind,optional,create=dir
   lxc.mount.entry: /dev/mpp_service dev/mpp_service none bind,optional,create=file
   lxc.mount.entry: /dev/rga dev/rga none bind,optional,create=file
   lxc.mount.entry: /dev/mali0 dev/mali0 none bind,optional,create=file
   lxc.cgroup2.devices.allow: a
   ```

   Use [lxc.container.conf](https://linuxcontainers.org/lxc/manpages//man5/lxc.container.conf.5.html) man page for reference, what _lxc.mount.entry_ and _lxc.cgroup2.devices_ options are used for.
   If you want - and you have concerns about it - you can replace _lxc.cgroup2.devices.allow: a_ rule with more restricted "_allowlist device program_" (example could be found inside the same man page) enumerating each character VPU device, that container namespace should have access inside the host.

   :::warning

   Privileged LXC containers are considered unsafe by design - read more [on the LXC official documentation](https://linuxcontainers.org/lxc/security/). This guide however does not cover steps required to make jellyfin VPU hardware acceleration working in unprivileged container.

   :::

2. Install supported [jellyfin package](https://jellyfin.org/docs/general/installation/linux) into LXC container or optionally you can even use an official docker image inside LXC container.
3. Verify OpenCL runtime status as following - example is collected from LXC runtime of Ubuntu Jammy - steps are the same as docker deployments:
   - _libmali user-space drivers should be installed inside LXC container, otherwise opencl=ocl@rk device won't be initialized_

   ```shell
   dpkg -l | egrep "libmali|clinfo|jellyfin"
   ```

   ```shell
   ii  clinfo                          3.0.21.02.21-1                          arm64        Query OpenCL system information
   ii  jellyfin                        10.10.1+ubu2204                         all          Jellyfin is the Free Software Media System.
   ii  jellyfin-ffmpeg7                7.0.2-5-jammy                           arm64        Tools for transcoding, streaming and playing of multimedia files
   ii  jellyfin-server                 10.10.1+ubu2204                         arm64        Jellyfin is the Free Software Media System.
   ii  jellyfin-web                    10.10.1+ubu2204                         all          Jellyfin is the Free Software Media System.
   ii  libmali-valhall-g610-g13p0-gbm  1.9-1                                   arm64        Mali GPU User-Space Binary Drivers
   ```

   ```shell
   sudo /usr/lib/jellyfin-ffmpeg/ffmpeg -v debug -init_hw_device rkmpp=rk -init_hw_device opencl=ocl@rk
   ```

   ```shell
   < -- snip -- >
   arm_release_ver: g13p0-01eac0, rk_so_ver: 10
   [AVHWDeviceContext @ 0x55a5b30a00] 1 OpenCL platforms found.
   [AVHWDeviceContext @ 0x55a5b30a00] 1 OpenCL devices found on platform "ARM Platform".
   [AVHWDeviceContext @ 0x55a5b30a00] 0.0: ARM Platform / Mali-G610 r0p0
   [AVHWDeviceContext @ 0x55a5b30a00] cl_arm_import_memory found as platform extension.
   [AVHWDeviceContext @ 0x55a5b30a00] cl_khr_image2d_from_buffer found as platform extension.
   [AVHWDeviceContext @ 0x55a5b30a00] DRM to OpenCL mapping on ARM function found (clImportMemoryARM).
   Successfully parsed a group of options.
   < -- snip -- >
   ```

4. Enable RKMPP in Jellyfin GUI, check supported (and desired) codecs and uncheck the unsupported - see [Select SoC/VPU Hardware](#select-socvpu-hardware) section for more details.

### Verify On Linux

For the BSP kernel **older than 6.1.84**, there is no reliable way to read the load/utilization of the VPU on Rockchip SoC.

But you can still verify this by reading other engines, such as the RGA (2D hwaccel blitter).

:::note

Root permission is required.

:::

1. Play a video in the Jellyfin web client and trigger a video transcoding by setting a lower resolution or bitrate.

2. VPU load/utilization: run `sudo sh -c "echo 1000 > /proc/mpp_service/load_interval" && sudo watch -n 1 cat /proc/mpp_service/load`

   ```shell
   Every 1.0s: cat /proc/mpp_service/load
   fdb51000.avsd-plus        load:   0.00% utilization:   0.00%
   fdb50400.vdpu             load:   0.00% utilization:   0.00%
   fdb50000.vepu             load:   0.00% utilization:   0.00%
   fdb90000.jpegd            load:   0.00% utilization:   0.00%
   fdba0000.jpege-core       load:   0.00% utilization:   0.00%
   fdba4000.jpege-core       load:   0.00% utilization:   0.00%
   fdba8000.jpege-core       load:   0.00% utilization:   0.00%
   fdbac000.jpege-core       load:   0.00% utilization:   0.00%
   fdbb0000.iep              load:   0.00% utilization:   0.00%
   fdbd0000.rkvenc-core      load:  98.26% utilization:  97.25%
   fdbe0000.rkvenc-core      load:  10.78% utilization:  10.69%
   fdc38100.rkvdec-core      load:  17.41% utilization:  17.09%
   fdc48100.rkvdec-core      load:  17.64% utilization:  17.30%
   fdc70000.av1d             load:   0.00% utilization:   0.00%
   ```

3. RGA load: run `sudo watch -n 1 cat /sys/kernel/debug/rkrga/load`

   ```shell
   Every 1.0s: cat /sys/kernel/debug/rkrga/load
   num of scheduler = 3
   ================= load ==================
   scheduler[0]: rga3_core0
            load = 42%
   -----------------------------------
   scheduler[1]: rga3_core1
            load = 27%
   -----------------------------------
   scheduler[2]: rga2
            load = 0%
   -----------------------------------
            process 17: pid = 217002, name: /usr/lib/jellyfin-ffmpeg/ffmpeg ... -init_hw_device rkmpp=rk -hwaccel rkmpp -hwaccel_output_format drm_prime ...
   ```
