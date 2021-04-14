---
title: Citrix XenCenter error “Could not create SSL/TLS Secure Channel”
author: Chris Titus

date: 2016-07-13T14:24:04+00:00
url: /citrix-xencenter-error-ssl-secure-channel/
image: /images/2016/07/xenserver.jpg
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