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