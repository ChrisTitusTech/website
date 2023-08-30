---
title: "Windows to Linux for Powerusers"

date: 2023-12-26
url: /windows-to-linux/
image: images/2023-thumbs/windows-to-linux.jpg
categories:
  - Linux
  - Windows
tags:
  - Guide
draft: true
---
Windows to Linux is a hard transition for many users. I find this especially true for advanced Windows users. Here are all the things I wish I knew before trying to switch to Linux after using Windows for 20+ years.
<!--more-->

## Qualify Yourself and Expectations

Understand that Linux is NOT Windows and they work differently. Figure out the shortcomings of Linux in your current workflow and be flexible in learning alternatives or be comfortable dual booting.

Think about program alternatives and incompatibilities
- Microsoft Office
- Adobe Products
- Gaming Titles that use Anti-Cheat (check <https://protondb.com> for compatibility)

Why do you want to switch? For me, I was tired of Windows and their update cycle. 

## Setup a Test Environment

Before you nuke your Windows and install Linux, you need to understand what you are getting yourself into. The best way is to setup a test environment using either a Virtual Machine or even another PC.

### Choosing your Distribution

There are two types of distributions in Linux, Rolling and Stable A.K.A. LTS (Long Term Service). There is a scale of bleeding edge to really stable, but old packages.

Most other tutorials will tell you to install ubuntu or mint at this point, but I want you to understand what Linux is capable of and building your own distribution is the best way to learn. There are so many distributions how do you pick one? Let me simplify this decision... Install Debian. Its the most common and easiest to find guides on. Arch Linux is a second choice as it is very friendly on installing any package. Third, would be Fedora as it is a good middle ground between Arch and Debian.

What about the 100 or so other distributions? Most of these are just the same thing with a few different options that don't matter or just look different. Once you figure out how to change Linux to your liking you won't care which one you pick.

#### Rolling Releases

Arch Linux is probably the most well known rolling release that has the most up to date packages, but the more of these you install, the more unstable the system will become. It is not uncommon to run into a bad update and have the system start acting up. I don't recommend this type of distribution, but understand the appeal. Honorable mentions in this space are OpenSUSE tumbleweed, but is more obscure for newbies to the Linux space.

#### Stable Releases

These packages can be relatively modern, but not as bleeding edge as Arch or rolling releases. There are three distributions I'd recommend. 

- Fedora (13-month release cycle) - Most modern packages of many stable releases
- Debian (24-month release cycle) - Most common distribution out of all of Linux with most things based on it and My MAIN recommendation.
- Red Hat Enterprise Linux - Rocky (10 year support) - Mostly used in business or areas where nothing will change for a long time. Very old packages and mainly used in server environments.

### Understanding Linux

Distributions are just pre-packaged components making up Linux. Unlike Windows or Mac, you can choose different options for bootloader, init systems, display rendering, display managers, desktop environments or window managers. Which are the basic components every system has, once on the desktop you can pickup your own file browser, start menu, bars, configuration tools and utilities. 

Linux can be changed in any way you want. Where a pre-packaged system like Windows or Mac all these decisions are made for you and can't be removed. 

- You don't like how the system boots? Change the bootloader from grub to systemd
- Don't like the way Xorg handles displays? Change to Wayland
- Want a completely different workflow from the GNOME Desktop Environment? Switch to KDE

#### How Programs are Installed

The biggest thing a specific distribution gives you is a Package Manager. How it installs programs is something that doesn't change very much. 

Here are some examples so you don't go look dumb trying to install packages on a different distribution with a different package manager:

- `sudo apt install name` - Debian, Ubuntu, and a TON of Linux distributions use `apt` as the package manager.
- `sudo pacman -Sy name` - Arch-based also uses `yay` or `paru` to expand this to include almost any Linux package in existence. 
- `sudo dnf install name` - RHEL-based distros like Fedora use this package manager. It used to be `yum` instead, but was changed in recent years to dnf.

There are a ton of others for different distros, like `zypper` for OpenSUSE or `swupd` for Clear Linux, but these are pretty niche and you shouldn't concern yourself with them. 

*Packages for ALL Distributions* are made using Flatpak, AppImage, Flatpak, and even installing a secondary package manager like homebrew or nix. Everything I just listed works on all distributions and are containerized for the most part.

#### Typical Distribution

_Common alternatives in parenthesis_

- Bootloader = GRUB (Systemd-boot)
- Init System = Systemd
- Display Render = Wayland (Xorg - Common on Older Distros)
- Display Manager = GDM, SDDM, or LightDM (This is the Login Manager)
- Desktop Environments = KDE, Gnome, Cinnamon, XFCE, Mate, and LXQT (These have gui tool suite to help with system configuration)
- Window Managers (Desktop Environment Alternative)
  - Wayland Based = Sway and Hyprland (riverwm, dwl, and other are still being developed)
  - Xorg = BSPWM, DWM, i3, qTile, XMonad, awesomewm, and many others.

Example Configuration

Ubuntu 
- Bootloader - Grub
- Init System - Systemd
- Display Render - Wayland
- Display Manager - GDM
- Desktop Environment - GNOME

### First Installation

Grab a debian ISO here: <https://www.debian.org/download>

The basic netinst is fine for now. We just want a sample system to build up and learn on.

### Second Installation

Use Arch Linux here: <https://archlinux.org/download/>

Instead of using a wizard included with Arch, I recommend walking through all the steps @ <https://wiki.archlinux.org/title/Installation_guide> and learning about what goes into the setup process. Arch does a fantastic job of breaking down each step and I highly recommend their wiki as a resource even when NOT using arch. 

### Third Installation

Start messing around with window managers and configuring the system from a command line interface (CLI). This will make you more comfortable with Linux as a whole. After this is done, decide which way you enjoy the most.

## Walkthrough Video

{{< youtube 11111111 >}}

