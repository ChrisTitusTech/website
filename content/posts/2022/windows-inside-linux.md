---
title: "Setting up Windows inside Linux"

date: 2022-09-26
url: /windows-inside-linux/
image: images/2022-thumbs/windows-inside-linux.jpg
categories:
  - Linux
  - Windows
tags:
  - QEMU
draft: false
---
Running Windows inside of Linux is essential for those that are trying to convert to Linux. There will always be a transition period and need to fallback to Windows. It is also nice to have for many Windows only programs that you may need while inside Linux.
<!--more-->

If you haven't ever installed QEMU before, here is an article to get that setup @ <https://christitus.com/vm-setup-in-linux/>

## Optimizing Windows VM
First you need to install the VirtIO tools, which can be difficult to track down. My favorite way is to run the exe file from <https://github.com/virtio-win/virtio-win-pkg-scripts> but many guides use the iso file also provided at this link.

Another good resource for obtaining VirtIO drivers is from the proxmox wiki <https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers> 

### Enable QEMU Guest Agent
Now you need to modify the VM to make use of the guest agent drivers. We need to add the qemu agent channel. Add Hardware -> Channel and copy these settings

![guest-agent](/images/2022/qemu/guest-agent.png)

## Passing Devices Through
There are two main devices that you may want to pass through to a Windows VM. Hard Drives and Graphics Cards. Passing through a hard drive will give a good uplift in processing power and general VM response. The graphics card is very technical and frankly not recommended, but can be doable on some systems. 

### Dedicated Hard Drive
Simply select Add Hardware -> Storage and copy these settings

![hdd](/images/2022/qemu/hdd.png)

### Dedicated Graphics Card
This is referred to as PCI Passthrough and can be dicey on some systems. I've had some motherboards that can't do this and others that can. The best guide and scripts I've found are from HikariKnight and his GitHub @ <https://github.com/HikariKnight/quickpassthrough>

## Walkthrough Video

{{< youtube 11111111 >}}