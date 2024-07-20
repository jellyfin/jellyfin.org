---
uid: admin-hardware-acceleration-issues
title: Known Issues
---
# Known Hardware Acceleration Issues and Limitations

This page lists all known issues and limitations of hardware acceleration with Jellyfin.

## AMD

### Windows

1. AMD Radeon RX 5000 and newer RDNA series integrated and discrete GPUs have an Windows graphics driver issue ranging from **Adrenalin 24.1.1 to 24.4.1**. You may experience **playback failure** and observe an **error code of `-60`** in the FFmpeg log when transcoding and playing videos. The driver **Adrenalin 24.5.1** and newer drivers fix this issue.

### Linux

1. Some Linux distros intentionally disabled the H.264 and HEVC codecs from the Mesa VA-API driver.

    Known affected distros:

    - [Fedora](https://www.phoronix.com/news/Fedora-Disable-Bad-VA-API)

    - [OpenSUSE](https://www.webpronews.com/fedora-and-opensuse-disable-gpu-accelerated-video-over-patent-concerns/)

    - [Manjaro](https://forum.manjaro.org/t/stable-update-2022-12-06-kernels-mesa-plasma-cinnamon-nvidia-libreoffice-pipewire-virtualbox/128453)

    This prevents you from using the AMD VA-API transcoding **on the server system**.

    You can use our Docker image instead or install third-party Mesa driver package.

    Alternatively, rebuild the Mesa driver with these options added to restore the stripped hardware codecs:

    ```shell
    -D video-codecs=all
    ```
