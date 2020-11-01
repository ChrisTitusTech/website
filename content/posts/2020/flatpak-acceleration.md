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

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join