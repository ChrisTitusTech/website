---
title: Create Swap file on Cloud VM (AWS, GCloud, or Azure)
author: Chris Titus
type: post
date: 2017-02-14T21:16:13+00:00
url: /create-swap-file/
image: /wp-content/uploads/2017/02/swapfile.png
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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
