---
title: "Rocky Linux"

date: 2021-05-03T12:12:16-05:00
url: /rocky-linux/
image: images/2021-thumbs/rocky-linux.webp
categories:
  - Linux
tags:
  - Rocky Linux
---
This guide goes over setting up KDE on Rocky Linux from a base server install with no GUI. 
<!--more-->

## Download and Install Server Setup

Download the Rocky Linux ISO from: <https://rockylinux.org/download/>  
_Note: I downloaded DVD 8GB, which is offline and no downloading_ 

During Setup, I recommend a dedicated drive and choosing only SERVER with NO GUI! 

Go ahead and walkthrough the rest of the install

## Configuration

### Enable PowerTools and RPMFusion Repositories

```
sudo dnf upgrade -y
sudo dnf install --nogpgcheck https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
sudo dnf install --nogpgcheck https://mirrors.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm https://mirrors.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-8.noarch.rpm
sudo dnf config-manager --set-enabled PowerTools
```
_Note: If you can't install PowerTools with config-manager, you can manually enable it through the repo file in `/etc/yum.repos.d`_

### Dependencies

```
sudo dnf update -y
sudo dnf install xorg-x11-server-Xorg xorg-x11-xauth xorg-x11-apps -y
sudo dnf install plasma-desktop kscreen sddm kde-gtk-config dolphin konsole kate -y
```

### Set Graphical Interface on Startup

```
sudo systemctl set-default graphical.target
sudo systemctl enable sddm
```

_Note: If using GTK Apps, I highly recommend building and installing `Kvantum` from `git clone https://github.com/tsujan/Kvantum.git`_

#### NVIDIA Cards ONLY

If you have an nvidia card it can be tricky to install so I recommend doing it before Xorg is started and you have a GUI. 

1. First install Dev tools below with dkms and kernel-devel

```
sudo dnf groupinstall "Development Tools"
sudo dnf install kernel-devel epel-release
sudo dnf install dkms
```

2. Download NVIDIA Drivers from <https://www.nvidia.com/en-us/drivers/unix/>

3. Disable nouveau by editing `/etc/default/grub`

```
GRUB_CMDLINE_LINUX="crashkernel=auto rhgb quiet nouveau.modeset=0"
```

Write out the changes (Note Choose BIOS OR EFI... NOT BOTH!)

```
BIOS:
$ sudo grub2-mkconfig -o /boot/grub2/grub.cfg
EFI:
$ sudo grub2-mkconfig -o /boot/efi/EFI/rocky/grub.cfg
```

4. (GUI Only) If you booted into KDE or GUI interface from TTY2 (Ctrl+Alt+F2) login and type `sudo systemctl isolate multi-user.target`

5. Now Install NVIDIA and reboot `sudo bash NVIDIA-Linux-x86_64-*`

### Setup your Development Tools for Builds

```
sudo dnf groupinstall "Development Tools"
sudo dnf install cmake gcc-c++ libX11-devel libXext-devel qt5-qtx11extras-devel qt5-qtbase-devel qt5-qtsvg-devel qt5-qttools-devel kf5-kwindowsystem-devel make procps-ng curl file git
```

Install Homebrew

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

_Note: Installer messed up and put it in `/home/linuxbrew/.linuxbrew` I moved this to my home folder and linked the brew executable to `~/bin`_

Add Homebrew to the end bash or zsh rc file

```
eval $(~/.linuxbrew/bin/brew shellenv)
```


### Install Tools of your Choice

This is a base install so you will need a file explorer, terminal, browser, etc. 

Choose whatever you want! 

Examples: 
```
sudo dnf install terminator firefox zsh
```

#### VSCodium on Rocky Linux 

Source: <https://github.com/VSCodium/vscodium>

```
sudo rpm --import https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/-/raw/master/pub.gpg
printf "[gitlab.com_paulcarroty_vscodium_repo]\nname=gitlab.com_paulcarroty_vscodium_repo\nbaseurl=https://paulcarroty.gitlab.io/vscodium-deb-rpm-repo/rpms/\nenabled=1\ngpgcheck=1\nrepo_gpgcheck=1\ngpgkey=https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/-/raw/master/pub.gpg" |sudo tee -a /etc/yum.repos.d/vscodium.repo
sudo dnf install codium
```

#### New Packages with AppImage or Flatpak

Install flatpak with `sudo dnf install flatpak`

See What package are availiable: <https://flathub.org/home>

Install the flathub repo on Rocky Linux `flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo`

GIMP 2.10 `sudo flatpak install https://flathub.org/repo/appstream/org.gimp.GIMP.flatpakref`  
Steam `sudo flatpak install flathub com.valvesoftware.Steam`

## The Rocky Difference

*Security by default* - Be aware this uses Enforced SELinux and Firewalld on install. This means applications will more often than not be sandboxed and will block all incoming traffic

*Stability in mind* Yes, the packages are old by default but it means they stable

*Productivity Machine* No constant updates, it just works...

