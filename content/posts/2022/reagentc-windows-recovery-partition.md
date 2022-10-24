---
title: "Reagentc Windows Recovery Partition"

date: 2022-11-02
url: /reagentc-windows-recovery-partition/
image: images/2022-thumbs/reagentc-windows-recovery-partition.jpg
categories:
  - Windows
tags:
  - Recovery
  - Reagentc
draft: false
---
Don't know what ReAgentC is or how to use it? This is your guide.
<!--more-->

{{< tweet user="christitustech" id="1584603485261115392" >}}

## Setup Recovery Partition

1. Create Recovery Partition at least 1GB in size.
2. Format the recovery partition as NTFS
3. DISKPART Changes

  	   - select disk 0
  	   - select partition 3 (last partition)
  	   - detail partition (list partition details)
  	   - set id=27 (MBR Disk)
  	   - set id="de94bba4-06d1-4d40-a16a-bfd50179d6ac" (GPTDisk)
  	   NOTE: Reset ids to normal if you did the WRONG partition (MBR set id=7 and GPT set id="ebd0a0a2-b9e5-4433-87c0-68b6b72699c7")

4. `reagentc /disable`
5. Copy WinRE.wim and the uninitialized ReAgent.xml files from the installation Media (ISO file) to `C:\Windows\System32\Recovery`
6. `reagentc /enable` (this will move WinRe.wim to the Recovery partition and set the GUID and location in ReAgent.xml)
7. `reagentc /info` (Check settings for verification)

## Rebooting to Recovery Partition

If you can boot in to Windows, hold shift while pressing restart. This will reboot your PC into a menu. Select *Advanced Options*

Another method to reach this screen is to simply have the boot fail 3 times. A simply reboot when it starts it boot process will work. 

F8 is an older method that doesn't work unless enabled, but was a great way to get to the menu. I'm adding this to my Windows Utility Tweaks section.

![](/images/2022/reagentc-windows-recovery-partition/recovery.png)

### Startup Repair and Settings

Startup Repair almost never works, but once in a blue moon is beneficial. Startup Settings can send you to safe mode.

### Command Prompt

Where the recovery partition shines. So many tools to choose from that I could write a book. Here are the highlights:

- Copy Files
- Chkdsk for failing hard drives
- SFC/DISM repairs corrupt system files (`sfc /scannow` and `dism /image:c:\ /cleanup-image /restorehealth`)

![](/images/2022/reagentc-windows-recovery-partition/sfc.png)

- Regedit for editing the registry

![](/images/2022/reagentc-windows-recovery-partition/regedit.png)

### Uninstall Updates

Bad update and now things don't work? Click this and revert it!

![](/images/2022/reagentc-windows-recovery-partition/updates.png)

### UEFI Firmware Settings

Loads into BIOS. Can be useful on laptops where you don't know key combination when powering on.

### System Restore and System Image Recovery

I don't use these much, but can be a good last resort option. System Restore generally brings most of the system back to last restore point and System Image is good for recovering Windows if you used the built-in Windows Backup Software to external hard drive.

## Walkthrough Video

{{< youtube 11111111 >}}
