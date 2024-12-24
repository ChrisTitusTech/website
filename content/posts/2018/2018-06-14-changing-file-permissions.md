---
title: Changing file permissions using PowerShell
author: Chris Titus

date: 2018-06-14T15:46:23+00:00
url: /changing-file-permissions/
image: images/2018/06/changing-file-permissions.webp
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

