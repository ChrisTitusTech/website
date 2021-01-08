---
title: Disable Windows Firewall Properly
author: Chris Titus
type: post
date: 2018-10-06T17:20:22+00:00
url: /disable-windows-firewall-properly/
image: /images/2018/10/disable-firewall.png
categories:
  - Windows
  - Networking
tags:
  - Firewall
  - Windows 10

---
This walkthrough goes over how to Disable Windows Firewall while not affecting other programs that rely on this service. It&#8217;s important that you **DO NOT **disable the service, due to the fact it can cause issues with Microsoft Office and other products.<!--more-->

![win-firewall](/images/2018/10/windows-firewall.png)

## Steps to bypass firewall

  1. Launch Windows Defender Firewall with Advanced Security (Start -> Run -> wf.msc)
  2. Click Inbound Rules
  3. Select &#8220;New Rule&#8221;
  4. Custom rule
  5. All Programs
  6. Leave Any and All Ports
  7. Any IP Address for both
  8. Allow the connection
  9. Check Domain, Private, and Public
 10. Name &#8220;Allow All&#8221;

## Video Guide

[![iscsi-ya](https://img.youtube.com/vi/fvFWFrN-MZQ/0.jpg)](https://www.youtube.com/watch?v=fvFWFrN-MZQ)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_


### Finishing Up

By doing this you allow all traffic inbound to this computer, consequently, all outbound traffic is already allowed by default. Therefore, certain programs and services that depend on windows firewall can function properly. In conclusion, this is a far superior way of disabling the built-in firewall in windows without affecting other programs.

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