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

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://links.christitus.com/lbry>

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
 [2]: https://links.christitus.com/join