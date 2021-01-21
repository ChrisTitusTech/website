---
title: Force active directory sync to Office 365 with Azure ADSync
author: Chris Titus

date: 2016-10-07T14:01:26+00:00
url: /force-active-directory-sync/
image: /images/2016/10/ActiveDirecotry2.png
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