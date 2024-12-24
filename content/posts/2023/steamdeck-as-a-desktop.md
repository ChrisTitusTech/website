---
title: "Steamdeck as a Desktop"

date: 2023-01-16
url: /steamdeck-as-a-desktop/
image: images/2023-thumbs/steamdeck-as-a-desktop.webp
categories:
  - Linux
tags:
  - Steamdeck
draft: false
---
No, do NOT modify the system. This guide shows you how to retain the system while adding package management and the things you need to make the steamdeck your desktop!
<!--more-->

## Adding NIX as your Package Manager

NIX is an amazing package manager and far better than the flatpak and other solutions I've seen. We create a home directory called nix and map it's package manager to it, so on updates all our installed packages still work! Not familiar with NIX? Check out this article: <https://christitus.com/nix-package-manager/>

### Install NIX on Steamdeck

You may need to make the system writeable with `steamos-readonly disable`, but **DO NOT MODIFY EXISTING FILES!**. When steam updates, you could lose your customizations! We will only be making new files. 

Credit for this idea comes from <https://determinate.systems/posts/nix-on-the-steam-deck#enabling-an-install>

Create `/etc/systemd/system/nix-directory.service`

```
[Unit]
Description=Create a `/nix` directory to be used for bind mounting
PropagatesStopTo=nix-daemon.service
PropagatesStopTo=nix.mount
DefaultDependencies=no
After=grub-recordfail.service
After=steamos-finish-oobe-migration.service

[Service]
Type=oneshot
ExecStart=steamos-readonly disable
ExecStart=mkdir -vp /nix
ExecStart=chmod -v 0755 /nix
ExecStart=chown -v root /nix
ExecStart=chgrp -v root /nix
ExecStart=steamos-readonly enable
ExecStop=steamos-readonly disable
ExecStop=rmdir /nix
ExecStop=steamos-readonly enable
RemainAfterExit=true
```

Create `/etc/systemd/system/nix.mount`

```
[Unit]
Description=Mount `/home/nix` on `/nix`
PropagatesStopTo=nix-daemon.service
PropagatesStopTo=nix-directory.service
After=nix-directory.service
Requires=nix-directory.service
ConditionPathIsDirectory=/nix
DefaultDependencies=no

[Mount]
What=/home/nix
Where=/nix
Type=none
DirectoryMode=0755
Options=bind
```

Create `/etc/systemd/system/ensure-symlinked-units-resolve.service`

```
[Unit]
Description=Ensure Nix related units which are symlinked resolve
After=nix.mount
Requires=nix-directory.service
Requires=nix.mount
PropagatesStopTo=nix-directory.service
PropagatesStopTo=nix.mount
DefaultDependencies=no

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/bin/systemctl daemon-reload
ExecStart=/usr/bin/systemctl restart --no-block sockets.target timers.target multi-user.target

[Install]
WantedBy=sysinit.target
```

Enable and start it all with:

```
sudo systemctl enable --now ensure-symlinked-units-resolve.service
```
Install NIX

```
sh <(curl -L https://nixos.org/nix/install) --daemon
```

### Searching and Installing Packages

Search for packages @ <https://search.nixos.org/packages> Or you can use this from terminal: `nix search nixpkgs packagename`

_Note: Look under nix-env and "On Non NixOS"_

Install packages with `nix-env -iA nixpkgs.packagename` 

## Improving Performance

Change Swappiness 100 to 10 (Reduces use of Swap file)

```
echo "vm.swappiness=10" | sudo tee /etc/sysctl.d/99-custom-swappiness.conf
```

Change Swap File Size from 1G to 10G (_Note:This will take up more space!_)

```
echo 0
echo "# Disabling swap..."
sudo swapoff -a
echo 25
echo "# Creating new 8 GB swapfile (be patient, this can take between 10 seconds and 30 minutes)..."
sudo dd if=/dev/zero of=/home/swapfile bs=1G count="8" status=none
echo 50
echo "# Setting permissions on swapfile..."
sudo chmod 0600 /home/swapfile
echo 75
echo "# Initializing new swapfile..."
sudo mkswap /home/swapfile  
sudo swapon /home/swapfile 
```

## Walkthrough Video

{{< youtube ttOs5iWgNzk >}}
