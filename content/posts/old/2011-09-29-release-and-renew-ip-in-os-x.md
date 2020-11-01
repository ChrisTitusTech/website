---
title: Release and Renew IP in OS X
author: Chris Titus
type: post
date: 2011-09-29T18:46:43+00:00
url: /release-and-renew-ip-in-os-x/
categories:
  - MacOS

---
I recently had some issues where a bridged virtual machine in osx would disconnect my osx side network connection. A simple release and renew would fix this. <!--more-->Simply open up Terminal in OSX and type:

`sudo ifconfig en0 down`
  
`sudo ifconfig en0 up`

Obviously if you are renewing another interface other than your Ethernet port, en0 would need to be changed to the corresponding short name of the interface.

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