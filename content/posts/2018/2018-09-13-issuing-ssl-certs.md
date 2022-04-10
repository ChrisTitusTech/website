---
title: Issuing SSL Certs using Let’s Encrypt in Ubuntu
author: Chris Titus

date: 2018-09-13T20:49:56+00:00
url: /issuing-ssl-certs/
image: images/2018/09/Letsencrypt.jpg
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

## CTT Extra Content

- [ChrisTitus.com Downloads Section][1] (_CC Only_)
  1. Digital Downloads with Guides and Pre-Built Images
  2. Monthly Members Only Video
  3. $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  1. Monthly Members Only Video
  2. YouTube Emojis for Comments and Live Chat
  3. YouTube Badges that changes based on membership time for comments and chat.
  4. All YouTube comments are highlighted when I review comments daily. 
  5. $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join