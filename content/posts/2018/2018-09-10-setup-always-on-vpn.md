---
title: Setup an always on VPN in Ubuntu
author: Chris Titus

date: 2018-09-10T14:59:11+00:00
url: /setup-always-on-vpn/
image: images/2018/09/VPN.png
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

