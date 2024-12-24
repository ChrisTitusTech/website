---
title: Create Swap file on Cloud VM (AWS, GCloud, or Azure)
author: Chris Titus

date: 2017-02-14T21:16:13+00:00
url: /create-swap-file/
image: images/2017/02/swapfile.webp
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

