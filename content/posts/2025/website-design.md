---
title: "Website Design"

date: 2025-08-28
url: /website-design/
image: images/2025-thumbs/website-design.webp
categories:
  - Linux
tags:
  - website
draft: true
---
Here is my current website design. I used Hugo with its own custom theme as a base, and customized it to fit my needs. The site is hosted on Cloudflare Pages and the source code is available on [GitHub](https://github.com/Christitustech/website)
<!--more-->

## Static Site Infinite Scale

Hugo uses .md files for content and .html files for templates. It then compiles them into static .html files that can be served by any web server. This makes it very fast and secure, as there is no need for a database or server-side scripting.

This means no attack surface and will be loaded faster than any other site because there is no dynamic content. The largest part of the load is google ads. 

The site has roughly 250,000 unique visitors per month and over 1TB of bandwidth usage.

## Store

This runs completely off Shopify and uses liquid custom code for injection directly into the hugo pages.

It has its own custom domain at cttstore.com and uses the Dawn theme with custom liquid download modifications so users can redownload any purches anytime in the future. All payment and file storage is done on Shopify's servers. 

_It holds a 32 percent market share in the US in eCommerce_


## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
