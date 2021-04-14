---
title: Moving Unifi Access Point to another Unifi Controller
author: Chris Titus

date: 2018-06-21T15:57:35+00:00
url: /moving-unifi-access-point/
image: /images/2018/06/unifi-ap.png
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

![unifi reset](/images/2018/06/reset-unifi.png)

### Second discover device or manually set-inform

On the new controller try to discover the now factory reset APs and with any luck they will show up. However in big environments I typically can never get them to be discovered so I will show you the manual method.

Find the IP of the AP (You can easily grab this by looking at old controller OR using advanced IP Scanner. Note: match MAC address if scanning)
  
  - Putty into the AP (Launch Putty type IP, and Username/Password is factory ubnt/ubnt)
    - `set-inform http://ip-of-controller:8080/inform`
  
  - Adopt AP in new controller webpage
    - Type AGAIN: `set-inform http://ip-of-controller:8080/inform`

![unifi set-inform](/images/2018/06/unifi-set-inform.png)

We are now done moving Unifi access point on to the new Controller, and as a result, will be in the device list. From here you will be able to manage it, upgrade firmware, and do all the configuration options needed.

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://christitus.com/lbry>

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
 [2]: https://christitus.com/join