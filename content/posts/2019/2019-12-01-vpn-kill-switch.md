---
title: How To Setup a VPN Kill Switch Server
author: Chris Titus
type: post
date: 2019-12-02T05:31:59+00:00
url: /vpn-kill-switch/
image: /wp-content/uploads/2019/12/vpn-kill-switch-300x169.jpg
categories:
  - Linux
  - Networking
tags:
  - Ubuntu
  - Ubuntu Server
  - Firewall
---
This will show you how to set up a VPN Kill Switch so all traffic will come from that server. For this server, I am using CentOS, but you can easily use Ubuntu server if you are more familiar with that. <!--more-->

## Install packages

![install image](../wp-content/uploads/2019/12/instal.png)

`sudo apt install openvpn ufw -y`  
_*Note: use apt instead of dnf on Ubuntu or Debian Servers_

## Set Static IP

`sudo nmtuisudo nmcli connection down eth0 && sudo nmcli connection up eth0`

## Download OVPN Files

My recommendation for a Public VPN Provider is Express VPN. It is what I use below and in my VPN videos due to its speed and amount of servers. This is my affiliate link where you will receive an extra 3 months free for signing up for a year. <https://www.christitus.com/expressvpn>  
**However, you can use these instructions on ANY VPN that provides ovpn files which any reputable VPN provider has.** 

`mv ~/Downloads/client.ovpn /etc/openvpn/test.conf`

<!--adsense-->

## Service creation

![sysinstall image](../wp-content/uploads/2019/12/sysinstall.png)

`ls /lib/systemd/system/`  
_*Check for openvpn-client@ or openvpn@_  
`sudo systemctl start openvpn@test`

## Disable ipv6 and Secure System

![sysctl](../wp-content/uploads/2019/12/sysctl.png)

`sudo nano /etc/sysctl.conf`  
> net.ipv6.conf.all.disable_ipv6=1   
> net.ipv6.conf.default.disable_ipv6=1   
> net.ipv6.conf.lo.disable_ipv6=1

`sudo sysctl -p`

**Verify Ipv6 is disabled**  
`cat /proc/sys/net/ipv6/conf/all/disable_ipv6`  
`sudo sysctl --all | grep disable_ipv6`

## Firewall ufw blocks &#8211; VPN Kill Switch

![install image](../wp-content/uploads/2019/12/vpnsetup.png)

`sudo nano /etc/default/ufw`  
> IPV6=no

**Whitelist Local Area Network**  
`sudo ufw allow in to 192.168.1.0/24`  
`sudo ufw allow out to 192.168.1.0/24`  
**Block All Incoming and Outgoing Traffic by Default**  
`sudo ufw default deny outgoing`  
`sudo ufw default deny incoming`  
**Whitelist VPN Port for VPN Establishment**  
`sudo ufw allow out to any port 1194 proto udp`  
_*check port by doing head /etc/openvpn/expressvpn.conf_  
**Whitelist VPN Tunnel**  
`sudo ufw allow out on tun0 from any to any`  
`sudo ufw allow in on tun0 from any to any`  
**Enable Firewall**  
`sudo ufw enable`

## External Program Setup on Server

![install image](../wp-content/uploads/2019/12/transmission.png)

**X11 Forwarding**  
[![x11 forwarding](https://img.youtube.com/vi/auePeI8vZA8/0.jpg)](https://www.youtube.com/watch?v=auePeI8vZA8)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

**Transmission daemon**  
`sudo apt install transmission-daemon`  
`sudo systemctl stop transmission-daemon`  
`sudo nano /etc/transmission-daemon/settings.json`  
_*enable rpc and whitelist, add blocklist_  
`sudo systemctl start transmission-daemon`

## Full Video Walkthrough
[![vpn kill switch](https://img.youtube.com/vi/wc-Ti8UoPoA/0.jpg)](https://www.youtube.com/watch?v=wc-Ti8UoPoA)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
