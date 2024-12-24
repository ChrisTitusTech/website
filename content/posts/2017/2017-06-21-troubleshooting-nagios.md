---
title: Troubleshooting Nagios 4 Core Installation
author: Chris Titus

date: 2017-06-21T17:13:44+00:00
url: /troubleshooting-nagios/
image: images/2017/06/troubleshooting-nagios.webp
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

