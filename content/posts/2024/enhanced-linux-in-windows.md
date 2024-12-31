---
title: "Enhanced Linux in Windows"

date: 2024-12-31
url: /enhanced-linux-in-windows/
image: images/2024-thumbs/enhanced-linux-in-windows.webp
categories:
  - Linux
  - Windows
tags:
  - Hyperv 
draft: false
---
Using WSL is great for a lot of things, but often I find it limiting or quirky bugs that don't happen on HyperV. 
<!--more-->

## What is a Enhanced HyperV Session in Windows? 

This allows full 3D acceleration, large resolutions, audio passthrough, and shared clipboard. There are many other things that this can do, but these are main benefits. I was using WSLg and constantly found little problems about moving around or compiling taking a long time and other issues. 

The biggest problem with WSL is it isn't Linux. It feels like a bolted on system that I have a hard time programming in.

Enter HyperV!

HyperV with Enhanced Session feels like Linux and it is FAST! I can go full screen and using it like a Linux desktop forgetting I am in Windows. The startup is only a few seconds and a fantastic alternative than doing a dual boot.

## Enabling Enhanced Session

Arch Dependencies inside VM

```
yay -S xrdp xorgxrdp
```

Windows Configuration (PowerShell)

```
Set-VMhost -EnableEnhancedSessionMode $True
Set-VM -VMName "NameVM" -EnhancedSessionTransportType HvSocket
```

Configuration Script (install script)

```
#!/bin/bash

#
# This script is for Arch Linux to configure XRDP for enhanced session mode
#
# The configuration is adapted from the Ubuntu 16.04 script.
#

if [ "$(id -u)" -ne 0 ]; then
    echo 'This script must be run with root privileges' >&2
    exit 1
fi

# Use Qi to check for exact package name
if ! pacman -Qi xrdp > /dev/null ; then
    echo 'xrdp not installed. Run makepkg.sh first to install xrdp.' >&2
    exit 1
fi

# Use Qs to allow xorgxrdp-devel-git
if ! pacman -Qs xorgxrdp > /dev/null ; then
    echo 'xorgxrdp not installed. Run makepkg.sh first to install xorgxrdp.' >&2
    exit 1
fi

###############################################################################
# Configure XRDP
#
systemctl enable xrdp
systemctl enable xrdp-sesman

# Configure the installed XRDP ini files.
# use vsock transport.
sed -i_orig -e 's/port=3389/port=vsock:\/\/-1:3389/g' /etc/xrdp/xrdp.ini
# use rdp security.
sed -i_orig -e 's/security_layer=negotiate/security_layer=rdp/g' /etc/xrdp/xrdp.ini
# remove encryption validation.
sed -i_orig -e 's/crypt_level=high/crypt_level=none/g' /etc/xrdp/xrdp.ini
# disable bitmap compression since its local its much faster
sed -i_orig -e 's/bitmap_compression=true/bitmap_compression=false/g' /etc/xrdp/xrdp.ini
#
# sed -n -e 's/max_bpp=32/max_bpp=24/g' /etc/xrdp/xrdp.ini

# use the default lightdm x display
# sed -i_orig -e 's/X11DisplayOffset=10/X11DisplayOffset=0/g' /etc/xrdp/sesman.ini
# rename the redirected drives to 'shared-drives'
sed -i_orig -e 's/FuseMountName=thinclient_drives/FuseMountName=shared-drives/g' /etc/xrdp/sesman.ini

# Change the allowed_users
echo "allowed_users=anybody" > /etc/X11/Xwrapper.config


#Ensure hv_sock gets loaded
if [ ! -e /etc/modules-load.d/hv_sock.conf ]; then
	echo "hv_sock" > /etc/modules-load.d/hv_sock.conf
fi

# Configure the policy xrdp session
cat > /etc/polkit-1/rules.d/02-allow-colord.rules <<EOF
polkit.addRule(function(action, subject) {
    if ((action.id == "org.freedesktop.color-manager.create-device" ||
         action.id == "org.freedesktop.color-manager.modify-profile" ||
         action.id == "org.freedesktop.color-manager.delete-device" ||
         action.id == "org.freedesktop.color-manager.create-profile" ||
         action.id == "org.freedesktop.color-manager.modify-profile" ||
         action.id == "org.freedesktop.color-manager.delete-profile") &&
        subject.isInGroup("users"))
    {
        return polkit.Result.YES;
    }
});
EOF

# Adapt the xrdp pam config
cat > /etc/pam.d/xrdp-sesman <<EOF
#%PAM-1.0
auth        include     system-remote-login
account     include     system-remote-login
password    include     system-remote-login
session     include     system-remote-login
EOF


###############################################################################
# .xinitrc has to be modified manually.
#
echo "You will have to configure .xinitrc to start your windows manager, see https://wiki.archlinux.org/index.php/Xinit"
echo "Reboot your machine to begin using XRDP."
echo "Example: nano ~/.xinitrc" and launch your desktop environment or window manager. Enter "exec dwm" to launch dwm. 

```

## Audio Issues

Depending on your audio setup you may run into issues. Currently, pulseaudio-module-xrdp is not working on the AUR for Arch. I have been unsuccessful in getting pipewire working with xrdp. 

Check <https://github.com/neutrinolabs/pulseaudio-module-xrdp> for more information.

Alternatively, you should be able to use pipewire with xrdp at <https://github.com/neutrinolabs/pipewire-module-xrdp>. However, at the time of this writing it has not seen an update in 9 months. So this method will probably only work with fedora or debian based systems.

## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
