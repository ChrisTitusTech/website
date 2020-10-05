---
title: "Linux MacOS"
type: post
date: 2020-10-05T13:03:31-05:00
url: /linux-macos/
image: /images/2020-thumbs/linux-macos.jpg
categories:
  - Linux
  - MacOS
tags:
  - Ubuntu
  - PopOS
  - LinuxMint
---
This Project is to make Ubuntu and other derivative distributions (Mint, PopOS, etc.) look like MacOS. *Version 20+ is required*
<!--more-->

_Source Files in this project_
- https://www.gnome-look.org/p/1148692/ - Capitine Cursors
- https://www.pling.com/p/1403328/ - WhiteSur GTK Theme
- https://www.pling.com/p/1399044/ - BigSur Icon Theme
- https://github.com/PRATAP-KUMAR/focalgdm3 - Login Theme
- https://albertlauncher.github.io/docs/installing/ - Albert
- https://www.pling.com/p/1401527/ - Cairo Dock

## Installation

### Dependency Installs

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install git gnome-tweak-tool gnome-shell-extensions chrome-gnome-shell cairo-dock -y
```
*Reboot*
```bash
git clone https://github.com/ChrisTitusTech/Linux-MacOS-GNOME.git ~/MacOS
mkdir ~/.themes
mkdir ~/.icons
mv ~/MacOS/themes/* ~/.themes
mv ~/MacOS/icons/* ~/.icons
sudo mv ~/MacOS/walls/* /usr/share/backgrounds/
```

### Gnome Tweaks

```bash
gsettings set org.gnome.mutter center-new-windows 'true'
gsettings set org.gnome.desktop.wm.preferences button-layout 'close,minimize,maximize:'
gsettings set org.gnome.desktop.interface gtk-theme "WhiteSur-dark"
gsettings set org.gnome.desktop.wm.preferences theme "WhiteSur-dark"
gsettings set org.gnome.desktop.interface icon-theme 'BigSur'
gsettings set org.gnome.desktop.interface cursor-theme 'capitaine-cursors-light'
gsettings set org.gnome.desktop.background picture-uri 'file:///usr/share/backgrounds/macOS-BS3.jpg'
gsettings get org.gnome.desktop.screensaver picture-uri 'file:///usr/share/backgrounds/macOS-BS1.jpg'
```

### Albert

```bash
curl https://build.opensuse.org/projects/home:manuelschneid3r/public_key | sudo apt-key add -
echo 'deb http://download.opensuse.org/repositories/home:/manuelschneid3r/xUbuntu_20.04/ /' | sudo tee /etc/apt/sources.list.d/home:manuelschneid3r.list
sudo wget -nv https://download.opensuse.org/repositories/home:manuelschneid3r/xUbuntu_20.04/Release.key -O "/etc/apt/trusted.gpg.d/home:manuelschneid3r.asc"
sudo apt update
sudo apt install albert -y
```

- Launch Albert
- Set Hotkey - Meta + F
- Set Theme Arc Dark Blue
- Enable Albert Extensions

### Gnome Extensions

Enable Extensions by visiting https://extensions.gnome.org/ install add-on and reload browser

Install the Following Extensions
- User Themes - https://extensions.gnome.org/extension/19/user-themes/
- Frippery Move Clock - https://extensions.gnome.org/extension/2/move-clock/
- Dynamic Panel Transparency - https://extensions.gnome.org/extension/1011/dynamic-panel-transparency/
- Panel OSD - https://extensions.gnome.org/extension/708/panel-osd/

### Manual Extension Configurations

- Panel OSD - Change Horizontal and Vertical to 98
- Cairo Dock - Set to Startup Applications
- Cairo Dock Themes - Import all gz files to Cairo configure in ~/MacOS/cairo
- Cairo Dock Configure - Turn of Icon effects and animations and hide dock when overlapping windows
- Cairo Dock Launchpad - Add Custom Launchpad Shortcut `dbus-send --session --type=method_call --dest=org.gnome.Shell /org/gnome/Shell org.gnome.Shell.Eval string:'Main.shellDBusService.ShowApplications();'`
- Disable Ubuntu Dock (Not Needed on PopOS)
- Dynamic Panel Transparency - Background Tab - Max Opacity 100 - Min Opacity 50

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join
