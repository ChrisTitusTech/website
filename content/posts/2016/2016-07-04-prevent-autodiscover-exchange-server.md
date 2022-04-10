---
title: Prevent autodiscover on Exchange server after an Office 365 Migration
author: Chris Titus

date: 2016-07-04T16:44:02+00:00
url: /prevent-autodiscover-exchange-server/
image: images/2016/07/autodiscover-redirect-prompt.png
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