---
title: How to remotely access Window Server 2016 Core in PowerShell 
author: Chris Titus

date: 2018-06-20T20:30:49+00:00
url: /windows-server-2016-core-remote/
image: /images/2018/06/windows-server-2016.jpg
categories:
  - Windows Server
tags:
  - Windows Server 2016 Core

---
This walkthrough shows you how to remotely access Window Server 2016 Core in PowerShell. Windows Server 2016 Core is a great minimal install of windows server but doesn&#8217;t come with any desktop experience. This means we will be doing everything via command prompt or PowerShell for the initial setup. The great thing is you use Powershell and RSAT from a Windows 10 machine and working on the server is a snap. You get the ease of administration and the reliability and compact design of Core.<!--more-->

## Enable PSRemote (Powershell Remote)

On Host &#8211; Windows Server 2016 Core  
`Enable-PSRemoting -Force`
  
Your Workstation    
`Enter-PSSession -ComputerName 10.0.0.2`    
_Note: you can use netbios name here as well_

For any troubleshooting we will need to do make sure the initial setup is done by typing, `sconfig` once this has been completed you will have set the static IP, opened remote access, activated windows, and ran windows update.

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://links.christitus.com/lbry>

#### Exclusive Content

- [ChrisTitus.com Members Section][1] (_CC Only_)
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  - Monthly Members Only Video
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://links.christitus.com/join