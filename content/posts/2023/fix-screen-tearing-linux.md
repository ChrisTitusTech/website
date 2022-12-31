---
title: "Fix Screen Tearing Linux"

date: 2023-01-04
url: /fix-screen-tearing-linux/
image: images/2023-thumbs/fix-screen-tearing-linux.jpg
categories:
  - Linux
tags:
  - vsync
  - freesync
draft: false
---
The guide shows you ALL the methods to remove screen tearing. VSync, Monitor Composition, and Drivers that are problem childs.
<!--more-->

## Why it happens?

Screen tearing is the hardware driving more frames than the monitor is capable of displaying or displaying more than 1 frame in a single draw. On Linux the stock configurations are awful and you see it a LOT on nVidia AND Intel. Not so much on AMD, because the display drivers are baked into the kernel and one more reason for using AMD graphics on Linux when you can.

## Compositors (Problem #1)

There are 3 main compositors that Linux distributions generally use.

- KWin (KDE)
- Mutter (GNOME)
- picom/compton (Various - picom is the evolution of compton)

In these there is options for VSync. This doesn't generally fix the issue, but it does help when you have BAD screen tearing when moving windows in you Linux system. 

KWin (KDE) Example:

![](/images/2023/fix-screen-tearing-linux/kwin.png)

Mutter (Gnome) is enabled by default, but has made advancements with Variable Rate Refresh to fix some tearing back in July of 2022. This VRR improvement means you need to update to the latest GNOME and you can see improvements. 

Compton/picom Configuration: (ex. ~/picom.conf) 

```
#################################
#       General Settings        #
#################################
vsync = true;
```

## Intel/AMD X11 Configurations

The configuration to enable vsync/freesync support when the graphics are initialized is the primary method to fix tearing. Here are the options for BOTH Intel and AMD.

### Intel X11 Config

File to Edit/Add: `/etc/X11/xorg.conf.d/20-intel.conf`

```
Section "Device"
    Identifier "Intel Graphics"
    Driver "intel"
    Option "TearFree" "true"
EndSection
```

_Note: There are extra options that can help like: `Option  "AccelMethod" "uxa"` or `Option  "TripleBuffer" "true"`_

ISSUE: After enabling and rebooting if you start to see screen artifacts there is a BAD Driver package that causes this. Remove `sudo apt remove xserver-xorg-video-intel`. This is an old intel display driver that is NOT being maintained. The newer the computer, the more problems this package will cause. These drivers aren't even needed and I don't know why they are installed by default and not removed altogether!

### AMD X11 Config

File to Edit/Add: `/etc/X11/xorg.conf.d/20-amd.conf`

```
Section "Device"
   Identifier "AMD Graphics"
   Driver "amdgpu"
   Option "TearFree" "true"
EndSection
```

## nVidia Configuration - Why is it always nVidia?

I hope in 2 years nVidia cards stop sucking as bad in Linux, because it is an AWFUL experience. Yes, you can fix it with drivers and custom settings, but the first impressions from users with nVidia cards is seldom a good one. Let's start with making sure you have the `nvidia-driver` installed with `nvidia-settings` package.

### nvidia-settings

![](/images/2023/fix-screen-tearing-linux/nvidia-settings.png)

- Go to **X Server Display Configuration > Advanced**
- Enable **Force Full Composition Pipeline**
- Apply and Save to X Configuration File.

CLI Method

```
nvidia-settings --assign CurrentMetaMode="nvidia-auto-select +0+0 {ForceFullCompositionPipeline=On}"
```
Reboot!

## Walkthrough Video

{{< youtube rVBq6d3c1gM >}}
