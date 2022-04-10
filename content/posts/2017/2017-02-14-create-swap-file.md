---
title: Create Swap file on Cloud VM (AWS, GCloud, or Azure)
author: Chris Titus

date: 2017-02-14T21:16:13+00:00
url: /create-swap-file/
image: images/2017/02/swapfile.png
categories:
  - Linux
tags:
  - AWS
  - Google Cloud Platform

---
Use the commands below to create swap file on a micro instance with a Linux operating system. This creates a 2GB Swap file to help alleviate low system ram. Consequently, this is great for those using micro instances in the cloud that have under 1 GB of memory.<!--more-->

### Commands

Run the following from your SSH window
  
```
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon -s`
```
then change fstab (**/etc/fstab**) so it automatically mounts your swap file on startup
  
`/swapfile none swap sw 0 0`

Afterward, check if your swap file is operating properly with`top` or `htop`.

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