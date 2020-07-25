---
title: Cleanup Server WinSxS Free Space on Server 2008 and Server 2012
author: Chris Titus
type: post
date: 2016-08-03T23:19:49+00:00
url: /winsxs-free-space-server/
image: /wp-content/uploads/2016/08/cleanup-space-on-server.png
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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
