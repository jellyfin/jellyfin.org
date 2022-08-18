---
uid: admin-hardware-acceleration
title: Hardware Acceleration
---

# Hardware Acceleration

Jellyfin supports [hardware acceleration (HWA) of video encoding/decoding using FFMpeg](https://trac.ffmpeg.org/wiki/HWAccelIntro).
FFMpeg and Jellyfin can support multiple hardware acceleration implementations such as Intel Quicksync (QSV), AMD AMF and NVIDIA NVENC/NVDEC through Video Acceleration APIs.

* [VA-API](https://en.wikipedia.org/wiki/Video_Acceleration_API) is a Video Acceleration API that uses [libva](https://github.com/intel/libva/blob/master/README.md) to interface with local drivers to provide HWA.
* [QSV](https://trac.ffmpeg.org/wiki/Hardware/QuickSync) uses a modified (forked) version of VA-API and interfaces it with [libmfx](https://github.com/intel/media-driver/blob/master/README.md) and their proprietary drivers [(list of supported processors for QSV)](https://ark.intel.com/content/www/us/en/ark.html#@Processors).

OS      | Recommended HW Acceleration
------- | -------------
Linux   | QSV, NVENC, AMF, VA-API
Windows | QSV, NVENC, AMF
MacOS   | VideoToolbox
RPi     | V4L2

[Graphics Cards comparison using HWA](https://www.elpamsoft.com/?p=Plex-Hardware-Transcoding)

Based on hardware vendor:

Vendor  | Supported HW Acceleration
------- | -------------
NVIDIA  | NVENC
AMD     | AMF, VA-API
Intel   | QSV, VA-API
Apple   | VideoToolbox
RPi     | V4L2

## Enabling Hardware Acceleration

Hardware acceleration options can be found in the Admin Dashboard under the **Transcoding** section of the **Playback** tab.
Select a valid hardware acceleration option from the drop-down menu, indicate a device if applicable, and check `Enable hardware encoding` to enable encoding as well as decoding, if your hardware supports this.

The hardware acceleration is available immediately for media playback. No server restart is required.

On Linux you can check available GPU using:

```sh
lspci -nn | egrep -i "3d|display|vga"
```

or using `lshw`:

```sh
lshw -C display
```

## H.264 / AVC 10-bit videos

The hardware decoding of H.264 10-bit aka High10 profile video is not supported by any Intel, AMD or NVIDIA GPU.

Please consider upgrading these videos to HEVC 10-bit aka Main10 profile if you want to offload your CPU usage during transcoding.

## Intel Gen9 and Gen11+ iGPUs

> [!NOTE]
> The Intel [Guc/Huc firmware](https://01.org/linuxgraphics/downloads/firmware) must be enabled for optional Low-Power encoding (pre-Gen11 only supports Low-Power H.264).

Instructions:

* ArchLinux: [Arch Wiki](https://wiki.archlinux.org/title/intel_graphics#Enable_GuC_/_HuC_firmware_loading)
* Debian/Ubuntu: [Brainiarc7's gist](https://gist.github.com/Brainiarc7/aa43570f512906e882ad6cdd835efe57)

> [!WARNING]
> For **Jasper Lake** and **Elkhart Lake** chips (such as `N5095`, `N6005` and `J6412`), Low-Power encoding **must** be enabled.
> There's a known kernel issue on these chips in **linux 5.15** that comes with Ubuntu 22.04 LTS preventing you from using Low-Power. You may need to upgrade kernel for this.
> The linux-firmware support is **not included** in Ubuntu 20.04.3 LTS.
> Any Ubuntu from 21.10 **does include** the required drivers.

## Supported Acceleration Methods

> [!Important]
> In Jellyfin 10.8 full hardware-accelerated filtering (scaling, deinterlacing, tone-mapping and subtitle burn-in) on Intel, AMD and NVIDIA hardware are available.
>
> **jellyfin-ffmpeg version 4.4.1-2 or higher is required**, using an older or original version of FFmpeg may disable some hardware filtering improvements.

### VA-API

> [!NOTE]
> Intel iGPU and AMD GPU only.

A List of supported codecs for VA-API can be found [on the Archlinux wiki](<https://wiki.archlinux.org/index.php/Hardware_video_acceleration#Comparison_tables>).

> [!WARNING]
> As of **Jellyfin 10.8** the official Docker image uses Debian 11 which has a compatible version of Mesa for **AMD GPU HEVC** decoding.
>
> Earlier images do not provide a compatible version of Mesa.

### Hardware acceleration on Raspberry Pi 3 and 4

> [!WARNING]
> As of **Jellyfin 10.8** hardware acceleration on Raspberry Pi via `OpenMAX OMX` was dropped and is no longer available.
>
> This decision was made because Raspberry Pi is currently migrating to a `V4L2` based hardware acceleration, which is already available in Jellyfin but does not support all features other hardware acceleration methods provide due to lacking support in FFmpeg.
> Jellyfin will fallback to software de- and encoding for those usecases.
>
> The current state of hardware acceleration support in FFmpeg can be checked on the [rpi-ffmpeg repository](https://github.com/jc-kynesim/rpi-ffmpeg).

### NVIDIA NVENC

> [!NOTE]
> **Minimum required driver version since Jellyfin 10.8:**
>
> * **Linux:** 470.57.02
> * **Windows:** 471.41

Not every card has been tested.

If you want more than three parallel transcoding streams on a consumer (non-Quadro) NVIDIA card, you can use [this patch](https://github.com/keylase/nvidia-patch) to remove the limit.
The patch is recommended for Linux and Windows but may break in the future, so check the compatible driver versions before applying it.

On Linux use `nvidia-smi` to check driver and GPU card version.

**Useful links:**

* [Official list of supported codecs for recent NVIDIA Graphics Cards](https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new).
* [Official NVIDIA ffmpeg development docs](https://developer.nvidia.com/ffmpeg).

### AMD AMF

> [!NOTE]
> AMF is available on Windows and Linux.

> [!WARNING]
> As of **Jellyfin 10.8** full OpenCL based hardware filtering in AMF is supported on Windows 10 and newer.
>
> AMD has not implemented the Vulkan based HW decoder and scaler in ffmpeg, the decoding speed may not be as expected on Linux.
>
> The closed source driver `amdgpu-pro` is required when using AMF on Linux.

> [!TIP]
> Most Zen CPUs **do not** come with integrated graphics. You will need a **dedicated GPU** (dGPU) or a Zen CPU with integrated graphics for hardware acceleration.
> If your Zen CPU is suffixed with a *G* or *GE* in model name, you have integrated graphics.

### Intel QuickSync

> [!NOTE]
> Intel QuickSync (QSV) is derived from VA-API on Linux and D3D11VA on Windows, which can utilize Intel's fixed function hardware and EU(execution units) to do video encoding, decoding and processing.

> [!IMPORTANT]
> To use QSV on Linux with recent Intel iGPUs the **nonfree [Intel media driver](https://github.com/intel/media-driver)** is required for full hardware acceleration.
> If you are using `jellyfin-ffmpeg` version 4.4.1-2 or higher it is included and you do not need to install it seperatly.
> Broadwell or newer generation is required for QSV on Linux, otherwise you have to use VA-API.

**Useful links:**

* [Official list of supported codecs for recent Intel Graphics Cards](https://www.intel.com/content/www/us/en/develop/documentation/media-capabilities-of-intel-hardware/top.html).
* [Intel QSV Benchmarks on Linux](https://www.intel.com/content/www/us/en/architecture-and-technology/quick-sync-video/quick-sync-video-installation.html)
* [Collection of useful links and information](https://github.com/Artiume/jellyfin-docs/blob/master/general/wiki/main.md)

----

> [!TIP]
> If your Jellyfin server does not support hardware acceleration, but you have another machine that does, you can leverage [rffmpeg](https://github.com/joshuaboniface/rffmpeg) to delegate the transcoding to another machine.
> Currently Linux-only and requires SSH between the machines, as well as shared storage both for media and for the Jellyfin data directory.

## Common setups

Each hardware acceleration type, as well as each Jellyfin installation type, has different prerequisites for enabling hardware acceleration.
It is always best to consult [the FFMpeg documentation](https://trac.ffmpeg.org/wiki/HWAccelIntro) on the acceleration type you choose for the latest information.

### Hardware acceleration on Docker (Linux)

> [!NOTE]
> This are general instructions, for more specific instructions pleas check the next sections!

In order to use hardware acceleration in Docker, the devices must be passed to the container.
To see what video devices are available, you can run `sudo lshw -c video` or `vainfo` on your machine.
VA-API may require the `render` group added to the docker permissions.
The `render` group id can be discovered in `/etc/group` such as `render:x:122:`.

You can use `docker run` to start the server with the required permissions and devices.
An example command is shown below.

```sh
docker run -d \
 --volume /path/to/config:/config \
 --volume /path/to/cache:/cache \
 --volume /path/to/media:/media \
 --user 1000:1000 \
 --group-add=122 \ # Change this to match your system
 --net=host \
 --restart=unless-stopped \
 --device /dev/dri/renderD128:/dev/dri/renderD128 \
 --device /dev/dri/card0:/dev/dri/card0 \
 jellyfin/jellyfin
```

Alternatively, you can use docker-compose with a configuration file so you don't need to run a long command every time you restart your server.

```yaml
version: "3"
services:
  jellyfin:
    image: jellyfin/jellyfin
    user: 1000:1000
    group_add:
      - 122
    network_mode: "host"
    volumes:
      - /path/to/config:/config
      - /path/to/cache:/cache
      - /path/to/media:/media
    devices:
      # VAAPI Devices (examples)
      - /dev/dri/renderD128:/dev/dri/renderD128
      - /dev/dri/card0:/dev/dri/card0
```

### NVIDIA hardware acceleration on Docker (Linux)

In order to achieve hardware acceleration using Docker, several steps are required.

Prerequisites:

* GNU/Linux x86_64 with kernel version > 3.10
* Docker >= 19.03
* NVIDIA GPU with Architecture > Fermi (2.1)
* NVIDIA drivers >= 361.93
* [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#getting-started) needs to be installed

Follow the instructions in the link above to install the NVIDIA Container Toolkit for your Linux distribution.

Start your container by adding this parameter:

```sh
--gpus all \
```

A complete run command would look like this:

```sh
docker run -d \
 --name=jellyfin \
 --gpus all \
 -p 8096:8096 \
 -p 8920:8920 \
 -v /config:/config \
 -v /media:/media \
 -v /cache:/cache \
 --restart unless-stopped \
 jellyfin/jellyfin
```

Or with docker-compose >1.28, add the `deploy` section to your Jellyfin service:

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin
    # ... your Jellyfin config
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
```

There are some special steps when running with the following option:

```sh
--user 1000:1000
```

You may need to add this user to the video group on your host machine:

```sh
usermod -aG video <user>
```

Once the container is started you can again validate access to the host resources:

```sh
docker exec -it jellyfin nvidia-smi
```

If you get driver information, everything is fine but if you get an error like `couldn't find libnvidia-ml.so library in your system` you need to run the following command:

```sh
docker exec -it jellyfin ldconfig
```

After that, you should ensure the NVIDIA driver loads correctly.

> [!NOTE]
> The official Jellyfin Docker image already sets the required environment variables to allow access to the GPUs via the NVIDIA container runtime.
> If you are building your own image don't forget to include `NVIDIA_DRIVER_CAPABILITIES=all` and  `NVIDIA_VISIBLE_DEVICES=all` into your container's environment.

### VA-API hardware acceleration on Debian/Ubuntu

Configuring VA-API on Debian/Ubuntu requires some additional configuration to ensure permissions are correct.

1. Configure VA-API for your system by following the documentation of your OS and/or vendor.
   Verify that a `render` device is now present in `/dev/dri`, and note the permissions and group available to write to it, in this case `render`:

    ```sh
    $ ls -l /dev/dri
    total 0
    drwxr-xr-x 2 root root        100 Apr 13 16:37 by-path
    crw-rw---- 1 root video  226,   0 Apr 13 16:37 card0
    crw-rw---- 1 root video  226,   1 Apr 13 16:37 card1
    crw-rw---- 1 root render 226, 128 Apr 13 16:37 renderD128
    ```

    > [!NOTE]
    > On some releases, the group may be `video` or `input` instead of `render`.

2. Make sure that `jellyfin-ffmpeg` version 4.4.1-2 or higher is installed.

3. Check the output of `/usr/lib/jellyfin-ffmpeg/vainfo`.

4. Add the Jellyfin service user to the above group to allow Jellyfin's FFMpeg process access to the device, and restart Jellyfin.

    ```sh
    sudo usermod -aG render jellyfin
    sudo systemctl restart jellyfin
    ```

5. Configure VA-API acceleration in the `Transcoding` page of the Admin Dashboard.
   Enter the `/dev/dri/renderD128` device above as the `VA API Device` value.

6. Watch a movie, and verify that transcoding is occurring by watching the `ffmpeg-transcode-*.txt` logs under `/var/log/jellyfin` and using `radeontop` (AMD only) or similar tools.

### Intel QuickSync (QSV) hardware acceleration on Debian/Ubuntu

1. QSV is based on VA-API device on Linux, so please confirm whether you have completed the VA-API configuration first.

2. Make sure that `jellyfin-ffmpeg` version 4.4.1-2 or higher is installed (it ships the current version of `intel-media-driver (iHD)` which is required for QSV).

3. Verify that the iHD driver is properly loaded and recognizes your iGPU.

    ```sh
    sudo /usr/lib/jellyfin-ffmpeg/vainfo | grep iHD
    ```

4. Configure QSV acceleration in the `Transcoding` page of the Admin Dashboard.

5. Watch a movie, and verify that transcoding is occurring by watching the `ffmpeg-transcode-*.txt` logs under `/var/log/jellyfin` and using `intel_gpu_top` (can be installed with the `intel-gpu-tools` package).

### VA-API and QSV hardware acceleration on LXC or LXD container

> [!WARNING]
> This has been tested with LXC 3.0 and may or may not work with older versions.

Follow the steps above to add the jellyfin user to the `video` or `render` group, depending on your circumstances.

1. Install the required drivers on the host OS

2. Add your GPU to the container.

   ```sh
   lxc config device add <container name> gpu gpu gid=<gid of your video or render group>
   ```

3. Make sure you have the required devices within the container:

   ```sh
   $ lxc exec jellyfin -- ls -l /dev/dri
   total 0
   crw-rw---- 1 root video 226,   0 Jun  4 02:13 card0
   crw-rw---- 1 root video 226,   0 Jun  4 02:13 controlD64
   crw-rw---- 1 root video 226, 128 Jun  4 02:13 renderD128
   ```

4. Configure Jellyfin to use video acceleration and point it at the right device if the default option is wrong.

5. Try and play a video that requires transcoding and run the following, you should get a hit.

   ```sh
   ps aux | grep ffmpeg | grep accel
   ```

6. You can also try playing a video that requires transcoding, and if it plays you're good.

Useful resources:

* [LXD Documentation - GPU instance configuration](https://github.com/lxc/lxd/blob/master/doc/instances.md#type-gpu)
* [NVIDIA CUDA inside a LXD container](https://stgraber.org/2017/03/21/cuda-in-lxd/)

### VA-API and QSV hardware acceleration on LXC on Proxmox

> [!IMPORTANT]
> Jellyfin needs to run in a **privileged** LXC container.
> You can convert an existing unprivileged container to a privileged container by taking a backup and restoring it as priviledged.

1. Install the required drivers on the Proxmox host

2. Add your GPU to the container by editing `/etc/pve/lxc/<container-id>.conf` (you may need to change the GIDs in the examples below to match those used on you host).

   > [!WARNING]
   > This has been tested on `Proxmox VE 7.1` - on previous versions you may need to change `cgroup2` to `cgroup`.

   Intel iGPU:

   ```conf
   lxc.cgroup2.devices.allow: c 226:0 rwm
   lxc.cgroup2.devices.allow: c 226:128 rwm
   lxc.mount.entry: /dev/dri/card0 dev/dri/card0 none bind,optional,create=file
   lxc.mount.entry: /dev/dri/renderD128 dev/dri/renderD128 none bind,optional,create=file
   ```

   NVidia GPU:

   ```conf
   lxc.cgroup2.devices.allow: c 195:* rwm
   lxc.cgroup2.devices.allow: c 243:* rwm
   lxc.mount.entry: /dev/nvidia0 dev/nvidia0 none bind,optional,create=file
   lxc.mount.entry: /dev/nvidiactl dev/nvidiactl none bind,optional,create=file
   lxc.mount.entry: /dev/nvidia-uvm dev/nvidia-uvm none bind,optional,create=file
   lxc.mount.entry: /dev/nvidia-modeset dev/nvidia-modeset none bind,optional,create=file
   lxc.mount.entry: /dev/nvidia-uvm-tools dev/nvidia-uvm-tools none bind,optional,create=file
   ```

3. Shutdown and start your container.

4. Install the required drivers in your container.

5. Add the jellyfin user to the `video`, `render` and/or `input` groups depending on who owns the device inside the container.

6. Configure Jellyfin to use hardware acceleration and point it at the right device if the default option is wrong.

7. Try and play a video that requires transcoding and run the following, you should get a hit.

   ```sh
   ps aux | grep ffmpeg | grep accel
   ```

8. You can also try playing a video that requires transcoding, and if it plays you're good.

### AMD AMF encoding on Ubuntu 18.04 or 20.04 LTS

1. Install the `amdgpu-pro` closed source graphics driver by following the [installation instructions](https://amdgpu-install.readthedocs.io/en/latest/).

2. Then install `amf-amdgpu-pro`.

   ```bash
   sudo apt install amf-amdgpu-pro
   ```

3. Check if `jellyfin-ffmpeg` contains `h264_amf` encoder:

   ```bash
   $ cd /usr/lib/jellyfin-ffmpeg/
   $ ./ffmpeg -encoders | grep h264_amf
   V..... h264_amf             AMD AMF H.264 Encoder (codec h264)
   ```

   > [!NOTE]
   > If not available, update your `jellyfin-ffmpeg` to the latest version and try again.

4. Choose AMD AMF video acceleration in Jellyfin and check the `Enable hardware encoding` option.

5. Watch a movie, then verify that `h264_amf` encoder is working by watching the `ffmpeg-transcode-*.txt` transcoding logs under `/var/log/jellyfin` and using `radeontop` or similar tools.

### AMD AMF encoding on Arch Linux

AMD does not provide official `amdgpu-pro` driver support for Arch Linux, but fortunately, a third-party packaged `amdgpu-pro-installer` is provided in the archlinux user repository.

1. Clone [this repository](https://aur.archlinux.org/pkgbase/amdgpu-pro-installer/) using `git`.

   ```bash
   git clone https://aur.archlinux.org/amdgpu-pro-installer.git
   ```

2. Enter that folder and make the installation package and install it.

   ```bash
   cd amdgpu-pro-installer
   makepkg -si
   ```

3. Go to step 3 of [Configuring AMD AMF encoding on Ubuntu 18.04 or 20.04 LTS](#amd-amf-encoding-on-ubuntu-1804-or-2004-lts) above.

### OpenCL / CUDA / Intel VPP Tone-Mapping

Hardware based HDR10/HLG/DoVi tone-mapping with NVIDIA NVENC, AMD AMF, Intel QSV and VA-API is done through OpenCL or CUDA. DoVi Profile 5 and 8 tone-mapping requires `jellyfin-ffmpeg` version 5.0.1-5 or higher.

Intel hardware based VPP HDR10 tone-mapping is supported on Intel QSV and VA-API on Linux.
VPP is prefered when both two tone-mapping options are checked on Intel.

OS/Platform | NVIDIA NVENC | AMD AMF  | Intel QSV   | Intel VA-API | AMD VA-API | Software
----------- | ------------ | -------- | ----------- | ------------ | ---------- | --------
Linux       | ✔️           | ✔️      | ✔️          | ✔️          | ✔️         | WIP
Windows     | ✔️           | ✔️      | ✔️          | N/A          | N/A        | WIP
Docker      | ✔️           | ✔️      | ✔️         | ✔️           | ✔️         | WIP

> [!NOTE]
> Tone-mapping on Windows with Intel QSV and AMD AMF requires Windows 10 or newer.

> [!IMPORTANT]
> Make sure the hardware acceleration is well configured before configuring tone-mapping with this instructions.

1. **On Windows:** Install the latest NVIDIA, AMD or Intel drivers.

2. **On Linux or Docker:**
   * For **NVIDIA cards** no further configuration is necessary.
   * For **AMD cards**, install `amdgpu-pro` with opencl arguments (see [Configuring AMD AMF encoding on Ubuntu 18.04 or 20.04 LTS](#amd-amf-encoding-on-ubuntu-1804-or-2004-lts) for more details):

    ```sh
    sudo ./amdgpu-pro-install -y --opencl=pal,legacy
    sudo usermod -aG video $LOGNAME
    sudo usermod -aG render $LOGNAME
    ```

   * For **Intel iGPUs**, you have two types of tone-mapping methods: OpenCL and VPP. The latter one does not support fine tuning options.

    **OpenCL:** Follow the instructions from [intel-compute-runtime](https://github.com/intel/compute-runtime/releases).
    If you are using the official Docker image or the one from linuxserver this step can be skipped.

    **VPP:** Make sure `jellyfin-ffmpeg` 4.4.1-2 or higher is installed.
    Previous versions did not ship `intel-media-driver` thus it was required to be installed manually.

    * When running on docker, the **privileged** flag is required for the OpenCL device to be recognized.
      You can do this by adding `--privileged` to your docker command or `privileged: true` to your docker compose file.

   > [!WARNING]
   > Tone-mapping on Intel VA-API and QSV **requires an iGPU that supports 10-bit decoding**, such as i3-7100 or J4105.

   > [!IMPORTANT]
   > Do **not use** the `intel-opencl-icd` package from your distro's repository since they were not built with `RELEASE_WITH_REGKEYS` enabled, which is required for P010 pixel interop flags.

3. **Debugging:** Check the OpenCL device status. You will see corresponding vendor name if it goes well.

   * Use `clinfo`: Install `clinfo` before using it. `sudo apt install -y clinfo` on Debian/Ubuntu or `sudo pacman -Sy clinfo` on Arch. Then `sudo clinfo`.

   * Use `jellyfin-ffmpeg`: `/usr/lib/jellyfin-ffmpeg/ffmpeg -v debug -init_hw_device opencl`

## Verifying Transcodes

To verify that you are using the proper libraries, run this command against your transcoding log.
This can be found at `Admin Dashboard > Logs`, and `/var/log/jellyfin` if installed via the apt repository.

```sh
grep -A2 'Stream mapping:' /var/log/jellyfin/ffmpeg-transcode-<random-id>>.log
```

This returned the following results.

```data
...
Stream mapping:
Stream #0:0 -> #0:0 (hevc (native) -> h264 (h264_qsv))
Stream #0:1 -> #0:1 (aac (native) -> mp3 (libmp3lame))
...
```

`Stream #0:0` used software (VAAPI Decode can also say native) to decode HEVC and used HWA to encode.

```data
...
Stream mapping:
Stream #0:0 -> #0:0 (h264 (hevc_qsv) -> h264 (h264_qsv))
Stream #0:1 -> #0:1 (flac (native) -> mp3 (libmp3lame))
...
```

`Stream #0:0` used HWA for both. `hevc_qsv` to decode and `h264_qsv` to encode.
