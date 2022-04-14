---
title: Cleanup Server WinSxS Free Space on Server 2008 and Server 2012
author: Chris Titus

date: 2016-08-03T23:19:49+00:00
url: /winsxs-free-space-server/
image: images/2016/08/cleanup-space-on-server.png
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

