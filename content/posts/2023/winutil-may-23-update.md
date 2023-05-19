---
title: "Windows Utility Update"

date: 2023-05-19
url: /winutil-may-23-update/
image: images/2023-thumbs/winutil-may-23-update.jpg
categories:
  - Windows
tags:
  - Winutil
draft: false
---
A big update with about 50 commits has made it to the May 2023 Windows Utility Update.
<!--more-->


## The Big Changes

- Import/Export Command
- Winget upgrades and selection of already installed programs
- Tweaks checker (still early days, but improving)
- Added Desktop Shortcut for running Winutil

## Summary of ALL commits

Source: <https://github.com/ChrisTitusTech/winutil/pull/726>

- Update to GUI (InputXML)
- Fix Dark Mode
- Tweaks.json Update (Services restoring to factory)
- Fix Hovertime (annoying instant pop-up is removed)
- Fix IRPStackSize (minor networking tweak)
- O&O Shutup shortcut fix (was failing to apply tweaks)
- More runspace tweaks from Durp (better performance and faster)
- Added Toggle for Calendar/Notification Center
- Updated Edge Removal
- Program Additions
  - WinRAR
  - Ubisoft Connect
  - Neovim
  - Node Version Manager
  - Geforce NOW
- Preload winget with already installed tweaks/programs
- Split AllowGameDVR to make sure xbox game bar does NOT break
- Removed Atom IDE from Programs due to it being sunset
- Fixed OriginalType from stock Windows installs to always restore to Microsoft preset Services

## Walkthrough Video

{{< youtube "ju_BSNKeP6w" >}}
