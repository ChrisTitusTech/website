---
title: Create iSCSI SR in XenServer
author: Chris Titus
type: post
date: 2018-10-09T16:18:46+00:00
url: /create-iscsi-sr/
image: /wp-content/uploads/2018/10/xcp-ng-iscsi.png
categories:
  - Virtualization
tags:
  - XenServer
  - XCP-ng
  - XenOrchestra

---
This guide goes over how to Create iSCSI SR on Xen to connect to an iSCSI target. Here is the step-by-step and a video walkthrough, which includes setting up iSCSI in FreeNAS.<!--more-->

### Requirements

  * Multiple XenServers (2+) in a Pool
  * iSCSI target (Check out FreeNAS in the video below for setting one up)
  * At LEAST a gigabit environment

![xen-iscsi](/wp-content/uploads/2018/10/xen-iscsi-sr.png)

### Step-by-Step Guide to Create iSCSI SR

  1. Open and Connect to XenCenter / XCP-ng Center
  2. Select Pool and Click New Storage
  3. Make sure iSCSI is selected
  4. Name Storage
  5. Select either provisioning methods
  6. Enter IP Address / Authentication (if needed) / Click Scan Target Host
  7. Pick IQN / LUN from your storage device 
      * _Note: When Selecting_ IQN_, make sure you select your SAN if you are using a dedicated network_
  8. Finish

### Video Walkthrough

[![iscsi-ya](https://img.youtube.com/vi/mn17fHzn2XQ/0.jpg)](https://www.youtube.com/watch?v=mn17fHzn2XQ)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

In the end, we now have a centralized storage system that all our hosts can put their VMs on. This is key for using high availability, Xen Orchestra, and quick migrations. Remember to use the community-driven XenServer @ <https://xcp-ng.org/>, therefore you can get all the enterprise features of XenServer in your lab environment.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
