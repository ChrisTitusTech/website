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

