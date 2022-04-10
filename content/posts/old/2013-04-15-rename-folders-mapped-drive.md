---
title: Cannot Rename Folders on mapped drive
author: Chris Titus

date: 2013-04-15T21:46:08+00:00
url: /rename-folders-mapped-drive/
image: images/2013/04/map-network-drive-windows.png
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