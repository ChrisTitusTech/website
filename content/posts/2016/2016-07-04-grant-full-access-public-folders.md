---
title: Grant Full Access to all Public Folders for a user in Exchange
author: Chris Titus
type: post
date: 2016-07-04T16:32:21+00:00
url: /grant-full-access-public-folders/
image: /wp-content/uploads/2013/12/microsoft_exchange_header_contentfullwidth.jpg
categories:
  - Windows Server
tags:
  - Exchange Server

---
This post goes over how to grant full access to all public folders for a user in Microsoft Exchange. I recently was migrating all public folders from an Exchange 2010 to Office 365 Environment and didn&#8217;t have access to some of the folders. Consequently, this solution saved me a lot of time from doing it through a GUI.<!--more-->

### Command

Enter the following in Exchange Management Shell:

`Get-PublicFolder –Identity "\Root Folder Name" -Recurse | Add-PublicFolderAdministrativePermission -User "ctitus" -AccessRights AllExtendedRights`

This will recurse the root folder and grant all rights to the user you specify.

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