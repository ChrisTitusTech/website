---
title: "How to Install Only Security Updates on Windows 10"
type: post
date: 2020-03-29T21:55:22-05:00
url: /windows-update-security-only/
image: /images/2020-thumbs/windows-update-fix.jpg
categories:
  - Windows
tags:
  - Windows Update
---
This article shows how to install only security updates on Windows 10. This is vital to avoid long updates on startup or shutdown!
<!--more-->

## Windows 10 Pro Users - Policy Editor Method
Open your Local Policy editor (Start - Run) and type `gpedit.msc`  
From this screen go to `Computer - Administrative Templates - Windows Components - Windows Update - Windows Update for Business`  
![gpedit](../images/2020/winupdate/gpedit.png)

Now set the *Feature Updates* to the following  
![gpedit2](../images/2020/winupdate/gpedit2.png)

For *Quality Updates*, I recommend deferring those 4 days. 

## Windows 10 Home Users - Regedit Method
Open up your registry editor (Start - Run) and type `regedit`  
Go to the follow key `Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings`  
Add the following DWORD Values (32-bit value):
  - BranchReadinessLevel 20
  - DeferFeatureUpdatesPeriodInDays 365
  - DeferQualityUpdatesPeriodInDays 4
  
![regedit](../images/2020/winupdate/regedit.png)  

## Set Active Hours
Under Settings and Updates & Security, make sure to set your active hours! I always set these manually as the automatic method is horrible. Always set an 18 hour window where you want to make sure your computer doesn't update.  
*My personal active hours are 8 AM to 2 AM.* 

## Video Walkthrough

## Conclusion
These are settings that I recommend anyone using windows adopt. Otherwise, you will run into many update issues caused by the terrible quality control that goes into the first couple rounds of updates in Microsoft Windows 10. 

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
