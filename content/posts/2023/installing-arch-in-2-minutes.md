---
title: "Installing Arch in 2 Minutes"

date: 2023-09-27
url: /installing-arch-in-2-minutes/
image: images/2023-thumbs/installing-arch-in-2-minutes.jpg
categories:
  - Linux
tags:
  - Arch
draft: true
---
You can install Arch Linux in 120 seconds with my script. 
<!--more-->

## One Line Command

```
bash <(curl -L christitus.com/archtitus)
```

## The Evolution of ArchTitus

The script is based on ArchTitus from several years ago that I had archived on GitHub. The project at the time was meant as an all-in-one script to install various desktop environments and configurations. As the official Arch script has become good, I didn't see a point in my script anymore... but recently my mind changed on this. Instead of making a project that everyone uses, I made it do the things I needed and the official script didn't do.

I now have began modifying the project to specify my configurations.

## The First Change - SPEED

I install Linux a lot and most times for testing. I generally don't care which distro I use, but find that Arch can be used the quickest with a minimal iso and a script for base install. The `server` option in the script installs only the base system with my configuration. No GUI elements or desktop environments and tons of crap. Just a nice simple server CLI that I can play on. 

## Future Changes

There are 3 additional changes that I'm working on. 

- DWM-Titus - MY DWM configuration
- Hyprland-Titus - My Hyprland Configuration
- KDE - My beginner friend config meant for new Linux users. 

## Walkthrough Video

{{< youtube 11111111 >}}
