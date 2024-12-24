---
title: "Update Any PC to Windows 11"

date: 2021-06-29T11:21:54-05:00
url: /update-any-pc-to-windows11/
image: images/2021-thumbs/update-any-pc-to-windows11.webp
categories:
  - Windows
tags:
  - Windows 11
---
This is a guide going over updating any PC to Windows 11 that "doesn't meet requirements" or doesn't use Secure Boot or has a TPM 2.0 chip. 
<!--more-->

## Methods

1. Download appraiserres.dll from Windows 10 install and replace this file in the Windows 11 Sources directory (Windows 11 ISO required)
2. Use Registry edits below to upgrade your PC in the insider channel. This will be patched out before official release. Video showing regedit: <https://youtu.be/fk5B-a7vZ_w>
3. Bypass the requirement prompt by using Command Prompt. Here is a video showing fresh install: <https://youtu.be/wK40EFgzmqM>

## Upgrade Path

The path for upgrading to 11 requires you to have an activated Windows 10 PC and be subscribed to the insider builds.

Insider builds can be registerd for use @ <https://insider.windows.com/>

## System Modifications

Windows 11 does checks for TPM and Secure boot before it allows the upgrade process to start. However, these can be bypassed. 

*Note: It is important to understand Microsoft can at ANY TIME enforce these rules or ignore these modifications which means you would NO LONGER recieve updates*

Here is the registry edits that need to be made: (win11bypass.reg)

```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\Setup\LabConfig]
"BypassTPMCheck"=dword:00000001
"BypassSecureBootCheck"=dword:00000001
```

Download Reg File here: <https://christitus.com/files/win11bypass.zip>

*REBOOT AFTER MODIFICATIONS MADE*

![regedit](/images/2021/06-win11upgrade/regedit.webp)

## Upgrade

Now you can simply finish your insider build sign up and then click update

Once it finishes updating you should see a screen to update to the latest Windows 11 build (22000.52) or Greater

![winver](/images/2021/06-win11upgrade/winver.webp)

