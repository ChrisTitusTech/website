---
title: How to Install Xen Orchestra
author: Chris Titus

date: 2018-10-11T17:14:47+00:00
url: /how-to-install-xen-orchestra/
image: images/2018/10/citrixready-xologo.webp
categories:
  - Virtualization
tags:
  - XenServer
  - XCP-ng
  - XenOrchestra

---
This article shows you how to install Xen Orchestra and use the interface via the web. XOA is a very powerful addition to XenServer as it brings auto-updates and making it easier to manage entire farms.<!--more-->

## Step-by-Step Guide

  1. Login to your XenServer via PuTTy OR through XenCenter console
  2. Type `bash -c "$(curl -s http://xoa.io/deploy)"` 
      * Enter a new IP where you will access XOA from web
      * Wait for this to finish you will see XOA VM popup
      * _Note: This may take a couple hours if XOA servers are downloading slow. I highly recommend downloading offline installer if installing on multiple servers._
  3. Once Complete, PuTTy to XOA VM (IP Address from prior install) 
      * login with username/password: xoa
      * set new password for console
      * register xoa from username and password that you used on their website <https://xen-orchestra.com/> 
          * `sudo xoa-updater --register`
      * now run the updater to check for any upgrades 
          * `sudo xoa-updater &#8211;upgrade`
      * reboot if any upgrades were performed
  4. Open Browser, Login to XOA 
      * login username `admin@admin.net` password `admin`
  5. Add your XenServers &#8211; If you only have 1 pool, you only need to add your pool master 
      * Remember: if you are using default self-signed certificates on XenServer enable &#8220;unauthorized certificates&#8221; and then click disconnected
  6. Enjoy

## Video Walkthrough

{{< youtube QU28LQ1CX7Q >}}  

I hope you enjoyed this walkthrough of how to install Xen Orchestra and if you have any feedback let me know below. In closing, I really like this product and think it is a great addition to the XenServer and a much-needed improvement over what Citrix offers.

