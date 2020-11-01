---
title: "Common Computer Issues"
type: post
date: 2020-08-28T05:42:25-05:00
url: /common-computer-issues/
image: /images/2020-thumbs/common-computer-issues.jpg
categories:
  - Linux
  - Windows
  - MacOS
tags:
  - PowerShell
  - Xorg
  - Linux Kernel
---
These are all the issues we discussed on a live stream. I took all the community questions and made this webpage for them.
<!--more-->

## Windows 10 - Automated Tasks

Q: How can I make a YouTube video sit there paused on someone's screen in Windows 10 and instantly start playing aloud upon unlocking the screen/waking from sleep?

A: Task Scheduler can do all sorts of tasks and you can set the triggers to be on login or at certain times of the day. 

## Linux - Display Issues

Solution for Display constantly resetting or getting incorrectly configured

3 Solutions (All will work)

- Xorg Custom Settings
  - When display render is launched it will automatically configure each display to these specification from `/etc/X11/xorg.conf.d/10-monitor.conf`

```bash
# /etc/X11/xorg.conf.d/10-monitor.conf
Section "Monitor"
### Monitor Identity - Typically HDMI-0 or DisplayPort-0
    Identifier    "HDMI1" 
    Option        "PreferredMode" "1920x1080"
    Option        "TargetRefresh" "60"

### Positioning the Monitor
## Basic
    Option "LeftOf or RightOf or Above or Below" "DisplayPort-0"    
## Advanced
    Option        "Position" "1680 0" #Note you can always set both to 0 0 to mirror
## Disable a Monitor
     Option        "Disable" "true"
EndSection 
```

- Autorandr - Automatic monitor settings
  - <https://github.com/phillipberndt/autorandr> - This automatically selects a display configuration based on connected devices
- Xrandr Script
  - Make a custom bash script and set with login manager, cron job, or set in `~/.xinitrc`

Sample xrandr script:

```bash
#!/bin/bash
xrandr --output HDMI-1 --off --output HDMI-2 --auto
```

_Note: You can use the tool *arandr* to grab the proper display script_

## Windows/Linux/MacOS - Flashing Images to SD-Card or USB

There are so many solutions for this one:

- Windows - Rufus (<https://rufus.ie>)
- Windows/Linux/Mac - Etcher (<https://www.balena.io/etcher/>)
- Linux/Mac - `dd` terminal command
  - `dd if=~/Downloads/image.iso of=/dev/sdx bs=1M`
  - if = input file/device | of= output file/device | bs= block size
- Windows - Win32 Disk Imager <https://sourceforge.net/projects/win32diskimager/>
  - for images that aren't working or using special media like sd cards

## Linux - Boot Time High for KDE

Analyze systemd and figure out why... (`systemd-analyze`)

```bash
systemd-analyze blame
             10.667s apt-daily.service
              1.127s apt-daily-upgrade.service
              1.053s dev-mapper-neon\x2d\x2dvg\x2droot.device
               793ms lvm2-pvscan@8:3.service
               622ms boot.mount
               613ms snapd.service
               267ms minidlna.service
               217ms NetworkManager.service
               200ms nvidia-persistenced.service
               196ms upower.service
               189ms systemd-logind.service
```

*Note: Also try `systemd-analyze critical-chain` or `systemd-analyze plot > boot.svg` as this shows the chain of the startup*

## Linux - USB Port stops working

- Check to see if device shows on `lsusb`
- Check dmesg for errors `dmesg | grep -i USB`
- Run `usb-devices`
- Disable Auto Suspend
  - `cat /sys/module/usbcore/parameters/autosuspend` result should be `2` which means enabled
  - Modify Grub or bootloader to disable auto suspend (for grub modify `/etc/default/grub`)
    - `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash usbcore.autosuspend=-1"`
    - `sudo update-grub`
  - Verify by running cat command again

## Linux - Fixing No Display Drivers or Black Screen or Missing Desktop Environment 

Ctrl + Alt + F1 or F2

This drops you to TTY and no display drivers are needed. From this console you can fix things by installing display drivers or missing packages you need.

## All Computers - Can't Get into BIOS

Open it up and remove the CMOS Battery. Press the power button without it plugged in to fully discharge. Then wait 60 seconds and put CMOS battery back in. 

## General PC Maintenance - Updates & Shuting them down

Updates should be done weekly with security only one applied. Feature Updates should be delayed at least 1 year. This is universal across all operating systems. I also recommend shutting down your PC every day and not using suspend/hibernate. If you want to schedule the updates you can leave your PC once a week overnight. 

## Windows/Linux - Time Maintenance

You should use UTC time everywhere. Windows uses local time and it is terrible. Change this with a registry setting

- Disable Internet Time on Windows 10 
  - Head to Settings > Time & language and disable “Set time automatically”.
- Modify Windows Registry to use UTC
  - Start - Run - `regedit`
  - Navigate to `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation`
  - Create new DWORD (32-bit) Value `RealTimeIsUniversal`
  - Set Value to `1`
- You can also use REG files from this project <https://github.com/ChrisTitusTech/Windows-10-UTC> if you don't want to manually edit registry

## MacOS - OpenCore and Safety

Opencore is a completely open project and is safe. Here is the github of OpenCore where they expose all their code for review <https://github.com/acidanthera/OpenCorePkg> and the complete install guide is here <https://dortania.github.io/OpenCore-Install-Guide/>

## Linux Battery Life and Laptop Heat

There are a variety of packages you can use, but highly suggest two:

- tlp
- xfce4-power-manager

TLP will throttle your CPU and use less power and XFCE power manager will take care of brightness, suspend, and other power saving features as a standalone package even if you aren't using XFCE as a desktop environment. 

## MacOS - OpenCore Audio Issues

This typically comes from using two codecs or the wrong one. *Use ONLY ONE!*

- AppleALC - <https://github.com/acidanthera/AppleALC>
- VoodooHDA - <https://sourceforge.net/projects/voodoohda/>

## Linux - App won't launch it just disappears...

Run Application in Terminal and look at the errors. Chances are it is missing a dependency. 

## Windows - "these settings are managed by your organization"

Chances are you ran a powershell script (maybe mine...) and you are now locked out of changing the lock screen on your Windows Box. Run this command in powershell to gain control of your lock screen again:

```powershell
Remove-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Personalization" -Name "NoLockScreen" -ErrorAction SilentlyContinue
```

OR

You can also open up Start - Run - `gpedit.msc` and then go to All Settings and look for enabled features and set them to *Not Configured*

## Windows - Reinstall OneDrive

Open Up PowerShell Admin (Right Click Start Button)

```PowerShell
%systemroot%\SysWOW64\OneDriveSetup.exe
```

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join