---
title: Linux File System | Directory Structure
author: Chris Titus

date: 2019-09-23T17:23:00+00:00
url: /linux-file-system/
image: images/2019/09/linux-file-system-300x169.webp
categories:
  - Linux
tags:
  - Linux File System

---

This article details the Linux File System and it&#8217;s directory structure. 

## Linux File System &#8211; Root

  *  **/** -This is the root directory which should contain only the directories needed at the top level of the file structure
  * **/bin** &#8211; This is where the executable files are located. These files are available to all users, but do not add programs manually here
  * **/dev** &#8211; These are devices in your system &#8211; Not Mounted!
  * **/etc** &#8211; Superuser directory commands, configuration files, disk configuration files, valid user lists, groups, ethernet, hosts, etc.
  * **/lib** &#8211; Contains shared library files and sometimes other kernel-related files
  * **/boot** &#8211; Contains files for booting the system /boot/efi for EFI systems
  * **/home** &#8211; Contains the home directory for users and other accounts
  * **/media** &#8211; Typically used to mount permanent file systems
  * **/mnt** &#8211; Used to mount other temporary file systems, such as cdrom and floppy for the CD-ROM drive and floppy diskette drive, respectively
  * **/proc** &#8211; Contains all processes marked as a file by process number or other information that is dynamic to the system
  * **/tmp** &#8211; Holds temporary files used between system boots
  * **/usr** &#8211; (Unix System Resource) Used for miscellaneous purposes, and can be used by many users. Includes administrative commands, shared files, library files, and others
  * **/var** &#8211; Typically contains variable-length files such as log and print files and any other type of file that may contain a variable amount of data
  * **/sbin** &#8211; Contains binary (executable) files, usually for system administration. For example, fdisk and ifconfig utlities
  * **/kernel** &#8211; Contains kernel files

## Home Directory Structure

/home/user is the home directory for your user and it is often abbreviated with a ~. Folders starting with a period are hidden and can be looked at via options in file browser or `ls -al` in terminal. 

  * **~/.cache** &#8211; Cache files for that user
  * **~/.config** &#8211; User Configuration files for your programs. 
  * **~/.local/share** &#8211; User Configuration files for your system. Edit Application in start menu, modify system configurations for your user, etc.
  * **~/.ssh** &#8211; SSH configuration and keys
  * **~/.vnc** &#8211; VNC remote desktop configuration files
  * **~/.steam** &#8211; default steam location for games and config files
  * **~/.bashrc** (FILE) &#8211; This file controls shortcuts and aliases that you use in Terminal

This details the Linux File System and should give you a better understanding of how to navigate around in not only a Linux system, but any UNIX based OS for that matter. 

## Video Walkthrough

{{< youtube roES8iAaJEM >}}  

