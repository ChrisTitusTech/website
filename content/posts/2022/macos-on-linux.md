---
title: "Macos on Linux"

date: 2022-10-03
url: /macos-on-linux/
image: images/2022-thumbs/macos-on-linux.jpg
categories:
  - Linux
  - MacOS
  - Networking
tags:
  - Ubuntu
draft: false
---
This shows you all the steps to install a MacOS VM in Linux QEMU using Virtual Machine Manager or virt-manager.
<!--more-->
Source: <https://github.com/kholia/OSX-KVM>
Older Repository: <https://github.com/foxlet/macOS-Simple-KVM>

### Requirements
- A modern Linux distribution. E.g. Ubuntu 20.04 LTS 64-bit or later.
- QEMU >= 4.2.0
- A CPU with Intel VT-x / AMD SVM support is required (`grep -e vmx -e svm /proc/cpuinfo`)

### Installation Preparation
KVM may need the following tweak on the host machine to work.

  ```
  echo 1 | sudo tee /sys/module/kvm/parameters/ignore_msrs
  ```

  To make this change permanent, you may use the following command.

  ```
  sudo cp kvm.conf /etc/modprobe.d/kvm.conf
  ```

Install QEMU and other packages.

  ```
  sudo apt-get install qemu uml-utilities virt-manager git \
      wget libguestfs-tools p7zip-full make dmg2img -y
  ```

  This step may need to be adapted for your Linux distribution.

Add user to the `kvm` and `libvirt` groups (might be needed).

  ```
  sudo usermod -aG kvm $(whoami)
  sudo usermod -aG libvirt $(whoami)
  sudo usermod -aG input $(whoami)
  sudo usermod -aG disk $(whoami)
  ```

  Note: Re-login after executing this command.

Clone this repository on your QEMU system. Files from this repository are
  used in the following steps.

  ```
  cd ~
  git clone --depth 1 --recursive https://github.com/kholia/OSX-KVM.git
  cd OSX-KVM
  ```

  Repository updates can be pulled via the following command:

  ```
  git pull --rebase
  ```

  This repository uses rebase based workflows heavily.

Fetch macOS installer.

  ```
  ./fetch-macOS-v2.py
  ```

  You can choose your desired macOS version here. After executing this step,
  you should have the `BaseSystem.dmg` file in the current folder.

  > ATTENTION: Let `>= Big Sur` setup sit at the `Country Selection` screen, and
  > other similar places for a while if things are being slow. The initial macOS
  > setup wizard will eventually succeed.

  Sample run:
  ```
  $ ./fetch-macOS-v2.py
  1. High Sierra (10.13)
  2. Mojave (10.14)
  3. Catalina (10.15)
  4. Big Sur (11.6) - RECOMMENDED
  5. Monterey (latest)

  Choose a product to download (1-5): 4
  ```
  Note: Modern NVIDIA GPUs are supported on HighSierra but not on later
  versions of macOS. Recommended PCI Passthrough GPU is 5700XT as this works on Catalina and above. If you go with a 6000 Series Card only certain ones will work on Big Sur and Monterey, but not earlier releases.

Convert the downloaded `BaseSystem.dmg` file into the `BaseSystem.img` file.

  ```
  dmg2img -i BaseSystem.dmg BaseSystem.img
  ```

  OR

  ```
  qemu-img convert BaseSystem.dmg -O raw BaseSystem.img  # can be problematic on newer systems
  ```

Create a virtual HDD image where macOS will be installed. If you change the
  name of the disk image from `mac_hdd_ng.img` to something else, the boot scripts
  will need to be updated to point to the new image name.

  ```
  qemu-img create -f qcow2 mac_hdd_ng.img 128G
  ```

  NOTE: Create this HDD image file on a fast SSD/NVMe disk for best results.

Now you are ready to install macOS

### Installation

CLI method (primary). Just run the `OpenCore-Boot.sh` script to start the
  installation process.

  ```
  ./OpenCore-Boot.sh
  ```

_Note: This same script works for Big Sur, Catalina, Mojave, and High Sierra._

Use the `Disk Utility` tool within the macOS installer to partition, and
  format the virtual disk attached to the macOS VM.

Go ahead, and install macOS 

**TIP: Using a non-APFS filesystem is recommended.**

_(OPTIONAL) Use this macOS VM disk with libvirt (virt-manager / virsh stuff)._

#### Virtual Machine Manager Setup

Edit `macOS-libvirt-Catalina.xml` file and change the various file paths (search
    for `CHANGEME` strings in that file). The following command should do the
    trick usually.

```
sed "s/CHANGEME/$USER/g" macOS-libvirt-Catalina.xml > macOS.xml
virt-xml-validate macOS.xml
```

Create a VM by running the following command.

```
virsh --connect qemu:///system define macOS.xml
```

If needed, grant necessary permissions to libvirt-qemu user,

```
sudo setfacl -m u:libvirt-qemu:rx /home/$USER
sudo setfacl -R -m u:libvirt-qemu:rx /home/$USER/OSX-KVM
```

Launch `virt-manager` and start the `macOS` virtual machine.

### Post-Installation

#### Bridge Networking
*First* find your card interface name
```
ip a
```

Example: (Interface name is enp7s0)
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp7s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
    link/ether 24:bb:ee:55:22:33 brd ff:ff:ff:ff:ff:ff
    inet 10.0.0.99/24 brd 10.0.0.255 scope global
    valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
    valid_lft forever preferred_lft forever
```

*Second* Update `/etc/network/interfaces` to only have the `lo` device or loopback - Comment out any other interfaces with `#`

```
source /etc/network/interfaces.d/*
 
# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
# allow-hotplug enp7s0
# iface enp7s0 inet dhcp
```

*Third* Add `sudo vim /etc/network/interfaces.d/br0` File. Use `nano` instead of `vim` if you don't know vim.

```
## DHCP ip config file for br0 ##
auto br0
 
# Bridge setup
 iface br0 inet dhcp
    bridge_ports enp7s0
```

*Lastly* Restart the networking service or reboot computer.

```
sudo systemctl restart networking
```

#### Other Considerations
- To passthrough GPUs and other devices, see [these notes](https://github.com/kholia/OSX-KVM/blob/master/notes.md#gpu-passthrough-notes)
- Need a different resolution? Check out the [notes](https://github.com/kholia/OSX-KVM/blob/master/notes.md#change-resolution-in-opencore) included in this repository.
- Trouble with iMessage? Check out the [notes](https://github.com/kholia/OSX-KVM/blob/master/notes.md#trouble-with-imessage) included in this repository.
- Highly recommended macOS tweaks - https://github.com/sickcodes/osx-optimizer

## Walkthrough Video

{{< youtube 11111111 >}}
