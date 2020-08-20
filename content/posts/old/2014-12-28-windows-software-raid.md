---
title: Raid Re-syncing Windows software raid
author: Chris Titus
type: post
date: 2014-12-28T22:53:22+00:00
url: /windows-software-raid/
image: /wp-content/uploads/2014/12/RAID1.jpg
categories:
  - Windows

---
I want to preface this article in saying that I would never use a software raid in a business environment. However, recently I tried the windows software raid on a home theater PC. We recently had a power issue and caused the RAID 1 to go into resyncing status. Since it was about 2 TB of data, the resync would take several days and be causing performance issues. I found I could not break the raid or remove the mirror.<!--more-->

The following solutions are how you&#8217;d fix the issue:

![resyncing](/wp-content/uploads/2014/12/resyncing.png)

### Solution One:

  1. Open up Disk management (Start -> Run -> Type diskmgmt.msc)
  2. Right click disk to remove from Raid and select Offline (Click on Disk to left not the graphic on right)
  3. Reboot PC
  4. Open Disk management back up, select disk, and put online.
  5. Immediately after, Right click graphic and select remove Mirror.

### Solution Two:

  1. Physically unplug one of the disks
  2. Open Disk Management
  3. Remove Mirror

In closing, this will get rid of your raid and give you the ability to repurpose these disks as you see fit. In the above experience, I still had my data on both disks so I just formatted one and repurposed it for other functions.

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join