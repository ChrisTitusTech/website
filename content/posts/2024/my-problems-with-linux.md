---
title: "My Problems With Linux"

date: 2024-06-04
url: /my-problems-with-linux/
image: images/2024-thumbs/my-problems-with-linux.jpg
categories:
  - Linux
tags:
  - Arch
draft: false
---
Here are my biggest problems with Linux Desktop and How I fixed them.
<!--more-->

## Breaking Linux

You know what every new power user does when they come to Linux Desktop? They Break it! 

Seriously, they want to tinker and change things and end up blindly following some guide online and breaking their system because they don't understand it. They expect it to work like Windows and it does NOT!

My fix to this is make everything as simple as possible. 

- My Desktop Environment? Don't have one... I just use DWM. 
- The Display Renderer? XOrg... its ancient, but it just works.
- Audio Problems? Use Alsa with Pulse. No pipewire.
- Video Card issues? I use Nvidia 4070 with DKMS modules.

I've been on the bleeding edge of Linux for years using Wayland, Pipewire, the new KDE, or other things that were released in the past year or two. What I've found is I have more problems when I do that. They work for some, but I want to show where they DO NOT and WHY I do things this way.

### Desktop Environments

Using KDE or Gnome is great for a new user as they have all the tools and system panels that are needed to configure a system just like Windows or Mac. The problem? These are small teams and often are more buggy than Windows or Mac. WHAT!?! Linux more buggy than Windows! Blasphemy! No, just desktop environments are, because they can't program for all the different configurations that exist and can lead to some undesired results. The older version of KDE 5 can be very reliable, but if you are constantly updating and on the latest version... I've had nothing but problems. What Problems? Flickering Screen. Failed Boot from bad cache files in plasmashell from KDE 5 when an upgrade to 6 happened. Gnome? Extensions are manage through your web browser and when it updates the extensions break. Do I need to say more?

My fix for this? Use a Window Manager

- Everything is done in terminal and coded to work one way
- No reliance on any tool for configuration
- It only manages the windows on the screen and far less things can break
- Never Updates or changes unless you want it to

### Display Rendering

All the cool kids in Linux use Wayland. Fedora users are forced to use Wayland in the next release. Wayland works great for *most* AMD Cards, but can be hit and miss on nVidia. Most software now works on it... except for Synergy, barrier, or input leap *small exception for patched gnome users*. 

My Fix for these problems? Use Xorg

- Its old, but everything already works on it.
- I'm a boomer and don't care about HDR or VRR and all the new hotness. Just give me 60hz at 1080p and I'm good. High resolution monitors at 4k... not for me.

### Audio

Audio in Linux is strange and has multiple configuration points. I think it is Linux greatest weakness. Pipewire has come a long way to fix some of the audio, but it still sucks to configure properly. Often it gets confused with too many inputs or a program defaults to use alsa instead of pipewire or pulseaudio just stops working out of nowhere.

My Fix? Use Alsa and strip out all the complexity

- Remove all extra inputs/outputs you do NOT use. `pavucontrol` is a GUI tool to disable all the extra.
- Blacklist the cards using `cat /proc/asound/modules` to find the modules you use and blacklist the ones you don't.
```
nano /etc/modprobe.d/alsa-blacklist.conf
blacklist snd_hda_intel
```
*Note: to get a better description of the modules use* `cat /proc/asound/cards` 
- Pulseaudio broken? delete the entire `~/.config/pulse/` folder. Restart pulse using:
```
pulseaudio -k
pulseaudio --start
```
- Davinci Resolve Audio Issues? 

1. Use Opus for recording audio or transcode from AAC. *Note: Opus is better quality than AAC*
2. Do NOT Use Pipewire! Resolve hasn't caught up yet. Install `pulseaudio` and `pulseaudio-alsa` packages using your package manager. Remove any pipewire packages.

These are just a few workarounds and the method to my madness why I choose certain things. 

### Switched to nVidia in 2024

I have used AMD GPUs almost exclusively in Linux for the past 5 years. They generally just worked, but the 7000 series has been problematic and caused several issues for me. Helldivers 2 didn't work, my 7800XT card would never get utilized past 40-50% on ANY Distribution I tried, and compatibility was an issue with Resolve on Linux not liking AMD and OpenCL. After loading up a new nVidia 4070 Super with nvidia-dkms and linux-headers everything worked right away. All the issues I had melted away. 

I will always use what is best for my needs. Nvidia is now the card I choose on my Linux install, because I don't have near the issues compared to the 7800XT. 

## Conclusion

Everything in its current configuration works better than Windows or Mac and I absolutely love my Linux installation. However, it did NOT start out that way. Don't listen to people saying you have to do things THIS way or use THIS package! All of my options I picked suit my use case and MY NEEDS! It may not suit yours and I wanted to share my experience as others online make it seem black and white when it is NOT!

## Walkthrough Video

{{< youtube "tcQRVOMGXrk" >}}
