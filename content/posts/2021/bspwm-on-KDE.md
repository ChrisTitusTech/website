---
title: "Bspwm on KDE"

date: 2021-07-20T14:46:40-05:00
url: /bspwm-on-KDE/
image: images/2021-thumbs/bspwm-on-KDE.jpg
categories:
  - Linux
tags:
  - KDE
---
This goes over switching the window manager of KDE to bspwm. 
<!--more-->

## Dependency Installs

```
sudo apt install bspwm
```

## Configuration 

Create three files with the following contents

```
mkdir -p ~/.config/bspwm
mkdir -p ~/.config/sxhkd
wget -O ~/.config/bspwm/bspwmrc https://raw.githubusercontent.com/ChrisTitusTech/BSPWM-on-KDE/main/bspwmrc
wget -O ~/.config/sxhkd/sxhkdrc https://raw.githubusercontent.com/ChrisTitusTech/BSPWM-on-KDE/main/sxhkdrc
chmod +x ~/.config/bspwm/bspwmrc
chmod +x ~/.config/sxhkd/sxhkdrc
sudo wget -O /usr/share/xsessions/plasma-bspwm.desktop https://raw.githubusercontent.com/ChrisTitusTech/BSPWM-on-KDE/main/plasma-bspwm.desktop
```

## Documentation

/usr/share/xsessions/plasma-bspwm.desktop

```
[Desktop Entry]          
Type=XSession              
Exec=env KDEWM=/usr/bin/bspwm /usr/bin/startplasma-x11
TryExec=/usr/bin/startplasma-x11
DesktopNames=KDE         
Name=Plasma bspwm 
```

bspwmrc and sxhkdrc are using both the stock example files @ `/usr/share/doc/bspwm/examples`

## CTT Extra Content

- [ChrisTitus.com Downloads Section][1] (_CC Only_)
  1. Digital Downloads with Guides and Pre-Built Images
  2. Monthly Members Only Video
  3. $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  1. Monthly Members Only Video
  2. YouTube Emojis for Comments and Live Chat
  3. YouTube Badges that changes based on membership time for comments and chat.
  4. All YouTube comments are highlighted when I review comments daily. 
  5. $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join