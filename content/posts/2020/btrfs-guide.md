---
title: "BTRFS Guide - Basic Commands, Snapshots, and RAID"
type: post
date: 2020-01-13T16:36:18-06:00
url: /btrfs-guide/
image: /images/2020-thumbs/btrfs-guide.jpg
categories:
  - Linux
tags:
  - BTRFS
---
This guide goes over everything you need to know to get started on BTRFS. With that said we will be going over the basic structure of BTRFS and the things you should and should not do. <!--more-->

## Creating a BTRFS Filesystem

Create the file system on an empty btrfs partition  
> `mkfs.btrfs /dev/sda1`  
_Note: You will need to mount this file system after_

Now we need to make a subvolume *before* we add data to the device  
> `btrfs subvolume create /mnt/sda1` _/mnt/sda1 is the mount point!_

After this is complete you can now write data to your BTRFS volume and use all it capabilities. 

Basic BTRFS Layout  
_Note: Top Level 5 is root and isn't a btrfs subvolume that can do snapshots and other btrfs features and therefore should not be mounted_  
```
toplevel root level 5
  +-- root\@ level 256 (subvolume root mounted at / id varies)
  +-- root\.snapshots level 256 (typical snapshot subvolume)
```

## Basic Commands

  - Disk free  
`sudo btrfs fi show`  
> Output:  
![File System Output](/images/2020/btrfs/fishow.png)

  - Disk Usage  
`sudo btrfs fi du /` _Note: you can make / any other mount point_  
  - Scrub SubVolume *Recommended running every week!*  
`sudo btrfs scrub start /`  
  - Balance Subvolume for Performance  
`sudo btrfs balance start -musage=50 -dusage=50 /`  
_Note: Use the musgae and dusage filters to only balance used blocks above 50 percent utilization_  
`sudo btrfs balance cancel /` _Stops running balance_  
  - List Subvolumes *based on mountpoint*  
`sudo btrfs subv list /home`  
> Output:  
![Subvolume Output](/images/2020/btrfs/subv-list.png)

  - Mount Subvolume  
`sudo mount -o subvolid=267 /dev/sda1 /media/games`  
*OR add this to* `/etc/fstab`  
`UUID=IDGOESHERE /media/games rw,exec,subvolid=267 0 0`

## Snapshots

Snapshots are one of the best things about BTRFS and I absolutely love them. They are incredible powerful and beneficial. 

So Lets run through some scenarios when you use Snapshots.

#### Create Snapshot  
> `sudo btrfs subv snapshop /home /home/.snapshots/2020-01-13`

Using this you can revert the snapshop by simply editing the `/etc/fstab` and changing the subvol=2020-01-13 or the corresponding subvolid you get from `sudo btrfs subv list /home`

#### Restore Snapshot
Restore Snapshop after reboot and successful rollback
> `sudo btrfs subv delete /home`  
`sudo btrfs subv snapshot /home/.snapshots/2020-01-13 /home`

Now simply restore your fstab and reboot to be back on the /home subvolume. 

The reason to do it using this method is to verify the data first. If it doesn't work out you can simply change the `/etc/fstab` back and you will be back to where you started. 

## Multiple disks and RAID

Oh boy, here we go. This is such a badly misunderstood subject and if you aren't careful you will be causing more problems than you are looking to solve. So with that let's get into RAID. I will *NOT* be cover RAID 5 as it is *unstable* and SHOULD NOT BE USED!

Must know commands for multiple disks:  
> Add Disks before creating subvolume: `sudo btrfs device add /dev/sda1 /dev/sdb1`  
Add Disk to existing subvolume: `sudo btrfs device add /dev/sdb1 /home`  
Delete Disk from subvolume: `sudo btrfs device delete /dev/sdb1 /home`  

Creating the RAID File System:  
> RAID 1: `sudo btrfs -m raid1 -d raid1 /dev/sda1 /dev/sdb1`  
RAID 10: `sudo btrfs -m raid10 -d raid10 /dev/sda1 /dev/sdb1 /dev/sdc1 /dev/sdd1`

Convert to to RAID 1 after adding disk to existing subvolume  
> `btrfs balance start -mconvert=raid1 -dconvert=raid1 /home`

I could put RAID 0 here... but honestly you should just use EXT4 or XFS if you are looking for performance. It would be better than using BTRFS!

## Video Walkthrough
[![btrfs guide](https://img.youtube.com/vi/J2QP4onqJKI/0.jpg)](https://www.youtube.com/watch?v=J2QP4onqJKI)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
