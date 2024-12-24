---
title: Remove Asterisk from Linux server (ubuntu/centos/debian/rhel)
author: Chris Titus

date: 2018-08-17T15:58:36+00:00
url: /remove-asterisk/
image: images/2018/08/Asterisk_003.webp
categories:
  - Linux
tags:
  - Asterisk

---
The following removal instructions go over how to completely remove Asterisk from your Linux Instance. <!--more-->

## REMOVE AND REINSTALL INSTRUCTIONS

Here is how to remove Asterisk from a Linux server and reinstall from source.
  
_Pre-requirements: Download source, configure, make menuselect, and make. All done with root (use su) Example:_
  
`su`
> ###ENTER ROOT PASSWORD###

```
mkdir ~/build
cd ~/build
wget https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-14-current.tar.gz
tar -xvf asterisk-14-current.tar.gz
cd asterisk-14
./contrib/scripts/install_prereq install
./configure --with-jansson-bundled ##Note: you may not need jansson-bundled so omit this if needed##
make menuselect
```
> ###Select any needed addons: MP3, etc.###

`make`  
_Note: you can install asterisk 13, 15, or custom git asterisk branch (i.e. gvsip) instead of Asterisk-14 tar_
  
Once you have the project built, you now need to clean the old asterisk out and reboot
  
`make uninstall`
> ###OR to clean EVERYTHING###

`make uninstall-all`
  
Once this is complete I like to reboot, and then run a **make install** to install the different version of asterisk.

## FULL REMOVAL NO REINSTALL

Now let&#8217;s say you just want to remove Asterisk and just don&#8217;t want it anymore. Well, that is far simpler. Just run the following commands and it will be gone forever
  
```
killall -9 safe_asterisk
killall -9 asterisk
systemctl disable asterisk ##Note: depending on the install this may not be enabled or was set to run via @reboot cron or daemon service - Mileage will vary##
rm -rf /etc/asterisk
rm -rf /var/log/asterisk
rm -rf /var/lib/asterisk
rm -rf /var/lib64/asterisk
rm -rf /var/spool/asterisk
rm -rf /usr/lib/asterisk
rm -rf /usr/lib64/asterisk
reboot
```

These instructions should work on any Linux Based system and it shouldn&#8217;t matter if it is Red Hat based or Debian based. 

