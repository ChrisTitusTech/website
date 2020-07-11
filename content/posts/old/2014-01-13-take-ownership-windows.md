---
title: Take ownership of an entire drive in Windows
author: Chris Titus
type: post
date: 2014-01-13T16:37:53+00:00
url: /take-ownership-windows/
image: /wp-content/uploads/2014/01/ownership.jpg
categories:
  - Windows

---
The commands below will show you how to take ownership of an entire drive. Here is a simple script to accomplish just that.<!--more-->

Option 1: Create a cmd file takeowner.cmd in notepad

Option 2: Type the following or past this in a command line prompt one line at a time

```
takeown /f %1 /r /d y
icacls %1 /grant administrators:F /t
```
_Please Note: This will take a large amount of time on big drives_

In closing, this will work in almost any situation, however, if you do have issues check out my PowerShell post on taking ownership of entire network drives.

[File Permissions in PowerShell][5]

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
 [5]: https://www.christitus.com/changing-file-permissions/
