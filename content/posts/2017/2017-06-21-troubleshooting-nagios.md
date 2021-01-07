---
title: Troubleshooting Nagios 4 Core Installation
author: Chris Titus
type: post
date: 2017-06-21T17:13:44+00:00
url: /troubleshooting-nagios/
image: /images/2017/06/troubleshooting-nagios.jpg
categories:
  - Linux
tags:
  - Nagios

---
Use the following command to verify you have all your config and command files correct when troubleshooting Nagios core installation. This will give you a readout of any configuration errors, thus giving you the ability to fix it on the fly.<!--more-->

`/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg`

I&#8217;d recommend making an alias in your .bashrc so you can just type:`testnag`

Here is an example of the alias I use
  
`alias testnag='/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg'`

By using these tips it will cut down on your install and configuration times considerably. You can also make changes and test them before restarting the service, therefore avoiding any potential downtime in your monitoring.

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