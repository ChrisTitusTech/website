---
title: "Bspwm on KDE"

date: 2021-07-20T14:46:40-05:00
url: /bspwm-on-KDE/
image: /images/2021-thumbs/bspwm-on-KDE.jpg
categories:
  - Linux
tags:
  - KDE
---
This goes over switching the window manager of KDE to bspwm. 
<!--more-->

## Dependency Installs

```bash
apt-get update && apt update
apt install bspwm
```

## Configuration 

Create three files with the following contents

```
mkdir -p ~/.config/bspwm
mkdir -p ~/.config/sxhkd
wget -O ~/.config/bspwm/bspwmrc https://raw.githubusercontent.com/ChrisTitusTech/BSPWM-on-KDE/main/bspwmrc
wget -O ~/.config/sxhkd/sxhkdrc https://raw.githubusercontent.com/ChrisTitusTech/BSPWM-on-KDE/main/sxhkdrc
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

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://christitus.com/lbry>

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
 [2]: https://christitus.com/join