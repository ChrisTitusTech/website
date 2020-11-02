---
title: Using IOMeter to determine hard drive performance
author: Chris Titus
type: post
date: 2018-09-14T16:50:46+00:00
url: /using-iometer/
image: /wp-content/uploads/2018/09/iometer-2.png
categories:
  - Windows
  - Hardware
tags:
  - Benchmark
---
Using IOMeter will give you a great benchmark on any hard drives and network drives you have. I use this quite often as you can see the effects of new hardware, introducing Link-Aggregation, or troubleshooting drives to determine if they are losing performance.<!--more-->

## Steps to Follow

1) Download IOMeter from the [Official Site](http://www.iometer.org/doc/downloads.html) and run setup
  
![isometer1](/wp-content/uploads/2018/09/isometer1.png)
  
2) All Programs -> Iometer -> Iometer

3) Under ‘Topology’ tab, select the local machine  
-Delete All workers but 1  
-Under ‘Disk Targets’ tab select the drive you want to run the IO test on:  
-Set Maximum Disk Size to 204800 Sectors (one sector is 512 B, so 204800 sectors gives 100MB)

![isometer2](/wp-content/uploads/2018/09/isometer2.png)
  
4) Under ‘Access Specifications’ tab, under Global Access Specifications, select Default, and Click Add

_Note: Default test is – 67% read, 33% write, 2 KB, 100% Random non/sequential writes, Burst Length 1 I/O. This is fine for this brief guide and the sample results below use this. _

![isometer3](/wp-content/uploads/2018/09/isometer3.png)

5) Under ‘Results Display’ tab, under Update Frequency, set to 10 seconds

![isometer4](/wp-content/uploads/2018/09/iometer4.png)

6) Under ‘Test Setup’ tab, set Run Time to 1 minute ( If bench-marking a SAN or Network drive I recommend doing it for 5 minutes for consistency. )

7) Clone Workers from the first page to the number of cores you have. (Ex. Quad Core = 4 workers)

8) The click the green flag to start the test, and choose a location to save the results….

## Conclusion

Remember to benchmark often and always do a before and after you make any changes. This is imperative so you can see any performance gains or losses you might incur. There are many times I have been surprised by the results of switching hardware or simply testing older hardware to see how it is holding up. One thing is for certain, I haven&#8217;t found a freeware tool that is better than IOMeter in the past 15 years that I&#8217;ve been doing IT.

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