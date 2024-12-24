---
title: How to choose DNS Server by benchmarking them
author: Chris Titus

date: 2017-03-09T17:35:18+00:00
url: /benchmark-dns-server/
image: images/2017/03/Secure-DNS.webp
categories:
  - Networking
tags:
  - Benchmark
---
By default, your DNS Server is set to your ISP&#8217;s DNS and this SLOWS down your internet, due to the fact, they are poorly managed and have horrid performance. This shows you how to choose the fastest DNS Server, but results will vary depending on the location. Running this benchmark will tell you which ones are the best to use.<!--more-->

## **Finding the Fastest**

Go to https://www.grc.com/dns/benchmark.htm and download the benchmark tool. From the list make sure you put in all your DNS Servers you want to test. Level3, Google, OpenDNS, and the usual suspects are already in there. I also recommend right-clicking and removing the dead or stale DNS Server. I tossed in free DNS Filtering servers like Norton ConnectSafe and Comodo Secure DNS as well. These performed the worst in speed tests and I recommend not using them in a business environment. If you need DNS filtering and have the budget using OpenDNS (Cisco Umbrella) is going to be your best bet.

Here are my results, Enjoy!

![DNS Results](/images/2017/03/dnsresults.webp)  
  * Red = Cached Time, Green = Uncached Time, and Blue = dotcom Time
  * Grey Dots = Filters bad domain names by default, Green Dots = No filtering

