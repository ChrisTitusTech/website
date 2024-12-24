---
title: "Quickemu"

date: 2022-12-21
url: /quickemu/
image: images/2022-thumbs/quickemu.webp
categories:
  - Linux
tags:
  - QEMU
draft: false
---
This is a GitHub project that installs virtual machines for more than 300+ spins of Linux, Windows, and macOS!
<!--more-->

## The Project

Source: <https://github.com/quickemu-project/quickemu>

## Installation

Dependency requirements:

```
sudo apt install qemu bash coreutils ovmf grep jq lsb procps python3 genisoimage usbutils util-linux sed spice-client-gtk swtpm wget xdg-user-dirs zsync unzip
```

Install for Ubuntu 

```
sudo apt-add-repository ppa:flexiondotorg/quickemu
sudo apt update
sudo apt install quickemu
```

GUI Install

```
sudo add-apt-repository ppa:yannick-mauray/quickgui
sudo apt update
sudo apt install quickgui
```

Other Distros (Use [NIX Installer](https://christitus.com/nix-package-manager/))

```
nix-env -iA nixpkgs.quickemu
```

Build from Source for GUI <https://github.com/quickemu-project/quickgui>

## CLI Usage 

```
quickget ubuntu-mate 22.04
quickemu --vm ubuntu-mate-22.04.conf
```

This is pretty easy to manage with it's own dedicated directory. Ex. `~/VMs`

## Downloading via GUI

Select your OS and Press Download (Yes, it's that easy!)

![](/images/2022/quickemu/quickgui.webp)

![](/images/2022/quickemu/kubuntu-download.webp)


## Walkthrough Video

{{< youtube 87MCT3Ekjlo >}}
