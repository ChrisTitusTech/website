---
title: Updating LDAP Credentials for Netscaler VPX 1000
author: Chris Titus

date: 2016-11-12T15:13:18+00:00
url: /update-netscaler-vpx/
image: images/2016/11/citrix-netscaler.webp
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

![Netscaler1](/images/2016/11/netscaler1.webp)

### Click on LDAP Policy and select Edit Server

![Netscaler2](/images/2016/11/netscaler2.webp)

### Update the credentials under connection settings, and also test the new settings.

