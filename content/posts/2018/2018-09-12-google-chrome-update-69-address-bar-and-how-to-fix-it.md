---
title: Google Chrome missing www and how to fix it
author: Chris Titus

date: 2018-09-12T20:49:44+00:00
url: /google-chrome-update-69-address-bar-and-how-to-fix-it/
image: /images/2018/09/chrome.jpg
categories:
  - Software
tags:
  - Google Chrome

---
 Chrome started rolling out update 69 at the beginning of this month (September 2018) causing a missing www in the address bar. There are two things this update did that you need to be aware of. <!--more-->

## Google Chrome Update 69 Changes

  * **Show trivial sub-domains (missing www in the address bar)** 
      * Fix: Type this in your address bar:
      * **chrome://flags/#omnibox-ui-hide-steady-state-url-scheme-and-subdomains**
      * Set to **DISABLED**
  * **Chrome now defaults to SSL / HTTPS for all websites** 
      * So I didn&#8217;t realize this happened and launched a new ubuntu web server to find it unreachable with apache installed. After wasting a lot of time, more than I&#8217;m willing to tell you here, I found out the new version of chrome will default to https:// before everything unless you explicitly put http:// in the address bar. This includes IP addresses and the like. So make sure you have SSL certs updated otherwise you are going to have a bad time.

## Video Walkthrough

[![chrome](https://img.youtube.com/vi/0O9TzNvVwR0/0.jpg)](https://www.youtube.com/watch?v=0O9TzNvVwR0)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

## Conclusion 

I typically love a lot of the Google projects and updates they do, but the missing www in the address bar left me a little puzzled and why they thought they needed to do it. On the plus side, I do like the new chrome tabs, so the entire update is not all bad. Also, the changes to default to secure sites has been a long time coming. There are many different reasons for this, but the fact is by forcing webmasters to use SSL and get secure is a good thing. These days non-secure http sites can easily be exploited by a variety of different methods and this is a welcomed change in my opinion. 

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://links.christitus.com/lbry>

#### Exclusive Content

- [ChrisTitus.com Members Section][1] (_CC Only_)
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  - Monthly Members Only Video
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://links.christitus.com/join