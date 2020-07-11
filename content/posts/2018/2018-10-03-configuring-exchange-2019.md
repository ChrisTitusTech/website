---
title: Installing and Configuring Exchange 2019
author: Chris Titus
type: post
date: 2018-10-03T15:45:56+00:00
url: /configuring-exchange-2019/
image: /wp-content/uploads/2018/10/Exchange-Server-2019.jpg
categories:
  - Windows Server
tags:
  - Exchange 2019

---
This article goes over what it takes for installing and configuring exchange 2019. This step-by-step guide shows you the requirements, installation steps, and basic configuration.<!--more-->

### Requirements

  * Microsoft recommends 128 GB of memory. If in a medium size environment (100-1000 users) 32-64 GB will be sufficient.
  * Microsoft Windows Server 2012 R2/2016/2019
  * Co-Existence with Exchange 2013/2016 that are up-to-date
  * 30 GB of free disk space, however, you should have plenty of TBs of storage available for the mailbox stores.
  * NTFS based file system

### Notable Improvements

  * Exchange 2019 has the ability to now be installed on server core 2019.
  * Exchange Admin Console &#8211; https://server/ecp &#8211; Refined and matches Office 365 layout
  * Outlook Web Access has more features and a better look

### Things I wished Exchange 2019 had

  * **DKIM**&#8230; seriously, WTF Microsoft. Office 365 has this, therefore exchange 2019 should have this!

## Installing Exchange 2019

This was a breeze, with only 2 pre-requirements missing on a server 2016 stock install. The only configuration during setup was the role (mailbox or edge) and naming the exchange organization. Check out this video below to see the time lapse install:

https://youtu.be/xmDOdkOKQxQ

## Configuring Exchange 2019

Again, this was very easy with only a couple options needed before I was operational. Using only a mailbox role with no edge you only need to add your domain, send connector, and set an email address for mailboxes. Here is the basic configuration video:

https://youtu.be/9n6JlEUS5fw  
_Note: Do not forget to add the MX, SPF, DMARC records where your domain registrar DNS resides. _

## Conclusion

I absolutely love Exchange 2019 due to the vast amount of improvements, that said, I am still bummed that they continue to not support DKIM through exchange server. Installing and configuring exchange 2019 was the easiest experience I&#8217;ve had to date, which is saying a lot! Overall I am liking the direction Microsoft is taking with the server line of products and I believe it will continue to have a very bright future, as long as they don&#8217;t do something stupid like including the Microsoft store.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
