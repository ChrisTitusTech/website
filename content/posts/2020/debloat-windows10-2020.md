---
title: "Debloat Windows 10 in 2020"
type: post
date: 2020-06-11T16:04:48-05:00
url: /debloat-windows-10-2020/
image: /images/2020-thumbs/debloat-windows-10-2020.jpg
categories:
  - Windows
tags:
  - Microsoft Store
---
This goes over debloating and slimming down Windows 10 so you get maximum performance from your PC. 
<!--more-->I made a guide going over the debloat process two years ago [https://christitus.com/debloat-windows-10/](https://christitus.com/debloat-windows-10/) - The guide has evolved and the github project I was using has also improved.

## October 2020 Update

If you are coming here from the YouTube video I have taken all the scripts below and a system admin script I used a lot in the past to make a streamlined debloat script. This script will optimize Windows and can be run multiple times if you have an update ruin all the optimizations. I have also made it very easy to launch. Here is the source files: <https://github.com/ChrisTitusTech/win10script>

If you want to just run this on any system, you can easily copy and paste this into a Admin Powershell prompt and watch it do everything for you. It does have two prompts based on user feedback. Let me know what you think below! 

```PowerShell
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

## Other GitHub Projects for Debloating Windows
The project I use has been developed for many years now and is extremely good. Here is the source github project I use:  
[https://github.com/Sycnex/Windows10Debloater](https://github.com/Sycnex/Windows10Debloater)

This is a new project that was brought to my attention, but has quickly made a name for itself. It works very well and is typically more up to date than the above project.  
[https://github.com/farag2/Windows-10-Setup-Script](https://github.com/farag2/Windows-10-Setup-Script)

## Sycnex Debloat Options
Here is a screenshot of the GUI for the debloater:  
![debloat1-win10](../images/2020/debloat-win10/debloat-options.png)

### Whitelist / Blacklist 
I recommend everyone use this option and remove programs based on the selections under these lists.  
![debloat2-win10](../images/2020/debloat-win10/debloat-options2.png)  
Legend for the Options:  
  - Uncheck = Will NOT Remove
  - Checked = Will REMOVE

*Note: You can also just click remove all - but it will delete EVERY APP that relies on the Windows Store*

### Revert Registry Options

This simply reverts any changes from the options below, like stopping edge from opening PDF files, or OneDrive removal. I never click this option. 

## Optimal Way to Use this Tool

I recommend running this tool under the following conditions:
  - Before User Profile is Created
  - Empty Desktop and Downloads (Past versions has deleted files from Desktop and Downloads)
  - After installing New Feature Updates
  
Recommended Options:
  - Pick Whitelist/Blacklist programs
  - Remove Bloatware With Customized Blacklist
  - Disable Cortana
  - Stop Edge PDF Takeover
  - Uninstall OneDrive
  - Unpin all Start Menu Icons
  - Disable Telemetry/Tasks
  - Remove Bloatware RegKeys
  
I generally always enable Dark Mode and Install 3.5 .NET but that is entirely my personal preference. 

## Video Walkthrough

Coming Soon
  
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