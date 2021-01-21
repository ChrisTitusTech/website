---
title: Install Plex plugin in FreeNAS
author: Chris Titus

date: 2018-10-23T19:14:03+00:00
url: /install-plex-plugin-freenas/
image: /images/2018/10/thumbnail-1.jpg
categories:
  - FreeNAS
tags:
  - FreeBSD
  - Plex

---
This is an in-depth installation and configuration of the Plex plugin in FreeNAS 11.2. I detail the installation of plex on FreeNAS Jail and configuration of using a share as a Plex mount point. <!--more-->

## Plex plugin in FreeNAS Steps

  1. Install Plex Plugin 
      * Under Plugins -> Availiable
  2. Set Static IP 
      * Interface em0 (or your interface name), Static IP for Plex Server, and Netmask (/24 is 255.255.255.0)
  3. Stop Plugin
  4. Edit Plex Jail &#8211; Mount Point &#8211; _Note: This is only used if you want a share to add movies to your plex from another computer_ 
      * Set Source Share (/mnt/sharename/) and Set Destination (I selected the media folder in the jail directory)
  5. Edit Plex Jail &#8211; Edit Confiuration 
      1. Check VNET and Berkeley Packet Filter
      2. Set Default IPv4 Route to your Gateway or Router (Ex. 192.168.1.1)
      3. Next
      4. Select &#8220;allow:raw_sockets&#8221;
      5. Click save in the bottom left
  6. Launch Management from Plugin Menu
  7. Name your Server
  8. Enter your Destination folder from Jail Mount Point (Ex. /media/)
  9. Finish!

## Video Walkthrough

Install Plex on FreeNAS Video: [![freenas-ya](https://img.youtube.com/vi/99fQNbuAOlg/0.jpg)](https://www.youtube.com/watch?v=99fQNbuAOlg)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_  
Install FreeNAS Video: https://youtu.be/G2-s1_OkHGA  
Setup FreeNAS Video: https://youtu.be/JexkrpeM_WA

In closing, This guide will get Plex up and running on your FreeNAS without much hassle. I highly recommend this setup as ZFS is far superior to a RAID setup and makes sure that your data stays stable and reliable. Consequently, I find that my Plex server does run considerably faster in this configuration than it ever did when it was on my Windows 10 machine.

For general setup, configuration, and hardware setup, please refer to my guide @ <https://christitus.com/setup-freenas-11/>

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