---
title: Issuing SSL Certs using Let’s Encrypt in Ubuntu
author: Chris Titus
type: post
date: 2018-09-13T20:49:56+00:00
url: /issuing-ssl-certs/
image: /images/2018/09/Letsencrypt.jpg
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