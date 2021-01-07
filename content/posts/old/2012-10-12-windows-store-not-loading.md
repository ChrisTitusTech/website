---
title: Windows Store not loading (On Domain)
author: Chris Titus
type: post
date: 2012-10-12T17:13:46+00:00
url: /windows-store-not-loading/
image: /images/2012/10/windows-store.png
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