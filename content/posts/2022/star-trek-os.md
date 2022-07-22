---
title: "Star Trek Window Management"

date: 2022-07-21T12:07:52-05:00
url: /star-trek-os/
image: images/2022-thumbs/star-trek-os.jpg
categories:
  - Linux
tags:
  - Ubuntu
  - Debian
---
The LCARS system from Star Trek is a staple in the geek world. Ever since it made its first appearence in the Next Generation TV series in the 90s people have been obsessed with recreating that system. Leave it to Linux to give a functional LCARS recreation for those Star Trek fans out there. 
<!--more-->

## The LCARS Desktop Environment
This was created and hosted on <https://lcarsde.github.io/index.html>. The creator made 5 packages that you need to install before you can use it. The entire environment isn't all that practical unless you have a massive monitor because of all the screen real estate lost to the LCARS design. This isn't very up to date so I recommend using debian version 10 (buster) for maximum compatibility. Newer version of Debian have issues with the `python3-posix-ipc` dependancy. 

Download base Debian 10 (buster) distro @ <https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/archive/10.12.0+nonfree/amd64/iso-cd/firmware-10.12.0-amd64-netinst.iso>

Install nothing but base system. No GUI components to keep it light.

### Install Dependancies

- Xorg
- LightDM
- Firefox (or other browser)

Set Graphical install `sudo systemctl set-default graphical.target` 

*Note: There are a ton of different python dependancies and you need to track these down to utilize the full desktop environment*

## My LCARS script

```
mkdir lcars-build
cd lcars-build
wget https://github.com/lcarsde/lcarswm/releases/download/22.1/lcarswm_22.1_amd64.deb
wget https://github.com/lcarsde/menu/releases/download/22.1/lcarsde-app-menu_22.1_amd64.deb
wget https://github.com/lcarsde/status-bar/releases/download/22.2/status-bar_22.2_amd64.deb
wget https://github.com/lcarsde/application-starter/releases/download/21.1/lcarsde-application-starter_21.1_amd64.deb
wget https://github.com/lcarsde/logout/releases/download/20.1/lcarsde-logout_20.1_amd64.deb
sudo dpkg -i *.deb
sudo apt -f install
```

## Using LCARS
To use it after installation, you logout of your desktop and select LCARS instead of KDE,GNOME, or whatever your current system is. This is an extremely minimal install so you don't have to worry about it conflicting with your current install. 

The complete manual is located @ <https://lcarsde.github.io/manual.html>

### Setting up intial configuration
Edit the file @ `~/.config/lcarde/status-config.xml` look for these lines and change them to your system:
```
<widget name="LcarsdeWifiStatus">
 41         <position x="4" y="2" width="1" height="1" />
 42         <properties>
 43             <!-- Device should correspond to a folder in /sys/class/net that starts with "w" -->
 44             <property key="device" **value="wlp2s0"** />
 45         </properties>
 46     </widget>
 47     <widget name="LcarsdeEthStatus">
 48         <position x="4" y="1" width="1" height="1" />
 49         <properties>
 50             <!-- Device should correspond to a folder in /sys/class/net that starts with "e" -->
 51             <property key="device" **value="enp0s20f0u2u3i5"** />
 52         </properties>
 53     </widget>
```

Change the programs to what you use in `~/.config/lcarde/settings.xml`
Example:
```
<?xml version="1.0" encoding="UTF-8"?>
  2 <lcarswm>
  3     <key-config>
  4         <!-- keys for executing programs -->
  5         <binding>
  6             <keys>Lin+T</keys>
  7             <exec>kitty</exec>
  8         </binding>
  9         <binding>
 10             <keys>Lin+B</keys>
 11             <exec>brave-browser</exec>
 12         </binding>
```

## Images

You can download my completed images if you don't want to build this yourself @ <https://cttstore.com/star-trek-os>

There is two image formats part of the download
- VMDK - Virtual Machine Format - VMWare, Virtualbox, and QEMU will all play this.
- Clonezilla tar.gz - Image Backup - You can restore this to any machine using clonezilla after unzipping the files to a USB drive. Clone Any System walkthrough video @ <https://youtu.be/yQ9NpWZ74BU>

Login Information: 
- User: Kirk
- Pass: 1234
- Hostname: Enterprise

## Walkthrough Video
_Release Date: July 22, 2022_

[![youtube-video](https://img.youtube.com/vi/hbg-QgKOdac/0.jpg)](https://www.youtube.com/watch?v=hbg-QgKOdac)

_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

