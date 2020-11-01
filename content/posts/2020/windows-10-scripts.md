---
title: "Windows 10 Scripts"
type: post
date: 2020-08-14T11:43:17-05:00
url: /windows-10-scripts/
image: /images/2020-thumbs/windows-10-scripts.jpg
categories:
  - Windows
tags:
  -  PowerShell
---
Three Windows 10 Scripts
<!--more-->

![OneCommand](/images/onecommand.png)

---

## Regular (No OneDrive, Indexing, and Defender)

```Powershell
powershell -nop -c "iex(New-Object Net.WebClient).DownloadString('https://git.io/JJ8R4')"
```

---

## Minimal (Only Targets Bloatware/Telemetry)

```Powershell
powershell -nop -c "iex(New-Object Net.WebClient).DownloadString('https://git.io/JJ5qc')"
```

---

## LTSC Style Debloat 
(*WARNING: WILL UNINSTALL LOTS OF STUFF*)  
<https://raw.githubusercontent.com/ChrisTitusTech/win10script/master/ultra-ltsc.ps1>

## Video Walkthrough

[![pi laptop](https://img.youtube.com/vi/2R28u7o9mls/0.jpg)](https://www.youtube.com/watch?v=2R28u7o9mls)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
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