---
title: "Install Windows the Arch Linux Way"

date: 2023-09-01
url: /install-windows-the-arch-linux-way/
image: images/2023-thumbs/install-windows-the-arch-linux-way.webp
categories:
  - Windows
tags:
  - DISM
draft: false
---
Installing Windows strictly through the Command Line is an important tool to have. If windows changes the installer or out of box experience, you can bypass any changes with this guide!
<!--more-->

## The Installer

Download and Launch the Windows Installer

Launch Command Prompt with `Shift+F10`

### Partition both a Boot Partition and Data Partition

- List Disks with `list disk`
- Select desired disk with `sel disk #`
- Check to verify there is NO partitions `list partition`
- (Optional) Delete any existing partitions `del part #` **NOTE: THIS ERASES ALL DATA**
- Check to verify DISK is GPT `list disk` and use `convert gpt` if GPT is not enabled `*`
- Create Boot partition `create partition efi size=100`
- Create Data partition `create partition primary size=*`
- Select Boot `sel partition 1`
- Format Boot `format fs=FAT32 quick`
- Assign Boot partition `assign letter=g:`
- Select Data `sel par 2`
- Format Data `format fs=NTFS quick`
- Assign Data partition `assign letter=c:` **Note: You may need to UNASSIGN an existing C: drive**

### Verify the Windows Version to Install

DISM is at the heart of every Windows installation. You need to do a verification on your installation ISO to figure out the source index # that you will install. 

```
DISM /Get-ImageInfo /imagefile:x:\sources\install.wim
```

Note the Index: # that you want to install

### Install Main Windows Data

Now we copy over the operating system in its entirety.

```
DISM /apply-image /imagefile:x:\sources\install.wim /index:2 /applydir:c:
```

### Copy Boot Files to EFI

Copy the boot files to complete the EFI partition to boot into our windows.

```
bcdboot c:\Windows /s G: /f ALL
```

## Bypass OOBE

The Out of Box Experience is changing all the time. The requirement to be online or only use a Microsoft account. Bypass it with this command and using `Shift+F10` to bring up the command prompt. **NOTE: DISCONNECT FROM INTERNET before booting!**

```
oobe\BypassNRO
```

System will restart after executing the command. Select `Continue with limited Setup` and name the device and create a local account.

## Walkthrough Video

{{< youtube vtxedkuUCas >}}
