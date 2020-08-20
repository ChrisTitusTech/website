---
title: Garmin Express on Linux | Step by Step Guide
author: Chris Titus
type: post
date: 2019-02-15T22:20:57+00:00
url: /garmin-express-linux/
image: /wp-content/uploads/2019/02/garmin-express-icon-1.png
categories:
  - Linux
tags:
  - Garmin Express
  - Wine

---
This is an installation guide on how to get Garmin Express on Linux working. In this Step by Step Guide, I go over creating a new wine bottle and installing Garmin Express in it. <!--more-->

## Linux Package Requirements:

  * wine-devel _Note:3.19 or higher_
  * winetricks

## Installation Steps

First we start by creating a wineprefix and installing our prerequisites from terminal:

`WINEARCH=win32 WINEPREFIX=/home/$USER/GarminExpress winetricks dotnet452 vcrun2010 corefonts`  
`WINEARCH=win32 WINEPREFIX=/home/$USER/GarminExpress winetricks win7`

_Note: You will be prompted during the setup for .NET installation just hit next and finish. Also, I like to seperate win7 after the prerequisites are setup to make sure the wineprefix runs in Windows 7 mode._ 

With that out of the  way we need to download and install our GarminExpress.exe Setup executable. I downloaded mine from <https://www.garmin.com/en-US/software/express>

Run the GarminExpress.exe file in our wine prefix

`WINEPREFIX=/home/$USER/GarminExpress wine explorer /desktop=garmin,1366x768 /home/$USER/Downloads/GarminExpress.exe`

_Note: If you downloaded the GarminExpress.exe to another location replace it above_

Modify your shortcut to be the following command

WINEPREFIX=/home/ctitus/GarminExpress wine explorer /desktop=garmin,1366x768 '/home/ctitus/GarminExpress/drive_c/Program Files/Garmin/Express/express.exe'

Upon Launch you should see this screen which should recognize your Garmin device

![Garmin Express on Linux](https://christitus.com/wp-content/uploads/2019/02/Selection_012.png) 

With all this done you will be able to launch Garmin Express on Linux. 

## Video Walkthrough

[![garminexpress-yt](https://img.youtube.com/vi/hg01Z6VCox0/0.jpg)](https://www.youtube.com/watch?v=hg01Z6VCox0)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

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
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join