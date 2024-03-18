---
title: "The Ultimate System"

date: 2024-03-17
url: /the-ultimate-system/
image: images/2024-thumbs/the-ultimate-system.jpg
categories:
  - Linux
  - Windows
tags:
  - PCI-Passthrough
draft: true
---
The Ulimate System will look different for everyone, but here is an outline of what you need to consider when making yours as I overview mine.
<!--more-->

The purpose of my ultimate system is to have the most enjoyment out of my PC experience while sacrificing nothing to do everything I want to do at 100% efficiency. 

## Hardware

Not all hardware is created equal. While I could buy more powerful parts this was one of the most powerful systems I could build with my requirements. Here is all my requirements for Hardware and a link to my final system build.

- Low Audio Footprint (No higher than 30dB)
- 2 GPU capable (Gaming and AV Work capable in multiple operating systems at the same time)
- Large amount of FULL cores. (No efficiency cores that have lower VM performance.)
- Large amount of Memory for Virtual Machines
- Expandable with Large amount of PCIe Ports (6+ Ports with at least 2 16x slots)
- High-end motherboard (Helps avoid IOMMU Group errors)

These requirements are to avoid past issues I've had with systems. It is not about getting the highest number, but about avoiding problems you've encountered in the past.

### My Specifications

Build Link: <https://superworkstations.com/configurations/titus-hp-z8-g5-fury/>

- Intel Xeon w5-3435X | 16 cores, 3.1 GHz base frequency
- 64GB (4x 16GB) of 4800MT/s DDR5 ECC Memory
- 2x 2TB NVMe M.2 PCIe 4.0 Solid-State Drive
- AMD Sapphire Nitro+ 7800XT (Main GPU)
- NVIDIA GeForce RTX 2060 (2nd GPU)
- Single HP Z8 G5 Fury 1125W Power Supply

## Base Operating System

I always go back and forth between Debian and Arch Linux for my base. They are both wonderful options with Arch giving access to the newest hardware since it runs on a newer kernel with newer packages and Debian being more stable with older packages. In the end, I have more fun on Arch and will be my choice for my main system.

There are many guides on how to install Arch Linux, but here are some of my videos going over the various ways I've done it in the past.

|-- ArchTitus in 2 Minutes --|-- Archfi Install --| 
|---|---|
| {{< youtube hKpxMWm5l7w >}} | {{< youtube "GUtpHFI-vjg" >}} |

## The Desktop

Most people need a user friendly desktop environment like plasma that you select during the install process. While that is nice for newer users, a tiling window manager is what feels the best to me these days. After years of switching between them all, there is only one that I find the best. DWM from suckless is the one I can do anything with and have zero limitations. I want a new feature, just patch it! Otherwise, everything just works as it always has. 

Official Site for DWM <https://dwm.suckless.org/>
My DWM Configuration <https://github.com/ChrisTitusTech/dwm-titus>

|-- DWM Walkthrough --|
|---|
| {{< youtube JXVle0nyA-o >}} |

### Removing Friction

When using the desktop think about tasks you do everyday and if they can be automated. This will save you time as you use the computer and lead to a happier computing experience.

Examples:

- Launching my Windows 11 virtual machine happens everyday! Solution? Start Virtual Machine on boot! `sudo virsh enable win11`

- Running a HUGO server to see my test website when creating pages. Solution? Create a user Systemd service that runs when the user logs in:

~/.config/systemd/user/hugo.service

```
[Unit]
Description=hugo website server

[Service]
Type=simple
StandardOutput=journal
WorkingDirectory=/home/titus/github/website
ExecStart=hugo server -FD

[Install]
WantedBy=default.target
```

Then issue user command **NO SUDO** `systemctl --user enable hugo.service`

- Running Programs by launching start menu. Solution? Hotkey the programs to launch them faster! In my instance, I'd edit config.h in my dwm folder.

## Windows in Linux with PCI Passthrough

Linux is great, but sometimes it just isn't the right tool for what I need. That is why I have a full VM with a dedicated GPU, nvme, and usb card ready to go for anything I need. 

> _Note_:
> PCI passthrough is not for the faint of heart. Some motherboards do not separate IOMMU groups properly which means you can't isolate the PCI slots to pass them through and you CAN NOT do this on those systems. Laptops and cheap motherboards have the biggest issues.

### QuickPassthrough

![](/images/2024/the-ultimate-system/quickpass.png)

Github: <https://github.com/HikariKnight/quickpassthrough>

Made by HikariKnight it is an amazing project that makes passthrough much simpler. It will auto blocklist the PCI id's and make the needed system modifications while holding your hand through the process. If you watch my run of it, there was a bug with `mkinitcpio` that made a MODULES=() entry. He has fixed that and said that the latest version is even better. While there is no way to make this perfect and work on every system it has removed a LOT of the legwork. 

## My Setup Videos

Here are all the livestreams where I go through the ENTIRE setup.

|-- Arch Install --|-- QEMU/Windows Install --|-- Looking Glass --|
|---|---|---|
| {{< youtube Y7LTdEwR9M8 >}} | {{< youtube K2gliga5Vwc >}} | {{< youtube 01R8Ft1BdxE >}} |

## Walkthrough Video

{{< youtube 11111111 >}}
