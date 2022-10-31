---
title: "Ubuntus ARM Is Good"

date: 2022-11-11
url: /ubuntus-arm-is-good/
image: images/2022-thumbs/ubuntus-arm-is-good.jpg
categories:
  - Linux
tags:
  - Ubuntu
draft: false
---
ARM Computing has gone mainstream with Raspberry Pi and Mac M1/M2 chips. Harnessing this in a Linux desktop can be interesting. This is where I started using Ubuntu again. 
<!--more-->

Ubuntu's ARM spin is fantastic at a server level. The main issue I've had with Ubuntu desktops in the past are it reliance on GNOME's desktop environment and SNAP packages. Both these issues get alleviated when we get in to the server realm. My new PC that I'm building on arm using the OrangePi 800 hardware is fantastic with the right software installed on it. That is where Ubuntu ARM enters...

{{< tweet user="christitustech" id="1587141986942861315" >}}


## The Setup

Download the latest ARM package from <https://ubuntu.com/download/server/arm>. 

After the setup process I did the following tweaks to fix Ubuntu's base to my liking:
- Disable Snaps
```
snap list
sudo snap remove programs
```
- Purge snap daemon and prevent reinstall
```
sudo apt purge snapd
sudo apt-mark hold snapd
```
- Verify the Uninstall
```
apt list --install | grep snap
```

### Desktop Environment

The easiest way to set up the system for desktop usage is to use `tasksel` and then pick the desktop environment that you like the best. 

My recommendations:
- Windows Users - KDE
- MacOS users - GNOME

This will give you the base install for your ARM system.

## Why Ubuntu?

I haven't talked well about Ubuntu in the past because of their position on Snaps and switching to GNOME as their desktop environment. The reason I am choosing Ubuntu ARM is because it fit best for my use case. I needed up-to-date packages and reliability in the ARM space. I'd use Debian testing or sid for this task, but their ARM spins were not reliable on these branches from my testing. There were display issues and compatibility from missing firmware and non-free. To fix this, I download the non-free firmware ISO, but for ARM these are hard to find. Even after upgrading Debian stable to testing or sid, the ARM servers had experimental packages that didn't work with the hardware I was using. I had none of these issues from Ubuntu's ARM distribution.

For the bleeding edge, there is no better distribution than Arch and there ARM branch is one of the best out there. Arch Linux is unstable at it's core and not suitable for a device that I might only use once a week or month. This could be remedied by making it immutable, but having to mess with images is not fun or practical as a single maintainer. 

That left me with raspbian or armbian, but both these distributions are downstream from Ubuntu and Debian. This means the packages are stable, but old and I need new packages if I want to use it as a desktop replacement. That left me with one logical choice... Ubuntu.

## Walkthrough Video

{{< youtube 11111111 >}}
