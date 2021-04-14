---
title: Exchange on Primary Domain Controller Slow Reboot and Startup
author: Chris Titus

date: 2012-07-26T20:31:21+00:00
url: /exchange-primary-domain-controller/
image: /images/2012/07/hosted-exchange-logo1.png
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

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://christitus.com/lbry>

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
 [2]: https://christitus.com/join