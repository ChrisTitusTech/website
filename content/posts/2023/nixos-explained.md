---
title: "NixOS Explained"

date: 2023-06-16
url: /nixos-explained/
image: images/2023-thumbs/nixos-explained.webp
categories:
  - Linux
tags:
  - NixOS
draft: false
---
NixOS is a very different type of Linux distribution. Everything can be controlled by one file.
<!--more-->

## The Configuration

Unlike other distributions where you configure system wide programs with `/etc` and install programs with a package manage like APT, with NixOS EVERYTHING is done in `/etc/nixos/configuration.nix` or hardware specific configurations in `/etc/nixos/hardware-configuration.nix`

You can reference all my videos below and see my ending configuration files @ <https://github.com/ChrisTitusTech/nixos-titus>

A viewer of the channel also sent me this in-depth guide covering much more of NixOS including flakes and home manager. Here is that article: <https://thiscute.world/en/posts/nixos-and-flake-basics> - which is a great resource as well!

## Install and Config Videos

First Time Install: <https://youtu.be/_Z32SYFbxpw>

Timestamps:
- 00:00:00 - NixOS Overview
- 00:04:05 - Finding Packages to use before install
- 00:17:26 - Install Begins
- 00:23:46 - Manual Partitioning
- 00:34:24 - Generating Our Configuration File for Install
- 00:39:49 - Finishing Install from ISO
- 00:40:58 - First Boot
- 00:41:39 - Login and user setup
- 00:42:07 - SetFont problems
- 00:43:28 - Figuring out Installing Packages
- 00:46:20 - mounting backup drive
- 00:47:29 - Grabing Backup Packagelist
- 00:50:24 - Installing ALL the Packages 1000+
- 00:55:01 - Understanding PATHS and proper XDG Paths
- 01:02:02 - Install Done - Reboot
- 01:03:19 - Adding a Desktop Session
- 01:05:10 - Nix Handles Services VERY Differently
- 01:07:38 - Fixing permissions on mounted external home
- 01:09:35 - You can NOT change stuff in /etc
- 01:21:02 - Cloning DWM Setup
- 01:22:26 - Titus is dogwater at using elinks
- 01:27:02 - Wierd NixOS package names
- 01:31:12 - MINDBLOWING NixOS Overlays
- 01:40:51 - bin bash errors with it not existing
- 01:48:37 - Successful Install and Recap

NixOS Configuration: <https://youtu.be/IRRtk320j2A>

Timestamps:
- 00:00:00 - NixOS Config Overview
- 00:01:41 - Overall feelings about NixOS
- 00:02:20 - Improvements with Flatpak and XDG via Config
- 00:04:02 - Improving Configuration.nix
- 00:04:23 - ipv6config
- 00:05:23 - Locale
- 00:06:16 - XServices and Display Manager Configs
- 00:09:24 - Fonts Config
- 00:11:07 - Polkit Config
- 00:22:47 - Revisting Flatpak
- 00:25:08 - Console Font Problems
- 00:30:46 - SwayCons
- 00:33:40 - Upgrading NixOS to New Release
- 00:43:47 - Upgrade problems with insecure packages
- 00:49:45 - NixOS Virtualization Setup
- 00:51:38 - The Old Way does NOT work
- 00:53:49 - The NixOS Way of Adding Groups
- 00:57:01 - Adding Libvirt to NixOS
- 01:00:17 - Finally Fixing Console Fonts
- 01:02:00 - DaVinci Resolve in NixOS
- 01:04:04 - Setting up Autologin in NixOS
- 01:13:31 - DaVinci Resolve launch test
- 01:15:19 - Next Steps and Sharing Config

NixOS SystemD TimeOut Config: <https://youtu.be/1qd0iHadvdo>

NixOS NFS Mounting: <https://youtu.be/l7HvMM6rLNE>

NixOS Gaming Setup: <https://youtu.be/wpS3qIprHL0>

Timestamps:
- 00:00:00 - NixOS Gaming
- 00:02:08 - Nix configuration changes for resolution
- 00:03:22 - Diablo 4 problems with DWM
- 00:07:19 - Manually changing Diablo 4 config
- 00:12:08 - Changing Lutris Options
- 00:16:25 - Diablo 4 initial launch
- 00:19:26 - Unlocking vsync and fps benchmarks
- 00:22:52 - Adding HD Packs
- 00:26:33 - Comparing Windows vs Linux Performance in Diablo 4
- 00:29:31 - Diablo 4 Linux Benchmark Settings
- 00:30:03 - Diablo 4 Linux Benchmark Gameplay
- 00:33:04 - Windows Display Issues
- 00:34:53 - Adding Windows HD Assets
- 00:36:43 - GRUB and Bootloaders
- 00:38:18 - Windows Benchmarks Begins
- 00:39:41 - Installing Windows OSD Tools
- 00:43:19 - Windows Gameplay Benchmarks
- 00:46:52 - Overview of Linux vs Windows Diablo 4
- 00:50:33 - Why I do not use VMs for new installs
- 00:51:44 - GPU Acceleration in Linux
- 00:52:58 - The Oh Crap Moment
- 00:55:51 - DWM the LAST Window Manager
- 01:01:17 - Wrapping Up

## Walkthrough Video

{{< youtube fuWPuJZ9NcU >}}
