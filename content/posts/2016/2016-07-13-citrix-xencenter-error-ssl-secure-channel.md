---
title: Citrix XenCenter error “Could not create SSL/TLS Secure Channel”
author: Chris Titus
type: post
date: 2016-07-13T14:24:04+00:00
url: /citrix-xencenter-error-ssl-secure-channel/
image: /wp-content/uploads/2016/07/xenserver.jpg
categories:
  - Virtualization
tags:
  - XCP-ng
  - XenServer

---
Running the following commands will fix the XenCenter Error. You are typically encountering this error because Windows 10 requires stronger encryption, consequently, this is prevalent on older XenServer installations. I encountered this on XenServer 6.0.<!--more-->

### Commands

  * Putty in using SSH
```
service xapissl stop
mv /etc/xensource/xapi-ssl.pem /etc/xensource/xapi-ssl.pem.bak
/opt/xensource/libexec/generate_ssl_cert "/etc/xensource/xapi-ssl.pem" '10.100.0.40'
service xapissl start
xe-toolstack-restart
```

Where you see 10.100.0.40 this is the IP of your XenServer that you are connecting to (not VM ips). Once you run this it reissues the cert and you will be able to properly connect. I&#8217;ve seen this on Windows 10 Systems since they force the higher level encryption, however,  If this doesn&#8217;t resolve the XenCenter error let me know.

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