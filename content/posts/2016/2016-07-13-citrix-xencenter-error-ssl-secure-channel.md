---
title: Citrix XenCenter error “Could not create SSL/TLS Secure Channel”
author: Chris Titus

date: 2016-07-13T14:24:04+00:00
url: /citrix-xencenter-error-ssl-secure-channel/
image: images/2016/07/xenserver.webp
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

