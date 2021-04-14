---
title: "Flatpak Acceleration"

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

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://christitus.com/lbry>

#### Exclusive Content

- [ChrisTitus.com Members Section][1] (_CC Only_)
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  - Monthly Members Only Video
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join