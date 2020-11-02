---
title: Could not continue installation because update is pending
author: Chris Titus
type: post
date: 2013-04-04T19:04:14+00:00
url: /update-is-pending/
image: /wp-content/uploads/2013/04/error.png
categories:
  - Windows Server
tags:
  - Exchange Server

---
When installing a program I kept getting the prompt below that an update is pending. Even after a restart, this would display, therefore I changed these registry keys to clear up the issue.<!--more-->

> Microsoft Server setup cannot continue because a restart from a previous installation or update is pending.

## The Fix for an update is pending

The following Registry keys control this error message. If you have rebooted and are still experiencing this issue, clear out these keys and relaunch your installer.

```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Updates\UpdateExeVolatile
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\ControlSession Manager\PendingFileRenameOperations
```

The Setup MSI displays an error message if one of the following conditions is true:

  * The value of the **UpdateExeVolatile **registry key is anything other than 0.
  * The **PendingFileRenameOperations **registry key has any value.

### Microsoft Knowledgebase article

You can read this article about regedit.

<http://technet.microsoft.com/en-us/library/cc164360(v=exchg.80).aspx>

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
 [5]: https://links.christitus.com/join