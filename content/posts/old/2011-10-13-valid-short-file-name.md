---
title: “Error 1327. Invalid Drive” or “Error 1325 – not a valid short file name” Fix
author: Chris Titus
type: post
date: 2011-10-13T20:05:32+00:00
url: /valid-short-file-name/
thumbnail: /wp-content/uploads/2011/10/not-a-valid-short-file-name.png
categories:
  - Windows

---
If you are installing a program and receiving a pop-up message during installation of valid short file name this applies to you. I removed a drive from my computer and had this happen to me.<!--more-->

## Steps to Fix &#8220;not a valid short file name&#8221;

1. Click Start, and then click Run.
  
2. In the Open box, type regedit, and then click OK.
  
3. Under Registry Editor, locate the following registry key: `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders`
  
4. On the right pane, note the values in the Data field of each entry. If any value contains a drive that is not correct for your computer, right-click the entry, type c:\my documents in the Value data box, and then click OK.
  
5. Repeat step 4 for each entry whose Data value contains an incorrect drive.
  
6. Repeat steps 3 through 5 for each of the following registry keys:

```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders
```

7.Close Registry Editor.

Re-run your setup program and you shouldn&#8217;t see &#8220;not a valid short file name&#8221; error. Also, I&#8217;d recommend running the registry cleaning portion of CCleaner and checking your Environmental Variables (Under System Properties, Advanced, then Environmental Variables.)

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
