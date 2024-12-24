---
title: Force active directory sync to Office 365 with Azure ADSync
author: Chris Titus

date: 2016-10-07T14:01:26+00:00
url: /force-active-directory-sync/
image: images/2016/10/ActiveDirecotry2.webp
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

