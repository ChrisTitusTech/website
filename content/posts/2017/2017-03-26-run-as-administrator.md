---
title: Launching a startup program to run as administrator
author: Chris Titus
type: post
date: 2017-03-27T02:26:36+00:00
url: /run-as-administrator/
image: /images/2017/03/runasadmin.jpg
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