---
title: "Install Windows Update Powershell"

date: 2022-12-14
url: /install-windows-update-powershell/
image: images/2022-thumbs/install-windows-update-powershell.webp
categories:
  - Windows
tags:
  - Powershell
draft: false
---
Did you know you can install updates with using PowerShell? This is the Guide for doing that!
<!--more-->

## Pre-requisites

To install Windows updates via PowerShell, you need to install the module first:

```
Install-Module PSWindowsUpdate
Add-WUServiceManager -MicrosoftUpdate
```

## Commands

Install all available updates

```
Install-WindowsUpdate -MicrosoftUpdate -AcceptAll -AutoReboot | Out-File "C:\($env.computername-Get-Date -f yyyy-MM-dd)-MSUpdates.log" -Force
```

Force other computers to update

```
$Computers = "pc2,pc3,pc4"
Invoke-WUJob -ComputerName $Computers -Script {Import-Module PSWindowsUpdate; Install-WindowsUpdate -MicrosoftUpdate -AcceptAll -AutoReboot} -RunNow -Confirm:$false | Out-File "c:\$Computers-$(Get-Date -f yyyy-MM-dd)-MSUpdates.log" -Force
```

## Walkthrough Video

{{< youtube M2mMQfPGZsE >}}
