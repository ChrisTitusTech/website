---
title: "Reagentc Windows Recovery Partition"

date: 2022-11-02
url: /reagentc-windows-recovery-partition/
image: images/2022-thumbs/reagentc-windows-recovery-partition.webp
categories:
  - Windows
tags:
  - Recovery
  - Reagentc
draft: false
---
Don't know what ReAgentC is or how to use it? This is your guide.
<!--more-->

{{< x user="christitustech" id="1584603485261115392" >}}

## Setup Recovery Partition

1. Create Recovery Partition at least 1GB in size.
2. Format the recovery partition as NTFS
3. DISKPART Changes

  	   - select disk 0
  	   - select partition 3 (last partition)
  	   - detail partition (list partition details)
  	   - set id="de94bba4-06d1-4d40-a16a-bfd50179d6ac" (GPTDisk) _Note: id=27 on MBR_
  	   NOTE: Reset ids to normal if you did the WRONG partition (MBR set id=7 and GPT set id="ebd0a0a2-b9e5-4433-87c0-68b6b72699c7")
			 - _Create Partition if Missing!_ `cre par pri size=605 id=de94bba4-06d1-4d40-a16a-bfd50179d6ac`
			 - `format fs=ntfs quick label=WinRE`
			 - `assign letter=z`
			 - UEFI only: `gpt attributes=0x8000000000000001`

4. `reagentc /disable`
5. Verify `WinRE.wim` is installed on local system `ls "C:\Windows\System32\Recovery" | FindStr /I "WinRE.wim" ; ls "C:\Windows\System32\Recovery" -Hidden | FindStr /I "WinRE.wim"`
5a. If Missing, Copy WinRE.wim and the uninitialized ReAgent.xml files from the installation Media (Easiest method is to use 7zip to extract `WinRE.wim` from `install.wim`) to `C:\Windows\System32\Recovery`
6. `reagentc /enable` (this will move WinRe.wim to the Recovery partition and set the GUID and location in ReAgent.xml)
7. `reagentc /info` (Check settings for verification)

### If ReAgentC /enable does NOT work

- Manually copy `WinRE.wim` to `Z:\Recovery\WindowsRE`
- `ReAgentC /SetREimage /Path "Z:\Recovery\WindowsRE"`
- `ReAgentC /Enable`
- Verify with `ReAgentC /Info`

## Rebooting to Recovery Partition

If you can boot in to Windows, hold shift while pressing restart. This will reboot your PC into a menu. Select *Advanced Options*

Another method to reach this screen is to have the boot fail 3 times. A reboot during the load screen will count as a failure. 

F8 is an older method that doesn't work unless enabled, but was a great way to get to the menu. I'm adding this to my Windows Utility Tweaks section.

![](/images/2022/reagentc-windows-recovery-partition/recovery.webp)

### Startup Repair and Settings

Startup Repair almost never works, but once in a blue moon is beneficial. Startup Settings can send you to safe mode.

### Command Prompt

Here are the highlights of a recovery partition:

- Copy Files
- Chkdsk for failing hard drives
- SFC/DISM repairs corrupt system files (`sfc /scannow` and `dism /image:c:\ /cleanup-image /restorehealth`)

![](/images/2022/reagentc-windows-recovery-partition/sfc.webp)

- Regedit for editing the registry

![](/images/2022/reagentc-windows-recovery-partition/regedit.webp)

### Uninstall Updates

Bad update and now it doesn't work? Click this and revert it!

![](/images/2022/reagentc-windows-recovery-partition/updates.webp)

### UEFI Firmware Settings

Loads into BIOS. Can be useful on laptops where you don't know key combination when powering on.

### System Restore and System Image Recovery

I don't use these much, but can be a good last resort option. System Restore generally brings most of the system back to last restore point and System Image is good for recovering Windows if you used the built-in Windows Backup Software to external hard drive.

## Walkthrough Video

{{< youtube L7Ss-KKp010 >}}
