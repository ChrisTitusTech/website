---
title: "Choosing the Right Linux Distro"

date: 2022-06-28T17:12:25-05:00
url: /choose-linux-distro/
image: images/2022-thumbs/choose-linux-distro.png
categories:
  - Linux
tags:
  - Fedora
  - Debian
  - Arch
---
Choosing a Linux distribution can be difficult, especially if you don't know much about Linux. However, over the past several years I've tried almost every Distribution that you can choose. There are some that I have not installed, because it was just more of the same. 
<!--more-->
![distros](/images/2022/choose-linux-distribution/distros.png)

To start with there is a misconception that there is thousands of choices in Linux Distributions. While technically true, there is really only 3 distributions you need to know about for desktop use, but before we get into that you need to know about what makes up a distribution. This is mandatory to understand why there is so many different ones that splinter off of these three. 

## What is in a Distribution

Windows and Mac are called Operating Systems, NOT distributions... but in Linux this isn't the case. Why? That is because each Linux offering has different options at its core. With Windows and Mac you always get the same bootloader, file manager, etc. and in Linux these can differ drastically from one to the next. So this is what makes up the Linux distribution.

### Bootloader
This can is usually either GRUB or systemd-boot. This may not mean much to you, but i'll explain the difference. GRUB has been around for ages and can be themed while having a ton of flexibility. It supports UEFI and Legacy, while systemd-boot is pretty much included with every modern linux distribution and only boots via UEFI and has a limited menu system. I highly encourage you that want a themed multi-boot system to check out my Top 5 Bootloader project that auto-installs multiple themes: <https://christitus.com/bootloader-themes/>

### Init System
When your system is initializing on startup it needs to verify all the devices it will use and get the system ready for boot. Almost every Linux system these days use systemd. Systemd is very big and inclusive, but to many is bloated. It does much more than just initializing the system. It has Timers, bootloader, services, and much more. I did a YouTube video explaining everything in systemd if you want to learn more. <https://youtu.be/hc7J-zWEty8>
There is other options out there for Linux and certain fringe distributions that use them, but if you want other options check out init.d and precursors to systemd. They are much faster and if looking at building an ultimate minimal system this is the route to take. 

### Display Render
To draw graphics on the screen we need a render. There are only two major ones you need to know about. Wayland and Xorg. Wayland is the new kid that should be faster and better, but is lacking features and compatibility. Xorg is the old, wise man that just works, but is starting to show its age. To me, I always choose Xorg because Wayland always runs into problems. Xorg has two features that Wayland is lacking for me right now. It has X11 forwarding for running GUI programs remotely through an SSH connection and using legacy programs for sharing a keyboard/mouse across screens using synergy/barrier. I did a video on this here: <https://youtu.be/Fci_ALdEzGc>. To many it simply doesn't matter, because they both fundamentally do the same thing. 

### Display Manager
This really should be called a Login Manager or user selector, but in Linux the entire ecosystem is run by extremely smart technical people, that just so happen to be terrible at marketing. So the "Display Manager" comes in many flavors and this is where we start to run into many personal options in Distributions. Personally, I really don't care about this, but there are three main ones that are used and can be configured differently:
- lightdm
- sddm
- gdm
While there are others, these three pretty much are always chosen for a distribution. SDDM is generally bundled with KDE systems (which we will get into here in a bit), GDM is for GNOME systems, and lightdm (my personal fav) is pretty much a catch all. 

### Desktop Environments
Think of Desktop Environments as the tools that make up the control center in an Operating System. Want to change the display resolution, theme, colors, fonts, etc. well all that stuff is in the desktop environment. Now you don't technically need a full blow DE with all this stuff. The main thing you do need is a Window Manager to control where windows are placed. With all that said lets layout the common DEs:
- GNOME
- KDE
- XFCE
- Window Managers
- and many, many, more. 
This could be a 100 page manual with all the options, but I want to give you the basics. GNOME gives more of a mac-esque style and KDE gives that windows look and feed. XFCE is more bare-bones with the essential tools and not much else. Where a basic "window manager" is just the window manager without any utilities. You might think... "How the hell do you change the resolution? or font? with a window manger..." This is accomplished either by hard coding it in to the configuration files or by installing an independent utility. 

### Package Managers
This is how distributions install programs. Here are the major ones you need to know about. 
- APT - Debian distros `apt install programname`
- DNF / YUM - RHEL distros `dnf install programname`
- Pacman - Arch distros `pacman -S programname`

## Distributions
So now that you know what they are made up of we can easily get to deciding what you really want your computing experience to be like. Figure out what components above you like and do NOT like. Then swap them out for something better. The main gripe I have with Windows and Mac is I find their file manager absolutely terrible. I want to switch them and rip out the junk they give me, but we can't as they are integral to the function of the operating system. In Linux, we get that freedom. Here are the three "distributions" that pretty much everything is based on and what the base package installs are. Remember you can change the things you do NOT like from the stock settings. 

### Debian Linux
![debian](/images/2022/choose-linux-distribution/debian.png)

Debian uses a stable release cycle and generally has older packages, but they don't usually have many bugs and are very reliable. This is typically my go to for desktops I don't change much.
- Bootloader - GRUB
- Init System - systemd
- Display Render - Xorg
- Display Manager - SDDM/GDM
- Desktop Environment - KDE/GNOME
- Package Manager - APT

### Arch Linux
![arch](/images/2022/choose-linux-distribution/arch.png)

Very new packages with a massive user repository to grab programs you might be missing and builds them for you. The main issue is if you forget to update your system for a period of months it is prone to breaking. Backups are MANDATORY if you use this for your daily use. The benefits are you get the latest and greatest and is often thought to be the best for drivers and hardware that is just released. Its unique that you get to choose every component and can utilize pretty much any COMBINATION of components listed above. The only constant is its package manager which is PACMAN. The other unique aspect is it has a helper program that can install things through the AUR (Arch User Repository) and boy does it have options here... I'm going to recommend the top three
- paru
- yay
- trizen
They follow the same syntax as pacman except you run them at a user level and they can install pretty much any package. For a complete list visit: <https://aur.archlinux.org/>

### Fedora Linux
![fedora](/images/2022/choose-linux-distribution/fedora.png)

This is a RHEL (Red Hat Enterprise Linux) based distribution. It strikes a balance between newer packages and Linux kernels between Debian and Arch. Its not as new as Arch, but not as old as Debian. It has different SPINS but its main download uses the following:
- Bootloader - Systemd
- Init System - systemd
- Display Render - Wayland
- Desktop Environment - GNOME
- Package Manager - DNF

## Conclusion
So the best distribution is the one that suits your needs and preferences. Instead of the one size fits all approach of Mac and Windows, Linux takes a completely different approach. Learn the above and try out the different options and you will make the perfect system for your needs. You will also understand why all the top 5 distros and other Linux garbage on the internet is worthless. That is because there is no perfect distro, however there is the perfect distro for YOU! It just so happens that it is different for each user and you have the options that no other system on earth give you with Linux.


## Walkthrough Video

{{< youtube dL05DoJ0qsQ >}}


