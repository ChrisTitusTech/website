---
title: Reattach LVM after a reinstalling XenServer
author: Chris Titus

date: 2016-08-03T16:18:32+00:00
url: /reattach-lvm-xenserver/
image: /images/2016/07/xenserver.jpg
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