---
title: Updating LDAP Credentials for Netscaler VPX 1000
author: Chris Titus

date: 2016-11-12T15:13:18+00:00
url: /update-netscaler-vpx/
image: images/2016/11/citrix-netscaler.png
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