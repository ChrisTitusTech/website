---
title: "Debloat Android"
type: post
date: 2020-06-21T20:01:50-05:00
url: /debloat-android/
image: /images/2020-thumbs/debloat-android.jpg
categories:
  - Android
tags:
  - ADB
---
This article goes over using ADB Platform Tools and utilizing adb to uninstall packages by using these tools.
<!--more-->

## Pre-Requisites for Using ADB
Setup all of the following to use ADB

### Setup Computer with ADB Platform Tools
  - Windows Install with Chocolatey `choco install adb`
  - Linux Install with Terminal `sudo apt-get install android-tools-adb android-tools-fastboot`
  - MacOS Install with Homebrew
      - Homebrew install - `ruby -e “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
      - ADB Homebrew Install - `brew cask install android-platform-tools`

### Setup Phone for ADB Debugging
1. Open Settings, and select “About”.
2. Tap on “Build number” seven times.
3. Go back, and select “Developer options”.
4. Scroll down, and check the “Android debugging” or “USB debugging” entry under “Debugging”.
5. Plug your device into your computer.
6. On the computer, open up a terminal/command prompt and type adb devices.
7. A dialog should show on your device, asking you to allow usb debugging. Check “always allow”, and choose “OK”.
    - Note: If you don't see this prompt on you device change the usb connection to MTP or File Transfer on the device

## ADB Commands - These only work when device is booted
  - `adb devices` - shows all connected adb devices
  - `adb shell` - launches a shell on the device
  - `adb shell pm list packages` - list all installed packages on the device
  - `adb shell pm list packages -3"|cut -f 2 -d ":` - lists all user installed packages
  - `adb push <local> <remote>` - pushes the file <local> to <remote>
  - `adb pull <remote> [<local>]` - pulls the file <remote> to <local>. If <local> isn’t specified, it will pull to the current folder.
  - `adb logcat` - allows you to view the device log in real-time. You can use adb logcat -b radio to view radio logs, and adb logcat -C to view logs in colour
  - `adb install <file>` - installs the given .apk file to your device
  - `adb uninstall com.packagename` - uninstalls package from shell pm list packages
    - *Note: if you encounter "[DELETE_FAILED_INTERNAL_ERROR]" type this to bypass:* `adb shell pm uninstall --user 0 <appname>`
  - `adb reboot` - reboots system
  - `adb reboot bootloader` - reboots to bootloader
  - `adb reboot recovery` - reboots into recovery mode
  - `adb reboot fastboot` - reboots into fastboot mode

## Fastboot Commands - These commands work when device is in Bootloader and Fastboot Mode
  - `fastboot devices` - shows all connected devices
  - `fastboot reboot` - reboots device - can add bootloader, recovery, and fastboot
  - `fastboot oem device-info` - shows oem bootloader status (unlocked or locked)
  - `fastboot oem unlock` - unlocks oem phones - *note: aosp and unlocked phones don't need this*
  - `fastboot flashing unlock` - unlocks system for custom rom in pixel and other phones
  - `fastboot flashing unlock_critical` - unlocks bootloader and system partitions - *note: this isn't generally needed*
  - `fastboot format:ext4 userdata` - format userdata on device - *note: this will erase your entire device*
  - `fastboot boot recovery.img` - test recovery image without flashing
  - `fastboot flash recovery recovery.img` - flash recovery image then run `fastboot reboot recovery` to boot into it. 
  - `fastboot flash boot boot.img` - flash boot image - this is the kernel
  - `fastboot -w` - wipes device
  - `fastboot update </path/to/your/Rom.zip>` - flashes zip to the device

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
