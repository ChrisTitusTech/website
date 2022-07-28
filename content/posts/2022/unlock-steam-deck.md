---
title: "Unlock Steam Deck"

date: 2022-07-27T21:26:53-05:00
url: /unlock-steam-deck/
image: images/2022-thumbs/unlock-steam-deck.jpg
categories:
  - Linux
tags:
  - Steam Deck
---
This article shows you how to make the steamdeck writable and a full blown desktop that you can install apps on that aren't Flatpak, AppImage, or Snaps. Simply use `yay -S packagename` to install the app of your choice. 
<!--more-->

## Make Desktop Usable with password 

set user password with `passwd` which then allows the use of sudo and various commands. By default the deck user comes with NO PASSWORD! without setting the user password you can NOT use `sudo`

## Making the steamdeck writable

```
sudo steamos-readonly disable
echo "keyserver hkps://keyserver.ubuntu.com" >> /etc/pacman.d/gnupg/gpg.conf
sudo pacman-key --init
sudo pacman-key --populate
sudo pacman-key --refresh-keys
yay -S base-devel
```

## Signing Issues - Package Installs

The repositories are for holo and steam deck are very interesting. Here are the base repos and what it is using.

`/etc/pacman/mirrrorlist`
```
Server = https://steamdeck-packages.steamos.cloud/archlinux-mirror/$repo/os/$arch
```

The main issue is the gnupg signing is completely messed up and often fails when installing packages. This is because the core archlinux-keyring is badly out of date and it will show that the package is out of date, corrupt, or having marginal trust. 

Obviously changing the repos to official arch ones would fix this, but then that would change the kernel and a variety of other packages. To fix the key signatures the easiest thing is to grab the up to date keyring from the core archlinux repos and manually install it. 

Download Official archlinux-keyring ZST Package: <https://archlinux.org/packages/core/any/archlinux-keyring/download>
Then install the downloaded ZST file through pacman - Ex. `sudo pacman -U archlinux-keyring-20220713-2-any.pkg.tar.zst`

This solves all your signing issues. 

## Making your own Steam Deck HTPC

![holoiso](/images/2022/holo.png)

The new steam interface for steam deck is absolutely a home run. It just works with so much functionality and much more when only controling your system with a controller. 

Check out HOLO-ISO - <https://github.com/theVakhovskeIsTaken/holoiso>
## Steam Deck - Unexplored Potential

[![youtube-video](https://img.youtube.com/vi/8oQdJjxn9EA/0.jpg)](https://www.youtube.com/watch?v=8oQdJjxn9EA)

_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

