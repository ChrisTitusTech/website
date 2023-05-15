---
title: "You Will Watch Ads"

date: 2023-05-16
url: /you-will-watch-ads/
image: images/2023-thumbs/you-will-watch-ads.jpg
categories:
  - Linux
  - Windows
tags:
  - youtube
draft: false
---
There are massive changes coming to the internet and youtube in the form of Ads and the death of the ad blocker.
<!--more-->

This is happening in several different ways in the coming months. Let's go over what I see as inevitable and talk about workarounds.

## YouTube detecting Ad Blockers

![](/images/2023/you-will-watch-ads/yt-ads.png)

YouTube is testing blocking ad blockers like so many different news websites do right now. This will bring the rise of secondary viewers and the use of other sites likes odysee or freetube. These sites rely on YouTube's API and public sync, which will also be in the cross-hairs very soon.

Source: <https://www.bleepingcomputer.com/news/technology/youtube-tests-blocking-videos-unless-you-disable-ad-blockers/>

## Chromium changes

Google's Manifest 3 is almost here in June 2023 and that will hamstring all Ad blockers. Most ad blockers and privacy plugins rely on Manifest 2 and with version 3 being activated they will sunset version 2. How will this affect Firefox users? Will they require google and youtube viewers to be compliant with version 3? Time will tell...

Here was a good writeup from adguard on manifest v3: <https://adguard.com/en/blog/firefox-manifestv3-chrome-adblocking.html>

TLDR; Firefox will see more adoption and regular chrome ad extensions will be limited. 

## API Access and 3rd Party sites

I can already see an ocean of comments that I will x, y, or z instead of youtube and google. The main issue is most alternatives rely on Google and it's VERY open API. Sites like Odysee and many youtube apps not playing ads, rely on the API to SYNC the youtube videos to their servers. These services are on borrowed time and I'm shocked they haven't already been taken down or at least restricted access for syncing YouTube content.

## What About Custom DNS like pihole?

Ad block through custom dns always works, but it works too well. The reason we use ublock orgin or a browser based ad block is to keep the sites loading correctly and apps functioning properly. It would be trivial for Google to put roadblocks in the way of loading youtube if you block adsense. A good solution, but not the best when it comes to the user experience and using Google Ad supported products.

## Walkthrough Video

{{< youtube 11111111 >}}
