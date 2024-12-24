---
title: "My New Desktop Hyprland"

date: 2023-01-23
url: /my-new-desktop-hyprland/
image: images/2023-thumbs/my-new-desktop-hyprland.webp
categories:
  - Linux
tags:
  - Hyprland
draft: false
---
Hyprland is an amazing desktop that feels amazing. Here is my current setup that is being made.
<!--more-->

_Please Note: This is beta and not for a beginner. You WILL encounter bugs!_

# The Desktop

![Screenshot](https://github.com/ChrisTitusTech/hyprland-titus/raw/main/hyprland-titus.webp)

GitHub Project: <https://github.com/ChrisTitusTech/hyprland-titus>

## Install

### Yay

Run as user NOT ROOT!

```
git clone https://aur.archlinux.org/yay-bin
cd yay-bin
makepkg -si
```

### Packages

```
yay -S hyprland-bin polkit-gnome ffmpeg neovim viewnior       \
rofi pavucontrol thunar starship wl-clipboard wf-recorder     \
swaybg grimblast-git ffmpegthumbnailer tumbler playerctl      \
noise-suppression-for-voice thunar-archive-plugin kitty       \
waybar-hyprland wlogout swaylock-effects sddm-git pamixer     \
nwg-look-bin nordic-theme papirus-icon-theme dunst otf-sora   \
ttf-nerd-fonts-symbols-common otf-firamono-nerd inter-font    \
ttf-fantasque-nerd noto-fonts noto-fonts-emoji ttf-comfortaa  \
ttf-jetbrains-mono-nerd ttf-icomoon-feather ttf-iosevka-nerd  \
adobe-source-code-pro-fonts
```

## Workarounds that need to be addressed

- Recommend archinstall with Sway as desktop for base
- SDDM-GIT is required or you will run into shutdown bugs and delays
- SDDM needs to be configured for autologin (recommend using swaylock on start of script for security)
- Replace xdg-desktop-portal-wlr with **[xdg-desktop-portal-hyprland-git](https://wiki.hyprland.org/hyprland-wiki/pages/Useful-Utilities/Hyprland-desktop-portal/)**

## Bugs

- Hyprland is still in beta (0.2) as of the creation of these dot files
- Sometimes my RX5700XT goes to sleep and requires a reload, because it is stuck on black screen.

## Work In Progress

- [ ] Help Popup with Hotkey
- [ ] Wayland guide for nwg-look, wlr-randr, etc.
- [ ] Synergy Workaround - Looking at waynergy or just using KVM
- [ ] Gamescope Addition - Adding more parity with Steamdeck features
- [X] More Customizations for Waybar - Battery, Backlight, etc.
- [ ] Auto-configuration - Long term goal

## Sources used making these

- Official Hyprland Github <https://github.com/hyprwm/Hyprland>
- Linux Mobiles Hyprland dot files <https://github.com/linuxmobile/hyprland-dots>

## 4 Hour Live Stream Attempt

{{< youtube sDmLCBI9L4E >}}

## Walkthrough Video

{{< youtube wNL6eIoksd8 >}}
