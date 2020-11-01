---
title: Launching a startup program to run as administrator
author: Chris Titus
type: post
date: 2017-03-27T02:26:36+00:00
url: /run-as-administrator/
image: /wp-content/uploads/2017/03/runasadmin.jpg
categories:
  - Windows
tags:
  - Windows 10

---
The following script shows you how to launch a startup program to run as administrator in Windows 10. This fixes many programs that require elevation and you don&#8217;t want to launch manually every time.<!--more-->

Almost every online tutorial I came across said to run it as a scheduled task. This is very cumbersome and I hate it, however using the following method is easier and saves you time.

Create a Text file in shell:startup and put the following in it.

```
Set WshShell = CreateObject("WScript.Shell" ) 
WshShell.Run chr(34) & "C:\Program Files (x86)\File\Program.exe" & Chr(34), 0 
Set WshShell = Nothing
```

Now save the file as ProgramName.vbs

You are done! Reboot and see that program launch.

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