---
title: "Flatpak Acceleration"
type: post
date: 2020-08-16T18:52:55-05:00
url: /flatpak-acceleration/
image: /images/2020-thumbs/flatpak-acceleration.jpg
categories:
  - Linux
tags:
  - Flatpak 
draft: true
---
This goes over installing games and other graphically demanding applications in flatpak. The following will optimize flatpak to get full hardware accelleration.
<!--more-->

## Get the FreeDesktop Remote

```bash
flatpak remote-add --user freedesktop-sdk https://cache.sdk.freedesktop.org/freedesktop-sdk.flatpakrepo
```

## Add the Flatpak runtimes

```bash
org.freedesktop.Platform.VAAPI.Intel{,.i386}
org.freedesktop.Platform.GL{,32}.default # Default Drivers
org.freedesktop.Platform.GL{,32}.mesa-aco # Mesa ACO Drivers
```

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
