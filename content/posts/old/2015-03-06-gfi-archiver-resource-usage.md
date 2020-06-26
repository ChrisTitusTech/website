---
title: GFI Archiver resource usage
author: Chris Titus
type: post
date: 2015-03-06T23:56:01+00:00
url: /gfi-archiver-resource-usage/
featured_image: https://www.christitus.com/wp-content/uploads/2015/03/MAR-new_logo.png
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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
