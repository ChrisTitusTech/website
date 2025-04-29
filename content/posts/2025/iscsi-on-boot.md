---
title: "iSCSI on Boot"

date: 2025-04-28
url: /iscsi-on-boot/
image: images/2025-thumbs/iscsi-on-boot.webp
categories:
  - Linux
tags:
  - ArchLinux
draft: false
---
This shows how to setup iSCSI on Boot in Linux
<!--more-->

## Installing iSCSI packages

```
sudo pacman -S open-iscsi
```

### Enable iSCSI to be used

```
sudo systemctl enable iscsid.service --now
sudo systemctl enable iscsi.service
```

## Finding iSCSI Targets

```
sudo iscsiadm -m discovery -t sendtargets -p <target-ip>
```

Example Usage: 
```
192.168.1.100:3260,1 iqn.2023-01.com.example:storage.target1
```

_Note: the iqn from the output you will need that!_

### Discover already discovered targets

```
sudo iscsiadm -m session
```

## Login to Target

```
sudo iscsiadm -m node -T <target-iqn> -p <target-ip> --login
```

### Set Auto-Login on Boot

First setup Automatic Discovery of Target
```
sudo iscsiadm -m node -T <target-iqn> -p <target-ip> --op update -n node.startup -v automatic
```

Second grab the UUID from blkid
```
sudo blkid
```

Third Auto Mount with `/etc/fstab`
```
UUID=<UUID from blkid> /mountpoint  <ext4/ntfs/btrfs>  x-systemd.after=network-online.target,x-systemd.automount,x-systemd.mount-timeout=90,_netdev 0 0
```

### Remove Auto-Login on Boot

```
sudo iscsiadm -m node -u
sudo iscsiadm -m node -o delete -T <target_name> -p <ip_address>
```
_Note: Also remove any added entries from `/etc/fstab`_

## Walkthrough Video

Too Niche for a video. Let me know in the comments if you'd like to see this. 
