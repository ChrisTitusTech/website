---
title: "Auto Mount with SystemD"

date: 2022-09-22
url: /auto-mount-systemd/
image: images/2022-thumbs/auto-mount-systemd.jpg
categories:
  - Linux
  - Networking
tags:
  - Debian
draft: false
---
This shows how to automount remote network drives using systemd and fstab
<!--more-->

## Automount using systemd

Sometimes partitions can fail to mount on startup and some options are needed to fix this. I've had two instances where it was needed. One was on a slow 6 TB drive that timed out on occation during boot and I had to `sudo mount -a` to get it to mount

For this a simple option addition in fstab on a local disk looks like this:

```
noauto,x-systemd.automount
```

Next, I had problems with NFS shares not mounting and I had to expand these option to:

```
noauto,x-systemd.automount,x-systemd.mount-timeout=30,_netdev
```

This makes the `/etc/fstab` entry look like this:

```
10.0.0.10:/volume2/Images		/media/images	nfs	noauto,x-systemd.automount,x-systemd.mount-timeout=30,_netdev	0	0
```

_Source: <https://wiki.archlinux.org/title/Fstab#Automount_with_systemd>_