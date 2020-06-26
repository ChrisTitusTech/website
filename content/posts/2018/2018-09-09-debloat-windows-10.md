---
title: Debloat Windows 10
author: Chris Titus
type: post
date: 2018-09-09T17:08:58+00:00
url: /debloat-windows-10/
thumbnail: /wp-content/uploads/2018/09/remove-win10-bloatware.jpg
categories:
  - Windows
tags:
  - PowerShell
  - Windows 10

---
Trying to Debloat Windows 10 is getting ridiculous and as a system admin it is soul crushing to see all that performance go to waste on the botched attempt by Microsoft to do an Appstore and its apps (I&#8217;m looking at you Candy Crush). Luckily some admins have worked tirelessly to give us a solution that works considerably well. Lets Start! <!--more-->

  * Right Click Windows Button ->Select Powershell Prompt (Admin) OR Select Command Prompt (Admin) 
      * _Note: If you don&#8217;t have PowerShell and only command prompt open command prompt (admin) and type &#8220;_powershell_&#8220;_
  * Change Execution policy to allow a debloat script to run in Powershell `Set-ExecutionPolicy Unrestricted`
  * Run the script from the following Github Repository. The person running this GitHub has been updating this script for a while and is a godsend. (Source: <https://github.com/Sycnex/Windows10Debloater>) Use Windows10Debloater.ps1from the location above 
      * _During installation select yes to debloat windows 10, select yes to remove OneDrive, and Yes to reboot after it finishes. Below is the image of performing these tasks._

[![debloatwin10cmd](https://www.christitus.com/wp-content/uploads/2018/09/debloatwin10cmd.png) 

## Video Walkthrough

[![Debloat Windows 10](https://img.youtube.com/vi/q4ziE5Am0pM/0.jpg)](https://www.youtube.com/watch?v=q4ziE5Am0pM)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
