---
title: Hackintosh Ryzen Install
author: Chris Titus

date: 2019-10-29T01:13:21+00:00
url: /hackintosh-ryzen-install/
image: images/2019/10/hackintosh-Install-300x169.webp
categories:
  - MacOS
tags:
  - Hackintosh
---
Here is the basic install instruction for the Hackintosh Ryzen install that I used on my Ryzen 2700 with an RX 580. <!--more-->

![usb-drive](/images/2019/10/usb-drive-300x230.webp) 

## Download DMG File for Flash Drive

_Source Article:_ <https://forum.amd-osx.com/viewtopic.php?p=33500#p33500>

The above article is from XLNC and it goes over the creation process of the DMG file and everything he put into it. I must say he did a fantastic job with the media creation. 

Download Links from Source Article:  
CLOVER EDITION : <https://goo.gl/T3kBCN>   
ENOCH EDITION : <https://goo.gl/SVZ4ea>

Note: I used the Clover Edition and is my recommendation

## Burn DMG File with TransMac (Windows) or DD (Linux)

![transmac](/images/2019/10/transmac.webp) 

### TransMac Download (Windows) <https://www.acutesystems.com/scrtm.htm>

### DD (Linux)

  * Install DMG2IMG `$ sudo apt install dmg2img`
  * `$ sudo dmg2img macoshs_download.dmg macoshs_drive.iso`
  * `$ sudo dd if=macoshs_drive.iso of=/dev/sdX bs=1M`

![bios-1](/images/2019/10/bios-1.webp) 

## Change Your PC&#8217;s BIOS Settings for your Hackintosh Ryzen Install

  * HPET (High Precision Timers) =Enabled
  * SATA Mode = AHCI
  * Execute Disable Bit = Enabled
  * Max CPUID Value Limit = Disabled
  * BIOS EHCI Handoff = Enabled
  * Legacy USB Support = Enabled
  * CSM (Legacy BIOS Mode) = Disabled
  * UEFI options should be enabled
  * XHCI and EHCI Hand-Off = Enabled 

![MacOSX](/images/2019/10/MacOSX-1-e1572309977936.webp) 

## Insert Media and Start Installation

Boot into macOS by using the USB media. Once in the launcher start disk utility and partition the disk for macOS. 

![diskutility](/images/2019/10/diskutility.webp) 

Once you have partitioned your drive, you will need to go ahead and continue the installation. Complete the installation and reboot your PC. 

Launch back into the USB Drive Installer and this time we will launch terminal. From Terminal we will run the command **XLNC**

![xlnc](/images/2019/10/xlnc.webp) 

Select the following options when the XLNC installer pops up:

1. Bronya
2. Post Install
   * Type: YourDiskName
   * y to all the following questions

Reboot again, but this time when we launch the USB Menu, we will launch into the macOS we just created

Setup your Mac with your account and details

![clover](/images/2019/10/clover.webp) 

Download the Clover Configurator Utility   
<https://mackie100projects.altervista.org/download-clover-configurator/>

Mount both the EFI partition from the USB and the Recovery HD

Copy the EFI Folder from the USB to the Recovery HD and then unmount both partitions and reboot your PC!

FINISHED with the Hackintosh Ryzen Install!

## Video Walkthrough
https://www.bitchute.com/video/P943EtODU3dH/

