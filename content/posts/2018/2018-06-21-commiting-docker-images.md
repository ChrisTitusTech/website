---
title: Commiting Changes to Docker images and containers
author: Chris Titus

date: 2018-06-21T19:36:03+00:00
url: /commiting-docker-images/
image: images/2018/06/docker-logo.png
categories:
  - Virtualization
tags:
  - Docker
---
This is a walkthrough of how to commit changes to docker images and containers. You need to do this if you make configuration changes to any docker images. By committing changes to the docker images you can backup and clone them.<!--more-->

Docker is a very powerful tool you can use to isolate applications, therefore, you won&#8217;t have them on a single server. However, some docker images don&#8217;t save changes to their container when a restart happens. You will notice that when a reboot or unexpected outage happens all your configuration will be gone since the creation of container. The Ubiquiti Unifi Controller docker image is a good example of this.

##### Here are the following commands to commit those changes to a new image

`sudo docker ps -l`  
_Note: This shows all your containers you need to copy Container ID for the one you want to commit changes on._

`sudo docker commit CONTAINER_ID_GOES_HERE IMAGENAME:TAG`  
_Example Syntax: sudo docker commit 520b0f024bf6 unifi:latest-06-21-2018_
  
![docker](/images/2018/06/docker.png)

Now if you have any issues you can simply create a new container using the image you created above.

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