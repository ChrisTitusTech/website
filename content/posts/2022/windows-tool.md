---
title: "The Ultimate Windows Utility"

date: 2022-05-13T13:07:19-05:00
url: /windows-tool/
image: images/2022-thumbs/windows-tool.jpg
categories:
  - Windows
tags:
  - Debloat Windows
  - ninite
featured: true
---
This is a tool that has evolved over several years and achieves much more than just debloating a Windows install. I have expanded it to install the programs you select, which is a bigger selection than ninite. The classic debloat is there, but also includes a tweaks section with quality of life features. To round out everything, I have included my recommended settings for Windows update that I use in a variety of businesses. Misuse of this utility can break your install so please be careful and I do not provide any help or assistance should this happen! 
<!--more-->

## One Command - Download and Usage

From an Elevated (Run as Administrator) PowerShell prompt

```
iwr -useb https://christitus.com/win | iex
```

## Parts of Utility

There are four main parts of this utility but I can expand this to an infinite number of tabs if expansion is needed and will probably happen in the future. As of the writing of this article there is 4 main parts: install, debloat, features and old panels, and windows updates. Let me breakdown what each part does and what you should use. 

### Install

![install](/images/2022/winutil/screen-install.png)

The install is basically a better version of ninite that many people use. It leverages Microsoft's winget utility to not only install tons of software that you select with a check-mark, but also gives you the ability to upgrade all the software quickly. By using this utility you will save hours on the install, but also make it very easy to keep all your programs up to date. 

### Debloat 

![debloat](/images/2022/winutil/screen-debloat.png)

Debloating windows is always a moving target and there are many utilities out there. Many of them are too heavy handed in my opinion. This takes a more minimal approach that should not damage your Windows install. At the top there are three buttons Desktop, Laptop, and Minimal. These are curated selections based on my recommendations

**Desktop** - This is for Desktops *DUH*, but it will disable features like power throttling and many services will be set to not auto start. This will give your desktop the best performance without any downside. 

**Laptop** - This one is just like desktop but doesn't mess with power settings as we don't want to kill our laptops battery. 

**Minimal** - This one will just do the absolute basic privacy / security settings. Very minor optimizations will also be made. 

I must warn you to NOT use all the settings at once, or simple remove everything from the MS Store. Many times this will debloat the install but will BREAK the MS Store or uninstall any games / apps that were installed using it. This is why this option is never selected, but I left it there for those that really want to remove it. I personally do NOT recommend this, but I understand those that want to remove it

Note: This part of the utility can break an install if used carelessly, but it does make a restore point so if you have a lot problems with it, you can use System Restore to rollback the changes or the Undo All option. THIS IS SOFTWARE IS PROVIDE WITHOUT ANY WARRANTY AND I AM NOT RESPONSIBLE FOR ANY MISUSE. 

### Features and Legacy Win Panels

![features](/images/2022/winutil/screen-features.png)

This tab makes it easier to enable built-in features that are off by default. Many new installs need these and I wanted to make it easier than going through and manually installing them one by one. 

There is also the old school legacy panels that I use on a daily basis. I still find these to be more efficient than the new panels that Microsoft has put in Windows 10 and 11. 

### Windows Updates

![updates](/images/2022/winutil/screen-updates.png)

Windows updates set to defaults are crazy. They install and download at weird times and often update far too much. I give 2 options my recommended one that only installs security updates and allowing features updates after they have been proven over 1 year. 

However, there is a disable all button. I do NOT recommend doing this, but is there for people that have specific software that they don't update and don't want their windows install changing at all. This is NOT secure, but often more stable and why you'd want to do something like this. 

## Walkthrough Video

[![youtube-video](https://img.youtube.com/vi/tPRv-ATUBe4/0.jpg)](https://www.youtube.com/watch?v=tPRv-ATUBe4)

_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_
