---
title: Windows Store not loading (On Domain)
author: Chris Titus

date: 2012-10-12T17:13:46+00:00
url: /windows-store-not-loading/
image: images/2012/10/windows-store.png
categories:
  - Windows

---
After joining my computer to the domain windows store would not load. I first had to re-enable UAC because of a GPO and that fixed launching the metro apps. I was still having the issue with Windows Store not loading and this fixed it.<!--more-->

## Symptoms

First, if you’re getting shut out of the store (“Can’t connect to the Store right now” kind of messages) & on a corporate, managed machine (you’ll see ‘Managed by your system administrator’ in Windows Update) – plus getting stuff like this in event viewer:

>Fault bucket -1485561316, type 5  
>Event Name: WindowsUpdateFailure2

## Resolution

```
[HKEY_LOCAL_MACHINESOFTWAREPoliciesMicrosoftWindowsWindowsUpdate]
"DisableWindowsUpdateAccess"=dword:00000000
```

Either copy/paste that text into a text file, save it as storefix.reg & run it, or navigate to that tree & change the DWORD from 1 to 0. Next, go into services.msc & restart the Windows Update service.

