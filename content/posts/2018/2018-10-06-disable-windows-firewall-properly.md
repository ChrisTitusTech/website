---
title: Disable Windows Firewall Properly
author: Chris Titus

date: 2018-10-06T17:20:22+00:00
url: /disable-windows-firewall-properly/
image: images/2018/10/disable-firewall.webp
categories:
  - Windows
  - Networking
tags:
  - Firewall
  - Windows 10

---
This walkthrough goes over how to Disable Windows Firewall while not affecting other programs that rely on this service. It&#8217;s important that you **DO NOT **disable the service, due to the fact it can cause issues with Microsoft Office and other products.<!--more-->

![win-firewall](/images/2018/10/windows-firewall.webp)

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

{{< youtube fvFWFrN-MZQ >}}  


### Finishing Up

By doing this you allow all traffic inbound to this computer, consequently, all outbound traffic is already allowed by default. Therefore, certain programs and services that depend on windows firewall can function properly. In conclusion, this is a far superior way of disabling the built-in firewall in windows without affecting other programs.

