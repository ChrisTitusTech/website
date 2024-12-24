---
title: How To Setup a VPN Kill Switch Server
author: Chris Titus

date: 2019-12-02T05:31:59+00:00
url: /vpn-kill-switch/
image: images/2019/12/vpn-kill-switch-300x169.webp
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

![install image](../images/2019/12/instal.webp)

`sudo apt install openvpn ufw -y`  
_*Note: use apt instead of dnf on Ubuntu or Debian Servers_

## Set Static IP

`sudo nmtuisudo nmcli connection down eth0 && sudo nmcli connection up eth0`

## Download OVPN Files

My recommendation for a Public VPN Provider is Express VPN. It is what I use below and in my VPN videos due to its speed and amount of servers. This is my affiliate link where you will receive an extra 3 months free for signing up for a year. <https://christitus.com/expressvpn>  
**However, you can use these instructions on ANY VPN that provides ovpn files which any reputable VPN provider has.** 

`mv ~/Downloads/client.ovpn /etc/openvpn/test.conf`

<!--adsense-->

## Service creation

![sysinstall image](../images/2019/12/sysinstall.webp)

`ls /lib/systemd/system/`  
_*Check for openvpn-client@ or openvpn@_  
`sudo systemctl start openvpn@test`

## Disable ipv6 and Secure System

![sysctl](../images/2019/12/sysctl.webp)

`sudo nano /etc/sysctl.conf`  
> net.ipv6.conf.all.disable_ipv6=1   
> net.ipv6.conf.default.disable_ipv6=1   
> net.ipv6.conf.lo.disable_ipv6=1

`sudo sysctl -p`

**Verify Ipv6 is disabled**  
`cat /proc/sys/net/ipv6/conf/all/disable_ipv6`  
`sudo sysctl --all | grep disable_ipv6`

## Firewall ufw blocks &#8211; VPN Kill Switch

![install image](../images/2019/12/vpnsetup.webp)

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

![install image](../images/2019/12/transmission.webp)

**X11 Forwarding**  
{{< youtube auePeI8vZA8 >}}  

**Transmission daemon**  
`sudo apt install transmission-daemon`  
`sudo systemctl stop transmission-daemon`  
`sudo nano /etc/transmission-daemon/settings.json`  
_*enable rpc and whitelist, add blocklist_  
`sudo systemctl start transmission-daemon`

## Full Video Walkthrough
{{< youtube wc-Ti8UoPoA >}}  

