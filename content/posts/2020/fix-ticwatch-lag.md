---
title: "Fix Ticwatch Lag"
type: post
date: 2020-08-27T09:49:33-05:00
url: /fix-ticwatch-lag/
image: /images/2020-thumbs/fix-ticwatch-lag.jpg
categories:
  - Android
tags:
  - TicWatch
---
Lets fix the lag on the TicWatch. There is tons of bloat that needs to be removed to get a responsive interface.
<!--more-->

## Requirements

- Install ADB Tools
  - Windows - <https://dl.google.com/android/repository/platform-tools-latest-windows.zip> or `choco install adb` _Chocolatey Users Only_
  - Linux - <https://dl.google.com/android/repository/platform-tools-latest-linux.zip> or `sudo apt install adb` Debian or `yay -S adb` Arch
  - MacOS - <https://dl.google.com/android/repository/platform-tools-latest-darwin.zip>

- Enable Developer Tools on TicWatch
  - Under settings - Click About
  - Click the Build number 7 times to enable developer tools

- Enable Wi-fi Debugging in Developer Tools
  - Under settings - Click Developer Tools
    - Enable ADB Debugging
    - Enable ADB Debugging Wi-fi

#### Note: Ensure both the Watch and Computer are on the same Wifi network

## Removing TicWatch Bloat

This removes all the mobvoi crap that is junking up your watch. 

- Connect to your watch
  - `adb connect IP_ADDRESS:5555`
- Check Devices
  - `adb devices`
  - *Verify you see your watch!*
- Run the following commands to remove all the bloat:

```bash
adb shell
pm uninstall -k --user 0 com.mobvoi.wear.account.aw
pm uninstall -k --user 0 com.mobvoi.companion.aw
pm uninstall -k --user 0 com.mobvoi.ticwatch.cmodel.c2.male
pm uninstall -k --user 0 com.mobvoi.wear.appsservice
pm uninstall -k --user 0 com.mobvoi.wear.fitness.aw
pm uninstall -k --user 0 com.mobvoi.wear.health.aw
pm uninstall -k --user 0 com.mobvoi.wear.privacy.aw
pm uninstall -k --user 0 com.mobvoi.wear.system.aw
pm uninstall -k --user 0 com.mobvoi.wear.watchface.aw
```

Screenshot  
![ticwatch](/images/2020/ticwatch.jpg)

## Using Google Fit and other WearOS Apps

Now with all the garbage gone you can use all the other apps that are well maintained and optimized. You will notice that your watch is no longer lagging and it runs just like any other good wearable. 

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