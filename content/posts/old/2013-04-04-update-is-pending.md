---
title: Could not continue installation because update is pending
author: Chris Titus

date: 2013-04-04T19:04:14+00:00
url: /update-is-pending/
image: images/2013/04/error.webp
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

