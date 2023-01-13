---
title: "Ext4 in Windows"

date: 2023-01-11
url: /ext4-in-windows/
image: images/2023-thumbs/ext4-in-windows.jpg
categories:
  - Windows
tags:
  - EXT4
draft: false
---
Pulling in EXT4 drives is easy now with Windows WSL2. There are a few tricks that you need to know about though!
<!--more-->

## Requirements

- Any version of Windows 11
- Any version of Windows 10 (Build 22000+) _Note: check with `winver` from Run_
- Powershell as Admin and WSL 2 installed
- ONLY Internal drives are supported. No USB Drives.

Syntax pulled from <https://learn.microsoft.com/en-us/windows/wsl/wsl2-mount-disk>

## Determine Partition to Mount

### PowerShell as Admin 

List Drives

```
GET-CimInstance -query "SELECT * from Win32_DiskDrive"
```

Mount and list Drive Partitions

```
wsl --mount <DiskPath> --bare
wsl
```

### Linux WSL2 Instance

List Drive Partitions from WSL Instance

```
lsblk
```

List Drive Types and IDs

```
sudo blkid
```

### PowerShell as Admin 

_Note: By default Windows will always assume it is EXT4, unless the `-t vfat` option is used._

From Windows PowerShell

```
wsl --mount \\.\PhysicalDrive1 --partition 2
```

This will make it available in both Windows Explorer and WSL `/mnt/wsl/PhysicalDrive1` path. 

#### Unmount

```
wsl --unmount \\.\PhysicalDrive1
```

## Walkthrough Video

{{< youtube aX1vH1j7m7U >}}
