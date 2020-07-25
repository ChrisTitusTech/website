---
title: Issuing SSL Certs using Let’s Encrypt in Ubuntu
author: Chris Titus
type: post
date: 2018-09-13T20:49:56+00:00
url: /issuing-ssl-certs/
image: /wp-content/uploads/2018/09/Letsencrypt.jpg
categories:
  - Linux
tags:
  - Ubuntu Server

---
This article goes over Issuing SSL Certs using Let&#8217;s Encrypt in Ubuntu 16.04. The basic steps outlined in the video are adding the repository, installing certbot, issuing a certificate, and enabling SSL.<!--more-->

#### Video Guide:

[![ssl-yt](https://img.youtube.com/vi/yC3GTHJRQuM/0.jpg)](https://www.youtube.com/watch?v=yC3GTHJRQuM)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_
  
## Links

Let&#8217;s Encrypt @ https://letsencrypt.org
  
Certbot @ https://certbot.eff.org

## Command List for Issuing SSL Certs

`sudo apt-get update`  
`sudo apt-get install software-properties-common -y`  
`sudo add-apt-repository ppa:certbot/certbot`  
`sudo apt-get update`  
`sudo apt-get install python-certbot-apache -y`  
`sudo certbot --apache`  

## Finishing Up

After performing these steps you will make your site secure and it will automatically renew this certificate. This is a great set it and forget solution, expecially if you are running your own site on a budget.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
