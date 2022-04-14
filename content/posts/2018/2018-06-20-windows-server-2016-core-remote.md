---
title: How to remotely access Window Server 2016 Core in PowerShell 
author: Chris Titus

date: 2018-06-20T20:30:49+00:00
url: /windows-server-2016-core-remote/
image: images/2018/06/windows-server-2016.jpg
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

