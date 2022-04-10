---
title: Grant Full Access to all Public Folders for a user in Exchange
author: Chris Titus

date: 2016-07-04T16:32:21+00:00
url: /grant-full-access-public-folders/
image: images/2013/12/microsoft_exchange_header_contentfullwidth.jpg
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