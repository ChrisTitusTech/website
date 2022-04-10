---
title: Changing file permissions using PowerShell
author: Chris Titus

date: 2018-06-14T15:46:23+00:00
url: /changing-file-permissions/
image: images/2018/06/changing-file-permissions.png
categories:
  - Windows
tags:
  - Powershell
---
Use the following script for changing file permissions using PowerShell. I use this script when command line takeown and icacls fail. Obviously, run from an elevated PowerShell prompt or by typing &#8216;powershell&#8217; from elevated cmd.<!--more-->

## The Script

Change $folder to the base directory you want for changing permissions.    
_Please note, you can use network UNC paths for this or a simple C:\._
  
```
$folder = "\\homeserver\users\"
$users = get-childitem $folder
Foreach ($user in $users) {
$acl = Get-Acl $user.FullName
$acl.SetOwner([System.Security.Principal.NTAccount]"$user")
set-acl $user.FullName $acl -Verbose
$subFolders = Get-ChildItem $user.FullName -Directory -Recurse
Foreach ($subFolder in $subFolders) {
$acl = Get-Acl $subFolder.FullName
$acl.SetOwner([System.Security.Principal.NTAccount]"$user")
set-acl $subFolder.FullName $acl -Verbose
}
$subFiles = Get-ChildItem $user.FullName -File -Recurse
Foreach ($subFile in $subFiles) {
$acl = Get-Acl $subFile.FullName
$acl.SetOwner([System.Security.Principal.NTAccount]"$user")
set-acl $subFile.FullName $acl -Verbose
}
}
```

I&#8217;ve never had takeown fail on local disks, but I have found that I needed to resort to using a PowerShell script when doing this through a network location. It&#8217;s a very powerful script, however always be careful when running this. Be sure to always test this in a subdirectory first. This can be catastrophic for a company with millions of files and folder to reset the permission on, therefore be very careful!

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