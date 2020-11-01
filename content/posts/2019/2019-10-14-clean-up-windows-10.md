---
title: Clean Up Windows 10
author: Chris Titus
type: post
date: 2019-10-14T20:08:01+00:00
url: /clean-up-windows-10/
image: /wp-content/uploads/2019/10/cleanup-win10-300x169.jpg
categories:
  - Windows
tags:
  - Windows 10
  - PowerShell

---
In this article, we will clean up Windows 10. This will include debloat, startup maintenance, system tweaks, and privacy settings. These 3 stages are broken down below and will help maintain a healthy Windows 10 system. I&#8217;d recommend re-running these steps every 6 months. <!--more-->

## Step 1: Debloat Windows 10

We will be utilizing PowerShell to clean up Windows 10 and get rid of a bunch of useless bloat that is included with it.

### Download PowerShell Script

![Screenshot_20191014_144201](../../wp-content/uploads/2019/10/Screenshot_20191014_144201.png)

#### Run PowerShell Script

![runcmd](../../wp-content/uploads/2019/10/runcmd.png)

`iex ((New-Object System.Net.WebClient).DownloadString('https://git.io/debloat'))`

**Note: This will remove many apps in the Microsoft Store. Games, Office 365 and things that utilize the Microsoft Store. If unsure, use the customize blacklist and only tick the boxes of things you want to remove!**  
Source: https://github.com/Sycnex/Windows10Debloater

## Step 2: Clean Up Windows 10 Startup

![taskmanager](../../wp-content/uploads/2019/10/taskmanager.png)

**Launch Task Manager** and then click the startup tab. You need to disable any unneeded programs from here.

### Changing Startup Programs (Advanced Users)

![startup10](../../wp-content/uploads/2019/10/startup10.png)

You can change startup programs from Start-Run-Type:`shell:startup` and Start-Run-Type: `shell:common startup`

You can also modify startup programs using registry editor HKCU or `HKLM\Software\Microsoft\Windows\CurrrentVersion\Run`

Cleanup **Task Scheduler**, as it accumulates many things that cause an install to be slow and is vital when you clean up Windows 10.

## Step 3: System Tweaks and Privacy

There is literally hundreds of settings in Windows 10 that are privacy concerns and why I&#8217;d recommend using a 3rd party software for this. However, you can do all the same tweaks by simply going through settings and doing all these manually. That said, I recommend using O&O Shutup10 for optimal tweaks and privacy.

![oo-shutup10](../../wp-content/uploads/2019/10/oo-shutup10.png)

Download: <https://www.oo-software.com/en/shutup10>

I also tell everyone to use the **recommended settings** as the other settings can have unintended consequences.

### Other Recommended Settings

**Turn off Hibernation:** powercfg /hibernate off  
**Modify Applications Menu:** explorer shell:AppsFolder  
**Change Windows 10 Start Menu:** shell:StartMenuAllPrograms or shell:Start Menu

## Video Walkthrough

[![secure web server](https://img.youtube.com/vi/mWHiP9K8fQ0/0.jpg)](https://www.youtube.com/watch?v=mWHiP9K8fQ0)  
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
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join