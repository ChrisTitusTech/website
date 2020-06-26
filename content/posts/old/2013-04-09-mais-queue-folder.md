---
title: GFI MailArchiver MAIS Queue Folder has tons of emails stuck
author: Chris Titus
type: post
date: 2013-04-09T16:50:22+00:00
url: /mais-queue-folder/
featured_image: https://www.christitus.com/wp-content/uploads/2013/04/MAIS-Queue-Folder.png
short-url:
  - http://bit.ly/10FKCsL
categories:
  - Windows Server
tags:
  - GFI MailArchiver

---
The Import service can get stuck and this will stop all the mail in the MAIS Queue Folder. These are the emails that have not been processed and added to GFI Archiver yet, so do not delete them. Below is the fix on how I restored the import service and processed all the stuck email.<!--more-->

## The Fix

Deleted all files **EXCEPT** for *.eml from `C:\Program Files (x86)\GFIMailArchiver\MAIS\Queue`

Renamed all \*.eml files to \*.txt (Command Prompt: ren \*.eml \*.txt)

Move all files to `C:\Program Files (x86)\GFIMailArchiver\MAIS\Pickup`

## In Closing

This will force GFI Mailarchiver to reprocess all these emails. I&#8217;d highly recommend doing all these operations from a command prompt as the sheer number of files in the folders can potentially lock up your server when using a Graphic User Interface. Once you restart your processes wait for the MAIS Queue Folder to reduce in size before checking again.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
