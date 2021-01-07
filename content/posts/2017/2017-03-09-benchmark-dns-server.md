---
title: How to choose DNS Server by benchmarking them
author: Chris Titus
type: post
date: 2017-03-09T17:35:18+00:00
url: /benchmark-dns-server/
image: /images/2017/03/Secure-DNS.png
categories:
  - Networking
tags:
  - Benchmark
---
By default, your DNS Server is set to your ISP&#8217;s DNS and this SLOWS down your internet, due to the fact, they are poorly managed and have horrid performance. This shows you how to choose the fastest DNS Server, but results will vary depending on the location. Running this benchmark will tell you which ones are the best to use.<!--more-->

## **Finding the Fastest**

Go to https://www.grc.com/dns/benchmark.htm and download the benchmark tool. From the list make sure you put in all your DNS Servers you want to test. Level3, Google, OpenDNS, and the usual suspects are already in there. I also recommend right-clicking and removing the dead or stale DNS Server. I tossed in free DNS Filtering servers like Norton ConnectSafe and Comodo Secure DNS as well. These performed the worst in speed tests and I recommend not using them in a business environment. If you need DNS filtering and have the budget using OpenDNS (Cisco Umbrella) is going to be your best bet.

Here are my results, Enjoy!

![DNS Results](/images/2017/03/dnsresults.png)  
  * Red = Cached Time, Green = Uncached Time, and Blue = dotcom Time
  * Grey Dots = Filters bad domain names by default, Green Dots = No filtering

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