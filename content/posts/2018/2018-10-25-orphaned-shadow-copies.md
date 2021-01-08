---
title: Clearing out Orphaned Shadow Copies
author: Chris Titus
type: post
date: 2018-10-25T15:34:24+00:00
url: /orphaned-shadow-copies/
image: /images/2018/10/shadow-copy-banner.png
categories:
  - Windows Server
tags:
  - vssadmin
  - Shadow Copies

---
In this article, I go over how to get rid of Orphaned Shadow Copies that do not get cleared out by issuing: `vssadmin shadows delete /all` <!--more-->

## Steps to clear out all orphaned shadow copies

  * `vssadmin shadows delete /all`
  * `vssadmin shadows list` 
      * _verify orphaned shadow copies still exist_
  * Use the following command to resize shadow storage, consequently, clears out any shadow copies on that drive 
      * `vssadmin Resize ShadowStorage /For=C: /On=C: /MaxSize=300MB` 
          * _Note: Repeat this for each drive with orphaned shadow copies_
  * Afterward, do a shadows list to verify the shadow copies have been cleared out 
      * _This process can take a very long time for large drives with a lot of shadow copies._
  * With all that finished, reset your shadow copies to either unbounded or 50-100 GB if you have space.

![server-vss](/images/2018/10/shadow-copies.png)

In conclusion, this issue has become less of an issue with the newer versions of Windows Server, but can still rear its ugly head from time to time. It&#8217;s important that you keep these pruned and functional, due to the fact a large number of shadow copies will bloat your server. This also can cause massive performance issues that will lock up a server. It is very important that you keep these manageable and functional for each server instance. In the day and age where virtualization has become so prevalent, you shouldn&#8217;t need many shadow copies.

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