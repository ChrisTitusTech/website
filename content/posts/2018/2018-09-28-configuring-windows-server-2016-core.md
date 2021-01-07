---
title: Installing and Configuring Windows Server 2016 Core
author: Chris Titus
type: post
date: 2018-09-28T19:42:47+00:00
url: /configuring-windows-server-2016-core/
image: /images/2018/09/windows-server-2016-guide.jpg
categories:
  - Windows Server
tags:
  - Windows Server 2016 Core

---
This guide walks you through how to installing and configuring windows server 2016 core, afterward you will easily be able to add one to your environment with very little resources. Start off by using the video guide over the installation process. Once done, check the bullets below to help walk you through doing it in your infrastructure.<!--more-->

#### Remote Server Administration Tools for Windows 10

<https://www.microsoft.com/en-us/download/details.aspx?id=45520>

![configure-core](/images/2018/09/windows-server-2016.png)

### Steps to configuring windows server 2016 core

  * Run `sconfig`
  * Configure Static IP
  * Set Computer Name
  * Join to Domain
  * Set Windows Update Settings to Download ONLY
  * Download and Install all Updates
  * Enable Remote Desktop and Remote Management
  * Change Telemetry to Security
  * Activate Windows
  * Reboot

### Connecting Remotely to Server 2016 Core

Finally, we can now go back to our workstation and start utilizing and configuring windows server 2016 core. Once you have launched server manager verify you can connect after adding your server. Please note, this may take about 10-30 seconds so be patient after you add the server and look for any error messages. If you are adding this to the same domain and subnet, you should automatically connect with no issue. 

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