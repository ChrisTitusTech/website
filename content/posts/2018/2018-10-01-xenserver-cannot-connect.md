---
title: XenServer cannot connect in XenCenter or XCP-ng Center
author: Chris Titus
type: post
date: 2018-10-01T18:53:13+00:00
url: /xenserver-cannot-connect/
image: /wp-content/uploads/2016/07/xenserver.jpg
categories:
  - Virtualization
tags:
  - XenServer

---
Having problems and your XenServer cannot connect to XenCenter? Did you have high availability enabled? If you answered yes to both these questions here is how you get your XenServer back online and functioning properly. <!--more-->

![xenserver-cannot](/wp-content/uploads/2018/10/xenserver-cannot-connect.png)

### Step-by-Step Guide

  * PuTTy into the XenServer Pool Master
  * run the following commands:

`xe pool-ha-disable`_Note: If this fails try ha-disable force below_
  
`xe host-emergency-ha-disable force=true<br />
xe pool-emergency-transition-to-master --force`
  
_Note: This will force the pool and slaves to reinitialize with the pool master_

  * Once the server reboots it should connect
  * Go into your XenCenter and re-connect

### Other Helpful Commands for troubleshooting

`xe-toolstack-restart` &#8211; First command I always try before anything else
  
`service xapi restart` &#8211; This restarts a core service
  
`xsconsole` &#8211; This launches console to check pool, network config, ha, running VMS, etc.

### How-To Video going over troubleshooting

[![apache-yt](https://img.youtube.com/vi/UqsaRixKveA/0.jpg)](https://www.youtube.com/watch?v=UqsaRixKveA)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

### Conclusion

This will get your server back up and accessible, however, this disables high availability and will need to be set back up. It&#8217;s important to note the cause of an event like this. In my case, the SR I was using to host my VMs was not sufficient and caused the outage. If this happens to you make sure you have a good SAN/NAS for hosting on a Gigabit or above connection. I&#8217;d highly recommend a 10Gbs connection or a multipath gigabit connection at the very least.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
