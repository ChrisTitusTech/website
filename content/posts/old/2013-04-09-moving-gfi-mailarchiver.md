---
title: Moving GFI MailArchiver to another server
author: Chris Titus

date: 2013-04-09T16:39:37+00:00
url: /moving-gfi-mailarchiver/
image: images/2013/04/gfi.png
categories:
  - Windows Server
tags:
  - Exchange Server
  - GFI MailArchiver

---
The following walkthrough shows you the process of moving GFI MailArchiver to another server. <!--more-->These KB articles will assist you in the moving and migration of this server. The process is very involved and requires copying all the data files over to the new server. Afterward, backing up every single SQL database (archive store) and detaching/copying them. From there you reattach the stores and reinstall GFI MailArchiver on the new server.

#### Here is the Article describing the data file moves and re-installation on the new server.

_Please Note: DO NOT re-install GFI before moving SQL Databases from_ the second _article unless you plan on leaving SQL on old server!_

<http://kb.gfi.com/articles/SkyNet_Article/Is-it-possible-to-move-MailArchiver-to-a-new-server?retURL=%2Fapex%2FSupportHome&popup=true>

#### This Article describes the actual SQL Server Move

<http://kb.gfi.com/articles/SkyNet_Article/How-to-move-a-GFI-MailArchiver-database-from-one-Microsoft-SQL-Server-to-another?retURL=%2Fapex%2FSupportHome&popup=true>

![Moving GFI MailArchiver](/moving-gfi-mailarchiver/moving-gfi-mailarchiver-2/)

### Installation Notes:

  * I had to switch to SQL authentication because my old archive store kept popping up errors.
  * A very long process, because of the massive amount of emails in this archiver. Depending on the business it can take a few days or weeks!

## CTT Extra Content

- [ChrisTitus.com Downloads Section][1] (_CC Only_)
  1. Digital Downloads with Guides and Pre-Built Images
  2. Monthly Members Only Video
  3. $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  1. Monthly Members Only Video
  2. YouTube Emojis for Comments and Live Chat
  3. YouTube Badges that changes based on membership time for comments and chat.
  4. All YouTube comments are highlighted when I review comments daily. 
  5. $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join