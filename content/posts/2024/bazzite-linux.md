---
title: "Bazzite Linux"

date: 2024-04-17
url: /bazzite-linux/
image: images/2024-thumbs/bazzite-linux.jpg
categories:
  - Linux
tags:
  - Bazzite
draft: false
---
Bazzite is an OCI image designed as an alternative OS for the Steam Deck and a SteamOS-like system for desktops and home theater PCs. It's built on Fedora, offering broad hardware support and built-in drivers.

## Official Bazzite Sites

- Github: <https://github.com/ublue-os/bazzite>
- Website: <https://bazzite.gg/>
- Download: <https://bazzite.gg/#image-picker>

## Key Features

- **Hardware Support & Drivers**: Built from `ublue-os/main` and `ublue-os/nvidia`, ensuring wide hardware compatibility.
- **Enhanced Gaming Experience**: Includes fsync kernel for HDR support, NVK for non-Nvidia builds, and full hardware-accelerated codec support.
- **Comprehensive Driver Support**: Features drivers for AMD GPUs, Xbox controllers, DisplayLink, and more.
- **Gaming Optimizations**: Comes with LatencyFleX, vkBasalt, MangoHud, OBS VkCapture, and automated duperemove service.
- **Customization & Tools**: Offers Valve's KDE themes, optional GTK3/4 themes, System76-Scheduler, and Google's BBR TCP congestion control.
- **Handheld & Desktop Variants**: Tailored versions for desktops (`bazzite`), Steam Deck, and HTPCs (`bazzite-deck`), each with specific optimizations.

## Installation & Usage

- **ISO Downloads**: Available on the releases page with a detailed install guide.
- **Rebasing**: Instructions provided for rebasing from Fedora Atomic to Bazzite using `rpm-ostree`.
- **Secure Boot**: Follow the secure boot documentation if enabled.

## Specialized Features

- **Steam Deck & HTPCs**: Direct boot to Game mode, expanded input support, and custom update system.
- **GNOME Builds**: Include variable refresh rate support, GSConnect, and optional extensions for an enhanced user experience.
- **Upstream Features**: Incorporates features from Universal Blue and Fedora Linux, like pre-installed Nvidia drivers, Flathub, and SELinux.

## Why Choose Bazzite?

Bazzite addresses common issues with SteamOS, such as outdated packages and lack of a functional package manager. It offers a stable base with the latest Linux kernel, SELinux, secure boot, and disk encryption support, making it suitable for both gaming and general computing.

## My Experiences on a Mini PC

Hardware Used

- BeeLink 7840HS Mini PC Specifications:
  - CPU: AMD Ryzen 7 7840HS with Radeon Graphics
  - GPU: Integrated AMD Radeon RX Vega 8 (RDNA 3)
  - Cores: 8 Cores, 16 Threads
  - Base Clock: 3.3 GHz
  - Boost Clock: Up to 4.2 GHz
  - Cache: 12MB Total Cache
  - RAM: 32GB DDR4
  - Storage: 1TB NVMe SSD
  - Connectivity: Dual Band WiFi, Gigabit Ethernet, Bluetooth 4.0
  - Ports: 4x USB 3.0, HDMI, Thunderbolt 3, SD Card Reader

Pros

- Installation was smooth and seemless
- Quick Steam setup and no configuration needed
- Launched Helldivers 2 without any change in stock configuration
- `ujust` package manager is easy for installs and expansion
- EmuDeck, Decky, and other options built in via `ujust` launcher
- HDR Support works better than anything I've tried!

Cons

- I ran into the multiple power management issues. (Lock ups and will not properly shutdown)
- Dolphin Wii Emulation is dicey via Emudeck

## Livestream First Install

{{< youtube MOcekLz18QU >}} 

## Walkthrough Video

{{< youtube "wdC_qiFoHN4" >}}
