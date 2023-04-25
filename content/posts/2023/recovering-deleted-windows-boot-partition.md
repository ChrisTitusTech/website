---
title: "Recovering Deleted Windows Boot Partition"

date: 2023-04-24
url: /recovering-deleted-windows-boot-partition/
image: images/2023-thumbs/recovering-deleted-windows-boot-partition.jpg
categories:
  - Windows
tags:
  - bootmgr
draft: false
---
Is your Windows boot partition missing? This guide fixes it!
<!--more-->

## Requirements

- Windows Boot media Download here: <https://www.microsoft.com/software-download/windows11>
- Linux Live USB for partition resizing. I recommend gparted: <https://gparted.org/download.php>

## Partitioning the Drive

This is meant for a GPT Drive using EFI boot on a modern Windows. If you computer is less than 5 years old, this is probably how your system is setup. If you are using an old system it might be DOS/MBR based and this guide is NOT to be used!

From Gparted in Linux create a FAT32 partition at least 300 MB in size with the `boot` flag.

![bootflag](/images/2023/recover-deleted-partition/bootflag.png)

## Copy Boot Files from Windows ISO

Boot into your Windows ISO you downloaded above and press `Shift + F10` to pull up command prompt

Run the utility `DISKPART`

- `list vol` - list volumes and make note of what they are called
- `select partition #` - select the new EFI Partition you created in Gparted
- `assign letter g:` - pick something that is NOT C:
- `exit` - exit the program 

_Note: If you have problems your main partition with the installed windows is probably not assigned as C: and just follow the steps above to assign it letter C:_

Create the Boot files on the new EFI partition with `bcdboot`

```
bcdboot c:\Windows /s g: /f ALL
```

Once this is done you can check to see if Windows will detect your boot partition with this command:

```
bootrec /scanos
```

## Walkthrough Video

{{< youtube UGqBZwPIOqc >}}
