---
title: "Macos Sysadmin Tips"

date: 2020-12-14T17:25:22-06:00
url: /macos-sysadmin-tips/
image: images/2020-thumbs/macos-sysadmin-tips.jpg
categories:
  - macos
tags:
  - sysadmin
---
This comes from a reader that was a Sysadmin and transitioned from Linux to MacOS because of a visual impairment. <!--more-->He choose macOS because of it's screen reader and shared all these tips, which I found extremely valuable. Thank you Nik for sharing! It felt only right to share his thoughtful email with a lot of explanations that are hard to find on the net. 

## launchd

Launchd is Darwin/MacOS’s init system. The init portion of systemd is heavily modeled after launchd, but unlike systemd, launchd isn’t a monolithic system manager but only an init system. It's a relatively simple design that follows the unix philosophy. Any further functionality is implemented by daemons that can be disabled with a launchd override plist. 

For info how to use launchd, check the man pages and read this document from the documentation archive: https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/Introduction.html

You might also want to take a look at the launchd source code for a deeper understanding.

I use Xcode’s graphical plist editor to configure daemons because I find it less annoying than editing XML with vim, but there are also light weight plist editors that don't require you to start big ol Xcode every time you want to change something in a daemon.

Job scheduling can be done either with launchd's native tools or with cron.


## XNU

XNU is Darwin’s kernel. It has a fascinating design and I highly recommend reading the source code. It’s a hybrid kernel that uses the Mach microkernel as its foundation and adds a BSD layer derived from FreeBSD and NetBSD on top to provide UNIX functionality. They are slowly turning XNU into more of a microkernel by moving drivers into the userland.

The nvram utility can set bootflags. I generally run all my systems with verbose boot, and on some, I also tweak Mach scheduling. I also run a special bootflag on my (jailbroken) iPhone to keep kernel memory usage down so I can assign more memory to my phone’s needlessly complex launchd setup. You can find lists of bootflags with google, but might have to read kernel source code for the more obscure ones.

Kernel sources for macOS 11 have not been released yet, so I assume it is currently not possible to compile a custom kernel for the M1 due to lack of drivers, but I haven’t tried it. The documentation archive contains a detailed overview of the kernel, but some of the information is outdated by now: https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/KernelProgramming/About/About.html


## Smart Folders

You can save Finder searches as a so called smart folder, where the found files will be symlinked into the folder. This is useful for a lot of things, such as symlinking all files of a certain file format to the same folder, so you can have a Photos folder that will contain symlinks of all .png files on the system. The symlinks refresh automatically, so when ever you add a new .png somewhere to the filesystem, it would get symlinked to this folder.


## Automator and Folder Actions

You can create custom automation routines with automator. Automator also supports a variety of shell scripting languages such as Python or Bash. Automator actions can be used in a number of ways, such as an icon in your dock that runs the action on any file you drag onto it, or as a right click menu entry, or as a folder action. Folder actions bind automator scripts to folders and execute them on any file you put in the folder. You can for example combine the Bash support of Automator with ImageMagick or FFMPEG to automatically add watermarks to any photo or video you save to a specific folder.

Automator also supports AppleScript, which is kind of a weird and arcane language, but offers many UI automization capabilities, that I frequently bind to voice commands for disability accommodation. It also integrates voiceover's text-to-speech which I find incredibly useful to build notification systems for blind people. AppleScript functions can be called from Bash, so I usually just use Bash scripts and access AppleScript when I need it.

There is also a paid third party automization tool called Keyboard Maestro, that is supposedly better than Automator, but I don’t have any experience with it.


## Package Management

Pkgutil is Darwin’s native package manager. It does not support dependency resolution, and requires manual package removal, so it should only be used for things that you don’t want to uninstall like custom kernel extensions or patches. Darwin comes with the pkgbuild utility to create installable .pkg files from a root file structure, and can even build a customizable gui installer for them.

My package management workflow is as follows:

I use macports (an implementation of the BSD Ports System) for applications that have too many dependencies to build them manually.

I use xbps (from void linux) to build and manage packages of unix utilities that I want to use across multiple systems. This is the one I use most. I used to use pacman, but xbps integrates git nicely, so I can just run a git server as my personal binary package repo, and pacman was too much of a headache to compile for mac, frankly. I will probably eventually transition to using macports for custom packages too, but xbps just makes it incredibly easy to build packages, and I’m already experienced with it because of void linux.

I use pkgutil to build packages for kexts, launchd daemons and system tweaks that I want to use across multiple systems.

I use a program’s included makefile for utilities that I only want to use on the system that I’m compiling them on.

I’ve been considering building a custom binary package manager with Swift and plists to replace this workflow, but I don’t know if I’m actually gonna do that.


## Directory Structure

The system partition is mounted as read-only in more recent versions of macOS, but if you want to tweak lower level stuff, you can either temporarily mount the partition with write privs with the standard mount command while in recovery mode, or run ‘csrutil disable’ in the recovery mode terminal to disable read-only mounting entirely. But make sure you keep timeshift backups around if you’re gonna mess with the system partition. I do not recommend that you ‘debloat’ macOS, and instead use launchd overrides to disable things like Find My Mac. Deleted system apps will just be reinstalled during updates, and they aren’t wasting resources while they aren’t loaded, so you don’t have much to gain except a few more megabytes of ssd space. 

Enable hidden files with command + shift + . and explore the file structure.

User-installed unix utilities belong in /usr/local/bin.

/usr/bin contains the default tools. FreeBSD’s cpuctl is included and works with the M1. This can be useful to disable all CPU cores except one of the power saving cores, as a custom ultra-low power mode on MacBooks, but there is also a boot flag to disable CPU cores. Another useful one is firmwarepasswd to password lock the bootloader. I use that + full drive encryption on devices that I take through airports. You might also want to check out diskutil and its manpage for command line partition management.

/Applications contains your gui apps. You can drag this folder into your dock to get a much better grid view than launchpad, or right click on it to change it to a list view, which gives you something like the Windows 98 start menu. Applications are folders that you can explore by right clicking on them in finder or with the cd command. Applications don’t need to be in the /Applications directory to be run, so you can put them on an external drive. They will not show up in launchpad or the applications list in your dock if you place them somewhere else, but you can just symlink them from an external drive to /Applications. Spotlight will still be able to find apps even if they aren’t symlinked to /Applications. The Mac version of QuickTime is pretty great btw. The windows version has nothing in common with it except the name, so give it a chance if you were put off by your experience with it on windows.

/Library contains settings plists and libraries. A lot can be customized here so I recommend digging around. There is also a Library folder in /System for deeper configuration, and one in your home directory for user-specific tweaks.


## Window Management

I only ever use splitview for a terminal + safari combo, so I don't mind that it doesn't offer more complex tiling functionality, but there are a number of tiling window management plugins such as Yabai, amethyst or chunkwm. I don't have any experience with those because I was a CWM user on the *BSDs.

If you have a mouse with thumb buttons, I highly recommend going into System Preferences -> Mission Control and binding Mission Control to Mouse 4 and Application Windows to Mouse 5. All non-mini macs ship with either a touch pad or a mouse that has a touch surface, so where you would use gestures to control window management, but since you don't have that, it would be good to bind it to buttons instead. Mouse 5 will show you all windows of the currently active application, and mouse 4 will show you all windows and virtual desktops. You can also set up hot corners to emulate Gnome and KDE's window management.


## Safari Adblocking

I need to use Safari because it's the only browser with proper screen reader support. I like it over all for its performance, memory and battery efficiency, but an annoying issue is that there are no good adblockers for it because it restricts the level of access that extensions have to your traffic. AdGuard (not on the App Store) is a pretty decent alternative that works not only on MacOS but also Android and iOS and blocks ads systemwide, but a pihole would work too. I also run Little Snitch (also not on the App Store) for traffic monitoring.

## CTT Extra Content

- [ChrisTitus.com Downloads Section][1] (_CC Only_)
  1. Digital Downloads with Guides and Pre-Built Images
  2. Monthly Members Only Video
  3. $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  1. Monthly Members Only Video
  2. YouTube Emojis for Comments and Live Chat
  3. YouTube Badges that changes based on membership time for comments and chat.
  4. All YouTube comments are highlighted when I review comments daily. 
  5. $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join