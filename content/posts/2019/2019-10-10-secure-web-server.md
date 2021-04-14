---
title: How to Secure A Web Server
author: Chris Titus

date: 2019-10-10T13:37:49+00:00
url: /secure-web-server/
image: /images/2019/10/secure-website-300x169.jpg
categories:
  - Linux
  - Networking
tags:
  - Ubuntu
  - Ubuntu Server
  - Firewall
---
 

In this article, I show you all the steps needed to secure a web server and improve your security. I recommend doing all of these things on every installation. Also, just because you secure your server doesn&#8217;t mean you can neglect it. I highly recommend monitoring it and adjusting security as needed. Monitoring is required for proper security in my opinion. <!--more-->

# Secure A Web Server Steps

![firewall-png-577&#215;359](/images/2019/10/firewall-png-577x359.png) 

**Install UFW**  

```Bash
sudo apt-get update  
sudo apt-get install ufw  
sudo ufw limit 22/tcp  
sudo ufw allow 80/tcp  
sudo ufw allow 443/tcp  
sudo ufw enable
```

**Verify**  
 `sudo ufw status`

**Do Global blocks**   

```Bash
sudo ufw default deny incoming  
sudo ufw default allow outgoing
```

![ssh](/images/2019/09/ssh.png) 

## Change SSH to Key

**Remote Machine**: `ssh-keygen -t rsa`

### Transfer to Server

#### Method 1:

**Transfer pub ssh key to server**  
```Bash
scp ~/.ssh/id_rsa.pub user@server.com:~
cat ~/id_rsa.pub >> ~/.ssh/authorized_keys
```

#### Method 2:

Copy key and place in authorized_key file in one command  
`ssh-copy-id -i ~/.ssh/id_rsa.pub user@server.com`

### Secure a Web Server Disabling Password Auth through SSH

**Change the following lines in /etc/sshd_config**  
```
ChallengeResponseAuthentication no
PasswordAuthentication no
UsePAM no
PermitRootLogin no
```

## Edit /etc/sysctl.conf

Enable security features

![settings](/images/2019/10/settings.png) 

## Prevent IP Spoof /etc/host.conf

Change File to mirror below:  
```
​order bind,hosts
multi on
nospoof on
```

## Install Fail2Ban

```Bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Check Listening Ports

`netstat -tunlp` 

You will now have completed the basics of a secure web server!

## Video Walkthrough

[![secure web server](https://img.youtube.com/vi/7pJKBL9x6bY/0.jpg)](https://www.youtube.com/watch?v=7pJKBL9x6bY)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

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