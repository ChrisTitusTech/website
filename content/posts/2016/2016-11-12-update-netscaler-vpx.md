---
title: Updating LDAP Credentials for Netscaler VPX 1000
author: Chris Titus
type: post
date: 2016-11-12T15:13:18+00:00
url: /update-netscaler-vpx/
image: /wp-content/uploads/2016/11/citrix-netscaler.png
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

![Netscaler1](/wp-content/uploads/2016/11/netscaler1.png)

### Click on LDAP Policy and select Edit Server

![Netscaler2](/wp-content/uploads/2016/11/netscaler2.png)

### Update the credentials under connection settings, and also test the new settings.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
