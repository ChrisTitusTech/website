---
title: SATA vs SAS vs NVMe Performance Breakdown
author: Chris Titus
type: post
date: 2018-10-05T20:28:58+00:00
url: /sata-vs-sas-vs-nvme/
image: /wp-content/uploads/2018/10/ssdvsnvme.png
categories:
  - Hardware
tags:
  - Benchmark

---
This is a quick breakdown of the differences between SATA vs SAS vs NVMe. After looking at the performance below, you will be able to decide which one best suits your needs.<!--more-->

  * SATA (Serial Advanced Technology Advancement) 
      * Most common
      * Least reliable
      * Slow 
          * 5400 &#8211; 7200 RPM Hard Drives
          * Half duplex (Can&#8217;t read and write simultaneously)
          * 6 GB/s connection
      * Cheap (1 TB  SSD $150)
  * SAS (Serial Attached Storage) 
      * Commonplace in data centers
      * Very reliable 
          * Error checking is built-in
      * Fast 
          * 15k RPM Hard Drives
          * Full Duplex (Simultaneous read and write)
          * 12 GB/s connection
      * Expensive (800 GB SSD $600) &#8211; Pretty much enterprise only
  * NVMe (Non-Volatile Memory Express) 
      * Common in new PC builds, common in data center SANs for cache on tiered storage.
      * Reliable
      * Fastest 
          * 16-32 GB/s connection when directly plugged into PCIe
          * 12 GB/s connection still applies when hot-swapped via SAS connection
          * Full Duplex
          * Higher Bandwidth (Able to process the most at one time)
      * Expensive (1 TB Residential $300-$400 | 1.2 TB Enterprise $1200)

No real surprises here but having it bullet-pointed makes the comparison very easy. I hope this helps those trying to decide on what to buy and typical performance you can expect from it.

![nvmevssata-pic](/wp-content/uploads/2018/10/ssdvsnvme.png)

## SATA vs SAS vs NVMe | Performance Winner: NVMe

## SATA vs SAS vs NVMe | Budget Winner: SATA

What about SAS? Well, in enterprise environments you see this very often with pretty much every tiered storage device having it. Most of what is on the market today is a mixture of SAS and NVMe for business. These hybrid drives are crazy expensive but give system administrators the ability to claim some of the speed from NVMe without purchasing entirely new devices. While this may seem trivial when you are talking thousands of dollars, this becomes a budget issue. SAS also has the error checking built into the interface, which in turn, gives greater reliability in theory. Personally, I think the future enterprise devices will have some type of new connector or housing that will make NVMe devices hot-swappable without the 12 GB/s SAS limitation. That said, we aren&#8217;t quite there yet, and the prevalence of SAS in enterprise space will continue.

By doing this you allow all traffic inbound to this computer, consequently, all outbound traffic is already allowed by default. Therefore, certain programs and services that depend on windows firewall can function properly. In conclusion, this is a far superior way of disabling the built-in firewall in windows without affecting other programs.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
