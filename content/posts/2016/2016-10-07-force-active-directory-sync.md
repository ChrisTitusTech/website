---
title: Force active directory sync to Office 365 with Azure ADSync
author: Chris Titus
type: post
date: 2016-10-07T14:01:26+00:00
url: /force-active-directory-sync/
thumbnail: /wp-content/uploads/2016/10/ActiveDirecotry2-624x253.png
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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
