---
title: "Ultimate Windows Setup Guide"

date: 2020-07-27T14:26:59-05:00
url: /ultimate-windows-setup-guide/
image: images/2020-thumbs/ultimate-windows-setup-guide.webp
categories:
  - Windows
tags:
  - Powershell
---
 This guide will walk you through a fresh Windows installation and debloat the services, tasks, and apps that are running in the background. 
<!--more-->

## One Command to Do Everything

![OneCommand](/images/onecommand.webp)

```
powershell -nop -c "iex(New-Object Net.WebClient).DownloadString('https://git.io/JJ8R4')"
```

## GitHub Project for Debloating, Optimization, and Installing Programs

![github](/images/github.webp)

<https://github.com/ChrisTitusTech/win10script/tree/master>

This project was using many of the aspects of other debloat scripts, but I combined system admin scripts with it that I use to configure workstations at businesses. I also added Chocolatey package manager to the script for easy program installations.

The script will remove scheduled tasks, windows applications, install common applications (adobe reader, notepad++, java, and more), while also disabling services, and removing windows components like Cortana that are performance hogs.

## What this script does

### Main Programs and Tweaks

- Installs Chocolatey (Package Manager for Windows)
- Installs O&O Shutup 10 and Runs Recommended Settings
- Misc 3rd Party program installs (Adobe, 7-Zip, Notepad++, and Media Player Classic-HC)
- Removals all Bloatware in MS Store (Leaves Office, Snip Tool, Xbox and other Apps used for Gaming)

### Privacy Tweaks

Disabled Services and Tasks
- Telemetry
- Wifi Sense
- Smart Screen and Web Search
- App Suggestions and Activity History
- Location Tracking and Maps
- Feedback and Tailored Experiences
- Error Reporting
- Cortana
- Advertising ID.

### Security Tweaks

- UAC Set to Low
- Disable SMB version 1
- Set Network to Private
- Disable Controlled Folder Access
- Disable Microsoft Defender (Check customization if not using another AV)
- Disable Meltdown Flag (Big performance boost for Intel Users)
- Enables F8 Boot Menu

### Service Tweaks

Services Disabled:

- Malware Removal Tool
- Driver Updates
- Home Groups
- Shared Experiences
- Remote Assistance
- Autoplay
- Storage Sense
- DeFragmentation
- Superfetch
- Indexing
- Hibernation
- Sleep Timeout

### UI Tweaks

Windows 10's user interface is a mess and has too many notifications. This removes the Action Center, LockScreen, Sticky Keys, Task View, Expands File Transfer details by default, Show all tray icons, and various other tweaks.

### Application Tweaks

This script will keep the core of Microsoft Office, but most other Microsoft products that are sideloaded are removed. OneDrive is a big one that some use, so if you want that functionality check the customization section. Most other features removed aren't used, like Internet Explorer and Work Folders.

## Customization

I encourage people to fork this project and comment out things they don't like! Here are a list of normal things people change:

- Uninstalling OneDrive (This is on in my script)
- Installing Adobe, Chocolatey, Notepad++, MPC-HC, and 7-Zip

Comment any thing you don't want out... Example:

```
########## NOTE THE # SIGNS! These disable lines This example shows UACLow being set and Disabling SMB1
### Security Tweaks ###
"SetUACLow",                  # "SetUACHigh",
"DisableSMB1",                # "EnableSMB1",

########## NOW LETS SWAP THESE VALUES AND ENABLE SMB1 and Set UAC to HIGH
### Security Tweaks ###
"SetUACHigh",
"EnableSMB1",
```

## Video Walkthrough

{{< youtube Tfd7BXCo9Xk >}}  

## Conclusion

This script will be great for most users out there without losing much if any functionality. I typically run this on every system I setup, but I encourage you to fork this project and make the customizations that you need. Anything is possible, and everything can be automated. Save yourself hours of time and learn how to use not only this script, but using PowerShell.

