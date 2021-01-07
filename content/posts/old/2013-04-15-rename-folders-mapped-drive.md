---
title: Cannot Rename Folders on mapped drive
author: Chris Titus
type: post
date: 2013-04-15T21:46:08+00:00
url: /rename-folders-mapped-drive/
image: /images/2013/04/map-network-drive-windows.png
categories:
  - Windows
  - Windows Server

---
This error message is displayed and I cannot rename folders on the mapped drive. By making a group policy change I was able to make this error go away.

`The drive that this file or folder is stored on does not allow long file names, or names containing blanks or any of the following characters: / : , ; * ? < > |`

## Solution: Create a GPO to fix

To resolve this problem, turn off Fast Logon Optimization. I recommend creating a GPO in your domain controller to achieve this. If its an isolated instance to one PC, you can use gpedit.msc to enforce it on that one PC.

### Group Policy Settings to Change

```
Computer Configuration\Administrative Templates\System\Logon\Always wait for the network at computer startup and logon
User Configuration\Administrative Templates\System\Scripts\Run logon scripts synchronously
```

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join