---
title: "Restore WMI after Corruption"

date: 2026-03-16
url: /restore-wmi-corruption/
image: images/2026-thumbs/restore-wmi-corruption.webp
categories:
  - Windows
tags:
  - WMI
draft: false
---
The WMI database can become corrupted, leading to various system issues. This article provides a step-by-step guide to restore WMI after corruption.
<!--more-->

Example of my WMI corruption (System Restore not supported from powershell)

![WMI-corruption](/images/2026/WMI-corruption.webp)

## The Fix

reset the WMI repository by running the following command in an elevated PowerShell:

```
Stop-Service winmgmt -Force
Remove-Item C:\Windows\System32\wbem\Repository -Recurse -Force
Start-Service winmgmt
```

Then for my case to restore the System Restore part of the WMI I ran this command:

```
mofcomp C:\Windows\System32\wbem\sr.mof
```

Then I tested it via the powershell commands Get-ComputerRestorePoint to pull existing restore points from system restore.

