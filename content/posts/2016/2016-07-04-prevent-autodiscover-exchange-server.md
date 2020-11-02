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

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
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