---
title: "Windows 10 Scripts"

date: 2020-08-14T11:43:17-05:00
url: /windows-10-scripts/
image: images/2020-thumbs/windows-10-scripts.jpg
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

```
powershell -nop -c "iex(New-Object Net.WebClient).DownloadString('https://git.io/JJ8R4')"
```

---

## Minimal (Only Targets Bloatware/Telemetry)

```
powershell -nop -c "iex(New-Object Net.WebClient).DownloadString('https://git.io/JJ5qc')"
```

---

## LTSC Style Debloat 
(*WARNING: WILL UNINSTALL LOTS OF STUFF*)  
<https://raw.githubusercontent.com/ChrisTitusTech/win10script/master/ultra-ltsc.ps1>

## Video Walkthrough

[![pi laptop](https://img.youtube.com/vi/2R28u7o9mls/0.jpg)](https://www.youtube.com/watch?v=2R28u7o9mls)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

## CTT Extra Content

- [ChrisTitus.com Downloads Section][1] (_CC Only_)
  1. Digital Downloads with Guides and Pre-Built Images
  2. Monthly Members Only Video
  3. $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  1. Monthly Members Only Video
  2. YouTube Emojis for Comments and Live Chat
  3. YouTube Badges that changes based on membership time for comments and chat.
  4. All YouTube comments are highlighted when I review comments daily. 
  5. $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join