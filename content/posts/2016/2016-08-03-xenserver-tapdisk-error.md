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