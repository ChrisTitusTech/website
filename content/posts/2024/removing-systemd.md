---
title: "Removing SystemD from Linux"

date: 2024-12-18
url: /removing-systemd/
image: images/2024-thumbs/removing-systemd.jpg
categories:
  - Linux
tags:
  - Systemd
draft: true
---
Systemd is great for standardization, but it is insanely bloated. Boot times average around 20 seconds when removing it and using a minimal init system will result in a boot time of only a few seconds. This is a guide on switching to OpenRC.
<!--more-->

## What do I lose?

Systemd has a LOT of functions and can do the following, but often we swap out to alternatives anyways.

- Bootloader (Grub is the alternative)
- Timers (cronie is still widely used instead)
- Networkd (NetworkManager is almost universally used - same goes for resolved for dns resolution)
- Auto mount (A few distros use this but often `/etc/fstab` is used instead)
- journald (This I will miss... it is a fantastic system log tool)
- logind (Alternative is elogind - You NEED a login daemon because without it you have to run Xorg as ROOT which only a crazy person would do.)
- timedated ( universal date and time management)
- udev (device manager and very useful for using rules to manage device without elevation. Ex. Managing backlight on a laptop)

## Switch to OpenRC

The switch is very easy 

```
sudo apt install openrc sysvinit-core
sudo reboot
```

After restart process is complete install the following packages to fill in any gaps missing with systemd no longer on the system:

```
sudo apt install elogind libpam-elogind orphan-sysvinit-scripts systemctl procps
sudo reboot
```

Source: <https://lecorbeausvault.wordpress.com/2022/02/07/debian-switching-init-system-easily-openrc-sysvinit-runit/>

## Prevent Systemd from reinstalling

Create `/etc/apt/preferences.d/systemd`

```
Package: systemd
Pin: release *
Pin-Priority: -1
 
Package: *systemd*
Pin: release *
Pin-Priority: -1
 
Package: systemd:i386
Pin: release *
Pin-Priority: -1
```

APT-Mark holds

```
sudo apt-mark hold libsystemd0
```

## Systemd vs OpenRC Commands

This is a comparison of the different init systems and run commands.

Source: <https://wiki.archlinux.org/title/OpenRC#Usage>

| SystemD | SysVinit | OpenRC | Description |
| :---    | :---     | :---   | :--- |
| systemctl list-units | rc.d list | rc-status | List running services status |
| systemctl --failed |  | rc-status --crashed | Check failed services |
| systemctl --all |  | rc-update -v show | Display all available services. |
| systemctl (start, stop, restart, status) daemon.service | rc.d (start, stop, restart) daemon | rc-service daemon (start, stop, restart, status) | Change service state. |
| systemctl (enable, disable) daemon.service | chkconfig daemon (on, off) | rc-update (add, del) daemon | Turn service on or off. |
| systemctl daemon-reload | chkconfig daemon --add |  | Create or modify configuration. |


## Creating an OpenRC Service/Daemon

Official Manual page: <https://github.com/OpenRC/openrc/blob/master/service-script-guide.md>

Create a service script here: `/etc/init.d/mydaemon`

```
#!/sbin/openrc-run

command="/usr/sbin/mydaemon"
command_args="-c /etc/mydaemon.conf"
command_user="user:group"
description="super essential service"
pidfile="/var/run/mydaemon.pid"

depend() {
  need localmount
  use logger
}

checkconfig() {
  ...
}

start_pre() {
  # Prevent of double check
  if [ "${RC_CMD}" != "restart" ] ; then
    checkconfig || return $?
  fi
}

stop_pre() {
  if [ "${RC_CMD}" = "restart" ] ; then
    checkconfig || return $?
  fi
}
```

## Walkthrough Video

{{< youtube 11111111 >}}
