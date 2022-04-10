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

## CTT Extra Content

- [ChrisTitus.com Downloads Section][1] (_CC Only_)
  1. Digital Downloads with Guides and Pre-Built Images
  2. Monthly Members Only Video
  3. $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  1. Monthly Members Only Video
  2. YouTube Emojis for Comments and Live Chat
  3. YouTube Badges that changes based on membership time for comments and chat.
  4. All YouTube comments are highlighted when I review comments daily. 
  5. $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join