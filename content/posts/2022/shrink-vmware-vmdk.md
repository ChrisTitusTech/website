---
title: "Shrink VMWare VMDK File"

date: 2022-07-30T13:40:50-05:00
url: /shrink-vmware-vmdk/
image: images/2022-thumbs/shrink-vmware-vmdk.jpg
categories:
  - Linux
  - Windows
tags:
  - VMWare
  - VMDK
---
This goes over reducing the size of a VMDK file using open-vm-tools and is used often in VMWare environments. 
<!--more-->

## Tools Needed

I'd recommend VMWare Workstation Pro, but you can get away with just using player if you don't have a license. 

Inside the Guest (Virtual Machine) you need to install `open-vm-tools` on Linux which should be in the base repository for most main distributions. If you are using Windows you need to install VMWare-Tools to that install and can be found VMWare Workstation VM Tab -> Manage -> Clean up Disks (Windows ONLY)

## Command to Shrink VMDK (Linux Guests)

```
vmware-toolbox-cmd disk shrink /
```