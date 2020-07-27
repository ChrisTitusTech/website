---
title: Installing Linux Subsystem for Windows 10
author: Chris Titus
type: post
date: 2018-09-11T19:56:07+00:00
url: /installing-linux-subsystem/
image: /wp-content/uploads/2018/09/winubuntu.png
categories:
  - Linux
  - Windows
tags:
  - Powershell
  - Ubuntu Server
  - Windows 10
---
The following video goes over installing Linux Subsystem on Windows 10. Most notably it allows you to run Linux terminal commands in Windows 10 without having a virtual machine or dual boot into a Linux operating system. <!--more-->

[![WSL](https://img.youtube.com/vi/RriP3LmuKNA/0.jpg)](https://www.youtube.com/watch?v=RriP3LmuKNA)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
