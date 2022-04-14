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

