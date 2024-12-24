---
title: "Setup Qemu in Arch Linux"

date: 2022-01-11T09:52:18-06:00
url: /setup-qemu-in-archlinux/
image: images/2022-thumbs/qemu.webp
categories:
  - Linux  
tags:
  - Arch
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

