# Hardware Selection

The following is intended to help you choose appropriate hardware for a Jellyfin server and take full advantage of its features (e.g. hardware acceleration).

## Minimum System Requirements

This is a list of system requirements for the current release of Jellyfin. Systems that do not meet these requirements will not be able to run the latest release of Jellyfin.

- CPU (x86): SSE4.1 Support (Intel 45nm Core 2 Duo, AMD FX or above).
- CPU (ARM): 64-bit ARM CPU.
- OS: Windows 10 or above, macOS 11 or above, Linux. 64-bit OS is required.
- Storage: 2GB Free Space.

## Recommended System Requirements

Below is a list of recommended specs to run Jellyfin. A good Jellyfin experience can be had with minimal tweaking on platforms that meet these specs. Whilst Jellyfin can work on relatively low-end hardware, the following specs are recommended for a good experience.

- CPU: Intel Core i5-2300, AMD Ryzen 3 1200, Apple M1 or above.
- RAM: 8GB or above, 16GB or above for Windows 11.
- Graphics: Intel UHD7xx, Iris Xe, Arc or above; Nvidia GTX1660 or above; Apple M1 or above.
- Internet: Ethernet, Broadband Internet
- Storage 100GB Free Space, SSD.

## Low Power or Budget Servers

For users on a budget, with expensive electricity, or running battery-powered servers:

- Intel 12th gen or above N series platforms
- Apple M Series Mac mini
- Rockchip RK3588 / RK3588S SBC (**Advanced Users Only**)

These platforms are all relatively affordable, use very little power (\<5w at idle) while providing good performance, and are well-supported by Jellyfin with hardware acceleration.

## What not to buy

The following hardware is explicitly recommended against for a Jellyfin server, even though they might technically meet the minimum requirements.

- Intel "Atom" CPUs (Intel J/M/N/Y series low power CPUs) up to 11th gen
- Prebuilt NAS Appliances
  <details>
    Prebuilt NAS appliances often come with weird software environments and very low end hardware. This will lead to both difficulty in setting Jellyfin up and/or poor performance.
  </details>
- Most Single Board Computers (SBCs), especially Raspberry Pi 5.
  <details>
    Most SBCs perform poorly and/or lack hardware acceleration support, or does not have the hardware at all. For modern current-gen high-end SBCs, this is especially the case for the Raspberry Pi 5 (no hardware encoders), Allwinner and Amlogic boards (no driver support).
    If you really want to run Jellyfin on an SBC, you may wish to consider models based on the following platforms: Rockchip RK3588 / RK3588S, Intel Core, Intel 12th gen N series.
  </details>
- AMD Graphics: AMD Graphics have poor driver support on Windows and poor encoder quality.
  <details>
    You may consider RX 7000 series or newer AMD graphics if you are primarily using a Linux desktop and wish to host Jellyfin on the same system.
  </details>
- Low-end GPUs: Certain low-end GPUs (e.g. GT1030, RX6400) are not capable of hardware encoding. These models cannot be used for hardware acceleration for a Jellyfin Server.
