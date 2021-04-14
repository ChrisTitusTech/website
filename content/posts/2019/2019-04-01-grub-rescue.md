---
title: Grub Rescue | Repairing your Bootloader
author: Chris Titus

date: 2019-04-01T22:21:10+00:00
url: /grub-rescue/
image: /images/2019/04/grub-rescue.png
categories:
  - Linux
tags:
  - Grub
  - Bootloader
---
Lets go over Grub Rescue and repairing your bootloader. This is a very misunderstood topic and by learn basic syntax you will be able to repair your GRUB very easily. Here are 4 methods of doing a GRUB Rescue. <!--more-->

## Repairing from a GRUB > Prompt

**Find your Hard drive**  
`ls`   
_Output Example:    
(hd0) (hd0,msdos2) (hd0,msdos1)_  
  
 **List Root partition on each drive til you find your Install**  
`ls (hd0,msdos2)/`  
 _Check for the directory listing, if nothing, move to next_  
  
 **Now that we have found the proper drive lets boot to it**  
`grub> set root=(hd0,msdos2)`  
`grub> linux /boot/vmlinu (tab complete) root=/dev/sda1 (or the root linux partition)`  
`grub> initrd /boot/initrd (tab complete)`  
`grub> boot`  


## Repairing from a GRUB Rescue > Prompt

**Find your Hard drive**  
`ls`  
_Output Example:    
(hd0) (hd0,msdos2) (hd0,msdos1)_

 **List Root partition on each drive til you find your Install**  
`ls (hd0,msdos2)/`  
 _Check for the_ _directory_ _listing, if nothing, move to next_

 **Now that we have found the proper drive lets boot to it**  


`grub rescue> set prefix=(hd0,msdos2)/boot/grub`  
`grub rescue> set root=(hd0,msdos2)`  
`grub rescue> insmod normal`  
`grub rescue> normal`  
`grub rescue> insmod linux`  
`grub rescue> linux /boot/vmlinu (tab complete) root=/dev/sda1 (or the root linux partition)`  
`grub rescue> initrd /boot/initrd (tab complete)`  
`grub rescue> boot`

![grub](/images/2019/04/grub-300x211.png)

## Fix GRUB Permanently

Now that we are booted in from GRUB Rescue, we can begin work with repairing our grub permanently. First we rebuild the /boot/grub/grub.cfg file:

Debian-based Distributions use **update-grub**  
Other Distributions use **grub-mkconfig -o /boot/grub/grub.cfg**

With the Configuration rebuilt, we now simply need to reinstall grub

`grub-install /dev/sda`  
  
_Note: /dev/sda is the DEVICE&#8230;_**NOT THE PARTITION**. 

## Other Methods of Repairing GRUB

  * Use the [https://www.supergrubdisk.org/ image on a USB drive to repair][1]
  * Use a vanilla server distribution pen drive to boot to prompt, then chroot to your existing install and reinstall GRUB.

## Video Walkthroughs

[![grub-yt](https://img.youtube.com/vi/r7meKJsjqfY/0.jpg)](https://www.youtube.com/watch?v=r7meKJsjqfY)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

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