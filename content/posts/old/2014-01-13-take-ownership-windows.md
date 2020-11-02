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

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
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
 [5]: https://links.christitus.com/join [5]: https://christitus.com/changing-file-permissions/
