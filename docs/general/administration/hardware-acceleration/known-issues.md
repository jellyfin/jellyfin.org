---
uid: admin-hardware-acceleration-issues
title: Known Issues
---

# Known Hardware Acceleration Issues and Limitations

This page lists all known issues and limitations of hardware acceleration with Jellyfin.

## AMD on Windows

1. AMD Radeon RX 5000 and newer RDNA series integrated and discrete GPUs have a Windows graphics driver issue ranging from **Adrenalin 24.1.1 to 24.4.1**. You may experience **playback failure** and observe an **error code of `-60`** in the FFmpeg log when transcoding and playing videos. The driver **Adrenalin 24.5.1** and newer drivers fix this issue.

## AMD on Linux

1. Some Linux distros intentionally disabled the H.264 and HEVC codecs from the Mesa VA-API driver.

   Known affected distros:

   - [Fedora](https://www.phoronix.com/news/Fedora-Disable-Bad-VA-API)

   - [OpenSUSE](https://www.webpronews.com/fedora-and-opensuse-disable-gpu-accelerated-video-over-patent-concerns/)

   - [Manjaro](https://forum.manjaro.org/t/stable-update-2022-12-06-kernels-mesa-plasma-cinnamon-nvidia-libreoffice-pipewire-virtualbox/128453)

   This prevents you from using the AMD VA-API transcoding **on the server system**.

   You can use our Docker image instead or install a third-party Mesa driver package.

   Alternatively, rebuild the Mesa driver with these options added to restore the stripped hardware codecs:

   ```shell
   -D video-codecs=all
   ```

## Intel on Windows

1. Intel 11th Gen and newer UHD, Xe and ARC series integrated and discrete GPUs have a Windows graphics driver issue ranging from **31.0.101.5186 / 31.0.101.5234 to 31.0.101.5534**. You may encounter a **green or blue screen but normal sound** when transcoding and playing HDR videos that **require tone-mapping**. The **31.0.101.5590** and newer drivers fix this issue.

## Intel on Linux

1. Intel Gen 11 [**Jasper Lake**](https://ark.intel.com/content/www/us/en/ark/products/codename/128823/products-formerly-jasper-lake.html) and [**Elkhart Lake**](https://ark.intel.com/content/www/us/en/ark/products/codename/128825/products-formerly-elkhart-lake.html) platforms (e.g. N5095, N5105, N6005, J6412) have quirks when using video encoders on Linux. The [Low-Power Encoding](/docs/general/administration/hardware-acceleration/intel#low-power-encoding) mode MUST be configured and enabled for correct VBR and CBR bitrate control that is required by Jellyfin.

   - Ticket: [https://gitlab.freedesktop.org/drm/intel/-/issues/8080](https://gitlab.freedesktop.org/drm/intel/-/issues/8080)

2. The default kernel 5.15 that comes with Ubuntu 22.04 LTS has a regression on Intel Gen 11 graphics (ICL, JSL and EHL) that prevents you from using the Low-Power encoding mode. Linux 5.16+ is not affected.

   - Ticket: [https://gitlab.freedesktop.org/drm/intel/-/issues/4067](https://gitlab.freedesktop.org/drm/intel/-/issues/4067)

   - Fixed by: [drm/i915/gen11: Moving WAs to icl_gt_workarounds_init()](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=52255ef662a5d490678fbad64a735f88fcba564d)

   - You can fix this by switching to the [Hardware Enablement Stack](https://wiki.ubuntu.com/Kernel/LTSEnablementStack) and rebooting your system

   ```shell
   sudo apt install --install-recommends linux-generic-hwe-22.04
   ```

   This will move you off a 5.15 kernel which could have other implications. If it breaks something you can return to the normal kernel by installing the linux-generic package.

3. The kernel range from 5.18 to 6.1.3 have an issue that locks up and resets the i915 kernel driver when using OpenCL based HDR/DV tone-mapping. Linux 5.18-, 6.0.18+, 6.1.4+ are not affected.

   - Ticket: [https://gitlab.freedesktop.org/drm/intel/-/issues/7627](https://gitlab.freedesktop.org/drm/intel/-/issues/7627)

   - Fixed by: [drm/i915: improve the catch-all evict to handle lock contention](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=3f882f2d4f689627c1566c2c92087bc3ff734953)

4. The current Debian 11 and Ubuntu 22.04 LTS may not have the required GPU firmware for Intel 12th Gen processors and ARC GPU. Ubuntu 22.04 LTS can be switched to use Ubuntu's Hardware Enablement Stack (see #2 above) which uses a newer kernel that supports Intel 12th Gen+ and ARC GPUs.

5. The kernel support for Intel Gen 12 TGL graphics is incomplete before Linux 5.9.

6. The kernel support for Intel Gen 12 DG1 is incomplete in upstream. Intel DKMS and custom iHD driver are required.

7. The kernel support for Intel Gen 12 ADL graphics is incomplete before Linux 5.17.

8. The kernel support for Intel Gen 12.5 DG2 / ARC A-series is incomplete before Linux 6.2.

9. The kernel support for Intel Gen 12.7 MTL is incomplete before Linux 6.7.

10. The LTS kernel range 6.6.26 - 6.6.32 and the stable kernel range 6.8.5 - 6.9.3 have i915 driver bugs, which may cause problems on Intel Gen 12.5 DG2 / ARC A-series GPUs. If you are affected, please upgrade to kernel 6.6.33+ (LTS) or 6.9.4+. Ubuntu 24.04 with kernel versions 6.8.0-38 thru 6.8.0-41 are also affected by this issue.  Upgrade to Ubuntu kernel 6.8.0-44+ if you are on the affected kernels.

    - Issue: [https://github.com/jellyfin/jellyfin/issues/11380](https://github.com/jellyfin/jellyfin/issues/11380)
    - Ubuntu bug: [https://bugs.launchpad.net/ubuntu/+source/linux/+bug/2072755](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/2072755)

## Nvidia

Consumer targeted [Geforce and some entry-level Quadro](https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new) cards have an artificial limit on the number of concurrent NVENC encoding sessions. This restriction can be circumvented by applying an [unofficial patch](https://github.com/keylase/nvidia-patch) to the NVIDIA Linux and Windows driver.

| NVIDIA driver | NVENC concurrent sessions |
| ------------- | ------------------------- |
| 550 and newer | Up to 8 encoding sessions |
| 530 to 546    | Up to 5 encoding sessions |
| pre-530       | Up to 3 encoding sessions |
