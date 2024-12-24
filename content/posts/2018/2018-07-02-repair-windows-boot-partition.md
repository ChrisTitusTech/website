---
title: Repair Windows Boot Partition | Includes files and partitioning
author: Chris Titus

date: 2018-07-02T17:01:44+00:00
url: /repair-windows-boot-partition/
image: images/2018/07/reboot-select-proper-boot-device-rcm992x0-min-300x190.webp
categories:
  - Windows
tags:
  - Windows 10

---
This walkthrough shows you how to repair windows boot partition and boot from an existing windows installation without reinstalling windows.<!--more-->

Recently I had an old server with a FAT32 system reserved partition and a bunch of extra partitions. I have already moved all the data off the server and it was ready for decommissioning. Before, I did this I wanted to go ahead and remove all these old partitions and just leave the C: Drive with the Windows installation then rebuild the System Reserved partition as NTFS as an exercise. Many backup&nbsp;programs have issues doing block level images with FAT32 partitions OR you need to do a physical to virtual setup. For me, I wanted to decommission the hardware but be able to spin up this server in a virtual environment if needed.

## Backup Before Attempting This!

### Step 1: Delete old partitions and create new ones

 - Boot into your partition manager of choice (I used Parted Magic <https://partedmagic.com/> ) GParted
 - Delete extra partitions including the old FAT32 system partition (These all should be very small between 100 MB and up to 2 GB)
 - Create new NTFS partition with 512 MB of space and label it System Reserved
 - Shutdown

### Step 2: Setup Partitions with the correct drive letters

 - Launch Windows 10 Install disc / usb
 - Shift+F10 once you see language select to bring up command prompt
 - Launch `DISKPART`
 - select volume with 512MB (ex: `select vol 0`)
 - `assign letter=G:` (or any letter that isn&#8217;t taken that is NOT C:)
 - `exit` OR If Windows operating system is NOT on C:
 - `select volume` with windows installation on it
 - `assign letter=C:`
 - `exit`

_Example output:_

```
diskpart
select disk 0
list vol
select vol 0 <---500 MB Partition
assign letter=G:
select vol 1 <--- Large Partition with Windows Install on it
assign letter=C:
exit
```

Partitions are done. Now time to fix problems with the &#8220;type&#8221; of partition &#8211; By forcing all partitions to be NTFS NT60

`bootsect.exe /nt60 all /force`

##### Step 3: Copy Boot Records, Fix MBR, and Rebuild BCD

Rebuild new system reserved partition with EFI and regular boot files 
```
bcdboot c:\Windows /s <boot letter of System Reserved Partion>: /f ALL
bcdboot c:\Windows /s G: /f ALL
```
 - Now we can finally rebuild the bcd and master boot record like you see in so many online guides
 - You can verify the system is seeing the windows installation by doing a `bootrec /scanos` and then be running through the rest of the commands to do the rest of the repairs

```
bootrec /scanos <---Verify it sees the windows install
bootrec /fixmbr
bootrec /fixboot <----Pick the installation will mirror /scanos bootrec /rebuildbcd
```
  * Reboot and you are done!

## Video

{{< youtube F72D7uL6cZg >}}  

