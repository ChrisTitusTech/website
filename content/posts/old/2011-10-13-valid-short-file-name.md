---
title: “Error 1327. Invalid Drive” or “Error 1325 – not a valid short file name” Fix
author: Chris Titus

date: 2011-10-13T20:05:32+00:00
url: /valid-short-file-name/
image: /images/2011/10/not-a-valid-short-file-name.png
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