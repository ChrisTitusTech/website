---
title: "Flatpak Acceleration"

date: 2020-08-16T18:52:55-05:00
url: /flatpak-acceleration/
image: images/2020-thumbs/flatpak-acceleration.jpg
categories:
  - Linux
tags:
  - Flatpak 
draft: true
---
This goes over installing games and other graphically demanding applications in flatpak. The following will optimize flatpak to get full hardware accelleration.
<!--more-->

## Get the FreeDesktop Remote

```
flatpak remote-add --user freedesktop-sdk https://cache.sdk.freedesktop.org/freedesktop-sdk.flatpakrepo
```

## Add the Flatpak runtimes

```
org.freedesktop.Platform.VAAPI.Intel{,.i386}
org.freedesktop.Platform.GL{,32}.default # Default Drivers
org.freedesktop.Platform.GL{,32}.mesa-aco # Mesa ACO Drivers
```

