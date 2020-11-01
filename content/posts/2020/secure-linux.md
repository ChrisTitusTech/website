---
title: "Secure Linux"
type: post
date: 2020-08-18T13:02:25-05:00
url: /secure-linux/
image: /images/2020-thumbs/secure-linux.jpg
categories:
  - Linux
tags:
  - Security
  - Virus
---
This article covers basic security and settings I do with every Linux installation.
<!--more-->

## Check for Drovorub Malware

![drovorub](/images/2020/drovorub/drovorub.jpg)

```bash
touch testfile
echo “ASDFZXCV:hf:testfile” > /dev/zero
```
*If the testfile disappears... you are infected* 

### Check for unsigned kernel modules

```bash
for mod in $(lsmod | tail -n +2 | cut -d' ' -f1); do modinfo ${mod} | grep -q "signature" || echo "no signature for module: ${mod}" ; done
```
*If you see vbox or nvidia modules, these are for VirtualBox and NVidia Drivers respectively*

## Secure Boot

![secure-boot](/images/2020/drovorub/secure-boot.jpg)

Secure Boot forces checks for kernel module signatures and is good not only for blocking Drovorub-style malware, but also prevents Evil Maid attacks as well. However, it can be complex and also make using bootable USB drives difficult. _Note: UEFI Boot Required... No Legacy/CSM._

### Easy Way to Install

```bash
sudo mokutil --enable-validation # Remember the password!
sudo mokutil --sb-state # Checks if Secure Boot is enabled
```
*Note: I used the enable validation on Debian based systems and it worked right out of the box

### Hard Way to Install

Hard way involves signing packages that aren't stock which you might need on your system or if you dual boot. Check out the following guide from the ArchWiki: <https://wiki.archlinux.org/index.php/Unified_Extensible_Firmware_Interface/Secure_Boot>

## Security Settings for All Linux Installs

![github](/images/github.png)

I created a github script to make this easier but I wanted to break down what this script does. Secure-Linux Project <https://github.com/ChrisTitusTech/secure-linux/blob/master/secure.sh>

*Before running this script install ufw and fail2ban packages*

This script is broken into 3 parts: ufw, sysctl.conf modifications, and fail2ban. Ufw stands for Uncomplicated Firewall and is fantastic for adding to every install. This script opens http and https, while limiting SSH to only a couple connections per second. The sysctl modifications helps harden your system by preventing spoofing and man in the middle attacks. Fail2ban is the final piece and possibly my favorite. This package see any traffic that is failing authentication attempts repeatedly or is malicious in nature (DDoS) and records the IP then blocks it for a period of time.

Other things I'd recommend not mentioned... SELinux! Look it up because it is amazing. You can also use this on debian if you'd like, but a smaller package called AppArmor is generally used on those types of distributions. 

## Conclusion

This is not a all inclusive guide on securing your Linux system, but it is a good starting point that I do on pretty much every computer. I highly recommend you take these instructions and expand them to suit your needs. 

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join