---
title: "How I Switched to Linux"

date: 2026-01-15
url: /how-i-use-linux/
image: images/2026-thumbs/how-i-use-linux.webp
categories:
  - Linux
tags:
  - switchtolinux
draft: false
---
Over the past 8 years I have used Linux desktop as my primary daily use PC. Before then I used Windows since the 3.11 release back in the early 90s. As someone with over 10 professional Windows certifications and 20+ years as a Windows power user, the transition wasn't easy—but it was worth it.
<!--more-->

## The First Year

This was well documented on my youtube channel. I had various distro challenges that lasted 10-30 days, where I constantly distro-hopped between different Linux distributions trying to find the "perfect" setup.

<https://www.youtube.com/playlist?list=PLc7fktTRMBoxZMG1YlLdBI0oiJZ8iqIP5> - Switching to Arch Linux first 10 days
<https://www.youtube.com/playlist?list=PLc7fktTRMBozmc1_9kEmgxYo0jIdsiz7w> - Switching to Ubuntu first 30 days

The TLDW of all those challenge and the problems I had:

### Too Many Distros - Focus on Features Instead

The biggest mistake I made was choosing distributions based on aesthetics rather than functionality. I quickly learned that distributions don't matter nearly as much as the components you choose:

- **Desktop Environments** (Gnome, KDE, XFCE, etc) - These define the look and feel of your system, and you can swap them out without reinstalling your entire OS
- **File Managers** (Nautilus, Dolphin, Thunar, etc) - I discovered Thunar from XFCE and still use it today, even though I don't use XFCE as my desktop environment
- **Mix and Match Philosophy** - Linux allows you to cherry-pick components from different desktop environments. You're not locked into an ecosystem like Windows or Mac

### Using FOSS Programs vs Trying to Use WINE

One of my hardest lessons was accepting that not everything from Windows translates well to Linux:

- **Windows-Only Programs** - If you rely heavily on Adobe products or Microsoft Office professionally, Linux might not be your best choice. After years of experience, I can confidently say Mac or Windows serves these users better
- **WINE Limitations** - While Wine and similar tools exist, trying to emulate Windows programs often leads to frustration and poor performance
- **The Hard Truth** - Linux folks will tell you "everything just works," but that's not reality. Accept what works natively and plan accordingly

### Gaming and Mods

Gaming on Linux has come a long way since 2018 when I started:

- **Steam Proton Revolution** - When I began in 2018, Steam was just launching Proton compatibility. Today, most games work out of the box
- **Mod Support Challenges** - Almost every game is made for Windows, so mods don't install the same way. You'll need Linux-specific tools and workarounds
- **My Gaming Evolution**:
  - 2023: 65% Windows, 32% Steam Deck, 2% Linux
  - 2024: 78% Windows, 12% Steam Deck, 9% Linux
  - 2025: 80% Linux, 12% Steam Deck, 10% Windows

The shift happened when I stopped playing heavily-modded games like Final Fantasy XI Online and games with desync issues on Linux. If you play older games or don't heavily mod, Linux in 2026 offers an excellent gaming experience.

**Check ProtonDB** before switching to see your game compatibility: <https://www.protondb.com>

## The Second Year and Beyond

After the initial learning curve, I focused on stability and simplicity rather than chasing the "perfect" distribution.

### Making My "Perfect Install"

I radically simplified my setup by stripping away unnecessary components:

- **No Desktop Environments** - I removed bloated desktop environments entirely. My current window manager binary is only 116KB
- **Sticking to the Big 3** - I only use Fedora, Arch, or Debian-based distributions. No more distro hopping every week
- **Window Managers Only** - I switched to lightweight window managers (i3wm, bspwm, dwm) that use minimal resources and rarely break during updates
- **Terminal-Based Configuration** - Everything I need is configured through the terminal, eliminating dependency conflicts and compatibility issues

**The Result**: My current Arch Linux installation has 628 days of uptime. By having less software installed, there's less that can break during updates. I can run system updates live on stream without worrying about breaking my system.

### Understanding Linux File Structure

Linux's file organization is far more logical than Windows, where programs can install in Program Files, Program Files (x86), ProgramData, AppData Local, AppData Roaming, or scattered registry entries.

Linux follows two simple rules:

- **User Configuration**: `/home/user/.config` - All your personal settings and configurations live here
- **System Configuration**: `/etc` - All system-wide settings live here
- **System Resources**: `/usr` - System binaries and shared resources
- **User Files**: `/home` - All your personal files and data

This standardization means you always know where to find configurations, making troubleshooting and backups significantly easier. About 90% of all software follows this convention.

### Dual Boot vs Virtual Machines vs WSL

After 8 years, here's what works best for different scenarios:

#### Dual Boot for Performance and Gaming

- **Two Hard Drives Recommended** - Install Windows and Linux on separate drives to avoid bootloader conflicts
- **Installation Order Matters** - Always install Windows first, then Linux second
- **Windows Update Warning** - Windows updates can occasionally break your Linux bootloader. Separate drives minimize this risk
- **Best For**: Gaming performance, professional work requiring Windows-specific software

#### Virtual Machines for Windows Programs

- **Highly Optimized on Linux** - Linux VMs can be incredibly performant, much more so than Windows-based VMs
- **Seamless Integration** - I run Windows VMs so well that most viewers don't realize I'm not on native Windows
- **GPU Passthrough** - You can pass through hardware directly to VMs for near-native performance
- **Best For**: Occasional Windows software use, development work, testing

I use VMs extensively for my Windows utility development. Most people watching my content think I'm a Windows user, but I'm actually running everything in a highly optimized VM on Linux.

#### WSL for Linux on Windows

- **Occasional Command Line Use** - Good for Windows users who need occasional Linux terminal access
- **Not a Full Linux Experience** - Limited compared to native Linux or dual boot
- **Best For**: Developers who primarily use Windows but need Linux tools

### Linux Hardware Matters

Hardware compatibility can make or break your Linux experience. Here's what you need to know:

#### NVIDIA vs AMD

**AMD Graphics**:
- Drivers built directly into the Linux kernel
- No extra modules or installation required
- Better out-of-the-box experience for most users
- Fewer update-related issues
- **Best for gamers** who want hassle-free compatibility

**NVIDIA Graphics**:
- Requires proprietary kernel modules
- Installation needed (not built-in)
- Can break during kernel updates (system won't boot or no video output)
- Better performance for productivity work (DaVinci Resolve, AI/ML workloads)
- **Best for professionals** doing GPU-intensive work

**The Bottom Line**: Both work, but AMD requires less maintenance and troubleshooting.

#### Monitor and Display Issues

Five years ago, most Linux systems used X.org, which had significant limitations:

**X.org Limitations**:
- No native Variable Refresh Rate (VRR) support
- Poor 4K support
- Screen tearing (requires manual configuration to fix)
- Older technology but still very stable

**Wayland Advantages**:
- Native VRR support
- Excellent 4K and multi-monitor support
- No screen tearing by default
- Modern replacement for X.org
- Most new desktop environments default to Wayland (Hyperland, GNOME 40+, KDE Plasma 6)

I still use X.org personally because it works for my setup, but most users today should choose Wayland for modern display features.

#### Third-Party Hardware Compatibility

- **Streaming Hardware** - Elgato capture cards and similar devices may have limited or no Linux support
- **Webcams** - Most work, but advanced features may not
- **Audio Interfaces** - Professional audio equipment varies in compatibility
- **RGB Peripherals** - Software like OpenRGB helps, but not all devices supported

#### Bleeding Edge Hardware Has Worse Support

**Important Reality Check**: If you buy the latest GPU or CPU on release day:

- **Arch Linux** - Will probably work, but performance may be suboptimal initially
- **6 Months Later** - Support and optimization typically catches up
- **Windows/Mac** - Always prioritized by hardware manufacturers
- **Research First** - Check Linux compatibility before buying new hardware

Linux hardware support is excellent for established hardware but lags behind for bleeding-edge releases. This is the trade-off for using an open-source ecosystem.

## My Current Setup

After 8 years of refinement, here's what I've settled on:

- **Distribution**: Arch Linux with CachyOS kernel (optimized for desktop performance)
- **Window Manager**: DWM (116KB binary managing my entire GUI)
- **File Manager**: Thunar (from XFCE)
- **Uptime**: 628 days on current install
- **Gaming**: 80% on Linux via Steam Proton
- **Windows Work**: Optimized VM for utility development
- **Update Frequency**: Weekly (sometimes monthly without issues)

The key to my stability is simplicity. Less software means fewer dependencies, fewer conflicts, and fewer things that can break during updates.

## Final Thoughts

Linux isn't for everyone, and that's okay. If you:

- Rely on Adobe Creative Suite professionally
- Need Microsoft Office (not LibreOffice alternatives)
- Play games with kernel-level anti-cheat
- Heavily mod games like Skyrim with hundreds of mods
- Want bleeding-edge hardware support on day one

Then Windows or Mac might serve you better, and there's no shame in that.

But if you:

- Value system stability and control
- Enjoy learning and tinkering
- Play mostly older or Steam-verified games
- Use open-source software
- Want a system that respects your choices

Then Linux can provide an incredible experience that only gets better with time.

My journey from Windows power user to Linux daily driver took patience, learning, and accepting limitations. But 628 days of uptime and counting? I wouldn't go back.

## Walkthrough Video

{{< youtube "EcKSdZ_ENeg" >}}