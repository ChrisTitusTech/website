---
title: "Setting Up the Ultimate Windows 11"

date: 2022-10-19
url: /setting-up-the-ultimate-windows-11/
image: images/2022-thumbs/setting-up-the-ultimate-windows-11.webp
categories:
  - Windows
tags:
  - Custom ISOs
draft: false
---
This guide shows you how to get the best performing Windows in the lightest package possible.
<!--more-->

{{< tweet user="christitustech" id="1578070224896663553" >}}

## Before you begin

A custom ISO is a MUST! With extreme debloat we will be removing Windows Update, Security Services, and a variety of other system services that will bring Windows back to the XP era. 

If your never used Windows XP, it was an extremely light OS by today's standards, but it came at a cost. The update system was web based, there was no antivirus, and security center didn't appear until SP2 came out. This is a LOT like those days, where the user was responsible for the safety of their system. 

I also highly recommend buying NTLite if you want to live in this environment. Yes, it makes the ISO easier, but I absolutely love the fact it can control your Windows updates as well. Once a month, you can open NTLite and pull down the latest updates and apply them through their tool to the live install. 

## The Process

- Make the NTLite Install Media <https://christitus.com/ntlite-guide/>
- Install Windows
- Run my Windows utility <https://christitus.com/windows-tool/>

_Shortcut_
```
irm christitus.com/win | iex
```

## Issues with Minimal Install

Certain dependencies for programs will be missing. When you run my utility installation of winget will likely fail because there isn't a trace of the Microsoft store on the system. 

I manually grabbed these using Invoke Rest Method. These are the commands I used in the video below:

```
irm "https://aka.ms/Microsoft.VCLibs.x64.14.00.Desktop.appx"-o "./Microsoft.VCLibs.x64.14.00.Desktop.appx"
irm "https://github.com/microsoft/winget-cli/releases/download/v1.2.10271/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle"-o "./Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle"
irm "https://github.com/microsoft/winget-cli/releases/download/v1.2.10271/b0a0692da1034339b76dce1c298a1e42_License1.xml"-o "./b0a0692da1034339b76dce1c298a1e42_License1.xml"
Add-AppxProvisionedPackage -Online -PackagePath ".\Microsoft.VCLibs.x64.14.00.Desktop.appx" -SkipLicense
Add-AppxProvisionedPackage -Online -PackagePath ".\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle" -LicensePath ".\b0a0692da1034339b76dce1c298a1e42_License1.xml"
```

I'm working on expanding my tool to give an easy way to do this reliably for these types of minimal systems. If you'd like to support my work and its future development, consider grabbing the exe @ <https://cttstore.com/windows-toolbox>

## Walkthrough Video

{{< youtube WmOvg0MagW0 >}}
