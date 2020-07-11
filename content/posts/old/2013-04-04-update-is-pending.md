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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
