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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
