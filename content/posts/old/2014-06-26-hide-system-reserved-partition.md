---
title: Remove or Hide System Reserved Partition
author: Chris Titus

date: 2014-06-26T17:55:42+00:00
url: /hide-system-reserved-partition/
image: /images/2014/06/hard-disk-partition.png
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

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://links.christitus.com/lbry>

#### Exclusive Content

- [ChrisTitus.com Members Section][1] (_CC Only_)
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  - Monthly Members Only Video
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://links.christitus.com/join