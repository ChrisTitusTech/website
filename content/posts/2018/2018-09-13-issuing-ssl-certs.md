---
title: Issuing SSL Certs using Let’s Encrypt in Ubuntu
author: Chris Titus

date: 2018-09-13T20:49:56+00:00
url: /issuing-ssl-certs/
image: images/2018/09/Letsencrypt.webp
categories:
  - Linux
tags:
  - Ubuntu Server

---
This article goes over Issuing SSL Certs using Let&#8217;s Encrypt in Ubuntu 16.04. The basic steps outlined in the video are adding the repository, installing certbot, issuing a certificate, and enabling SSL.<!--more-->

#### Video Guide:

{{< youtube yC3GTHJRQuM >}}  
  
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

