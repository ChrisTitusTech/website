---
title: Troubleshooting Nagios 4 Core Installation
author: Chris Titus
type: post
date: 2017-06-21T17:13:44+00:00
url: /troubleshooting-nagios/
image: /wp-content/uploads/2017/06/troubleshooting-nagios-624x484.jpg
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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
