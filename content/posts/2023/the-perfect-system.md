---
title: "The Perfect System"

date: 2023-05-24
url: /the-perfect-system/
image: images/2023-thumbs/the-perfect-system.jpg
categories:
  - Linux
tags:
  - Rocky
  - BSPWM
draft: false
---
The perfect system is stable, reliable, and does everything you need it to, while it feels amazing to use.
<!--more-->

## The Base System

Choose a Stable Release that won't get many feature updates that change the experience, but gets security updates that makes it stable and secure.

Examples:

- RHEL 10-year Support (Red Hat Enterprise Linux - Require Subscription) 
  -Free Variants (Rocky and Alma Linux)
- Debian 5-year Support (Stable - Bookworm(06/2023) or Bullseye)
- Ubuntu 5-year Support (Version 22 or 20)
- OpenSUSE 6-year Support (Leap only)

## Packages

Getting all your packages and updating them reliably can be a challenge. With LTS releases, you will always be installing old version of software, where something like Arch Linux or other rolling releases will have the latest and greatest. We can get around this with NixOS Packages and Flatpak. There are other all-in-one tools like AppImages or Snap packages, but I don't find these to be any better than just using Nix or Flatpak.

## The Look and Feel

This will be different for everyone. The idea is to have a system you enjoy being in and looking forward to coming back to it.

I've attempted a bastardized version of the genome project from unixporn and made [ubuntu-titus](https://github.com/ChrisTitusTech/ubuntu-titus), [debian-titus](https://github.com/ChrisTitusTech/Debian-titus), and [fedora-titus](https://github.com/ChrisTitusTech/Fedora-Titus) repos that kinda work. It ends up looking like this:

![mydesktop](/images/2023/the-perfect-system/fedora-mydesktop.jpg)

The problem is I am not good at graphic design. I'm a function over form person and these desktop below are the opposite of that.

This rice is interesting using hyprland, eww, and is clean.

![hyprland](/images/2023/the-perfect-system/fedora-hyprland-eww.jpg)

Source: <https://github.com/Aylur/dotfiles>

Another rice that is using awesomewm w/ bling utilties and rofi for menus. Simplistic and clean.

![awesomewm](/images/2023/the-perfect-system/awesomewm-bling-rofi.jpg)

Source: <https://github.com/beastsongithub/AwesomeWMRice>

I mentioned the above projects for the simplistic nature and not requiring a TON of dependancies. Too many rices in Linux require 10+ programs to even function, which is bad design where the two above look good, but don't have tons of problems. I say this to encourage more rices that are easier to replicate for people.

What does my future desktop look like? Two versions... The pretty version in a year using Hyprland, Wayland, and the pretty desktop and the suckless barebones minimal one that just works like below.

![dwm](/images/2023/the-perfect-system/dwm.jpg)

## Walkthrough Video

{{< youtube 11111111 >}}
