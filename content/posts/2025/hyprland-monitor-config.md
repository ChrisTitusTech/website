---
title: "Hyprland Monitor Config"

date: 2025-07-31
url: /hyprland-monitor-config/
image: images/2025-thumbs/hyprland-monitor-config.webp
categories:
  - Linux
tags:
  - Hyprland
  - ArchLinux
draft: false
---
Configuring Monitors in Hyprland is amazing! You can specify monitors by type AND serial numbers.<!--more-->

## List Monitor details

Here is a screenshot of `hyprctl monitors`

![hyprctl](/images/2025/hyprctl-monitors.webp)

## Add to hyprland.conf

Syntax for adding specific monitors with configuration looks like this:
`monitor=desc:MONITOR_DESCRIPTION,resolution,position,scale`

Examples:
```
################
### MONITORS ###
################

# See https://wiki.hyprland.org/Configuring/Monitors/
# Studio PC Config
monitor=desc:AOP 27HC5R 1207043ED3W01,preferred,auto,1

# KFocus Laptop Config with Work Docking station
monitor=eDP-1,preferred,0x0,1
monitor=desc:Acer Technologies XV271U M3 140400A3B3LIJ,preferred,-2560x0,1
monitor=desc:Acer Technologies XV271U M3 140400DA63LIJ,preferred,-5120x0,1

# Inside PC Monitor Config
monitor=desc:HP Inc. OMEN 27i IPS 6CM10907V6,preferred,0x0,1
monitor=desc:Samsung Electric Company C24F390 HTQH906703,preferred,0x-1080,1
monitor=desc:IDI Elgato Prom. 0x01348D27,preferred,2560x0,1
```
