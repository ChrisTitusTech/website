---
title: "Ultimate Windows 10 Install ISO"

date: 2021-01-20T10:23:43-06:00
url: /Ultimate-Windows-10-Install-ISO/
image: images/2021-thumbs/Ultimate-Windows-10-Install-ISO.webp
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

![msmg](/images/2021/01-win10iso/msmg.webp)

### Expand and Mount Windows

From the Source menu select expand and then mount in MSMG Toolkit. Below is a full video where I use MSMG toolkit to remove many components in Win10. 

How to Make a Custom Windows 10 ISO with *MSMG Toolkit* Video  
{{< youtube R6XPff38iSc >}}  

### Install Drivers

Download and extract your drivers with the following Powershell command:

```
DISM.exe /Online /Export-Driver /Destination:%HOMEDRIVE%%HOMEPATH%\Downloads\Drivers
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

Put these in `ToolKit_Directory\Updates\w10\x64`

## Create the ISO


### Make Autounattend.xml

Now let's make it so we will automatically install Windows 10 without answering a bunch of questions. I use a cheatsheet where it just makes it for me from: <https://www.windowsafg.com/win10x86_x64.html>

Fill out the form and then click download at the bottom of the page.

![autounattend](/images/2021/01-win10iso/autounattend.webp)

### Apply Changes and Exit MSMG Toolkit

Select the Apply Changes option and exit MSMG Toolkit. We aren't done as we need to implement the autounattend.xml file into the ISO and add any extra tools we want. This can be the Network Driver EXE or any other executable you want. Another good example would be the nVidia Geforce Experience. 

### Mount ISO and Copy Files

Mount the completed ISO file. (*Right-Click the Windows10.ISO file and select mount*)

![mount](/images/2021/01-win10iso/mount.webp)

