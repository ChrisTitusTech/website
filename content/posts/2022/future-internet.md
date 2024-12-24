---
title: "Future Internet"
date: 2022-06-11T15:07:10-05:00
url: /future-internet/
image: images/2022-thumbs/future-internet.webp
categories:
  - Linux
  - Windows
tags:
  - Websites
---
Renewing website domains, paying for web hosting, and having them expire are all going to be a thing of the past. 
Using IPFS (Inter-planetary File System) is a way to store websites decentralized and without any money. How fast or how slow it will be, is determined by how popular it is with IPFS nodes. 
This guide shows how to host a website, owning a web domain forever, and redirecting these domains to traditional website hosts. 
<!--more-->

## IPFS - A Better Storage System

IPFS is absolutely amazing as you can run a node on anything and share your files. If they are used by other people then they will populate to their nodes and I've shared and used video files over 1 GB in size! The main issue is there isn't many browsers that support IPFS and it is slower than normal storage right now. However, you never have to worry about hosting costs and as long as the content is accessed by others on a regular basis it will live forever! 

### Improving IPFS in Brave Browser

I highly recommend using IPFS Companion if you plan on doing this regularly. You don't have to run your own node, but can that is up to you. Using this add-on will help resolve IPFS addresses much faster even in Gateway only mode. 

Enable IPFS Companion Extension
- https://docs.ipfs.io/install/ipfs-companion/

After installing IPFS Companion change the following brave settings under Settings -> IPFS
- Enable IPFS Public Gateway Fallback (Not Required, but recommended)
- Enable IPFS Companion 
![ipfs-settings](/images/2022/future-internet/ipfs-settings.webp)

Enable Blockchain domains - The Unstoppable Domains extension (In the future, this should be baked into many browsers. Brave natively supports .crypto)
 - https://unstoppabledomains.com/extension


## Blockchains - Not all created equal

The technology powering blockchains are amazing, but most just care about the monetary gain. I'm more interested in actually using the blockchain and where all the meta data lives for decentralized web or Web3. So what blockchains have I used for this? Lets review:
- Ethereum was one of the original ones that is incredible slow and expensive. I feel like this has turned from a usable blockchain into something only millionaires can use. Maybe this will change in the future, but right now it isn't usable because of the cost to submit transactions. ENS Domains uses ethereum.
- Polygon is a bridge blockchain that drastically improves upon what ethereum started. Fees are non-existent and is very functional. Transfer times are generally about a minute. This is currently what unstoppable domains uses. 
- Solana is not something I recommend, but is considered the fastest blockchain out there. However, It has crashed multiple times and halted completely. I am also skeptical that is even decentralized with the problems it has had. It is very easy to work on and something to watch.
- Cardano is probably my favorite out of all these blockchains for the future. It is very decentralized, transactions can be as fast as 20 seconds and up to a couple minutes. Its roadmap is probably the most promising blockchain with future transactions hitting upwards of 10,000+ transactions per second in a decentralized format. Another possible chain that can be used in the future. 

## Buying Websites Forever

Currently ens domains requires renewing websites, while unstoppable domains provides them forever. This entire space is exploding, so getting a good name is becoming more and more difficult just like the traditional web. There is a very healthy resale market on Opensea.io that folks are using to squat or resell domains purchased through unstoppable domains. If adoption keeps moving this direction, we will soon see some pretty ridiculous prices on domain names. Buying direct from unstoppable domains ranges from $10 to $100 per domain name, depending on domain ending. 
![domains](/images/2022/future-internet/domains.webp)

Here is discount link for unstoppable if you are interested in picking up a domain: <https://unstoppabledomains.pxf.io/MX3zVM>

## Uploading Static Sites

Hosting your website through unstoppable domains is pretty easy, but just know you are limited on size if using their uploader. They have a 20 MB Limit! 

So for large static sites, simply put them all on a IPFS node local or remote and copy the IPFS hash into unstoppable domains to host ANY size of website. 

I personally build my entire static site using hugo because its free / open source. You can then simply upload to IPFS the entire /public folder once you do this. If you are going to go this route, I'd recommend hosting an IPFS node so you can avoid the upload process entirely! 

## Redirect to Traditional Website

The simplist way to do this is with a meta redirect using a standard index.html (PLAIN TEXT ONLY!)

index.html
```
<!DOCTYPE html>
<html>
  <head>
    <title>HTML Meta Tag</title>
    <meta http-equiv = "refresh" content = "1; url = YOUR WEBSITE URL HERE" />
  </head>
  <body>
      <p>YOUR WEBSITE DESCRIPTION HERE </p>
  </body>
</html>
```

## Walkthrough Video 

{{< youtube GERBV2Bv-A4 >}}

