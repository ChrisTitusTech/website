---
title: Using IOMeter to determine hard drive performance
author: Chris Titus

date: 2018-09-14T16:50:46+00:00
url: /using-iometer/
image: images/2018/09/iometer-2.webp
categories:
  - Windows
  - Hardware
tags:
  - Benchmark
---
Using IOMeter will give you a great benchmark on any hard drives and network drives you have. I use this quite often as you can see the effects of new hardware, introducing Link-Aggregation, or troubleshooting drives to determine if they are losing performance.<!--more-->

## Steps to Follow

1) Download IOMeter from the [Official Site](http://www.iometer.org/doc/downloads.html) and run setup
  
![isometer1](/images/2018/09/isometer1.webp)
  
2) All Programs -> Iometer -> Iometer

3) Under ‘Topology’ tab, select the local machine  
-Delete All workers but 1  
-Under ‘Disk Targets’ tab select the drive you want to run the IO test on:  
-Set Maximum Disk Size to 204800 Sectors (one sector is 512 B, so 204800 sectors gives 100MB)

![isometer2](/images/2018/09/isometer2.webp)
  
4) Under ‘Access Specifications’ tab, under Global Access Specifications, select Default, and Click Add

_Note: Default test is – 67% read, 33% write, 2 KB, 100% Random non/sequential writes, Burst Length 1 I/O. This is fine for this brief guide and the sample results below use this. _

![isometer3](/images/2018/09/isometer3.webp)

5) Under ‘Results Display’ tab, under Update Frequency, set to 10 seconds

![isometer4](/images/2018/09/iometer4.webp)

6) Under ‘Test Setup’ tab, set Run Time to 1 minute ( If bench-marking a SAN or Network drive I recommend doing it for 5 minutes for consistency. )

7) Clone Workers from the first page to the number of cores you have. (Ex. Quad Core = 4 workers)

8) The click the green flag to start the test, and choose a location to save the results….

## Conclusion

Remember to benchmark often and always do a before and after you make any changes. This is imperative so you can see any performance gains or losses you might incur. There are many times I have been surprised by the results of switching hardware or simply testing older hardware to see how it is holding up. One thing is for certain, I haven&#8217;t found a freeware tool that is better than IOMeter in the past 15 years that I&#8217;ve been doing IT.

