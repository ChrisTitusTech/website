---
title: "The Ultimate Windows Utility"

date: 2022-05-13T13:07:19-05:00
url: /windows-tool/
image: images/2022-thumbs/windows-tool.webp
categories:
  - Windows
tags:
  - Debloat Windows
  - ninite
featured: true
---
Refined over years, this utility goes beyond debloating Windows:

- Install and update apps via WinGet (broader catalog than Ninite)
- Apply practical, safe tweaks
- Use proven Windows Update presets used in business environments

Important: Use at your own risk. Misuse can break your system, and no support is provided.
<!--more-->

## One Command - Download and Usage

**If you want to support the project, you can buy an exe version at <https://cttstore.com> or <https://christitus.com/downloads/>**

Run in an elevated PowerShell (Run as Administrator):

```
iwr -useb https://christitus.com/win | iex
```
Or:
```
irm christitus.com/win | iex
```

## Utility Components

Modules:
- Install
- Tweaks
- Features & Legacy Panels
- Windows Updates
- MicroWin

### Install

![install](/images/2022/winutil/install.webp)

Uses WinGet to:
- Select and install apps with checkboxes
- Upgrade installed apps
- Save time and simplify maintenance

### Tweaks

![tweaks](/images/2022/winutil/tweaks.webp)

Purpose: Improve usability and performance without hurting stability.

Profiles:
- Standard: Performance-focused defaults
- Minimal: Essential privacy and security

Notes:
- Conservative approach; avoids aggressive debloat
- Do not select everything or remove the Microsoft Store unless you accept breaking the Store and apps
- A restore point is created; use System Restore or "Undo All" to revert
- Provided as-is, no warranty

### Features and Legacy Windows Panels

![features](/images/2022/winutil/features.webp)

- Enable built-in Windows features quickly
- Access classic control panels (often faster for power users)

### Windows Updates

![updates](/images/2022/winutil/updates.webp)

Presets:
- Default will reset Windows Update settings to stock settings.
- Recommended: Security-only; defer feature updates ~24 months
- Disable All: Not recommended; use only for legacy/isolated systems (stability over security)

_Note: The disable update has been revamped on 09-02-2025 to completely disable updates on every windows version. Use the Default button to restore update functionality!_

### MicroWin

![microwin](/images/2022/winutil/microwin.webp)

- Minimal Windows profile focused on speed and low footprint
- Removes unnecessary components and preinstalled apps while preserving core functionality

## Demonstration Videos

{{< youtube 92SM8Az5QVM >}}

{{< youtube IuaNw8Tpn7Q >}}
