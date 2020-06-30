---
title: How to choose DNS Server by benchmarking them
author: Chris Titus
type: post
date: 2017-03-09T17:35:18+00:00
url: /benchmark-dns-server/
image: /wp-content/uploads/2017/03/Secure-DNS.png
categories:
  - Networking
tags:
  - Benchmark
---
By default, your DNS Server is set to your ISP&#8217;s DNS and this SLOWS down your internet, due to the fact, they are poorly managed and have horrid performance. This shows you how to choose the fastest DNS Server, but results will vary depending on the location. Running this benchmark will tell you which ones are the best to use.<!--more-->

## **Finding the Fastest**

Go to https://www.grc.com/dns/benchmark.htm and download the benchmark tool. From the list make sure you put in all your DNS Servers you want to test. Level3, Google, OpenDNS, and the usual suspects are already in there. I also recommend right-clicking and removing the dead or stale DNS Server. I tossed in free DNS Filtering servers like Norton ConnectSafe and Comodo Secure DNS as well. These performed the worst in speed tests and I recommend not using them in a business environment. If you need DNS filtering and have the budget using OpenDNS (Cisco Umbrella) is going to be your best bet.

Here are my results, Enjoy!

![DNS Results](/wp-content/uploads/2017/03/dnsresults.png)  
  * Red = Cached Time, Green = Uncached Time, and Blue = dotcom Time
  * Grey Dots = Filters bad domain names by default, Green Dots = No filtering

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
