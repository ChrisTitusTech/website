---
title: "Should you switch from Windows 10 to Windows 11"

date: 2022-09-21
url: /win10-to-win11/
image: images/2022-thumbs/win10-to-win11.jpg
categories:
  - Windows
tags:
  - Windows 10
  - Windows 11
draft: false
---
The question isn't if you should switch, but if you CAN switch. Windows 11 does a lot of things right as most of it's systems are identical to 10. However, there are some drawbacks which we need to dive into.<!--more-->

## Windows 11 Requirements
There are two issues with Windows 11 that will catch some older computers.

- CPU Requirement: Intel 8th Generation and AMD 2nd Generation
- UEFI Secure Boot with TPM 2.0 Chip

However, these requirements are artificial and can easily be bypassed. With these Steps:

1. Launch Command Prompt with Shift + F10
2. Type `regedit` and launch Reg Editor
3. Add the following KEY (folder) HKEY_Local_Machine -> System -> Setup --- Name the key `MoSetup`
4. Add the following Value (DWORD) Name = `AllowUpgradesWithUnsupportedTPMOrCPU`
Value = `1`
5. Close Regedit and continue install

## Why Upgrade
Here are the main reason to upgade to Windows 11. **The Look**

We can go round and round about the marketing of Microsoft and all the bullshit they like to say. However, at the end of the day if you want a new look and a cleaner looking OS... Windows 11 is it. The better sounds, rounded aesthetic, auto-hdr for games, and overall more cohesive visual experience is what Windows 11 does well. 

What about all the other features Microsoft shills say are important and are NOT?

1. Performance - I have seen negligible performance gains and even worse performance in some instances
2. Widgets - This just reminds of Vista sidebar all over again. They are all sizzle and no steak.
3. Security - Another marketing ploy that promotes it being more secure. While technically true, it mainly applies to the startup of your pc with TPM and Secureboot. Which frankly, doesn't matter as I can easily crack your Windows security with it's terrible SAM file exploits that are well documented and present in Windows 11. 
4. Teams colloboration - Just more pre-installed crap that you probably won't use. 

These are all just meh points that I view the exact same as Windows 10. 

## Why NOT to Upgrade
Windows 11 may look objectively better, but there are also some downsides. Here are the big ones I hate.

1. Taskbar - It is just plain awful as it is based on a new UWP platform that isn't nearly as good as 10's taskbar. Also you can't move it to the left, right, or top like you can in 10.
2. Context Menu - The new look might look cleaner, but is far less functional. I'm working on a tweak to revert this back to the windows 10 menu
3. Changing Default Apps is awful in Windows 11. Everything is extension based now, where it is program based in Windows 10.
4. Windows 10 still has support until 2025, so don't be in a rush to switch.

## Walkthrough Video

{{< youtube WBrh-9BdGVQ >}}
