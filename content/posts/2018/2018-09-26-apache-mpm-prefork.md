---
title: Optimizing Apache Memory Usage using mpm prefork
author: Chris Titus
type: post
date: 2018-09-26T17:31:24+00:00
url: /apache-mpm-prefork/
image: /wp-content/uploads/2018/09/apache-624x351.jpg
categories:
  - Linux
tags:
  - Website
---
This guide goes over optimizing apache memory usage by configuring mpm prefork module to the best values for your server. Afterword, you should notice substantial increases in performance especially if you are using free micro instances from Google Cloud or AWS.<!--more-->

### Commands used:

  * Check Apache Memory usage 
      * `ps -ylC apache2 --sort:rss | awk '{sum+=$8; ++n} END {print "Tot="sum"("n")";print "Avg="sum"/"n"="sum/n/1024"MB"}'`
  
        _Note: My result was between 68-71 MB with stock modules loaded, however, your results will vary._ 
  * Launch Memory manager/resource viewer 
      * &#8216;`htop`<span style="font-size: 1rem;">&#8216; OR you can use &#8216;</span>`top`<span style="font-size: 1rem;">&#8216; for fewer options and visuals</span>
  * 10/4/2018 UPDATE: Follow this Github script if you want to take the guesswork out, due to this being a curl script you may want to review the code first. 
      * `curl -sL https://raw.githubusercontent.com/richardforth/apache2buddy/master/apache2buddy.pl | perl`

#### Values to calculate:

> Total System Memory Free &#8211; Buffer / Apache2 MB usage = MaxRequestWorkers, ServerLimit, and MaxClients

![apache2](/wp-content/uploads/2018/09/apache2.png)

#### My Settings: Server Instance (Standard) 1 dedicated vCPU with 3.5 GB of Memory

Please note that the below settings is done from a stock apache configuration. With all things considered these values are very conservative and therefore can be used if you are hosting with these specs or greater. In future articles I&#8217;ll go through disabling un-needed modules to reduce apache&#8217;s footprint, thus allowing you to increase these numbers.

```
# prefork MPM
# StartServers: number of server processes to start
# MinSpareServers: minimum number of server processes which are kept spare
# MaxSpareServers: maximum number of server processes which are kept spare
# MaxRequestWorkers: maximum number of server processes allowed to start
# MaxConnectionsPerChild: maximum number of requests a server process serves
StartServers 3
MinSpareServers 5
MaxSpareServers 10
ServerLimit 45
MaxClients 45
MaxRequestWorkers 45
MaxConnectionsPerChild 2000
```
> 45 processes x 68 MB per = 3060 MB Free Memory needed for the above configuration

Comparatively, a microserver with 600-700 MB of ram and shared CPU you will be looking at 1-3 Start/Min/Max Start and Spare servers, and no more than 10 for ServerLimit/MaxClients/MaxRequestWorkers. There are other modifications you need to make in culling down apache modules, therefore you can increase these values further.

### Video Walkthrough

[![apache-yt](https://img.youtube.com/vi/uGugeHVEeiU/0.jpg)](https://www.youtube.com/watch?v=uGugeHVEeiU)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

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