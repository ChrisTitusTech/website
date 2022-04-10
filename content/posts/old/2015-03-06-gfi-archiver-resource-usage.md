---
title: GFI Archiver resource usage
author: Chris Titus

date: 2015-03-06T23:56:01+00:00
url: /gfi-archiver-resource-usage/
image: images/2015/03/MAR-new_logo.png
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