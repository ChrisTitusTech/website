---
title: 'Windows 10 IIS: C:\WINDOWS\system32\inetsrv\rewrite.dll failed to load'
author: Chris Titus
type: post
date: 2016-09-19T00:07:43+00:00
url: /windows-10-iis-rewrite-error/
image: /wp-content/uploads/2016/09/iis_rewrite-624x228.png
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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
 [5]: https://www.microsoft.com/en-us/download/details.aspx?id=47337
