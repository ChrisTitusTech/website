---
title: "Windows 10 Optimization Guide"

date: 2020-12-30T14:34:52-06:00
url: /Windows-10-Optimization-Guide/
image: images/2021-thumbs/Windows-10-Optimization-Guide.webp
categories:
  - Windows
tags:
  - Powershell
---
This guide goes over using a Custom ISO, Removing Windows 10 Components, and Optimizing Windows 10 Settings. 
<!--more-->

## Custom ISO

The whole purpose of a custom ISO is to make the initial install as slim as possible. You don't have to uninstall bloat if it never gets installed to begin with!

Easiest Method *NTLite* ($30) - <https://www.ntlite.com/>

Free Method *MSMG Toolkit* - <https://msmgtoolkit.in/>

How to Make a Custom Windows 10 ISO with *MSMG Toolkit* Video  
{{< youtube R6XPff38iSc >}}  

### Microsoft Method for Custom ISO (Advanced Users Only)

Downloading in Installing ADK (Microsoft Image Tools) <https://docs.microsoft.com/en-us/windows-hardware/get-started/adk-install>
Using sysprep from Microsoft <https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/sysprep--generalize--a-windows-installation>

I highly recommend a video by Craft Computing going over Windows Deployment Services if you are interested in this method - <https://youtu.be/PdKMiFKGQuc>

## Installing Windows 10 and Removing Components

The Full AME Experience. Most people will NOT want to do this as it will remove functionality from Windows 10, that you CAN NOT put back in. Some of the components can be taken out in the Custom ISO phase, but this takes it to another level. 

*Note: I do NOT recommend this for MOST machines*

Components Removed
- Windows Update
- Windows Store
- Media Player Functions
- Telemetry
- Windows Activation (YOU MUST Activate Windows Before this Tweak!) _If you fail to do this, you will have a watermark you can't get rid of_
- DirectX 12

Source files for Tweaks <https://ameliorated.info/> or my GitHub mirror <https://github.com/ChrisTitusTech/windows-lite-2004>

![ame](/images/2021/01-win10/ame.webp)

### Installation Overview

- Install Windows 10 (Stock or Custom ISO)
- Activate Windows 10 and Disconnect from Internet afterwards
- Run `amelioration_2004.bat` as Admin and Pre-Amelioration
- Reboot to Linux (I recommend Linux Mint)
- Run `sudo ./ameliorate_2004.sh` in Terminal on Live Linux USB
- Reboot back to Windows
- Run `amelioration_2004.bat` as Admin and Post-Amelioration

### Driver Installation

Recommend using the Offline Snappy Driver Installer <https://sdi-tool.org/>. This is about 50 GB, but has every driver you need. 

### AME Step-by-Step Documentation

<https://wiki.ameliorated.info/doku.php?id=documentation_2004>

### Running Updates

- Download Latest Servicing Stack Update (*Check Month - Windows verison- Architecture x64*) <https://www.catalog.update.microsoft.com/Search.aspx?q=Servicing%20Stack%20Update%20Windows%2010>
- Download Cumulative Update (*Check Month/Version/Arch AND Run After rebooting above*) <https://www.catalog.update.microsoft.com/Search.aspx?q=Cumulative%20Update%20Windows%2010>

Extract Updates  
`expand -F:* .\Windows10SSU.msu C:\Update1`  
`dism /online /add-package /packagepath=C:\1\Windows10.0-SSU.cab`  
Reboot  
`expand -F:* .\Windows10Cumulative.msu C:\Update2`  
`dism /online /add-package /packagepath=C:\2\Windows10.0-Cumulative.cab`  
Reboot and Run  
`dism /online /Cleanup-Image /StartComponentCleanup`

_Note: File Names change and will be different from above!_

## Optimizing Windows 10 Settings

To finish things off we do some custom tweaks with the Official CTT Windows 10 Toolbox. This is something I have been customizing for years and refining every single month to work on any Windows 10 Installation. 

```
iex ((New-Object System.Net.WebClient).DownloadString('https://git.io/JJ8R4'))
```

### What this script can do

- Installs Chocolatey, Notepad++, Irfanview, VLC, Java, and asks if you want Adobe Reader or Brave. 
- Removes all Windows Store Apps EXCEPT office, xbox, and WSL. 
- Removed Telemetry
- Disables Cortana
- Deletes various schedules tasks that rebloat the system
- Removes Other Bloatware (Candy Crush, etc.)
- Fixes problems that other scripts causes (lock screen and personalization options restricted)

Based on User feedback, this no longer uninstalls OneDrive or Office. 

### Toolbox Walkthrough Video

{{< youtube V27McA7ch6w >}}  

### Windows Services to Disable

1. Windows Defender & Firewall
2. Windows Mobile Hotspot Service
3. Bluetooth Support Service
4. Print Spooler (Required for Printing)
5. Fax
6. Remote Desktop Configuration and Remote Desktop Services
7. Windows Insider Service
8. Secondary Logon
9. Downloaded Maps Manager
10. Touch Keyboard and Handwriting Panel Service
11. Offline Files
12. Windows Connect Now
13. Remote Registry
14. Application Layer Gateway Service
15. Smart Card
16. Windows Image Acquisition
17. Security Center 
18. Connected User Experiences and Telemetry
19. Retail Demo Service
20. Windows Media Player Network Sharing Service
21. AllJoyn Router Service
22. Geolocation Service
23. Windows Biometric Service (Required for Fingerprint logon)
24. Program Compatibility Assistant Service
25. Enterprise App Management Service

