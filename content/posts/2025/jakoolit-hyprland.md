---
title: "Jakoolit Hyprland"

date: 2025-02-03
url: /jakoolit-hyprland/
image: images/2025-thumbs/jakoolit-hyprland.webp
categories:
  - Linux
tags:
  - Hyprland
draft: true
---
Hyprland has always been an elusive setup to a functional desktop that I enjoy. However, I recently explored JaKoolit and it has been a game changer. This is a guide on how to setup JaKoolit Hyprland on your system.
<!--more-->

## What systems are compatile with JaKoolit Hyprland?

[JaKoolit Hyprland](https://github.com/JaKooLit) is compatible with the following systems:
- Ubuntu 24.04
- Ubuntu 24.10
- Arch Linux
- Fedora
- NixOS

He also created basic scripts for each distro repository to install his version of hyprland.

## How to install JaKoolit Hyprland

You can follow his direct instructions, but I wanted to make it easier for people, so I made his scripts directly integrated into [Linutil](https://github.com/ChrisTitusTech/linutil). This way you can install JaKoolit Hyprland with a single command.

The best part of this is Linutil will auto-detect which distro you are on and install the correct version of JaKoolit Hyprland.

```
curl -fsSL christitus.com/linux | sh 
```

Look under System setup and you'll see the option to install JaKoolit Hyprland.

![](/images/2025/jakoolit-hyprland/linutil-hyprland.webp)

## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
