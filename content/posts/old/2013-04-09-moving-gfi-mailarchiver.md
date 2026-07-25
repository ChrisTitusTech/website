---
title: Moving GFI MailArchiver to another server
author: Chris Titus

date: 2013-04-09T16:39:37+00:00
url: /moving-gfi-mailarchiver/
image: images/2013/04/gfi.webp
categories:
  - Windows Server
tags:
  - Exchange Server
  - GFI MailArchiver

---
The following walkthrough shows you the process of moving GFI MailArchiver to another server. <!--more-->These KB articles will assist you in the moving and migration of this server. The process is very involved and requires copying all the data files over to the new server. Afterward, backing up every single SQL database (archive store) and detaching/copying them. From there you reattach the stores and reinstall GFI MailArchiver on the new server.

#### Here is the Article describing the data file moves and re-installation on the new server.

_Please Note: DO NOT re-install GFI before moving SQL Databases from_ the second _article unless you plan on leaving SQL on old server!_

<https://support.gfi.com/article/112712-moving-gfi-archiver-to-a-new-server>

#### This Article describes the actual SQL Server Move

<https://support.gfi.com/article/112612-how-to-move-a-gfi-archiver-database-to-another-microsoft-sql-server>

![Moving GFI MailArchiver](/images/2013/04/Moving-GFI-MailArchiver.webp)

### Installation Notes:

  * I had to switch to SQL authentication because my old archive store kept popping up errors.
  * A very long process, because of the massive amount of emails in this archiver. Depending on the business it can take a few days or weeks!
