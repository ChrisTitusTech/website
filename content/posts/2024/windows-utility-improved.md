---
title: "Windows Utility Improved"

date: 2024-04-25
url: /windows-utility-improved/
image: images/2024-thumbs/windows-utility-improved.jpg
categories:
  - Windows
tags:
  - winutil
draft: true
---
The Chris Titus Tech WinUtil is now the #2 Most Popular Powershell utility in the World on GitHub.
<!--more-->

## What does it do?

It has 5 main tabs:

- Program Installation - Check all the programs you want and click install in one go.
- Tweaks - Disable Telemetry and cut down on running background services. 
- Config - Configure your system and launch legacy Win7 Control Panels.
- Updates - Change Windows Update to only use Security Updates or Disable them altogether.
- MicroWin - Create a minimal ISO to Install Windows.

## How to Run it?

Launch Terminal(Admin) by right clicking Start Button

Type this command in to launch the toolbox

```
irm christitus.com/win | iex
```

Want an EXE? Help fund the project:

<https://cttstore.com>

*NOTE: This exe is a wrapper for the command above. No purchase is needed to run the script!*

### Improvements in 2024

- Import and Export Commands
  - `iex "& { $(irm christitus.com/win) } -Config [path-to-your-config] -Run"`
- Improved UI
- Winget Installer uses 3 methods to install apps, System Scope, User Scope, and Unelevated.
- Get Classic Right-Click Menu
- Edge Removal
- Co-Pilot Removal

### Development Enhancements

- Fixed Unit Tests
- Modular
  - Config Folder (All tweaks are in JSON format in their own file. `applications.json, tweaks.json, feature.json, etc.`)
  - Function Folder (All functions are independent: private functions are not in GUI and public functions are in GUI)
  - lint, logs, pester, releases are all github related actions and for debugging.
  - scripts Folder is for the main section setting up runspaces and launching GUI.
  - xaml folder is for the GUI.

## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
