---
title: Take ownership of an entire drive in Windows
author: Chris Titus

date: 2014-01-13T16:37:53+00:00
url: /take-ownership-windows/
image: images/2014/01/ownership.jpg
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

 [5]: https://christitus.com/changing-file-permissions/
