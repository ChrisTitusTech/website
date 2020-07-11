---
title: SFC scannow error and Windows 10 corruption
author: Chris Titus
type: post
date: 2015-07-26T02:39:10+00:00
url: /sfc-scannow-error/
image: /wp-content/uploads/2015/07/win10slim.jpg
categories:
  - Windows
tags:
  - Windows 10

---
If you run into SFC scannow error which cannot be repaired chances are you have some corrupt system components. The fastest way to fix this is by following these steps to repair your system.<!--more-->

Here is an example of the error you are seeing:

![SFC Scannow Error](/wp-content/uploads/2015/07/SFC-scannow-error-1.png)

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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
