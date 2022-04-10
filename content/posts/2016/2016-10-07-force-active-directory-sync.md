---
title: Force active directory sync to Office 365 with Azure ADSync
author: Chris Titus

date: 2016-10-07T14:01:26+00:00
url: /force-active-directory-sync/
image: images/2016/10/ActiveDirecotry2.png
categories:
  - Windows Server
tags:
  - ADSync
  - Office365
  - Powershell
---
Use the following from an Elevated Powershell Prompt to force active directory sync to your O365 admin portal. You will be performing this on the server where Azure AD Sync is installed, however, when running this command you will need to wait 5 minutes before checking your portal to verify it is working. In larger environments, this can take a longer time.<!--more-->

```
Import-Module “C:\Program Files\Microsoft Azure AD Sync\Bin\ADSync\ADSync.psd1”
Start-ADSyncSyncCycle -PolicyType Delta
```

This is great for forcing a sync of time-sensitive distribution list updates or user updates. If you find yourself doing this frequently make a PowerShell script for ease of access.

## CTT Extra Content

- [ChrisTitus.com Downloads Section][1] (_CC Only_)
  1. Digital Downloads with Guides and Pre-Built Images
  2. Monthly Members Only Video
  3. $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  1. Monthly Members Only Video
  2. YouTube Emojis for Comments and Live Chat
  3. YouTube Badges that changes based on membership time for comments and chat.
  4. All YouTube comments are highlighted when I review comments daily. 
  5. $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join