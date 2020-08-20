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

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join