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


I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
