---
title: Cleanup Server WinSxS Free Space on Server 2008 and Server 2012
author: Chris Titus

date: 2016-08-03T23:19:49+00:00
url: /winsxs-free-space-server/
image: /images/2016/08/cleanup-space-on-server.png
categories:
  - Windows Server

---
Run the following commands if you are running low on C: drive space. Generally, this is caused by windows updates and you need to clear WinSxS free space. Do this in your PowerShell prompt and you will free up a substantial amount of space.<!--more-->

_Please Note: You have to run updates on Windows Server 2008 if you are far behind and these commands don&#8217;t exist!_

MASTER CLEANUP: (Run this First)
  
`Dism.exe /online /Cleanup-Image /SPSuperseded`

FOLLOWUP:
  
```
Windows 2008 Use: Dism.exe /online /Cleanup-Image /StartComponentCleanup
Windows 2012 Use: Dism.exe /online /Cleanup-Image /StartComponentCleanup /ResetBase
```

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://christitus.com/lbry>

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
 [2]: https://christitus.com/join