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

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
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