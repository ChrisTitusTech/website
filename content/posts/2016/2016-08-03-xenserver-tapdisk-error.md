---
title: XenServer tapdisk experienced an error
author: Chris Titus
type: post
date: 2016-08-03T16:12:57+00:00
url: /xenserver-tapdisk-error/
image: /images/2016/07/xenserver.jpg
categories:
  - Virtualization
tags:
  - XCP-ng
  - XenServer

---
When re-attaching a SR on a fresh VM, I ran into this XenServer tapdisk error. I ran the following from XenServer console to eject all CD drives on that host. I was then able to start the VM with the old image.<!--more-->

`xe vm-cd-eject --multiple`

If your XenCenter hangs or becomes unresponsive, you can also reset the toolstack from console from a PuTTy session or if XenCenter console is working running the following command:

`xe-toolstack-restart`

It&#8217;s important to note what caused the XenServer tapdisk error. I experienced this on an old version of XenServer 6 when switching out the ISOs from the VMs.

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