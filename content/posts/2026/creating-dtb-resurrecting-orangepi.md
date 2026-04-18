---
title: "Creating Dtb Resurrecting Orangepi"

date: 2026-04-18
url: /creating-dtb-resurrecting-orangepi/
image: images/2026-thumbs/creating-dtb-resurrecting-orangepi.webp
categories:
  - Linux
tags:
  - OrangePi
draft: true
---
The Orange Pi 800 is a keyboard-style single-board computer powered by the Rockchip RK3399 — essentially an Orange Pi take on the Raspberry Pi 400 form factor. The problem: the stock `linux-aarch64` package from Arch Linux ARM ships no DTB for it, so it simply won't boot. This article walks through building and flashing a custom U-Boot 2022.04 bootloader along with a working `rk3399-orangepi-800.dtb` to get Arch Linux ARM running on the board.
<!--more-->

## What Is a DTB and Why Does the OrangePi 800 Need One?

A Device Tree Blob (DTB) is a compiled binary that describes the hardware layout of a system — memory addresses, peripherals, GPIO pins, clocks — to the Linux kernel at boot time. Without it, the kernel has no idea what hardware it is running on and cannot initialize anything.

The OrangePi 800 uses the Rockchip RK3399 SoC with a custom board layout (Motorcomm 1GbE PHY, ES8316 audio, AP6256 WiFi, HT68FB571 keyboard MCU, etc.). None of that is described in the generic `rk3399` DTBs shipping with mainline kernels, so a board-specific DTB is required.

## Hardware Support Overview

| Component | Chip | Status |
|---|---|---|
| PMIC | RK808-D | ✅ Works |
| RAM (4 GB LPDDR4) | 4× LPDDR4 BGA200 | ✅ Works |
| eMMC (64 GB) | eMMC 5.0 BGA169 | ✅ Works |
| SD card | TF-CKT01-009D | ✅ Works |
| Ethernet | YT8531C (Motorcomm 1GbE) | ✅ Works (with `motorcomm` module) |
| HDMI output | RK3399 internal | ⚠️ Partial (caps at 1080p60) |
| USB 2.0 / USB 3.0 | RK3399 TypeC PHY | ⚠️ Partial (speed limited) |
| WiFi / Bluetooth | AP6256 (BCM43456) | ❌ Needs vendor kernel |
| Audio | ES8316 codec | ❌ Needs vendor kernel |
| Keyboard MCU | HT68FB571 (USB HID) | ❌ Needs vendor kernel |
| VGA output | CH7517 eDP-to-VGA | ❌ No mainline driver |
| RTC | BL5372 (I2C) | ❌ Needs DTS node |

## The Process

### Quick Install (Automatic Scripts)

The fastest path — one script handles partitioning, extracting Arch Linux ARM, installing U-Boot, and copying the DTB to the SD card.

**Requirements:** `parted`, `mkfs.fat`, `mkfs.ext4`, `bsdtar` (libarchive), `dd`, `blkid`

```bash
git clone https://github.com/ChrisTitusTech/uboot-orangepi-rk3399
cd uboot-orangepi-rk3399
sudo ./sdcard-setup.sh /dev/sdX   # replace sdX — find with lsblk
```

### First Boot

1. Insert the SD card into the OrangePi 800.
2. Connect an Ethernet cable.
3. Apply 5V USB-C power.

U-Boot finds `extlinux/extlinux.conf` on the boot partition and loads the kernel automatically. Log in via SSH (check your router's DHCP table for the IP) or serial console (ttyS2, 1500000 baud, 8N1):

| User | `alarm` / `alarm` |
|---|---|
| Root | `root` / `root` |

After first boot from the SD card, migrate to the onboard 64 GB eMMC:

```bash
sudo ./copy-to-emmc.sh
```

Then power off, remove the SD card, and boot from eMMC.

