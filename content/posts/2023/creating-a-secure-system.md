---
title: "Creating a Secure System"

date: 2023-09-24
url: /creating-a-secure-system/
image: images/2023-thumbs/creating-a-secure-system.jpg
categories:
  - Linux
tags:
  - Security
draft: false
---
Security is a journey not a destination. Let's go over all the ways you aren't secure and how you can minimize your footprint.
<!--more-->
If you think you can just install a VPN and you are secure... you are probably an easy target.

## Hardware

Most hardware these days has a firmware that is loaded before the operating system is even loaded. This is the most dangerous security hole as when exploited it can give the attacked hardware level access to change files, remotely power on, and complete out of band access. 

Intel has done the worst job at securing down their system as it has been exploited numerous times as documented here: <https://en.wikipedia.org/wiki/Intel_Management_Engine#Security_vulnerabilities>

You can help mitigate these attacks by keeping Intel ME up to date, but the only way to close the hole would be removal which involves flashing the hardware firmware and can not be done on many systems. I highly recommend the open source tool <https://meshcentral.com/> that is free and can update a lot these systems for you without much hassle. It also offers ways to setup this out of band access on the system with vPro capabilities. 

In the server sphere you have Dell iDRAC and HP iLO for out of band access that you need to secure as well.

AMD doesn't have as many vulnurbilities, but does have security concerns with AMD Platform Security Processor (PSP) that was added in 2013.

## Operating Systems

Windows is the most problamatic with extensive telemetry and the most remote execution CVEs out of any operating system. However, I'd caution against using a stock Linux install as well, since many distributions like Arch Linux do not even come with a firewall. I find that [QubesOS](https://www.qubes-os.org/) is the best choice as it has a locked down OS and extensive compartmentalisation via Virtual Machines and seperated networks. However, there is a difficult learning curve. 

## Browsers

There isn't a web browser I'd recommend. I'm currently using Brave, but it could be better. All web browsers have their faults and most of them are running off the Google Chrome codebase. 

Probably the best would be a private firefox you make yourself with this script: <https://github.com/simeononsecurity/FireFox-Privacy-Script>

## Password Managers

Self hosted in a secure location would be the best, but convience often gets that better of us. Most recommend is [Bitwarden](https://bitwarden.com/), but I'd caution against many online password managers as if someone gets your login, everything will be compromosied. The best solution would be a Yubikey or another FIDO device to physically authenticate any new logins or devices.

## Network Gateway and Open Ports

Test your network and see what ports are open using <grc.com>. You should not be port forwarding or using uPnP in your router if you are trying to be secure. The basic shield up! test should give you a good idea of open ports and areas where you can improve your network. While having an open port isn't the end of the world, it is an increased attack surface that can be exploited. 

## Don't be Stupid

Downloading hacked programs, clicking on phishing links, and installing 50 extensions in your browser are not good practices. There are some tools that help train yourself, but they are not bulletproof. Security is about layering and using common sense. You can never be 100% secure and private.

## Walkthrough Video

{{< youtube "ffnIL6hE__w" >}}
