---
title: "Flatpak Acceleration"

date: 2020-08-16T18:52:55-05:00
url: /flatpak-acceleration/
categories:
  - Linux
tags:
  - Flatpak 
draft: true
---
> **Link update 2026-10-07:** The old `cache.sdk.freedesktop.org` repository address is unavailable. See [Flatpak's runtime documentation](https://docs.flatpak.org/en/latest/available-runtimes.html) for current runtime sources; the 2020 commands below remain historical.

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
