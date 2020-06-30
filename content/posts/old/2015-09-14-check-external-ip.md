---
title: Check External IP in Linux Server
author: Chris Titus
type: post
date: 2015-09-14T18:33:12+00:00
url: /check-external-ip/
image: /wp-content/uploads/2015/09/ipaddress.jpg
categories:
  - Linux

---
All these commands check external IP in Linux Terminal for any Linux system.<!--more-->

### Commands

##### Nice format for External IP

`curl -s checkip.dyndns.org | sed -e 's/.*Current IP Address: //' -e 's/<.*$//'`

##### Short and Simple to remember

`curl ifconfig.co`

##### For those with security concerns without using curl

`dig TXT +short o-o.myaddr.l.google.com @ns1.google.com | awk -F'"' '{ print $2}'`

Any of these commands will achieve the same result, so pick which one you like best. Personally, for business and professional environments I stick with dig and just make an alias for it, however, for home projects a simple curl ifconfig.co is great.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
