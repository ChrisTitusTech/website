---
title: Logitech C920 Linux Driver | Fix Lag and Disable Auto-Focus
author: Chris Titus
type: post
date: 2018-11-09T20:36:56+00:00
url: /logitech-c920-linux-driver/
image: /wp-content/uploads/2018/11/c920-pro-hd-webcam-refresh.png
categories:
  - Linux
tags:
  - Logitech
  - C920 WebCam

---
With my webcam, I was having major issues and tried looking for a Logitech C920 Linux Driver, as I have a Logitech C920 Webcam that is very laggy in Linux, but in Windows, I don&#8217;t have any issues. I found out that the autofocus and exposure were causing a ton of issues. After following this guide, you will be able to fix this issue. <!--more-->

## Logitech C920 Linux Driver Problem

So there isn&#8217;t a Logitech program to control and optimize your Logitech camera in Linux, like the Windows counterpart. However, there is a command line program that will allow you to change ANY setting on the Logitech camera. This is, in my opinion, way better than the Windows clunky Logitech Application. So let&#8217;s get our program to do just that and fix these horrible default settings.

### Install v4l-utils

**Ubuntu/Debian:**
  
`sudo apt-get install v4l-utils`
  
**Fedora/Centos:**
  
`sudo yum install v4l-utils`

### Change Settings using v4l-utils

Find your C920 Webcam or other webcams you need to switch the default settings on.

**Command:**
  
`v4l2-ctl --list-devices`
  
**Output:**
  
![c920-selection2](/wp-content/uploads/2018/11/Selection_002.png)

### List controls for the Logitech C920

`v4l2-ctl -d /dev/video6 --list-ctrls`
  
**Output:**
  
![c920-selection3](/wp-content/uploads/2018/11/Selection_003.png)

### There are two values we need to change to get the best performance from our webcam.

**Here is the command syntax:**
  
`v4l2-ctl -d /dev/video6 --set-ctrl=exposure_auto=1`  
`v4l2-ctl -d /dev/video6 --set-ctrl=focus_auto=0`

### Video Walkthrough

[![iscsi-ya](https://img.youtube.com/vi/7SZBQ5bqaWU/0.jpg)](https://www.youtube.com/watch?v=7SZBQ5bqaWU)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

Now that you know about the Logitech C920 Linux Driver support and how it functions, you can fix it. I hope this helps you as it took me quite a while to hunt down this information.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
