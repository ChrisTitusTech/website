---
title: "Change your Desktop Wallpaper"
type: post
date: 2020-07-08T14:52:13-05:00
url: /change-wallpaper/
image: /images/2020-thumbs/change-wallpaper.jpg
categories:
  - Linux
  - Windows
  - macOS
tags:
  - wallpaper
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

You can run this anytime by typing in terminal `wallpaper-reddit [subreddits]`  
Binaries are located at `/usr/local/bin/wallpaper-reddit`
Config files are located at `~/.config/wallpaper-reddit`
Syntax Help `wallpaper-reddit --help`

### Running on macOS Startup

- Start Automator
- Create New Task: File -> New
- Select "Application"
  - Click "Show library" in the toolbar (if hidden)
- Add "Run shell script" (from the Actions/Utilities)
  - Copy-and-paste your script into the window and Run- *Note: I used desktoppr to force wallpaper if script fails*
  ![automator](/images/2020/wallpaper/macos-automator.jpg)

```
/usr/local/bin/wallpaper-reddit --startup
/usr/local/bin/desktoppr ~/Pictures/Wallpapers/wallpaper.jpg
```

- Save it somewhere: a file called your_name.app will be created)
- Go to System Preferences → Users and Groups → Login items
- Add this newly-created app

## Change Wallpaper in Linux

GitHub Project: <https://github.com/ChrisTitusTech/wallpaper-reddit>

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

### Linux Usage

You can run this anytime by typing in terminal `wallpaper-reddit [subreddits]`  
Binaries are located at `/usr/local/bin/wallpaper-reddit`
Config files are located at `~/.config/wallpaper-reddit`
Syntax Help `wallpaper-reddit --help`

### Running on Linux Startup

There is plenty of ways to have this automatically change the wallpaper on startup, however, I like to use the method by adding it at the `/etc/profile` EOF (End of File). Here is an example.

```
/usr/local/bin/wallpaper-reddit --save
/usr/local/bin/wallpaper-reddit --startup
```

`--save` *option flag will save the current wallpaper to the default directory in the config file (`~/Pictures/Wallpapers/`). Remove this line if you don't want to save past wallpapers.*
`--startup` *option flag will wait til internet access is established and then download the wallpaper from reddit*

## Wallpaper-reddit Config File Settings

The config file is in `~/.config/wallpaper-reddit`, and will be created automatically. Currently, the GNOME, XFCE, MATE, Unity, and Cinnamon Desktop Environments should be automatically detected and the program should set the wallpaper without any extra work. However, due to the varying nature of window managers, it is possible, even likely, that you may have to specify a custom command to set your wallpaper. The program will prompt you for this if this is the case; the exact command can be researched per desktop environment. If your desktop environment is not supported, leave the set command blank and it will auto download to the `~/Pictures/Wallpapers/` directory as wallpaper.jpg for the daily wallpaper. 

### Config Options

`minwidth` and `minheight` set the minimum dimensions the program will consider a valid candidate for a wallpaper. If `--resize` is enabled, the script will resize the image to those dimensions before setting the wallpaper.
`minratio` is the minimal aspect ratio of the image. It is a float value of width/height of the image, for example 1.6 for 16:9 image.
`maxlinks` is the maximum number of links the script will go through before giving up.
`resize` does the same thing as the `--resize` flag. It is enabled by default.
`random` does the same thing as the `--random` flag.

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