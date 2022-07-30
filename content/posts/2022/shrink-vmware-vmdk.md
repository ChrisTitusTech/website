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

Inside the Guest (Virtual Machine) you need to install `open-vm-tools` on Linux which should be in the base repository for most main distributions.

## Shrinking VMDK

### On Guest 

These are done on the GUEST (Inside Virtual Machine)

```
vmware-toolbox-cmd disk shrink /
```

If you are want to shrink a Windows Guest you need to install VMWare-Tools inside the VM. After the tools are installed, simply click the following in VMWare Workstation `VM Tab -> Manage -> Clean up Disks` (Windows ONLY)

### On Host

From inside your VMWare Workstation install you will find the following program `vmware-vdiskmanager` this is where we finalize the vmdk by defragmenting it and doing the final shrink. 

#### Defrag

```
vmware-vdiskmanager.exe -d /path/to/shrink.vmdk
```

#### Final Shrink

```
vmware-vdiskmanager.exe -k /path/to/shrink.vmdk
```

#### Example

![vdisk](/images/2022/vmware-vdisk.jpg)

## Still Too Big?

If it is still too large, you can simply export the VM to OVF format inside VMWare Workstation. This will create a new vmdk file that will be considerably smaller. You can ignore all the other files it creates.

`export to ovf`

![ovf](/images/2022/vmware-ovf.jpg)