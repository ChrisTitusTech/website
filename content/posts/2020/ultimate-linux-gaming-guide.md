---
title: "The Ultimate Linux Gaming Guide"
type: post
date: 2020-07-14T14:27:23-05:00
url: /ultimate-linux-gaming-guide/
image: /images/2020-thumbs/ultimate-linux-gaming-guide.jpg
categories:
  - Linux
tags:
  - Linux Gaming
draft: true
---
This guide goes over setting up your Linux system for gaming. I will include multiple setup instructions for various Linux distributions.  
<!--more-->
# Base System Setup
This guide will broken into parts that you will need to verify on your system. Each part, should be checked to guarantee an optimal experience. 

## Video Drivers

### Ubuntu Based Distributions  

**Enable 32-bit libraries**
```
sudo dpkg --add-architecture i386 
```

#### AMD - Mesa Driver Install

```
sudo add-apt-repository ppa:kisak/kisak-mesa
sudo apt update
sudo apt install libgl1-mesa-dri:i386 mesa-vulkan-drivers mesa-vulkan-drivers:i386
```
*Note: Did you run into an error? Make sure you are running Ubuntu 20, Linux Mint 20, or Pop OS 20! - Older versions are not recommended*

#### Nvidia Proprietary Driver Install

```
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update
sudo apt install nvidia-driver-440 libnvidia-gl-440 libnvidia-gl-440:i386 libvulkan1 libvulkan1:i386
```
*Note: Not working? Are you using a recent nVidia card? I recommend at least RTX 900 Series or Above! 

### Arch Based Distributions

**Enable Multilib for 32- bit support**  
`/etc/pacman.conf` *Note: you can remove the # to enable multilib shown below*
```
[multilib]
Include = /etc/pacman.d/mirrorlist
```
**Install driver packages**
```
sudo pacman -S lib32-mesa vulkan-radeon lib32-vulkan-radeon vulkan-icd-loader lib32-vulkan-icd-loader
```

## Custom Linux Kernel

### Xanmod (Debian-based Only)

Official Site: <https://xanmod.org>

**Installation**  
```
echo 'deb http://deb.xanmod.org releases main' | sudo tee /etc/apt/sources.list.d/xanmod-kernel.list && wget -qO - https://dl.xanmod.org/gpg.key | sudo apt-key add -
sudo apt update && sudo apt install linux-xanmod
```

### Liquorix (Debian-based Only)

Official Site: <https://liquorix.net>

**Installation**

Debian Prerequisites (No PPA) 
```
codename="$(find /etc/apt -type f -name '*.list' | xargs grep -E '^deb' | awk '{print $3}' | grep -Eo '^[a-z]+' | sort | uniq -c | sort -n | tail -n1 | grep -Eo '[a-z]+$')" && sudo apt-get install apt-transport-https curl && echo -e "deb http://liquorix.net/debian $codename main\ndeb-src http://liquorix.net/debian $codename main\n\n# Mirrors:\n#\n# Unit193 - France\n# deb http://mirror.unit193.net/liquorix $codename main\n# deb-src http://mirror.unit193.net/liquorix $codename main" | sudo tee /etc/apt/sources.list.d/liquorix.list && curl 'https://liquorix.net/linux-liquorix.pub' | sudo apt-key add - && sudo apt-get update
```

Ubuntu based Prerequisites (PPA): 
```
sudo add-apt-repository ppa:damentz/liquorix && sudo apt-get update
```

64-bit Install: 
```
sudo apt-get install linux-image-liquorix-amd64 linux-headers-liquorix-amd64
```

### Zen (Arch-based Only)

Built into Arch Linux and part of the official pacman repositories. This does a lot of the same tweaks as Liquorix but for Arch based distributions. 

**Installation**

```
pacman -S linux-zen
```

### Mainline (Debian Bleeding Edge)

Source Project: <https://github.com/pimlie/ubuntu-mainline-kernel.sh>

This will update a debian stable release to the latest official kernel.

#### Installation 

```
apt install wget
wget https://raw.githubusercontent.com/pimlie/ubuntu-mainline-kernel.sh/master/ubuntu-mainline-kernel.sh
chmod +x ubuntu-mainline-kernel.sh
sudo mv ubuntu-mainline-kernel.sh /usr/local/bin/
```

#### Usage

From terminal type any of the following commands:
```
ubuntu-mainline-kernel.sh -c # Check if Newer Kernel available
ubuntu-mainline-kernel.sh -i # Install latest kernel
ubuntu-mainline-kernel.sh -l # List locally installed kernels
ubuntu-mainline-kernel.sh -u # Uninstall mainline kernel
```

## ACO - Faster Compiling (AMD Only)

This is where Linus Tech Tips recently covered - Linux gaming is BETTER than windows? on June 17, 2020 <https://youtu.be/6T_-HMkgxt0> and I covered last year - Mesa ACO Linux | The Future is Now! on November 20, 2019 <https://youtu.be/fm_mzPBnWB0>

Basically this changes the compiling from LLVM to ACO which is considerably faster. The installation process is quite a bit easier now as well compared to my video. You do need up-to-date drivers mesa 20+ and edit `/etc/environment`.

Add this to `/etc/environment`
```
RADV_PERFTEST=aco
```

## GameMode - No CPU Throttling

GitHub Source Project: <https://github.com/FeralInteractive/gamemode>

### Ubuntu/Debian Dependencies
```
apt install meson libsystemd-dev pkg-config ninja-build git libdbus-1-dev libinih-dev dbus-user-session
```

### Arch Dependencies
```
pacman -S meson systemd git dbus
```

### Build and Install GameMode
```
git clone https://github.com/FeralInteractive/gamemode.git
cd gamemode
git checkout 1.5.1 # omit to build the master branch
./bootstrap.sh
```

### Uninstall GameMode
```
systemctl --user stop gamemoded.service
ninja uninstall -C builddir
```

### Usage

There are multiple ways to Use GameMode 

- **Lutris** - Under settings you can enable GameMode for all games you launch
- **Steam** - Go to Launch options for the game of choice and type in `gamemoderun %command%`
- **Terminal** - type `gamemoderun ./game`
- **Gnome Tool** - If you use GNOME Desktop Environment install this extension: <https://extensions.gnome.org/extension/1852/gamemode/>

## Custom Proton

The stock steam proton is rather old and behind the Wine team. Which means there are a lot of performance tweaks and improvements that you aren't getting yet. This is why I recommend everyone install Custom proton as I find the releases a considerable improvement when gaming in Steam. 

**Note: DO NOT USE STEAM IN A FLATPAK! You will lose some performance and modifications are more difficult!**

Source Project: <https://github.com/GloriousEggroll/proton-ge-custom#manual>  
Auto-Install Project: <https://github.com/Termuellinator/ProtonUpdater>

For Installation, we will use the ProtonUpdater script on GitHub. 
```
cd ~
wget https://raw.githubusercontent.com/Termuellinator/ProtonUpdater/master/cproton.sh
sudo +x cproton.sh
./cproton.sh
```

## Conclusion

Doing these tweaks or just some of them will make a drastic difference when it comes to Gaming on Linux. I personally use all of the tweaks, but sometimes I end up not using the Custom kernel if I have issues with drivers like nvidia sometimes does not like it. 


I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
