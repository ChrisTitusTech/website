---
title: Launching a startup program to run as administrator
author: Chris Titus
type: post
date: 2017-03-27T02:26:36+00:00
url: /run-as-administrator/
thumbnail: /wp-content/uploads/2017/03/runasadmin.jpg
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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
