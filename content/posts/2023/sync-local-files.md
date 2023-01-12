---
title: "Sync Local Files"

date: 2023-01-20
url: /sync-local-files/
image: images/2023-thumbs/sync-local-files.jpg
categories:
  - Linux
  - Windows
tags:
  - Syncthing
draft: false
---
A guide over how to set up Syncthing for local sync only.
<!--more-->

## Things you NEED to know

Syncthing by defaults it will sync files through relays across the internet. This is useful when needing to grab a file while you are outside your network, but slow and can cause security issues. While the information is encrypted, it still poses a threat to some. Also, the slowdown is relaying that information outside the network even in a LAN transfer. 

The following guide shows you how to make it sync only in a LAN environment. Note: This will make your files NOT sync when outside your own network!

## Installing Syncthing

There is a cli service that you can install via syncthing. I prefer to take a GUI approach to the configuration as it helps when troubleshooting. Here are the following tools I recommend based on the operating system.

### Windows and Linux

Syncthing-GTK is a proven companion I've used with syncthing for years. It is open source and you can download the latest releases here: <https://github.com/kozec/syncthing-gtk/releases>

During the install process choose the default selections and manage via localhost.

Installing on Steamdeck? Checkout it's flatpak: <https://flathub.org/apps/details/me.kozec.syncthingtk>

### MacOS

Syncthing for MacOS is a great open source project @ <https://github.com/syncthing/syncthing-macos>

Homebrew install method:

```
brew install --cask syncthing
```
## Configuration

![](/images/2023/sync-local-files/config.png)

With multiple syncthing clients you can connect one using "Connect Remote Device" this is what the server interface looks like.

![](/images/2023/sync-local-files/server.png)

On the other system it will prompt to connect the two.

![](/images/2023/sync-local-files/client.png)

I generally always have a main server that manages all the connects and hosts the share. You don't have to do this, but it's easier to manage. To start syncing -> Create a folder -> Edit Folder -> Click Sharing Options -> Check the other syncthing computers to share it to!

![](/images/2023/sync-local-files/share.png)

On the client computers click add and watch the sync happen. This is the final result of the sync:

![](/images/2023/sync-local-files/final-sync.png)

### Disable External Access

![](/images/2023/sync-local-files/settings.png)

This simple configuration will set everything to LAN only. Making sure anon usage and Global Discovery are disabled will work for most.

However, for a deeper dive for those security minded and configuration junkies, here is another tidbit. (Advanced Users Only)

- Sync Listen Address - This is where the incoming sync is and can be set to be IPv4 or a specific address if you want. It's a bit overkill but by default it runs on 22000. Adjusting this value isn't recommended and can cause headaches in a dynamic environment. Highly recommend using hostnames to resolve instead of IPs unless they are static!
- GUI Listen Address - Syncthings web interface runs on port 8080 and typically only listens from localhost (local connections).

## Syncthing Backups

Here is Syncthing's wonderful backup system. I always use this for the times I delete something or need to recover from a bad sync. The options are: simple, trash can, staggered, and external. If you want basic backups, choose simple. Trash can is good for deleted files and often you want to grab an older version of an existing file when using sync. Personally, I do the overkill option of staggered versioning. This hold all the different version in a hour, day, week, month format til the end of the retention period. This will use a TON of space where the folder is synced from, so be CAREFUL!

![](/images/2023/sync-local-files/backup.png)

## Walkthrough Video

{{< youtube 11111111 >}}
