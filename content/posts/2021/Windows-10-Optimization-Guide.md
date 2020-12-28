---
title: "Windows 10 Optimization Guide"
type: post
date: 2020-12-28T14:34:52-06:00
url: /Windows-10-Optimization-Guide/
image: /images/2021-thumbs/Windows-10-Optimization-Guide.jpg
categories:
  - Windows
tags:
  - Optimizations
draft: true
---
This guide goes over using a Custom ISO, Removing Windows 10 Components, and Optimizing Windows 10 Settings. 
<!--more-->

## Custom ISO

Easiest Method NTLite ($30) - <https://www.ntlite.com/>

Free Method MSMG Toolkit - <https://msmgtoolkit.in/>

Using sysprep from Microsoft <https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/sysprep--generalize--a-windows-installation>

## Installing Windows 10 and Removing Components

The Full AME Experience. Most people will NOT want to do this as it will remove functionality from Windows 10, that you CAN NOT put back in. Some of the components can be taken out in the Custom ISO phase, but this takes it to another level. 

*Note: I do NOT recommend this for MOST machines*

Components Removed
- Windows Update
- Windows Store
- Media Player Functions
- Telemetry
- Windows Activation (YOU MUST Activate Windows Before this Tweak!) _If you fail to do this, you will have a watermark you can't get rid of_
- DirectX 12

Source files for Tweaks <https://ameliorated.info/> or my GitHub mirror <https://github.com/ChrisTitusTech/windows-lite-2004>

### Installation Overview

- Install Windows 10 (Stock or Custom ISO)
- Activate Windows 10 and Disconnect from Internet afterwards
- Run `amelioration_2004.bat` as Admin and Pre-Amelioration
- Reboot to Linux (I recommend Linux Mint)
- Run `sudo ./ameliorate_2004.sh` in Terminal on Live Linux USB
- Reboot back to Windows
- Run `amelioration_2004.bat` as Admin and Post-Amelioration

### AME Step-by-Step Documentation

<https://wiki.ameliorated.info/doku.php?id=documentation_2004>

## Optimizing Windows 10 Settings



## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
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