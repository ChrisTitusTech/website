---
title: "Change your Desktop Wallpaper"
type: post
date: 2020-07-08T14:52:13-05:00
url: /change-wallpaper/
thumbnail: /images/2020-thumbs/change-wallpaper.jpg
categories:
  - Linux
  - Windows
  - macOS
tags:
  - wallpaper
draft: true
---
This article shows you how to automatically change your wallpaper on Windows, macOS, and Linux.<!--more-->
To get the greatest variety and the highest quality it is best to use reddit as the voting system and variety ensure both these goals are met. 

## Change Wallpaper in Windows

GitHub Project: <https://github.com/Rawns/Reddit-Wallpaper-Changer>

From the Releases Tab on GitHub download the latest version and install it.

Here are the settings I recommend using:  
![win10-wallsettings](/images/2020/wallpaper/wall-settings-w10.png)

There is also an option to save all wallpapers locally. I like to save all downloaded wallpapers for future reference or build and offline repository.

## Change Wallpaper in Mac OS

GitHub Project: <https://github.com/ChrisTitusTech/wallpaper-reddit>

### Install MacOS Dependancies

```
xcode-select --install
sudo easy_install pip
sudo pip install --upgrade pip
pip install pillow
```

#### Needed Desktop Wallpaper Script Package

- Install Swift Tools on MacOS 13 (Required for High Sierra or Earlier) - <https://support.apple.com/kb/DL1998>
- Script for Changing MacOS Wallpaper - <https://github.com/scriptingosx/desktoppr/releases>

### Install MacOS Program

```
cd ~
git clone https://github.com/ChrisTitusTech/wallpaper-reddit.git
cd wallpaper-reddit
sudo python3 setup.py install
```

### MacOS Usage

You can run this anytime by typing in terminal `wallpaper-reddit`  
Binaries are located at `/usr/local/bin/wallpaper-reddit`
Config files are located at `~/.config/wallpaper-reddit`

### Running on macOS Startup

- Start Automator
- Create New Task: File -> New
- Select "Application"
  - Click "Show library" in the toolbar (if hidden)
- Add "Run shell script" (from the Actions/Utilities)
  - Copy-and-paste your script into the window and Run- *Note: I used desktoppr to force wallpaper if script fails*
  ![automator](/images/2020/wallpaper/macos-automator.jpg)

```
/usr/local/bin/wallpaper-reddit
/usr/local/bin/desktoppr ~/Pictures/Wallpapers/wallpaper.jpg
```

- Save it somewhere: a file called your_name.app will be created)
- Go to System Preferences → Users and Groups → Login items
- Add this newly-created app

## Change Wallpaper in Linux

### Install Linux Dependancies

- Ubuntu/Linux Mint/ElementaryOS: `sudo apt-get install python3-dev python3-setuptools libjpeg8-dev zlib1g-dev libfreetype6-dev`
- Fedora: `sudo dnf install python3-imaging`
- Arch: `sudo pacman -S python-pillow`

### Install Linux Program

```
cd ~
git clone https://github.com/ChrisTitusTech/wallpaper-reddit.git
cd wallpaper-reddit
sudo python3 setup.py install
```

## Recommended Wallpaper Subreddits

- EarthPorn
- CityPorn
- SkyPorn
- WeatherPorn
- BotanicalPorn
- LakePorn
- VillagePorn
- BeachPorn
- WaterPorn
- SpacePorn
- multiwall
- wallpapers
- wallpaper

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
