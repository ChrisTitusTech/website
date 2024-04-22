---
title: "RisingOS 2.0 - Android Custom ROM"

date: 2024-04-27
url: /risingoss/
image: images/2024-thumbs/risingoss.jpg
categories:
  - Android
tags:
  - LineageOS
draft: true
---
RisingOS 2.0 introduces a plethora of enhancements and features, setting it apart from standard Android experiences.<!--more-->

## Installation

Installation files are hosted on Sourceforge @ <https://sourceforge.net/projects/risingos-for-bluejay/files/>

*Note: This is for Pixel6a devices only.*

### OTA Install

Source: <https://sourceforge.net/projects/risingos-for-bluejay/files/Android_14/OTA/>

XDA Developers: <https://xdaforums.com/t/rom-a14-official-risingos-2-0-gapps-bluejay-02-17-2024.4581557/>

- Download the ROM (ZIP File), BOOT, DTBO, and VENDOR_BOOT from Sourceforge.
- Install ADB and Fastboot from `adb` package using `choco install adb` in Windows or local package manager in Linux. 
- Reboot to bootloader
  - *Note: if getting "Waiting for Device...", install google USB Drivers from <https://dl.google.com/android/repository/usb_driver_r13-windows.zip> for Windows.*
- **Flashing Commands:** Prepare your device for flashing by entering the following commands:
  - `fastboot flash boot boot.img`
  - `fastboot flash dtbo dtbo.img`
  - `fastboot flash vendor_boot vendor_boot.img`
  - `fastboot reboot recovery`
- **Factory Reset:** Once in recovery mode, navigate to `Factory reset -> Format data/factory reset` and confirm to format the device.
- **Apply Update:** After formatting, return to the main menu and select `Apply update -> Apply from ADB`.
- **Sideload ROM:** Execute `adb sideload rom.zip` (replace "rom" with the actual filename of the ROM).
- **Optional Reboot to Recovery:** Optionally, reboot to recovery fully if you need to sideload any add-ons like Magisk.
- **System Reboot:** Finally, reboot your device to the system.

## Features
Here's a concise overview of what's new and improved:

### Core Improvements:
- **Framework Enhancements**: RisingOS 2.0 is rebased on the crDroid Android Project, incorporating AOSP QPR2 Framework fixes and improvements, such as Adaptive Charging and a reworked Boost Framework for better performance.
- **Audio and Visual Upgrades**: Introduces Adaptive Sound Engine for audio effects, new wallpapers, and a revamped user interface in Recovery and Settings, including Material Design themes.
- **Security and Accessibility**: Enhanced face unlock features and added accidental phone wakeup prevention in Pocket Mode.

### Customization and Usability:
- **UI Customizations**: New LockScreen Clock Styles, including an iOS widget, and the introduction of RisingUI with updated volume panel and boot animation.
- **Launcher and Widgets**: Ortus Launcher with improved support for icon packs and freeform tasks, alongside new LockScreen Widgets for media playback.
- **System Enhancements**: Improved memory management, ported Pixel features for a richer experience, and new Settings Styles for a personalized touch.

### Unique Features:
- **Shake Gestures**: A novel feature to perform actions like taking screenshots by shaking the device.
- **QS Header Image**: Dynamic color changes for icons and text when QS Header Image is enabled.
- **Deprecated Features**: Certain features like Columbus/Elmyra and Nothing Launcher have been removed due to deprecated dependencies.

### Acknowledgments:
RisingOS 2.0 incorporates features from various contributors across the Android community, including LineageOS, Pixel Experience, and individual developers. The RisingOS team extends gratitude to all contributors for their invaluable efforts.

This release not only enhances the user experience with new features and improvements but also pays homage to the collaborative spirit of the Android development community.

## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
