---
title: Updating LDAP Credentials for Netscaler VPX 1000
author: Chris Titus
type: post
date: 2016-11-12T15:13:18+00:00
url: /update-netscaler-vpx/
image: /images/2016/11/citrix-netscaler.png
categories:
  - Networking
tags:
  - NetScaler
  - Citrix

---
This article shows you how to update LDAP credentials on the Netscaler VPX 1000. It goes over logging in, editing virtual server, and applying settings.<!--more-->

### Login to the NetScaler Device

Default User: nsroot Pass: nsroot (or password you changed it to)

### Go to Netscaler gateway virtual server controlling your logins

![Netscaler1](/images/2016/11/netscaler1.png)

### Click on LDAP Policy and select Edit Server

![Netscaler2](/images/2016/11/netscaler2.png)

### Update the credentials under connection settings, and also test the new settings.

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