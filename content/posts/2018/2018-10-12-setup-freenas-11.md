---
title: How to Setup FreeNAS 11
author: Chris Titus

date: 2018-10-12T16:11:50+00:00
url: /setup-freenas-11/
image: images/2018/10/how-to-setup-freenas.jpg
categories:
  - FreeBSD
tags:
  - FreeNAS

---
This article goes over how to setup FreeNAS 11 and configure it. These are the basic steps so you can have a reliable network storage at your house. <!--more-->

## Steps to setup FreeNAS 11

  1. Download FreeNAS stable from <http://www.freenas.org/download-freenas-release/>
  2. Create Thumb drive from iso and Win32DiskImager <https://sourceforge.net/projects/win32diskimager/> 
      * _Note: DO NOT use Rufus or Yumi as these won&#8217;t create a bootable thumb drive_
  3. Install and Follow the Prompts
  4. Set Static IP
  5. Reboot
  6. Login to Web Interface with IP from Step 4
  7. Set up Storage Pool
  8. Assign SMB Share 
      * Make sure allow guest access  is checked
  9. Configure SMB Share Service 
      * Auto-Start and Enabled
      * Configure Guest user to be root
 10. Test!

## Installation Video Walkthrough

Install FreeNAS Video: [![installfn-yt](https://img.youtube.com/vi/G2-s1_OkHGA/0.jpg)](https://www.youtube.com/watch?v=G2-s1_OkHGA)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_  
Setup FreeNAS Video: [![setupfn-yt](https://img.youtube.com/vi/JexkrpeM_WA/0.jpg)](https://www.youtube.com/watch?v=JexkrpeM_WA)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_


This will get you set up for a reliable network-attached storage in your home environment. Remember once you are finished to clone and image the USB FreeNAS drive. These USB Drives typically only last a couple years, so a backup is a must! In the end, FreeNAS is far more reliable than other commercial NAS products because of ZFS and its versatility.

For further configuration, I highly recommend checking out the FreeNAS wiki for using some of its more advanced features.
  
<http://doc.freenas.org>

## Recommended Hardware

  * Samsung 32 GB Bar (Metal Series) https://amzn.to/2PPvyrf
  * Pre-Built FreeNAS Device (Official Brand &#8211; No Drives) https://amzn.to/2R7uyid
  * Hard Disk Drives &#8211; HGST 
      * 4 GB &#8211; https://amzn.to/2Sc3lfM
      * 6 TB &#8211; https://amzn.to/2q9NsJL
  * Solid State Drives &#8211; Samsung Pro 
      * 256 GB &#8211; <https://amzn.to/2Jf58MM>
      * 512 GB &#8211; <https://amzn.to/2R6bbGn>
      * 1 TB &#8211; <https://amzn.to/2D1CBKz>

## CTT Extra Content

- [ChrisTitus.com Downloads Section][1] (_CC Only_)
  1. Digital Downloads with Guides and Pre-Built Images
  2. Monthly Members Only Video
  3. $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  1. Monthly Members Only Video
  2. YouTube Emojis for Comments and Live Chat
  3. YouTube Badges that changes based on membership time for comments and chat.
  4. All YouTube comments are highlighted when I review comments daily. 
  5. $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join