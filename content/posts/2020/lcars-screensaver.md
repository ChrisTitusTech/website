---
title: "Lcars Screensaver"
type: post
date: 2020-01-17T17:43:17-06:00
url: /lcars-screensaver/
image: /images/2020-thumbs/lcars-screensaver.jpg
categories:
  - Linux
tags:
  - Wine
---
This article goes over getting the LCARS screensaver by mewho working in Linux. This Screensaver was originally intended for Windows 9x and this is for fun!<!--more-->

## Installation and Testing

First download the System47 Screensaver from mewho.com  
[LCARS Download](https://mewho.com/system47/download1.htm)  

Unzip the system47.zip

Create a WINE bottle for the Screensaver to run in from terminal:  
`WINEARCH=win32 WINEPREFIX=/home/$USER/.lcars winecfg`  
*Change the Windows Version to Windows XP*

Run the System47.exe in wine to install the screensaver  
`WINEPREFIX=~/.lcars wine '~/Downloads/system47 v2.2_setup.exe.exe'`  
Install the Screen saver and quit

Test the Screensaver in wine  
`WINEPREFIX=~/.lcars wine '/home/$USER/.lcars/drive_c/windows/system32/System47.scr' /s`
***
## Creating Screensaver Service

Creating the screensaver service is done in three sections: service dependencies installation, script creation, and systemd service.

#### Dependencies to install 
Arch-based Installs `yay -S xscreensaver xprintidle`  
Debian-based Installs `apt install xscreensaver xprintidle`

#### Script Creation
Create lcars.sh in your home directory (*replace titus with your user*)
```
#!/bin/sh

export DISPLAY=:0
# Wanted trigger timeout in milliseconds.
IDLE_TIME=$((5*60*1000))

# Sequence to execute when timeout triggers.
trigger_cmd() {
    WINEPREFIX=/home/titus/.lcars wine '/home/titus/.lcars/drive_c/windows/system32/System47.scr' /s
}

sleep_time=$IDLE_TIME
triggered=false

# ceil() instead of floor()
while sleep $(((sleep_time+999)/1000)); do
    idle=$(xprintidle)
    if [ $idle -ge $IDLE_TIME ]; then
        if ! $triggered; then
            trigger_cmd
            triggered=true
            sleep_time=$IDLE_TIME
        fi
    else
        triggered=false
        # Give 100 ms buffer to avoid frantic loops shortly before triggers.
        sleep_time=$((IDLE_TIME-idle+100))
    fi
done
```
#### Service Creation
Create lcars.service (`sudo nano /etc/systemd/system/lcars.service`)
*change titus to your user*
```
[Unit]
Description=Screensaver

[Service]
User=titus
Type=simple
ExecStart=/bin/bash /home/titus/lcars.sh

[Install]
WantedBy=multi-user.target
```
  - Reload service daemon `sudo systemctl daemon-reload`
  - Start lcars service to test `sudo systemctl start lcars`
  - Verify service is running `sudo systemctl status lcars`
  - Enable on startup `sudo systemctl enable lcars`

## Video Walkthrough
[![hugo guide](https://img.youtube.com/vi/J2zasJz5vuA/0.jpg)](https://www.youtube.com/watch?v=J2zasJz5vuA)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
