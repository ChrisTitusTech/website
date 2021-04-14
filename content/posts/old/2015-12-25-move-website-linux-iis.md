---
title: Move Website from Linux to IIS
author: Chris Titus

date: 2015-12-26T05:41:50+00:00
url: /move-website-linux-iis/
image: /images/2015/12/move-wordpress-site.jpg
categories:
  - Linux
  - Windows Server
tags:
  - Windows 10
  - IIS

---
This guide goes over how to Move Website from Linux to IIS. If you&#8217;re in the tech field, you probably see moving from Linux to IIS on a WordPress platform and immediately cringed.<!--more-->

### Migration

The database migration from MySQL to MS SQL is actually pretty easy since you just push it through a large query, but I didn&#8217;t really want to mess with it, so I stuck with MySQL.

[Download and Install MySQL for Windows][5]

With that down setting up IIS is also extremely simple now, which is quite surprising given how unfriendly IIS 6 was. The interface is pretty much the same, so you can do it the way you have always known, but now they have added multiple friendly tools in the form of **Microsoft WebMatrix** and **Web Platform Installer**.

[Download Microsoft WebMatrix (official Microsoft Link)][6]

Using the Web Platform Install you can just select whatever install you want (WordPress for me) and click install. It grabs all the dependencies and installs them for you, and from here I had a fresh WordPress install. I did a simple import and changed a couple of settings that were reset and was back up and running. Overall a simple migration, and pretty happy with IIS 10 (What happened to IIS 9 we will never know&#8230;)

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://christitus.com/lbry>

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
 [2]: https://christitus.com/join [5]: https://dev.mysql.com/downloads/mysql/
 [6]: https://go.microsoft.com/fwlink/?LinkID=286266

