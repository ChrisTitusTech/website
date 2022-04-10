---
title: XenServer tapdisk experienced an error
author: Chris Titus

date: 2016-08-03T16:12:57+00:00
url: /xenserver-tapdisk-error/
image: images/2016/07/xenserver.jpg
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