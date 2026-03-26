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

Also verify with this command:

```
winmgmt /verifyrepository
```

Note: You should see `wmi repository is consistent` if the WMI repository is healthy. If you see `wmi repository is inconsistent`, it indicates that the WMI repository is corrupted and needs to be repaired.

## The Fix

First check if you can salvage the repository by running the following command in an elevated PowerShell:

```
winmgmt /salvagerepository
```

Then proceed to reset the WMI repository by running the following command in an elevated PowerShell (if above failed):

```
Stop-Service winmgmt -Force
Remove-Item C:\Windows\System32\wbem\Repository -Recurse -Force
winmgmt /resetrepository
Start-Service winmgmt
```

Then for my case to restore the System Restore part of the WMI I ran this command:

```
mofcomp C:\Windows\System32\wbem\sr.mof
```

Then I tested it via the powershell commands Get-ComputerRestorePoint to pull existing restore points from system restore.

