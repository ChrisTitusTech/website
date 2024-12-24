---
title: "Bspwm on KDE"

date: 2021-07-20T14:46:40-05:00
url: /bspwm-on-KDE/
image: images/2021-thumbs/bspwm-on-KDE.webp
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

