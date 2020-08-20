---
title: How to Setup FreeNAS 11
author: Chris Titus
type: post
date: 2018-10-12T16:11:50+00:00
url: /setup-freenas-11/
image: /wp-content/uploads/2018/10/how-to-setup-freenas.jpg
categories:
  - FreeNAS
tags:
  - FreeBSD

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

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join