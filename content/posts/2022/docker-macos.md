---
title: "Docker Macos"

date: 2022-11-30
url: /docker-macos/
image: images/2022-thumbs/docker-macos.jpg
categories:
  - Linux
  - Windows
  - MacOS
tags:
  - Docker
  - Ubuntu
draft: false
---
Don't have a Mac and need MacOS? No problem, run it in a docker container. 
<!--more-->

Credit goes to this twitter user:

{{< tweet user="justArRinze" id="1591779981390413826" >}}

## Requirements

Install Docker Ubuntu 22.04

```
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu jammy stable"
sudo apt install docker-ce -y
sudo usermod -aG docker $USER
```

**Reboot or logout/login**

(Optional) GUI Webpage for Managing Docker - Portainer

```
docker volume create portainer_data
docker run -d -p 8000:8000 -p 9443:9443 --name portainer \
--restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v portainer_data:/data \
portainer/portainer-ce:2.9.3
```

Open up browser and navigate to <https://localhost:9443> 

_Click Advanced and proceed with any certificate errors_

## MacOS Docker Setup

Setup the MacOS Docker Container with the following docker command

```
docker run -it \
    --device /dev/kvm \
    -p 50922:10022 \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e "DISPLAY=${DISPLAY:-:0.0}" \
    -e GENERATE_UNIQUE=true \
    -e MASTER_PLIST_URL='https://raw.githubusercontent.com/sickcodes/osx-serial-generator/master/config-custom.plist' \
    sickcodes/docker-osx:monterey

# docker build -t docker-osx --build-arg SHORTNAME=monterey .
```

Use Disk Utility to "erase" the 270GB virtual disk: _Note: This is just virtual and doesn't erase your drive_

![](/images/2022/docker-macos/disk-util.png)

## Start MacOS Docker Container

Before we start the container find the name with:

```
docker ps -a
```

_Look for the NAMES column and pick the container name._

![](/images/2022/docker-macos/container.png)

Start with the following command NAME = Name from column above

```
docker start NAME
```

### Portainer Method for Starting

I love portainer because you can easily manage your containers. Start, Stop, and see resource usage... Portainer does it all! Here is what mine looks like:

![](/images/2022/docker-macos/portainer.png)


## Optimize the Container

Source: <https://github.com/sickcodes/osx-optimizer>

Run the following from Root Prompt # `sudo su`

```
defaults write com.apple.loginwindow autoLoginUser -bool true
mdutil -i off -a
nvram boot-args="serverperfmode=1 $(nvram boot-args 2>/dev/null | cut -f 2-)"
defaults write /Library/Preferences/com.apple.loginwindow DesktopPicture ""
defaults write com.apple.Accessibility DifferentiateWithoutColor -int 1
defaults write com.apple.Accessibility ReduceMotionEnabled -int 1
defaults write com.apple.universalaccess reduceMotion -int 1
defaults write com.apple.universalaccess reduceTransparency -int 1
defaults write com.apple.Accessibility ReduceMotionEnabled -int 1
defaults write /Library/Preferences/com.apple.SoftwareUpdate AutomaticDownload -bool false
defaults write com.apple.SoftwareUpdate AutomaticCheckEnabled -bool false
defaults write com.apple.commerce AutoUpdate -bool false
defaults write com.apple.commerce AutoUpdateRestartRequired -bool false
defaults write com.apple.SoftwareUpdate ConfigDataInstall -int 0
defaults write com.apple.SoftwareUpdate CriticalUpdateInstall -int 0
defaults write com.apple.SoftwareUpdate ScheduleFrequency -int 0
defaults write com.apple.SoftwareUpdate AutomaticDownload -int 0
defaults write com.apple.loginwindow DisableScreenLock -bool true
defaults write com.apple.loginwindow TALLogoutSavesState -bool false
```

## Final Result

![](/images/2022/docker-macos/macos-final.png)

## Walkthrough Video

{{< youtube 11111111 >}}
