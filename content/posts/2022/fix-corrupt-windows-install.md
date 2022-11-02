---
title: "Fix Corrupted Windows Install"

date: 2022-11-16
url: /fix-corrupt-windows-install/
image: images/2022-thumbs/fix-corrupt-windows-install.jpg
categories:
  - Windows
tags:
  - DISM
draft: false
---
Using SFC and DISM is often done in haste and incorrectly. If you need to fix a corrupted install, then a special DISM command MUST BE issued. 
<!--more-->

{{< tweet user="christitustech" id="1587911136879542273" >}}

## The Commands

### Basic Online Command

![](/images/2022/fix-corrupt-windows-install/dism-normal.png)

```
DISM /Online /Cleanup-Image /CheckHealthDISM /Online /Cleanup-Image /CheckHealth
```
_Note: This will check it's health and cleanup basic corruption errors._

### Command to Fix From Windows ISO

Use this command when the basic one fails. Follow these steps:

1. Download the Windows ISO from <https://www.microsoft.com/en-us/software-download/windows10ISO>
2. Mount the ISO and note the drive letter (ex. E:)
3. Run DISM with sources flag

```
DISM /Online /Cleanup-Image /RestoreHealth /Source:E:\Sources\install.wim
```

_Note: `install.wim` is known as ESD in some downloads `install.esd`_

## Verify History and Logs

Did it run correctly? Was the corruption repaired?

Check the log file at `%windir%\Logs\DISM\dism.log`

## SFC - The Worthless Tool

System file checker is WORTHLESS! In the best scenario it might tell you about some corruption, but I have never seen it actually repair anything. 

Yet every damn guide on the internet recommends you run it. Save your time, and use DISM instead. 

## Walkthrough Video

{{< youtube 11111111 >}}
