---
title: "Uninstall Microsoft Edge"

date: 2021-08-06T11:55:48-05:00
url: /uninstall-edge/
image: images/2021-thumbs/uninstall-edge.jpg
categories:
  - Windows
tags:
  - Microsoft Edge
---
This goes over Removing Microsoft Edge Chromium edition and keeping it removed. 
<!--more-->

## The Problem

Microsoft Edge has taken over PDF viewer, and other default web tasks. Even when manually removing it will reinstall via windows updates.

## Removing the Base Install

We first need to find the Edge install of the chromium edition in your Program Files. 

Location:

```
C:\Program Files (x86)\Microsoft\Edge\Application\
```

The setup program is what we need to uninstall edge. Go to the location above and drill down from the number and Install folder

Example:

```
C:\Program Files (x86)\Microsoft\Edge\Application\92.0.902.62\Installer
```

Once you find your path you can now uninstall edge with the following command _(Note: YOURS WILL BE DIFFERENT!)_

```
C:\Program Files (x86)\Microsoft\Edge\Application\92.0.902.62\Installer\setup.exe --uninstall --system-level --verbose-logging --force-uninstall
```

## Keep it from coming back... for now

You now need to add a registry entry. The following location `Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\EdgeUpdate` needs to be added with a DWORD called `DoNotUpdateToEdgeWithChromium` with a value of `1`. 

You can do this with a simply reg file. (`stopedge.reg`)

```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\EdgeUpdate]
"DoNotUpdateToEdgeWithChromium"=dword:00000001
```

Create this file or download the file @ https://christitus.com/files/stopedge.zip

Run this to prevent edge reinstallation. *Note: Microsoft will kill this workaround in the future and force edge on you*

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