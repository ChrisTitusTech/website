---
title: Debloat Windows 10
author: Chris Titus

date: 2018-09-09T17:08:58+00:00
url: /debloat-windows-10/
image: images/2018/09/remove-win10-bloatware.jpg
categories:
  - Windows
tags:
  - PowerShell
  - Windows 10

---
Trying to Debloat Windows 10 is getting ridiculous and as a system admin it is soul crushing to see all that performance go to waste on the botched attempt by Microsoft to do an Appstore and its apps (I&#8217;m looking at you Candy Crush). Luckily some admins have worked tirelessly to give us a solution that works considerably well. Lets Start! <!--more-->

## October 2020 Update

If you are coming here from the YouTube video I have taken all the scripts below and a system admin script I used a lot in the past to make a streamlined debloat script. This script will optimize Windows and can be run multiple times if you have an update ruin all the optimizations. I have also made it very easy to launch. Here is the source files: <https://github.com/ChrisTitusTech/win10script>

If you want to just run this on any system, you can easily copy and paste this into a Admin Powershell prompt and watch it do everything for you. It does have two prompts based on user feedback. Let me know what you think below! 

```
iex ((New-Object System.Net.WebClient).DownloadString('https://git.io/JJ8R4'))
```

What this script does
- Installs Chocolatey, Notepad++, Irfanview, VLC, Java, and asks if you want Adobe Reader or Brave. 
- Removes all Windows Store Apps EXCEPT office, xbox, and WSL. 
- Removed Telemetry
- Disables Cortana
- Deletes various schedules tasks that rebloat the system
- Removes Other Bloatware (Candy Crush, etc.)
- Fixes problems that other scripts causes (lock screen and personalization options restricted)

Based on User feedback, this no longer uninstalls OneDrive or Office. 

## Old 2018 Instructions

  * Right Click Windows Button ->Select Powershell Prompt (Admin) OR Select Command Prompt (Admin) 
      * _Note: If you don&#8217;t have PowerShell and only command prompt open command prompt (admin) and type &#8220;_powershell_&#8220;_
  * Change Execution policy to allow a debloat script to run in Powershell `Set-ExecutionPolicy Unrestricted`
  * Run the script from the following Github Repository. The person running this GitHub has been updating this script for a while and is a godsend. (Source: <https://github.com/Sycnex/Windows10Debloater>) Use Windows10Debloater.ps1from the location above 
      * _During installation select yes to debloat windows 10, select yes to remove OneDrive, and Yes to reboot after it finishes. Below is the image of performing these tasks._

[![debloatwin10cmd](/images/2018/09/debloatwin10cmd.png) 

## Video Walkthrough

[![Debloat Windows 10](https://img.youtube.com/vi/q4ziE5Am0pM/0.jpg)](https://www.youtube.com/watch?v=q4ziE5Am0pM)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

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