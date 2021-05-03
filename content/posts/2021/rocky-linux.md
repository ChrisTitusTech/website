---
title: "Rocky Linux"

date: 2021-05-03T12:12:16-05:00
url: /rocky-linux/
image: /images/2021-thumbs/rocky-linux.jpg
categories:
  - Linux
tags:
  - Rocky Linux
draft: true
---
This guide goes over setting up KDE on Rocky Linux from a base server install with no GUI. 
<!--more-->

## Download and Install Server Setup

Download the Rocky Linux ISO from: <https://rockylinux.org/download/>  
_Note: I downloaded DVD 8GB, which is offline and no downloading_ 

During Setup, I recommend a dedicated drive and choosing only SERVER with NO GUI! 

Go ahead and walkthrough the rest of the install

## Configuration

### Enable PowerTools and RPMFusion Repositories

```
sudo dnf upgrade -y
sudo dnf install --nogpgcheck https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
sudo dnf install --nogpgcheck https://mirrors.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm https://mirrors.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-8.noarch.rpm
sudo dnf config-manager --set-enabled PowerTools
```
_Note: If you can't install PowerTools with config-manager, you can manually enable it through the repo file in `/etc/yum.repos.d`_

### Dependencies

```
sudo dnf update -y
sudo dnf install xorg-x11-server-Xorg xorg-x11-xauth xorg-x11-apps -y
sudo dnf install plasma-desktop sddm -y
```

### Set Graphical Interface on Startup

```
sudo systemctl set-default graphical.target
sudo systemctl enable sddm
```

### Install Tools of your Choice

This is a base install so you will need a file explorer, terminal, browser, etc. 

Choose whatever you want! 

Examples: 
```
sudo dnf install terminator firefox zsh
```

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