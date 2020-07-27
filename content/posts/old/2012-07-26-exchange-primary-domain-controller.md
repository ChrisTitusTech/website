---
title: Exchange on Primary Domain Controller Slow Reboot and Startup
author: Chris Titus
type: post
date: 2012-07-26T20:31:21+00:00
url: /exchange-primary-domain-controller/
image: /wp-content/uploads/2012/07/hosted-exchange-logo1.png
categories:
  - Windows Server
tags:
  - Exchange Server
---
If you had the misfortune of installing Exchange on Primary Domain Controller you will experience some pain when doing a reboot. Typically it will take 10-15 minutes before it restarts and up to 30 minutes to start the Microsoft Exchange Information Store. Consequently, what is really happening in the background is the IS service is being terminated incorrectly on shutdown and the store is left in a &#8220;DIRTY&#8221; shutdown state. This is very bad on several levels and can cause the Store to corrupt and not start at all, which can be catastrophic.<!--more-->

Luckily, it&#8217;s a simple fix and all you have to do is shut down the services before restarting. Below is a script that does it automatically. So, just plug it into a .cmd or .bat file and run.

```
@ECHO OFF
ECHO ARE YOU SURE YOU WANT TO RESTART SERVER??
pause
net stop msexchangeadtopology /y
net stop msftesql-exchange /y
net stop msexchangeis /y
net stop msexchangesa /y
net stop iisadmin /y
ECHO DONE STOPING SERVICES REBOOT NOW!
pause
```

I hope this helps you and keeps your server running until you are able to install it on another server. That said, try to avoid installing exchange on primary domain controller at all costs. You will avoid so many headaches by doing this.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
