---
title: Debloat Windows 10
author: Chris Titus
type: post
date: 2018-09-09T17:08:58+00:00
url: /debloat-windows-10/
image: /wp-content/uploads/2018/09/remove-win10-bloatware.jpg
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

[![debloatwin10cmd](https://christitus.com/wp-content/uploads/2018/09/debloatwin10cmd.png) 

## Video Walkthrough

[![Debloat Windows 10](https://img.youtube.com/vi/q4ziE5Am0pM/0.jpg)](https://www.youtube.com/watch?v=q4ziE5Am0pM)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join