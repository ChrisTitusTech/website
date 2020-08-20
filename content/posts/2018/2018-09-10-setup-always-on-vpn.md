---
title: Setup an always on VPN in Ubuntu
author: Chris Titus
type: post
date: 2018-09-10T14:59:11+00:00
url: /setup-always-on-vpn/
image: /wp-content/uploads/2018/09/VPN-624x200.png
categories:
  - Linux
tags:
  - VPN
  - Ubuntu Server

---
This is a guide on how to set up an always on VPN in Ubuntu, and basic troubleshooting of VPNs in ubuntu server. I used Private Internet Access as an example VPN connection.<!--more-->
  
Use my affiliate link to get a Private Internet Access VPN: <http://www.privateinternetaccess.com/pages/buy-vpn/christitus>. This is a must-have for a dedicated Linux box specifically for privacy concerns.

### Setup VPN in Ubuntu &#8211; No Commentary

[![Setup VPN no commentary](https://img.youtube.com/vi/KrNgZPzHNeA/0.jpg)](https://www.youtube.com/watch?v=KrNgZPzHNeA)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

### Setup VPN in Ubuntu &#8211; With Commentary

[![Setup VPN in Ubuntu with commentary](https://img.youtube.com/vi/tHEd3fFfGpM/0.jpg)](https://www.youtube.com/watch?v=tHEd3fFfGpM)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

## VPN setup commands:

```
sudo su
apt-get install openvpn -y
cd /etc/openvpn
wget https://www.privateinternetaccess.com...
unzip openvpn.zip
rm openvpn.zip
nano .secrets
```
>p1234567      ###PASTE YOUR INFO###  
>MyPIAPassword ###PASTE YOUR INFO###  
```
chmod 600 .secrets
mv 'US Texas.ovpn' texas.conf
nano texas.conf
```
>auth-user-pass .secrets ###CHANGE THIS LINE###  
```
systemctl start openvpn@texas
systemctl status openvpn@texas
nano /etc/default/openvpn ###UNCOMMENT AUTOSTART
reboot
```

## Diagnostic Commands
Once complete, find the external IP as that is needed to make sure it is working. If your VPN is failing to connect I recommend using tail on the syslog so consequently, you can find any issues that are stopping the connection.

## Extra Tools
Find External IP: dig TXT +short o-o.myaddr.l.google.com @ns1.google.com | awk -F'"' '{ print $2}'
Debug as necessary: tail -f /var/log/syslog|grep ovpn`

In closing, make sure you always use a VPN when you are concerned about your privacy. I&#8217;ve also set these up on Linux boxes between offices and it makes for a great inexpensive site-to-site VPN. Therefore, you don&#8217;t have to spend tons of money on proprietary gateways that go out of date in a couple years.

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join