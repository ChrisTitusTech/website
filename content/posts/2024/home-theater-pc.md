---
title: "Home Theater PC"

date: 2024-06-26
url: /home-theater-pc/
image: images/2024-thumbs/home-theater-pc.jpg
categories:
  - Linux
  - Windows
tags:
  - HTPC
draft: false
---
Here are the steps and pros/cons of using a Home Theater PC (HTPC) for your home entertainment system.
<!--more-->

## The System

I'm using a Mini PC from Beelink (model SER8) with an AMD Ryzen 7 8845U processor, 32GB of RAM, and a 1TB NVMe SSD. It has a built-in AMD 780M GPU and runs Windows 11 Pro.

No external GPU is needed for this system, as it's powerful enough to handle 4K video playback and light gaming. For some this is sufficient as a main machine, but for me, I want to use this system for some couch gaming.

## The Setup

Out of the box these mini PC systems are configured in a balanced mode, which is fine for most users. However, I wanted to tweak the system to get the most out of it for my use case. I set the power plan to high performance, disabled the sleep mode, and set the display to never turn off. I also modified bios settings to always run at max power.

![](/images/2024/home-theater-pc/bios.png)

Other Tweaks:

- Chris Titus Tech's Windows Utility - Standard Tweaks applied - [GitHub Guide](https://github.com/christitustech/winutil)
- Tweaked resolution with [Custom Resolution Utility](https://www.monitortests.com/forum/Thread-Custom-Resolution-Utility-CRU)
- Resolution set to 1080p for gaming (Note: If you have performance issues, you can lower the resolution to 720p)
- Installed [Radeon Software](https://www.amd.com/en/technologies/radeon-software) for GPU settings
- Steam Installed and Set to Big Picture Mode on Startup (Controller used for all gaming)

## The Performance

I tested this out on stream with various games and it performed well. I was able to match the advertised FPS per the manufacturer's website.

 ![](/images/2024/home-theater-pc/game-fps.png)

### Livestream Benchmarks

{{< youtube "CcN6dFQ-8Cs" >}}

## IO Ports for Beelink SER8

![](/images/2024/home-theater-pc/io.png)

## Pros and Cons

The pros of this type of system is portability, speed, and power consumption. The cons are the lack of upgradability and the need for an external GPU for more demanding games. Also, Don't expect above 60 FPS on modern AAA games.

## Walkthrough Video

{{< youtube "XiB5mYDkWmA" >}}
