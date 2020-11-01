---
title: Force active directory sync to Office 365 with Azure ADSync
author: Chris Titus
type: post
date: 2016-10-07T14:01:26+00:00
url: /force-active-directory-sync/
image: /wp-content/uploads/2016/10/ActiveDirecotry2-624x253.png
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