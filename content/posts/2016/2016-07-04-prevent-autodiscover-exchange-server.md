---
title: Prevent autodiscover on Exchange server after an Office 365 Migration
author: Chris Titus
type: post
date: 2016-07-04T16:44:02+00:00
url: /prevent-autodiscover-exchange-server/
image: /wp-content/uploads/2016/07/autodiscover-redirect-prompt.png
categories:
  - Windows Server
tags:
  - Exchange Online
  - Exchange Server

---
This article teaches you how to prevent autodiscover from happening on Exchange Server. This is important on an Office 365 migration when you still need to keep your local exchange server from resolving.<!--more-->

### Commands

First change your local DNS
  
`autodiscover.yourdomain.com cname autodiscover.office365.com`

(Option 1)Next, you need to disable SCP site-wide. I did this performing a GPO Registry edit.
  
`HKEY_CURRENT_USER\Software\Microsoft\Office\x.0\Outlook\AutoDiscover`  
Notex.0 in the above registry path corresponds to the Outlook version (16.0 = Outlook 2016, 15.0 = Outlook 2013, 14.0 = Outlook 2010, 12.0 = Outlook 2007).  
`ExcludeScpLookup DWORD 1`

(Option 2)Now you can also do this with a Reg file. Name it SCPDisable.reg
  
```
Windows Registry Editor Version 5.00  
[HKEY_CURRENT_USER\Software\Microsoft\Office\14.0\Outlook\AutoDiscover]  
"ExcludeScpLookup"=dword:00000001`
```
 
The above is Office 2010, Notice the 14.0, and make sure you change it to the version you have.
  
Now simply create a new profile and your domain should now point to Office 365 by default.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
