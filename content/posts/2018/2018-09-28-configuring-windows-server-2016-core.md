---
title: Installing and Configuring Windows Server 2016 Core
author: Chris Titus
type: post
date: 2018-09-28T19:42:47+00:00
url: /configuring-windows-server-2016-core/
image: /wp-content/uploads/2018/09/windows-server-2016-guide.jpg
categories:
  - Windows Server
tags:
  - Windows Server 2016 Core

---
This guide walks you through how to installing and configuring windows server 2016 core, afterward you will easily be able to add one to your environment with very little resources. Start off by using the video guide over the installation process. Once done, check the bullets below to help walk you through doing it in your infrastructure.<!--more-->

#### Remote Server Administration Tools for Windows 10

<https://www.microsoft.com/en-us/download/details.aspx?id=45520>

![configure-core](/wp-content/uploads/2018/09/windows-server-2016.png)

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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
