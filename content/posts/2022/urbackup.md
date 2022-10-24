---
title: "Urbackup"

date: 2022-11-04
url: /urbackup/
image: images/2022-thumbs/urbackup.jpg
categories:
  - Linux
  - Windows
  - Networking
tags:
  - Backup
draft: false
---
Want a Universal Backup that works on EVERY operating system and is free + open source? Urbackup is the software you are looking for!
<!--more-->

{{< tweet user="christitustech" id="1584567052404412416" >}}

## Why UrBackup

This program is absolutely amazing and free! All it's source code is on the internet which made it able to adapt to ALL operating systems. Windows, Mac, Linux... hell it even has ARM support!

## Universal Backup Servers

There is a ton of different supported servers and even some that are unsupported that still work. Here is the official download page: <http://www.urbackup.org/download.html>

One notable non-official project is for Synology NAS devices. I use a 64-bit Synology on DSM 7+, so pay attention to your current version if you want to use the project below. 

Synology Project: <https://github.com/josef109/spksrc>

### Server Dashboard

 ![](/images/2022/urbackup/dash.png)

### Automated Terminal Install and Linux Setup

Linux installs are a complete DREAM! Just paste the command listed under terminal when you use "Add New Client" Button. Here is an example install:

![](/images/2022/urbackup/linux-term.png)

### Enable Restore from Web

You need to enable restoration in client configuration to completely control everything from server web interface. Here is a sample client configuration `/etc/default/urbackupclientbackend`

![](/images/2022/urbackup/enable-web.png)

## Windows Client Setup

Windows uses a executable that is made with the "Add New Client" button. By default, windows clients will have full image backup on and no file based backups. I'd recommend changing this by adding your home directory or any other important folders, such as: `My Documents`

## Linux Client Setup

Linux clients can be installed via terminal and what I recommend. 

_Note: The Linux GUI isn't good and terminal use of `urbackupclientctl` is used_

### Image Backups

Since urbackup only supports EXT4 and XFS we need LVM setup on these volumes BEFORE installing the distribution. LVM is tricky to setup correctly and will be hard as a beginner. The good thing about Linux is we don't have to worry about full image backups. All our configuration settings are in `~/.config` and global settings in `/etc/`. On my installs I mainly backup the `.config` folder and any other folder where I might put important information that would be isolated to that computer.  

### Setting the backup directories

Here is a sample backup command to add my `~/.config` directory

```
sudo urbackupclientctl add-backupdir -d $HOME/.config/
```

Then, check the status using the server web interface. 

![](/images/2022/urbackup/linux-file.png)

### Uninstall

Uninstallation is a bit weird and needs to be done with this command: 

```
sudo uninstall_urbackupclient
```

![](/images/2022/urbackup/linux-uninstall.png)


## Walkthrough Video

{{< youtube 11111111 >}}
