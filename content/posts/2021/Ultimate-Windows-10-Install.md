---
title: "Ultimate Windows 10 Install ISO"
type: post
date: 2021-01-20T10:23:43-06:00
url: /Ultimate-Windows-10-Install-ISO/
image: /images/2021-thumbs/Ultimate-Windows-10-Install-ISO.jpg
categories:
  - Windows
tags:
  - ISO
---
This goes over creating the best installation media possible for a fresh Windows 10
<!--more-->
## Downloading Windows 10 ISO

I only use official Microsoft sources for Windows installation. At the time of the writing the following link is where I'd download either the ISO directly or the media creation tool that you select ISO on.

<https://www.microsoft.com/en-us/software-download/windows10>

## Mounting and Modifying the ISO

### Using MSMG Toolkit

Download MSMG Toolkit from their website. 

<https://msmgtoolkit.in/download.html>

![msmg](/images/2021/01-win10iso/msmg.png)

### Expand and Mount Windows

From the Source menu select expand and then mount in MSMG Toolkit. Below is a full video where I use MSMG toolkit to remove many components in Win10. 

How to Make a Custom Windows 10 ISO with *MSMG Toolkit* Video  
[![customiso](https://img.youtube.com/vi/R6XPff38iSc/0.jpg)](https://www.youtube.com/watch?v=R6XPff38iSc)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

### Install Drivers

Download and extract your drivers with the following Powershell command:

```Powershell
DISM.exe /Online /Export-Driver /Destination:C:\Users\titus\Downloads\Drivers
```

You can install ANY inf files to the below directories. *EXE and Setup files DO NOT WORK!*  

If you want to install EVERY DRIVER IN EXISTENCE... download the offline files using <https://sdi-tool.org/> and go into the drivers directory and extract all of the 7z files. This will be time intensive and require about 60 GB or more for the install media

Put the inf and driver x64 files here: `ToolKit_Directory\Drivers\Install\w10\x64`  
Put the inf and driver x86 files here: `ToolKit_Directory\Drivers\Install\w10\x86` _Note: Most people don't do 32-bit installs and can skip this_

Other notable tools: 3DP Chip Network Drivers <https://www.3dpchip.com/3dpchip/3dp/net_down_en.php> - This installs pretty much any network driver on the fly.

### Install Updates

Download the Windows updates from the Official Microsoft Catalog. We need two specific updates that cover most of the big updates missing from our ISO download. 

- Servicing Stack Update <https://www.catalog.update.microsoft.com/Search.aspx?q=Servicing%20Stack%20Update%20Windows%2010>
- Cumulative Update <https://www.catalog.update.microsoft.com/Search.aspx?q=Cumulative%20Update%20Windows%2010>

_Note: Be sure and download your version 20H2, 2009, 1909, etc. and x64 architecture for most computers_

Put these in `ToolKit_Directory\Drivers\Updates\w10\x64`

## Create the ISO


### Make Autounattend.xml

Now let's make it so we will automatically install Windows 10 without answering a bunch of questions. I use a cheatsheet where it just makes it for me from: <https://www.windowsafg.com/win10x86_x64.html>

Fill out the form and then click download at the bottom of the page.

![autounattend](/images/2021/01-win10iso/autounattend.jpg)

### Apply Changes and Exit MSMG Toolkit

Select the Apply Changes option and exit MSMG Toolkit. We aren't done as we need to implement the autounattend.xml file into the ISO and add any extra tools we want. This can be the Network Driver EXE or any other executable you want. Another good example would be the nVidia Geforce Experience. 

### Mount ISO and Copy Files

Mount the completed ISO file. (*Right-Click the Windows10.ISO file and select mount*)

![mount](/images/2021/01-win10iso/mount.png)

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://links.christitus.com/lbry>

#### Exclusive Content

- [ChrisTitus.com Members Section][1] (_CC Only_)
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  - Monthly Members Only Video
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://links.christitus.com/join