---
title: "Why We Don't Browse the Internet Anymore"

date: 2022-11-21
url: /why-we-dont-browse-the-internet-anymore/
image: images/2022-thumbs/why-we-dont-browse-the-internet-anymore.webp
categories:
  - Linux
  - Windows
tags:
  - RSS
draft: false
---
The problem with the modern internet is ads, sponsored posts, and pay walls. Enter RSS feeds as a solution. 
<!--more-->

Subscribe to the sites and information you want to see and not have an algorithm decide what influences you. This requires "fixing" RSS and downloading articles, but the payout is amazing. How many people use RSS? Here is poll I ran on Twitter. 

{{< tweet user="christitustech" id="1589727064957284352" >}}

## How we used to browse the Internet

![](/images/2022/why-we-dont-browse-the-internet-anymore/altavista.webp)

The era of altavista, dogpile, askjeeves, yahoo, excite, lycos, and others was an era of innovation and competition. There was a heated rivalry between Internet Exploader and Netscape, which Microsoft inevitably won with dirty business practices. That era was a time of discovery and businesses were figuring out how to make money on the internet.  

Information was scattered everywhere and the web was decentralized among hundreds of companies. When we "logged on" you made decisions on what to do. Sometimes you wanted to play a game, or stumble upon a new website, or browse a news group. Almost nothing curated and uniform. This is often referred to as Web 1.0. 

## How we use the Internet today

 ![](/images/2022/why-we-dont-browse-the-internet-anymore/google.webp)

 We google anything we want, use our chromium browsers, and social media for everything else. Between Google, Facebook (I'm not calling it Meta), and Amazon we have everything. Facebook is dying off and for old people raging about some political garbage, Amazon we order anything want to appear on our doorstep, and Google is what powers almost every search we do. 

 When we find the site we are looking for, it ends up with tons of ads or paywalled. Even worse, some reputable sites sell "sponsored posts" where the advertising gets posted directly in the feed. Imagine watching a television show and then in the third episode its nothing but a giant Subway ad. This is our modern internet. 

## How to fix it with RSS

Really Simple Syndication or RSS for short, is used to get updates from websites whenever something is posted. You have a listing of the entire website and you can pick the article you want to read. Even better you can subscribe to YouTube Channels and other social feeds to RSS as well.

The problem? Ads, Brief Summaries, and redirects. We fix this by using a feed aggregator and never leave our RSS reader.

The other problem with RSS Readers online are expensive using feedly($8), inoreader($10), and newsblur($3) per month. This used all be free with Google Reader, but in typical Google fashion they killed Reader. 

### Feed Aggregation

I use docker self-hosted aggregator <https://github.com/heussd/fivefilters-full-text-rss-docker> or if you want to pay money you can use [five filters aggregator](http://ftr.fivefilters.org/)

Here is my docker command to install and configure it on my docker server using port 50000

```
docker run -d \
--name=full-test-rss \
-p 50000:80 \
--restart always \
heussd/fivefilters-full-text-rss:latest
```

### Feed Reader

There are a couple different ways to pull in these RSS feeds. For browsers there is Vivaldi, external programs like Obsidian, and for self-hosted I recommend [FreshRSS](https://freshrss.org/)

I use my docker server again to host this on port 49999

```
docker run -d \
  --name=freshrss \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/London \
  -p 49999:80 \
  -v /path/to/data:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/freshrss:latest
```



## Walkthrough Video

{{< youtube nxV0CPNeFxY >}}
