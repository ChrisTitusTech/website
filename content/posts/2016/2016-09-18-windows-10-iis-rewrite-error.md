---
title: 'Windows 10 IIS: C:\WINDOWS\system32\inetsrv\rewrite.dll failed to load'
author: Chris Titus

date: 2016-09-19T00:07:43+00:00
url: /windows-10-iis-rewrite-error/
image: images/2016/09/iis_rewrite.png
categories:
  - Windows
tags:
  - Windows 10

---
This article shows you what to do if you get the rewrite.dll failed to load in Windows 10 event viewer for Windows 10 IIS.<!--more-->

### Commands

Checked Event viewer when my website Showed up with
  
`Service Unavailable 503 error`
  
The Event Viewer Error was
  
`The Module DLL C:\WINDOWS\system32\inetsrv\rewrite.dll failed to load`
  
I went into Add/Remove Programs (Start -> Run-> appwiz.cpl) and simply repaired the following program
  
`IIS Url Rewrite Module 2.0`

### Troubleshooting/Download

Afterward, restart your WWW Service in services.msc and your website will now be working. If you are unable to repair the IIS rewrite module using Add/Remove Programs, you will need to redownload them from Microsoft.
  
[IIS Url Rewrite Module 2.0 for Windows 10][5]

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
 [2]: https://christitus.com/join [5]: https://www.microsoft.com/en-us/download/details.aspx?id=47337
