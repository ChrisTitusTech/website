---
title: "Install Wine Libfaudio0 Error"

date: 2020-05-25T13:14:23-05:00
url: /install-wine-libfaudio0-error/
image: images/2020-thumbs/install-wine-libfaudio0-error.jpg
categories:
  - Linux
tags:
  - Linux Mint
  - Ubuntu
---
This article helps you fix the Libfaudio0 error that you run into when installing Wine on an older Linux debian-based distribution like Linux Mint 19 or Ubuntu 18. 
<!--more-->
Fix the dependancy error by downloading the following packages
```
wget https://download.opensuse.org/repositories/Emulators:/Wine:/Debian/xUbuntu_18.04/amd64/libfaudio0_19.07-0~bionic_amd64.deb
wget https://download.opensuse.org/repositories/Emulators:/Wine:/Debian/xUbuntu_18.04/i386/libfaudio0_19.07-0~bionic_i386.deb
```
Once these are downloaded you need to installed them with
```
sudo dpkg -i libfaudio0_19.07-0~bionic_amd64.deb libfaudio0_19.07-0~bionic_i386.deb
```

Now that we have fixed the dependency error you can proceed with your wine-staging installation. Not this is mainly an error for bleeding edge version of wine from the WineHQ PPA. 

