---
title: Resize LVM Partition | Fedora 29 | Step by Step Guide
author: Chris Titus

date: 2018-11-17T19:54:29+00:00
url: /resize-lvm-partition-fedora-29-step-by-step-guide/
image: images/2018/11/Selection_008.png
categories:
  - Linux
tags:
  - Fedora
  - LVM
---
In this guide, I show you how to Resize LVM Partition in Fedora 29. I recently ran out of space and had to clone my install from a 120SSD ssd to a 240 GB SSD. <!--more-->I first had issues with boot timing out and causing the /dev/mapper/home, /dev/mapper/swap, and /dev/mapper/root not being found. To fix this, I simply rebooted to the rescue kernel and ran `dracut --regenerate-all -f` to resolve this in Single-User Mode.

#### Disclaimer: All these commands are done in Single-User Mode, therefore this will NOT work on a regular desktop.

Upon reboot, I found that I now can see all the space on the drive, but needed to resize the LVM Partition.

### Resize LVM Partition

First, we need to identify the LVM Partition we need to expand. In my case, it was my home directory that was running low on space.
  
Command: `df -h`

![lvm-selection8](/images/2018/11/Selection_008-300x111.png)

Second, lets verify there is space to expand on the physical drive.
  
Command: `vgdisplay`

![lvm-selection9](/images/2018/11/Selection_009.png)

With all this verified, you can now expand the lvm partition.  
_Note: the command below will take up a 100% of the free space, see screenshot for precise extentsion._
  
Command: `lvextend -l 100%FREE /dev/fedora/home`

![lvm-selection10](/images/2018/11/Selection_010.png)

Finally, with the logical volume extended we simply reclaim the free space now.
  
Command: `resize2fs /dev/fedora/home`

![lvm-selection11](/images/2018/11/Selection_011.png)

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