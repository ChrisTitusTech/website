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
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join