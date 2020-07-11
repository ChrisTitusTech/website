---
title: Remove or Hide System Reserved Partition
author: Chris Titus
type: post
date: 2014-06-26T17:55:42+00:00
url: /hide-system-reserved-partition/
image: /wp-content/uploads/2014/06/hard-disk-partition.png
categories:
  - Windows

---
Does your system reserve partition have a drive letter? With these steps, you will Hide System Reserved Partition and no longer see it when browsing your computer.<!--more-->

Here is the fix using Diskpart:

  1. Load Command Prompt (cmd)
  2. Load Diskpart (diskpart)
  3. List Disks (list disk)
  4. Select Proper Disk (select disk #)
  5. List Partitions (list partition)
  6. Select Proper Partition (select partition #)
  7. List Volumes (list volume) NOTE: Look at Drive letter of system reserved volume
  8. Select the volume to hide (select volume #)
  9. Remove assigned disk letter (remote letter X)

With this, you should no longer see it, and you will Hide System Reserved Partition for good.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
