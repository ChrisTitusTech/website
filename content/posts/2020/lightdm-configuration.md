---
title: "LightDM Configuration"
type: post
date: 2020-01-08T08:09:34-06:00
url: /lightdm-configuration/
image: /images/2020-thumbs/lightdm-configuration.jpg
categories:
  - Linux
tags:
  - LightDM
---
In this article I go over lightdm configuration. This will teach you how to modify lightdm to choose a default desktop environment, theme, autologin, and even a VNC connection. <!--more-->

Reference Articles:  
[Ubuntu Wiki](https://wiki.ubuntu.com/LightDM)  
[Arch Wiki](https://wiki.archlinux.org/index.php/LightDM)  
[Debian Wiki](https://wiki.debian.org/LightDM)  

## Installation

For Debian based systems, install LightDM by typing `sudo apt install lightdm`  
For Arch based systems, install LightDM by typing `sudo pacman -S lightdm`

### Activating LightDM on startup

Before you can enable the lightdm service you will need to disable your current display manager.

For disabling SDDM (KDE Systems) type `sudo systemctl disable sddm`  
For disabling GDM (Gnome Systems) type `sudo systemctl disable gdm`

## Configuration

Start out with opening up your `/etc/lightdm/lightdm.conf` and this is where most of the modifications will take place.

I will go over the 4 sections in the configuration that most will want to change or modify.

### Changing the Theme

lightdm.conf  
```
[Seat:*]
#type=local
#pam-service=lightdm
#pam-autologin-service=lightdm-autologin
#pam-greeter-service=lightdm-greeter
#xserver-command=X
#xmir-command=Xmir
#xserver-config=
#xserver-layout=
#xserver-allow-tcp=false
#xserver-share=true
#xserver-hostname=
#xserver-display-number=
#xdmcp-manager=
#xdmcp-port=177
#xdmcp-key=
greeter-session=lightdm-slick-greeter ### CHANGE THIS 
#greeter-hide-users=false
#greeter-allow-guest=true
#greeter-show-manual-login=false
#greeter-show-remote-login=true
```
Install what ever theme you want, this is called a greeter in lightdm, and then change the line above. After the changes are made you can either reboot or type `sudo systemctl restart lightdm` _Please Note: This will log you out_

### Changing the Default Desktop Environment

lightdm.conf  
```
[Seat:*]
#type=local
#pam-service=lightdm
#pam-autologin-service=lightdm-autologin
#pam-greeter-service=lightdm-greeter
#xserver-command=X
#xmir-command=Xmir
#xserver-config=
#xserver-layout=
#xserver-allow-tcp=false
#xserver-share=true
#xserver-hostname=
#xserver-display-number=
#xdmcp-manager=
#xdmcp-port=177
#xdmcp-key=
greeter-session=lightdm-slick-greeter
#greeter-hide-users=false
#greeter-allow-guest=true
#greeter-show-manual-login=false
#greeter-show-remote-login=true
user-session=default ################ CHANGE THIS
#allow-user-switching=true
#allow-guest=true
#guest-session=
```
To specify a specific desktop environment you need to change the user-session line to be your desktop environment. For example I use the awesome window manager for mine and I put `user-session=awesome`  
_Note: If you don't know the name, the desktop environment list can be found with listing .desktop file from /usr/share/xsessions/*.desktop_  
For complete listing of user sessions type: `ls /usr/share/xsessions/*.desktop`

### AutoLogin with LightDM

Change the following part of the file to autologin. _Note: This does pose a security risk and should never be done in a business_

lightdm.conf Under `[Seat:*]`
```
autologin-guest=false
autologin-user=username
autologin-user-timeout=0
autologin-in-background=false
#autologin-session=
```
I generally uncomment the following lines above and just change this line `autologin-user=username` and then it will autologin that user on the next reboot. _Note: You can use the `autologin-guest` instead of user to have it autologin as a guest account._

### VNC Connection

At the buttom of the lightdm.conf file you will see VNC connection information. This information uses the `tigervnc` package and also is done using secure channel. This means you must establish a SSH connection with a portforward before you can connect to VNC. Example: `ssh 192.168.69.10 -L 9901:localhost:5901` This establishes ssh and port forwards your local port 9901 to 5901 of the remote machine. Then you could launch VNC viewer with `vncviewer localhost:9901`. Even though this says localhost it is forwarding the request through SSH to the remote machine.

Now with that framework lets look at the conf file:
```
#
# VNC Server configuration
#
# enabled = True if VNC connections should be allowed
# command = Command to run Xvnc server with
# port = TCP/IP port to listen for connections on
# listen-address = Host/address to listen for VNC connections (use all addresses if not present)
# width = Width of display to use
# height = Height of display to use
# depth = Color depth of display to use
#
[VNCServer]
#enabled=false
#command=Xvnc
#port=5900
#listen-address=
#width=1024
#height=768
#depth=8
```
The main things to change here are `enabled=true` `width - height - depth` and then you are off. My typical defaults would look like the following:
```
[VNCServer]
enabled=true
command=Xvnc
port=5900
#listen-address=
width=1920
height=1080
depth=16
```

## Video Walkthrough
[![lightdm guide](https://img.youtube.com/vi/_dYqisDIcC0/0.jpg)](https://www.youtube.com/watch?v=_dYqisDIcC0)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

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