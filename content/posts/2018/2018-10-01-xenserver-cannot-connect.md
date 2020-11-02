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