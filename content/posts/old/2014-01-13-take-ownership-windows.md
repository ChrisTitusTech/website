---
title: Take ownership of an entire drive in Windows
author: Chris Titus

date: 2014-01-13T16:37:53+00:00
url: /take-ownership-windows/
image: /images/2014/01/ownership.jpg
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
 [2]: https://links.christitus.com/join [5]: https://christitus.com/changing-file-permissions/
