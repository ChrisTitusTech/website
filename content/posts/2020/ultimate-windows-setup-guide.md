---
title: "Ultimate Windows Setup Guide"
type: post
date: 2020-07-14T14:26:59-05:00
url: /ultimate-windows-setup-guide/
image: /images/2020-thumbs/ultimate-windows-setup-guide.jpg
categories:
  - Windows
tags:
  - Powershell
draft: true
---
 This guide will walk you through a fresh Windows installation and debloat the services, tasks, and apps that are running in the background. These tweaks are for performance in mind and weaken the security of Windows in parts. You can customize the script to not have these performance tweaks.
<!--more-->

## One Command to Do Everything!

```powershell
powershell -nop -c "iex(New-Object Net.WebClient).DownloadString('https://git.io/JJ8Wh')"
```

## GitHub Project for Debloating, Optimization, and Installing Programs

<https://github.com/ChrisTitusTech/win10script/tree/master>

This project was using many of the aspects of other debloat scripts, but I combined system admin scripts with it that I use to configure workstations at businesses. I also added Chocolatey package manager to the script for easy program installations. 

The script will remove scheduled tasks, windows applications, install common applications (adobe reader, notepad++, java, and more), while also disabling services, and removing windows components like Cortana that are performance hogs. 

## Customization



I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
