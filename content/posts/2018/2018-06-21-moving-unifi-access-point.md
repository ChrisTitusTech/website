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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
