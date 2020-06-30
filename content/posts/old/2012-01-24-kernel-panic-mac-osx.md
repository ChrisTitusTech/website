---
title: Fix for Kernel Panic in Mac OSX
author: Chris Titus
type: post
date: 2012-01-24T22:55:18+00:00
url: /kernel-panic-mac-osx/
image: /wp-content/uploads/2012/01/kernal-panic-mac-osx.png
categories:
  - MacOS

---
Follow these steps to fix a kernel panic in Mac OSX. However, if this doesn&#8217;t fix the issue, there is a good chance the motherboard is damaged and you need to send it to Apple.<!--more-->

## 1) SMC RESETTING

  * Shut down the computer.
  * Plug in the MagSafe power adapter to a power source, connecting it to the Mac if its not already connected.
  * On the built-in keyboard, press the (left side) Shift-Control-Option keys and the power button at the same time.
  * Release all the keys and the power button at the same time after 25 seconds.

## 2) PRAM SETTING

  * Shut down the computer.
  * Locate the following keys on the keyboard: Command, Option, P, and R. You will need to hold these keys down
  * Turn on the computer.
  * Hold the keys down until the computer restarts and you hear the startup sound for the second time.
  * Release the keys.

_IF THE ABOVE STEPS DOES NOT WORK THEN PLEASE FOLLOW THE BELOW TROUBLESHOOTING STEPS TO FIX A KERNAL PANIC IN MAC OSX._

## 3) BOOT TO STARTUP MANAGER

  * Press and hold the option key and start the machine then the machine will boot to the startup manager.
  * Check in the windows the partition of your HD shows or not.
  
    If it shows then the machine is working fine but if it does not show then the Hard disk is gone for a toss.

## 4) INSERT THE MAC OSX INSTALL DVD (IF THE HD IS SEEN IN STARTUP MANAGER)

  * Boot to the disk.
  * If you still get the kernel panic in mac osx then it will be 2 possible hardware issues.
  * Either the Hard disk or the Logic Board.
  * If you are able to boot through the disk and get the language selection link then go to the first option **Select English as the Main Language. **
  * Then very next page you need to click on utility option (Found on the taskbar at the top)
  * Select the disk utility and on that page, you get 3 options 
      * Some HD size in MB with any of the HD company name
      * Macintosh HD.
      * Optical drive
  * Select the first option and do the repair disk only.

(NOTE: In the install, DVD do not run the repair disk permissions as it sets the default permissions)

If you get a repair disk error, you will need to back up any data you can, and reformat the entire hard disk. Once you don&#8217;t get a kernel panic in Mac OSX any longer you will be able to restore from time machine. However, if you continue to have issues, you will need to ship it back to Apple for a logic board replacement.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
