---
title: "Disable Snaps"

date: 2020-09-08T13:44:58-05:00
url: /disable-snaps/
image: images/2020-thumbs/disable-snaps.webp
categories:
  - Linux
tags:
  - Ubuntu
---
This goes over how to Disable Snaps and making sure it doesn't automatically reinstall. 
<!--more-->

## List and Uninstall Snaps

```
snap list # This shows you what snaps are installed
sudo snap remove program # Fill in all snaps listed above
```

## Purge Snaps and Block Reinstall

```
sudo apt purge snapd
sudo apt-mark hold snapd
```

## Verify Uninstall

```
apt list --install | grep snap
```

Check your Output for any snap packages

