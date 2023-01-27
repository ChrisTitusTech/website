---
title: "Im Sorry Netlify"

date: 2023-02-08
url: /im-sorry-netlify/
image: images/2023-thumbs/im-sorry-netlify.jpg
categories:
  - Linux
  - Windows
tags:
  - Netlify
  - Website
draft: false
---
I've used Netlify for years on my website and it's a fantastic service! As I've grown it's becoming unaffordable. I submitted a support request and this is what happened...
<!--more-->

## Excess Bandwidth

![](/images/2023/im-sorry-netlify/intro.png)

![](/images/2023/im-sorry-netlify/graph.png)

The statistics on the website have grown with data usage. More Users = More Bandwidth Used. At this rate of growth I'm going to be spending well over $100 a month in bandwidth usage. Don't get me wrong for starting a website, Netlify limits won't be a problem. Heck, for the past year I had a 1TB of bandwidth per month for $19! The downside? Over 1TB it starts getting REALLY EXPENSIVE, every 100GB after that is $55! It isn't sustainable.

## The Switch

There are many competitors to Netlify launching competing services, but one in particular caught my eye. Cloudflare launched it's "Pages" service that hooks in with GitHub in 2020. The free tier even gives you UNLIMITED bandwidth! Having used Cloudflare extensively for DNS and DDoS setups in business this is a no brainer. The best part? Analytics are also free! 

![](/images/2023/im-sorry-netlify/cloudflare.png)

## The Experience

I setup pages and click "Connect to GitHub" then selected my existing Netlify website to see if it could build the HUGO site. FAILURE.

The stock hugo instance is v0.50 which is old (Netlify does the same thing) so I added an Environmental Variable. Fixed with the following:

![](/images/2023/im-sorry-netlify/hugo-variable.png)

The other downside? Netlify redirect rules do NOT apply. Cloudflare takes a different approach with Page Rules. This might get expensive for anyone doing a LOT of redirects, as you only get 20 rules for free or pro plan.

![](/images/2023/im-sorry-netlify/rules.png)

Overall, I'm pretty darn happy with Cloudflare.

They also have a bunch of optimization rules, DDoS prevention, and more, but its about on par with Netlify and haven't noticed any speed or optimization difference.

## Walkthrough Video

{{< youtube Cfr4YNbKrB8 >}}
