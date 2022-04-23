---
title: "Setup Qemu in Debian Linux"

date: 2022-01-12T16:28:59-05:00
url: /vm-setup-in-linux/
image: images/2022-thumbs/qemu.jpg
categories:
  - Linux
tags:
  - Debian
---
This is guide on setting up QEMU in Debian Linux.
<!--more-->
## Check Virtualization Extension 

Run this command to make sure you've enabled virtualization in on your computer. It should be above 0
```
titus@debian:~$  egrep -c '(vmx|svm)' /proc/cpuinfo
12
```
If the output is zero then go to bios settings and enable VT-x (Virtualization Technology Extension) for Intel processor and AMD-V for AMD processor.

## Install QEMU and Virtual Machine Manager

```
titus@debian:~$ sudo apt install qemu-kvm libvirt-clients libvirt-daemon-system bridge-utils virtinst libvirt-daemon virt-manager -y
```
Verify that Libvirtd service is started
```
titus@debian:~$ sudo systemctl status libvirtd.service
```
![libvirtd-service](/images/2022/libvirtd-service.png)

## Start Default Network for Networking

VIRSH is a command to directly interact with our VMs from terminal. We use it to list networks, vm-status and various other tools when we need to make tweaks. Here is how we start the default and make it auto-start after reboot. 
```
titus@debian:~$ sudo virsh net-start default
Network default started
titus@debian:~$ sudo virsh net-autostart default
Network default marked as autostarted
```
Check status with:
```
titus@debian:~$ sudo virsh net-list --all
 Name      State      Autostart   Persistent
----------------------------------------------
 default   active       yes          yes
```
## Add User to libvirt to Allow Access to VMs 
```
titus@debian:~$ sudo adduser titus libvirt
titus@debian:~$ sudo adduser titus libvirt-qemu
```
Reboot and you are Finished!

### Walkthrough Video

[![30daychromeosvid](https://img.youtube.com/vi/Kq849CpGd88/0.jpg)](https://www.youtube.com/watch?v=Kq849CpGd88)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_
