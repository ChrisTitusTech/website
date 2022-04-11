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

