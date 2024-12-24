---
title: Installing Linux Subsystem for Windows 10
author: Chris Titus

date: 2018-09-11T19:56:07+00:00
url: /installing-linux-subsystem/
image: images/2018/09/winubuntu.webp
categories:
  - Linux
  - Windows
tags:
  - Powershell
  - Ubuntu Server
  - Windows 10
---
The following video goes over installing Linux Subsystem on Windows 10. Most notably it allows you to run Linux terminal commands in Windows 10 without having a virtual machine or dual boot into a Linux operating system. <!--more-->

{{< youtube RriP3LmuKNA >}}  

## Enable Linux Subsystem Feature

`cd ~
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`  
_Note: Perform in PowerShell_ 

### PowerShell Installation Method

`Invoke-WebRequest -Uri https://aka.ms/wsl-ubuntu-1604 -OutFile Ubuntu.appx -UseBasicParsing
Rename-Item -Path ~/Ubuntu.appx -NewName Ubuntu.zip
Expand-Archive ~/Ubuntu.zip ~/Ubuntu cd Ubuntu ./ubuntu.exe` 

### Microsoft Store Installation Method

  * Open the Microsoft Store
  * Browse to Ubuntu-1604 and subsequently click the Install button

## Conclusion

In Closing The Linux Subsystem is a welcomed addition to Windows 10 because most things that come from the Microsoft store are garbage. Above all using this will give you the ability to check out and compile many GitHub projects. It is now one of the first options I enable when I do fresh installs of Windows 10 due to the fact Linux is not practical all the time. Leave any Questions and Comments below and I’ll get back to you. I regularly publish on 

