---
title: "Setup Qemu in Archlinux"

date: 2022-01-11T09:52:18-06:00
url: /setup-qemu-in-archlinux/
image: /images/2021-thumbs/setup-qemu-in-archlinux.jpg
categories:
  - Linux  
tags:
  - Arch Linux
---
<!--more-->

## Setting up Virtual Machines in QEMU on Arch Linux

QEMU/KVM Dependancies to install:

```
sudo pacman -S qemu virt-manager virt-viewer dnsmasq vde2 bridge-utils openbsd-netcat ebtables iptables libguestfs
```

_Note: Make sure you update your system with a $ sudo pacman -Syu BEFORE you install the dependencies_

## Make Libvirt Group for your user

Edit `/etc/libvirt/libvirtd.conf`
(Change the following Lines)
```
unix_sock_group = "libvirt"
unix_sock_rw_perms = "0770"
```

Then add your user and create group:

```
sudo usermod -a -G libvirt $(whoami)
newgrp libvirt
```

## Reboot and launch virt-manager!

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://christitus.com/lbry>

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
 [2]: https://christitus.com/join