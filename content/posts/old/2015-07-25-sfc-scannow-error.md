---
title: SFC scannow error and Windows 10 corruption
author: Chris Titus

date: 2015-07-26T02:39:10+00:00
url: /sfc-scannow-error/
image: /images/2015/07/win10slim.jpg
categories:
  - Windows
tags:
  - Windows 10

---
If you run into SFC scannow error which cannot be repaired chances are you have some corrupt system components. The fastest way to fix this is by following these steps to repair your system.<!--more-->

Here is an example of the error you are seeing:

![SFC Scannow Error](/images/2015/07/SFC-scannow-error-1.png)

  * Download Windows 10 ISO from <https://www.microsoft.com/en-us/software-download/windows10>
  * Mount the ISO file by double-clicking on it.
  * Open &#8216;Windows Powershell&#8217; or &#8216;Command Prompt&#8217; with Admin privileges (right click -> Run as Administrator)
  * Let&#8217;s check the System Health first, by running these commands: 
      * `dism /online /cleanup-image /scanhealth`
      * `dism /online /cleanup-image /checkhealth`
      * `dism /online /cleanup-image /restorehealth`
  * I&#8217;m sure that will give you an error stating that it could not perform the task. Afterward, Let&#8217;s specify the file from the ISO so that we can fix it. Run the following command: (Notice that X must be the drive letter on which your system has mounted the ISO) 
      * `DISM /Online /Cleanup-Image /RestoreHealth /source:WIM:X:SourcesInstall.wim:1 /LimitAccess`
  * Now let&#8217;s repair any damage in the system files, shall we? 
      * `sfc /scannow`

Once this is complete, you will see you now have a functional windows environment again. One other tip that I would suggest is to re-run windows updates because your windows components were damaged and the updates have not been happening.

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://christitus.com/lbry>

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
 [2]: https://christitus.com/join