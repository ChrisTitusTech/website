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

## Windows in Linux with PCI Passthrough

Linux is great, but sometimes it just isn't the right tool for what I need. That is why I have a full VM with a dedicated GPU, nvme, and usb card ready to go for anything I need. 

> _Note_:
> PCI passthrough is not for the faint of heart. Some motherboards do not separate IOMMU groups properly which means you can't isolate the PCI slots to pass them through and you CAN NOT do this on those systems. Laptops and cheap motherboards have the biggest issues.


## Walkthrough Video

{{< youtube 11111111 >}}
