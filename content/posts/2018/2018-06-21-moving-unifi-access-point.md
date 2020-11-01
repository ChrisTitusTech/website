---
title: Moving Unifi Access Point to another Unifi Controller
author: Chris Titus
type: post
date: 2018-06-21T15:57:35+00:00
url: /moving-unifi-access-point/
image: /wp-content/uploads/2018/06/unifi-ap.png
categories:
  - Networking
tags:
  - Unifi

---
This walkthrough goes over moving Unifi access point to another Unifi controller. To remove APs from a Unifi Controller you need to reset the APs and then either discover them or manually SSH set-inform the devices.<!--more-->

### First Reset the AP

  - Use Terminal or SSH (Either in existing Controller -> Manage Device -> Open Terminal or Putty)
    - Type: `syswrapper.sh restore-default`  
OR  
    - Reset the Unifi AP by the old paperclip method if you can&#8217;t putty or use existing controller

![unifi reset](/wp-content/uploads/2018/06/reset-unifi.png)

### Second discover device or manually set-inform

On the new controller try to discover the now factory reset APs and with any luck they will show up. However in big environments I typically can never get them to be discovered so I will show you the manual method.

Find the IP of the AP (You can easily grab this by looking at old controller OR using advanced IP Scanner. Note: match MAC address if scanning)
  
  - Putty into the AP (Launch Putty type IP, and Username/Password is factory ubnt/ubnt)
    - `set-inform http://ip-of-controller:8080/inform`
  
  - Adopt AP in new controller webpage
    - Type AGAIN: `set-inform http://ip-of-controller:8080/inform`

![unifi set-inform](/wp-content/uploads/2018/06/unifi-set-inform.png)

We are now done moving Unifi access point on to the new Controller, and as a result, will be in the device list. From here you will be able to manage it, upgrade firmware, and do all the configuration options needed.

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
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join