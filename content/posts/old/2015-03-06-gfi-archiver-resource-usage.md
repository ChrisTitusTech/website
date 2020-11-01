---
title: GFI Archiver resource usage
author: Chris Titus
type: post
date: 2015-03-06T23:56:01+00:00
url: /gfi-archiver-resource-usage/
featured_image: https://christitus.com/wp-content/uploads/2015/03/MAR-new_logo.png
categories:
  - Windows Server
tags:
  - GFI MailArchiver
  - Microsoft SQL

---
Does your GFI Archiver resource usage SQL process ballon over 8GB? If so, the following procedure will reduce usage by about half and fix many performance issues.<!--more-->

1. Stop all MailArchiver and SQL services
  
2. Create a backup of ..MailArchiverStoreDataproduct.config
  
3. Edit product.config and add the following key within the `<AppSettings>` section: `<add key="MaxPoolSize" value="20" />`
  
4. Re-start the services

*Note GFI has built-in scripts made to stop all NON-SQL services. Run the Stop script then stop SQL Server Instance, When starting start SQL Server Service before running a start script. The scripts default location are: ..MailArchiver\Tools\Scripts

After performing this procedure the SQL Server Process is now under 4GB or cut in half from their previous usage. In closing, this type of tweak is vital especially if you are running out of resources on the source server or you are running into performance problems within GFI Archiver.

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join