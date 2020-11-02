---
title: Remove Asterisk from Linux server (ubuntu/centos/debian/rhel)
author: Chris Titus
type: post
date: 2018-08-17T15:58:36+00:00
url: /remove-asterisk/
image: /wp-content/uploads/2018/08/Asterisk_003.png
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

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join