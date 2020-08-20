---
title: Reattach LVM after a reinstalling XenServer
author: Chris Titus
type: post
date: 2016-08-03T16:18:32+00:00
url: /reattach-lvm-xenserver/
image: /wp-content/uploads/2016/07/xenserver.jpg
categories:
  - Virtualization
tags:
  - XCP-ng
  - XenServer

---
This article describes how to reattach LVM or a local Storage repository on XenServer. The XenServer database has become corrupt or your XenServer does not see the local SR.<!--more-->

### Instructions

  * Do a pvscan to get the Universally Unique Identifier (UUID) of an existing SR on a local disk. In this example uses UUID 39baf126-a535-549f-58d6-feeda55f7801:
  
    `pvscan`

##### Output:

```
PV /dev/sda3 VG VG_XenStorage-39baf126-a535-549f-58d6-feeda55f7801 lvm2 [66.87 GB / 57.87 GB free]
Total: 1 [66.87 GB] / in use: 1 [66.87 GB] / in no VG: 0 [0 ]
```
  
_Note the output above, the VG name of the local drive /dev/sda3 is VG_XenStorage-39baf126-a535-549f-58d6-feeda55f7801 . The VG name contains the SR UUID that resides on this storage media. In this case, the UUID is 39baf126-a535-549f-58d6-feeda55f7801._

  * Introduce the SR with the following command:
  
    `xe sr-introduce uuid=39baf126-a535-549f-58d6-feeda55f7801 type=lvm name-label=”Local storage” content-type=user`
  
    _This command sets up database records for the SR named “Local storage”_

  * Locate the SCSI ID of the device or partition where the SR data is stored:
  
    `ls -l /dev/disk/by-id/`

##### Output:

```
total 0
lrwxrwxrwx 1 root root 9 Jan 15 09:44 scsi-SATA_ST3500320AS_9QM13WP2 -> ../../sdb
lrwxrwxrwx 1 root root 10 Jan 15 09:44 scsi-SATA_ST3500320AS_9QM13WP2-part1 -> ../../sdb1
lrwxrwxrwx 1 root root 9 Jan 15 09:44 scsi-SATA_ST380815AS_6QZ5Z1AM -> ../../sda
lrwxrwxrwx 1 root root 10 Jan 15 09:44 scsi-SATA_ST380815AS_6QZ5Z1AM-part1 -> ../../sda1
lrwxrwxrwx 1 root root 10 Jan 15 09:44 scsi-SATA_ST380815AS_6QZ5Z1AM-part2 -> ../../sda2
lrwxrwxrwx 1 root root 10 Jan 15 09:44 scsi-SATA_ST380815AS_6QZ5Z1AM-part3 -> ../../sda3
```

_In this case, the SCSI ID of the device /dev/sda3 is scsi-SATA\_ST380815AS\_6QZ5Z1AM-part3.
  
Notate the device name to use in the next command, where a PBD (physical block device – a connector between the XenServer host and the SR) is created._

  * Run the xe host-list command to find out the host UUID for the local host:
  
    `xe host-list`

```
uuid ( RO) : 83f2c775-57fc-457b-9f98-2b9b0a7dbcb5
name-label ( RW): xenserver1
name-description ( RO): Default install of XenServer
```

  * Create the PBD using the device SCSI ID, host UUID and SR UUID detected above:
  
`xe pbd-create sr-uuid=39baf126-a535-549f-58d6-feeda55f7801`
`device-config:device=/dev/disk/by-id/scsi-SATA_ST380815AS_6QZ5Z1AM-part3 host-uuid=83f2c775-57fc-457b-9f98-2b9b0a7dbcb5`

_Afterward, it displays: aec2c6fc-e1fb-0a27-2437-9862cffe213e_

  * Attach the PBD created with xe pbd-plug command:
  
    `xe pbd-plug uuid=aec2c6fc-e1fb-0a27-2437-9862cffe213e`

In the end, you now have reattach LVM to the XenServer host and be visible in XenCenter.

Source: Original Article from Citrix http://support.citrix.com/article/CTX121896

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