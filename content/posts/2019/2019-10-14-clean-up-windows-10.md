---
title: Clean Up Windows 10
author: Chris Titus

date: 2019-10-14T20:08:01+00:00
url: /clean-up-windows-10/
image: images/2019/10/cleanup-win10-300x169.webp
categories:
  - Windows
tags:
  - Windows 10
  - PowerShell

---
In this article, we will clean up Windows 10. This will include debloat, startup maintenance, system tweaks, and privacy settings. These 3 stages are broken down below and will help maintain a healthy Windows 10 system. I&#8217;d recommend re-running these steps every 6 months. <!--more-->

## July 2021 Update - CTT Official Debloat Launched

Check out the updated debloat and utility toolbox here: <https://christitus.com/debloat-windows-10-2020/>

Old Content is below with an older method of debloating Windows 10. 

## Step 1: Debloat Windows 10

We will be utilizing PowerShell to clean up Windows 10 and get rid of a bunch of useless bloat that is included with it.

### Download PowerShell Script

![Screenshot_20191014_144201](../../images/2019/10/Screenshot_20191014_144201.webp)

#### Run PowerShell Script

![runcmd](../../images/2019/10/runcmd.webp)

`iex ((New-Object System.Net.WebClient).DownloadString('https://git.io/debloat'))`

**Note: This will remove many apps in the Microsoft Store. Games, Office 365 and things that utilize the Microsoft Store. If unsure, use the customize blacklist and only tick the boxes of things you want to remove!**  
Source: https://github.com/Sycnex/Windows10Debloater

## Step 2: Clean Up Windows 10 Startup

![taskmanager](../../images/2019/10/taskmanager.webp)

**Launch Task Manager** and then click the startup tab. You need to disable any unneeded programs from here.

### Changing Startup Programs (Advanced Users)

![startup10](../../images/2019/10/startup10.webp)

You can change startup programs from Start-Run-Type:`shell:startup` and Start-Run-Type: `shell:common startup`

You can also modify startup programs using registry editor HKCU or `HKLM\Software\Microsoft\Windows\CurrrentVersion\Run`

Cleanup **Task Scheduler**, as it accumulates many things that cause an install to be slow and is vital when you clean up Windows 10.

## Step 3: System Tweaks and Privacy

There is literally hundreds of settings in Windows 10 that are privacy concerns and why I&#8217;d recommend using a 3rd party software for this. However, you can do all the same tweaks by simply going through settings and doing all these manually. That said, I recommend using O&O Shutup10 for optimal tweaks and privacy.

![oo-shutup10](../../images/2019/10/oo-shutup10.webp)

Download: <https://www.oo-software.com/en/shutup10>

I also tell everyone to use the **recommended settings** as the other settings can have unintended consequences.

### Other Recommended Settings

**Turn off Hibernation:** powercfg /hibernate off  
**Modify Applications Menu:** explorer shell:AppsFolder  
**Change Windows 10 Start Menu:** shell:StartMenuAllPrograms or shell:Start Menu

## Video Walkthrough

{{< youtube mWHiP9K8fQ0 >}}  

