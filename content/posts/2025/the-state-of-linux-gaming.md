---
title: "The State of Linux Gaming"

date: 2025-01-07
url: /the-state-of-linux-gaming/
image: images/2024-thumbs/the-state-of-linux-gaming.jpg
categories:
  - Linux
tags:
  - steamos
draft: true
---
SteamOS 3.0 may NEVER get a widespread release. However, what valve is doing and what others in the space are doing are more important.
<!--more-->

## SteamOS never getting general release

This is a real possibility after the disaster that was SteamOS 2.0. The problem non-technical people do NOT understand is that Linux is not an everything platform when it comes to gaming. You need to be specific in your hardware and I would NOT install Linux on every piece of hardware I own, because of compatibility issues. Valve realized this with the last release and I doubt they want to support all the different configurations of Linux which is frankly impossible. 

Why is it impossible? Lets walk through a bunch of scenarios to illustrate this:

- Xorg vs Wayland - Which renderer are they using? The entire linux desktop ecosystem is still split. 
- nVidia issues - Tackling the nVidia problems and integrations in Linux is rarely done well, but valve would have to deal with this headache as well. Drivers do NOT work the same way on Linux and are baked in to the kernel instead of tacked on additions like in Windows. Right now, Valve only is working with AMD since their drivers are open source and nVidia's open source driver is very young and not nearly as good. 
- Desktop Environment choices - Each desktop environment has its own configuration and varying levels of customizations. Could you imagine trying to support that? SteamOS right now only runs KDE in desktop mode and SteamOS gaming mode. 
- Incompatible Hardware - There is a variety of hardware that does NOT work. Specifically, NEW hardware is a massive problem in Linux. A brand new AMD card usually has a lot of issues on launch day if it works at all. Then there is obscure hardware people use that requires firmware that can also lead to issues.
- Games and Hardware are BUILT with Windows or MacOS in mind. This will ALWAYS mean Linux has to be behind these platforms. Windows will ALWAYS be the leader while the games are built for it and the Hardware will always be tested for it because of this. This isn't changing anytime soon, but maybe in the distant future.

You can expand these issues in to their own sub-categories, but you get the idea. It is NOT in Valves interest to release SteamOS 3.0 for any desktop. Could you imagine walking through your friend on any of the issues I laid out above. Valve also needs to develop support for other launchers like Epic or bundle Heroic Launcher in... which will be a cold day in hell when that happens. 

## SteamOS Future

Expanding the hardware support for select handhelds is happening beyond Valve's product offering. This will be massive for everyone. It increases adoption and gives a reliable experience. The beauty of SteamOS is people do NOT need to know they are in Linux. It offers the plug and play experience that is better than Windows when it works. The marketshare will keep increasing and is becoming something that game makers can NOT ignore. However, the weak spots of Linux are always present, but keep getting better each passing year. The main issues are modding games, non-steam games, and anti-cheat competitive games. These issues I do not think will ever get solved completely or de-throne Windows as the Gaming powerhouse it is. 

It also can NOT be understated that the contributions of Valve to the Linux gaming community are immeasurable with Proton, dealing with publishers, and the general push for overall Linux adoption! This is why we will never see a general release of SteamOS, but it won't matter as these contributions keep pushing the community forward.

## SteamOS Alternatives

- Bazzite - This universal blue spin is a lot like SteamOS, but a lot more flexible. It's team is working hard to implement the things valve will not and never will. Universal launcher support, nVidia support, and many others. While it isn't a perfect experience you'd have to be woefully ignorant to choose SteamOS over a Bazzite install.

There are others mentioned around the web in other youtuber videos like HoloISO (End of Life as of April of 2024), Chimera, WinesapOS (Portable SteamOS), but Bazzite is the standout with its consistency and team behind it. The structure being built in an Atomic system strikes an amazing balance of flexibility and stability that is needed in a desktop system. Check out that video here:

## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
