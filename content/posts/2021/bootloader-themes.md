---
title: "GRUB Bootloader Themes"

date: 2021-03-01T14:53:09-06:00
url: /bootloader-themes/
image: images/2021-thumbs/bootloader-themes.webp
hidden: false
categories:
  - Linux
tags:
  - Ubuntu
---
Give the GRUB boot menu a complete visual overhaul with eight themes ranging from clean and minimal to retro games and hacker-inspired interfaces.
<!--more-->

## Quick install

This collection is for Linux systems that already use GRUB 2. You need Git, `sudo` access, and a working internet connection.

```bash
git clone https://github.com/christitustech/bootloader-themes
cd bootloader-themes
sudo ./install.sh
```

Choose a theme from the interactive menu, let the installer rebuild the GRUB configuration, and reboot to see it. You can rerun `sudo ./install.sh` whenever you want to switch themes.

The project and current installer are available at [ChrisTitusTech/bootloader-themes](https://github.com/christitustech/bootloader-themes).

> The installer runs as root and changes bootloader configuration. Confirm that your system uses GRUB, review `install.sh`, and keep bootable recovery media available before changing any boot configuration.

## What the installer changes

The script does more than copy a background image. It:

- Creates an initial backup at `/etc/default/grub.bak` if one does not already exist.
- Copies the selected theme into `/boot/grub/themes/`.
- Sets `GRUB_TIMEOUT_STYLE` to `menu` and the timeout to 60 seconds.
- Points `GRUB_THEME` at the selected theme and sets `GRUB_GFXMODE` to `auto`.
- Regenerates the GRUB configuration with the command available on your distribution.

The collection contains snapshots of community themes. Check each linked upstream project when you want the newest version or theme-specific customization options.

## Included themes

| Theme | Style | Good choice when you want |
| --- | --- | --- |
| CyberRe | Red and cyan futuristic HUD | A bold, high-contrast boot screen |
| Cyberpunk | Neon game-inspired interface | Colorful menus with operating-system icons |
| Fallout | Green retro terminal | A Pip-Boy-style boot experience |
| Vimix | Clean dark minimalism | A polished theme that stays out of the way |
| Shodan | Dark data-stream interface | A minimal hacker and terminal aesthetic |
| DedSec | Watch Dogs-inspired hacker UI | A detailed 1080p menu and broad icon support |
| Minegrub | Minecraft main menu | A playful, game-inspired boot screen |
| BSOL | Blue Screen of Life | A Windows blue-screen parody with modern fonts |

### CyberRe

![CyberRe GRUB theme with a red and cyan futuristic interface](/images/2021/02-bootloader/cyberre.webp)

CyberRe frames the operating-system list inside a futuristic control panel. Its red highlights, cyan system details, and large selection area make it one of the most visually dramatic options in the collection.

Upstream theme: [CyberRe on GNOME-Look](https://www.gnome-look.org/p/1420727/)

### Cyberpunk

![Cyberpunk GRUB theme with a neon operating-system menu](/images/2021/02-bootloader/cyberpunk.webp)

Cyberpunk uses a neon yellow selection bar, a blue menu frame, and game-inspired background art. The included icon set covers many Linux distributions as well as Windows, macOS, recovery tools, and other boot entries.

Upstream theme: [Cyberpunk on GNOME-Look](https://www.gnome-look.org/p/1429443/)

### Fallout

![Fallout GRUB theme styled like a green monochrome terminal](/images/2021/02-bootloader/fallout.webp)

Fallout recreates the green monochrome look of a Vault-Tec terminal, complete with scan lines, a Vault Boy graphic, and distribution-specific icons. It is easy to read while still looking completely different from stock GRUB.

Upstream theme: [Fallout on GNOME-Look](https://www.gnome-look.org/p/1230882/)

### Vimix

![Vimix GRUB theme with a clean dark laptop interface](/images/2021/02-bootloader/vimix.webp)

Vimix is the understated option. It combines a dark centered menu, subtle geometric artwork, and recognizable operating-system icons without making the boot screen feel busy.

Upstream theme: [Vimix on GNOME-Look](https://www.gnome-look.org/p/1009236/)

### Shodan

![Shodan GRUB theme with a dark data-stream background](/images/2021/02-bootloader/shodan.webp)

Shodan places a compact green terminal menu over a dark data-stream background. It works well for anyone who wants a Matrix-like or cybersecurity aesthetic with a simple text-focused menu.

Upstream theme: [Shodan on GNOME-Look](https://www.gnome-look.org/p/1251112/)

### DedSec

DedSec is inspired by the fictional hacker collective from the Watch Dogs games. The bundled 1080p layout includes a dark menu, custom fonts, a progress bar, and icons for a wide range of Linux distributions and boot tools.

Upstream theme: [VandalByte/dedsec-grub2-theme](https://github.com/VandalByte/dedsec-grub2-theme)

### Minegrub

Minegrub recreates the Minecraft main menu with block textures, Minecraft-style fonts, splash text, and a "Joining world" boot countdown. The bundled layout is tuned for four boot entries; if its bottom bar overlaps your menu, adjust the documented position in the installed `theme.txt` file.

Upstream theme: [Lxtharia/minegrub-theme](https://github.com/Lxtharia/minegrub-theme)

### BSOL

BSOL stands for Blue Screen of Life. It turns the familiar Windows blue-screen visual language into a clean GRUB menu with Victor Mono fonts, a large countdown, and extensive operating-system icon coverage.

Upstream theme: [harishnkr/bsol](https://github.com/harishnkr/bsol)

## Restore the previous GRUB configuration

If you need to undo the configuration changes, first confirm that the installer-created backup exists, then restore it:

```bash
sudo cp /etc/default/grub.bak /etc/default/grub
```

Regenerate the boot configuration with the command for your distribution:

```bash
# Debian and Ubuntu
sudo update-grub

# Arch and distributions using /boot/grub
sudo grub-mkconfig -o /boot/grub/grub.cfg

# Fedora, openSUSE, and distributions using /boot/grub2
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

Reboot after the command completes successfully. If your distribution stores `grub.cfg` somewhere else, use its documented path instead of guessing.

## Video walkthrough

{{< youtube "BAyzHP1Cqb0" >}}
