---
title: 'Windows 10 IIS: C:\WINDOWS\system32\inetsrv\rewrite.dll failed to load'
author: Chris Titus

date: 2016-09-19T00:07:43+00:00
url: /windows-10-iis-rewrite-error/
image: images/2016/09/iis_rewrite.webp
categories:
  - Windows
tags:
  - Windows 10

---
This article shows you what to do if you get the rewrite.dll failed to load in Windows 10 event viewer for Windows 10 IIS.<!--more-->

## Commands

Checked Event viewer when my website Showed up with
  
`Service Unavailable 503 error`
  
The Event Viewer Error was
  
`The Module DLL C:\WINDOWS\system32\inetsrv\rewrite.dll failed to load`
  
I went into Add/Remove Programs (Start -> Run-> appwiz.cpl) and simply repaired the following program
  
`IIS Url Rewrite Module 2.0`

### Troubleshooting/Download

Afterward, restart your WWW Service in services.msc and your website will now be working. If you are unable to repair the IIS rewrite module using Add/Remove Programs, download the current installer from the official IIS site.
  
[IIS URL Rewrite Module][5]

 [5]: https://www.iis.net/downloads/microsoft/url-rewrite
