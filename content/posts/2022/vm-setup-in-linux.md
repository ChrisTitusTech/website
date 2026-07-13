---
title: "Install KVM, QEMU, and Virt-Manager on Linux"

date: 2022-01-12T16:28:59-05:00
url: /vm-setup-in-linux/
image: images/2022-thumbs/qemu.webp
categories:
  - Linux
tags:
  - Debian
  - Arch Linux
  - Fedora
  - Virtualization
---
This guide installs KVM/QEMU, libvirt, and the Virt-Manager desktop app on Debian, Arch Linux, or Fedora. Pick your distribution, copy the commands, and then complete the shared setup steps.
<!--more-->

## Before You Install

KVM needs Intel VT-x or AMD-V hardware virtualization. Check whether your CPU exposes either feature:

```bash
grep -Eoc '(vmx|svm)' /proc/cpuinfo
```

Any number greater than `0` means the CPU virtualization extensions are available. If the result is `0`, reboot into your BIOS/UEFI settings and enable **Intel VT-x**, **Intel Virtualization Technology**, **AMD-V**, or **SVM Mode**.

## Debian

These commands install the QEMU/KVM hypervisor, libvirt, its command-line tools, and Virt-Manager:

```bash
sudo apt update
sudo apt install -y qemu-system-x86 qemu-utils libvirt-daemon-system libvirt-clients virt-manager
```

Start libvirt now and automatically at boot:

```bash
sudo systemctl enable --now libvirtd.service
```

## Arch Linux

The `qemu-desktop` package is the practical choice for running x86 virtual machines with a graphical desktop. `dnsmasq` supplies DHCP and DNS for libvirt's default NAT network.

```bash
sudo pacman -Syu --needed qemu-desktop libvirt virt-manager dnsmasq
```

Start libvirt now and automatically at boot:

```bash
sudo systemctl enable --now libvirtd.service
```

## Fedora

Fedora's virtualization package group installs QEMU/KVM, libvirt, Virt-Manager, and the default network configuration:

```bash
sudo dnf install -y @virtualization
```

Start libvirt now and automatically at boot:

```bash
sudo systemctl enable --now libvirtd.service
```

## Allow Your User to Manage Virtual Machines

Add your current user to the `libvirt` group:

```bash
sudo usermod -aG libvirt "$USER"
```

Log out and back in so the new group membership takes effect. A reboot works too.

> Membership in the `libvirt` group grants permission to manage system virtual machines. Do not add your account to broad device-access groups such as `disk` or `input` for this setup.

## Enable the Default Virtual Network

First, check the available libvirt networks:

```bash
sudo virsh net-list --all
```

If `default` is listed as inactive, start it and configure it to start at boot:

```bash
sudo virsh net-start default
sudo virsh net-autostart default
```

Verify that `default` now shows `active` and `yes` under Autostart:

```bash
sudo virsh net-list --all
```

## Verify KVM and Libvirt

Check that the KVM kernel modules are loaded. You should see `kvm_intel` or `kvm_amd`, plus the main `kvm` module:

```bash
lsmod | grep kvm
```

After logging back in, verify that your user can connect to the system libvirt service:

```bash
virsh --connect qemu:///system list --all
```

An empty virtual-machine list is normal on a new installation. If the command returns without a connection or permission error, the setup is working.

## Create Your First Virtual Machine

1. Download the ISO for the operating system you want to install.
2. Open **Virtual Machine Manager** from your application menu, or run `virt-manager`.
3. Make sure the connection is **QEMU/KVM - System**.
4. Select **Create a new virtual machine**, choose your ISO, and follow the wizard.

Virt-Manager stores system VM disk images in `/var/lib/libvirt/images/` by default.

## Troubleshooting

### The Virtualization Check Returns 0

Enable VT-x or AMD-V/SVM in BIOS/UEFI. On a VM host provided by a cloud service or another hypervisor, nested virtualization must also be enabled by that provider or parent hypervisor.

### The Default Network Does Not Exist

Define it from libvirt's packaged configuration, then start it:

```bash
sudo virsh net-define /usr/share/libvirt/networks/default.xml
sudo virsh net-autostart default
sudo virsh net-start default
```

### Virt-Manager Cannot Connect

Confirm that libvirt is running:

```bash
systemctl status libvirtd.service
```

Then confirm that your login session has the `libvirt` group:

```bash
groups
```

If `libvirt` is missing, log out completely and log back in, or reboot.

## Distribution Documentation

- [Debian Handbook: Virtualization](https://www.debian.org/doc/manuals/debian-handbook/sect.virtualization.en.html)
- [ArchWiki: libvirt](https://wiki.archlinux.org/title/Libvirt)
- [Fedora Docs: Virtualization - Getting Started](https://docs.fedoraproject.org/en-US/quick-docs/virtualization-getting-started/)

## Walkthrough Video

The video below shows the original Debian-focused version of this setup. Package names and screens may differ from the updated commands above.

{{< youtube Kq849CpGd88 >}}
