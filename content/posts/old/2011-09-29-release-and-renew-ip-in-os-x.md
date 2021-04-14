---
title: Release and Renew IP in OS X
author: Chris Titus

date: 2011-09-29T18:46:43+00:00
url: /release-and-renew-ip-in-os-x/
categories:
  - MacOS

---
I recently had some issues where a bridged virtual machine in osx would disconnect my osx side network connection. A simple release and renew would fix this. <!--more-->Simply open up Terminal in OSX and type:

`sudo ifconfig en0 down`
  
`sudo ifconfig en0 up`

Obviously if you are renewing another interface other than your Ethernet port, en0 would need to be changed to the corresponding short name of the interface.

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