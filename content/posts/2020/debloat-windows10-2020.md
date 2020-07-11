---
title: "Debloat Windows 10 in 2020"
type: post
date: 2020-06-11T16:04:48-05:00
url: /debloat-windows-10-2020/
image: /images/2020-thumbs/debloat-windows-10-2020.jpg
categories:
  - Windows
tags:
  - Microsoft Store
---
This goes over debloating and slimming down Windows 10 so you get maximum performance from your PC. 
<!--more-->I made a guide going over the debloat process two years ago [https://www.christitus.com/debloat-windows-10/](https://www.christitus.com/debloat-windows-10/) - The guide has evolved and the github project I was using has also improved. I wanted to go over the new debloat process that is more streamlined and introduced a GUI with Whitelist/Blacklist capabilities. 

## GitHub Project for Debloating Windows
The project I use has been developed for many years now and is extremely good. Here is the source github project I use:  
[https://github.com/Sycnex/Windows10Debloater](https://github.com/Sycnex/Windows10Debloater)

### Alternative GitHub Project - Version 2004 Compatible
This is a new project that was brought to my attention, but has quickly made a name for itself. It works very well and is typically more up to date than the above project.  
[https://github.com/farag2/Windows-10-Setup-Script](https://github.com/farag2/Windows-10-Setup-Script)

#### Instructions for Usage:
Download latest Version for your Windows (Type -> `winver` in run command to get your Version)  
[https://github.com/farag2/Windows-10-Setup-Script/releases](https://github.com/farag2/Windows-10-Setup-Script/releases)

  - Unzip the release of your version into it's own folder
  - Run the Start ####.cmd file
  - Follow the Prompts to unbloat your system

## One Command to Rule them All
Run the following command to launch the script and start the debloat process from PowerShell
```
iex ((New-Object System.Net.WebClient).DownloadString('https://git.io/debloat'))
```
![debloat-win10](../images/2020/debloat-win10/command.png)

## Debloat Options
Here is a screenshot of the GUI for the debloater:  
![debloat1-win10](../images/2020/debloat-win10/debloat-options.png)

### Whitelist / Blacklist 
I recommend everyone use this option and remove programs based on the selections under these lists.  
![debloat2-win10](../images/2020/debloat-win10/debloat-options2.png)  
Legend for the Options:  
  - Uncheck = Will NOT Remove
  - Checked = Will REMOVE

*Note: You can also just click remove all - but it will delete EVERY APP that relies on the Windows Store*

### Revert Registry Options

This simply reverts any changes from the options below, like stopping edge from opening PDF files, or OneDrive removal. I never click this option. 

## Optimal Way to Use this Tool

I recommend running this tool under the following conditions:
  - Before User Profile is Created
  - Empty Desktop and Downloads (Past versions has deleted files from Desktop and Downloads)
  - After installing New Feature Updates
  
Recommended Options:
  - Pick Whitelist/Blacklist programs
  - Remove Bloatware With Customized Blacklist
  - Disable Cortana
  - Stop Edge PDF Takeover
  - Uninstall OneDrive
  - Unpin all Start Menu Icons
  - Disable Telemetry/Tasks
  - Remove Bloatware RegKeys
  
I generally always enable Dark Mode and Install 3.5 .NET but that is entirely my personal preference. 

## Video Walkthrough

Coming Soon
  
I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
