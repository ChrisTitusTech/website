---
title: "Making the Perfect Phone"

date: 2022-10-10
url: /making-the-perfect-phone/
image: images/2022-thumbs/making-the-perfect-phone.webp
categories:
  - Android
tags:
  - Pixel 4a
draft: false
---
I've been using a dumbphone for the past month and I see now all the things I've been missing in Life. However, dumb phones are far from perfect and there are many things that can be fixed to make the perfect phone.
<!--more-->

## The Overview

The problem with many "smartphones" of today is they do too much! Having the world of possibilities in your pocket can not only be distracting but can actively sabotage your life. The notifications or you actively avoid real life situations, because you use your phone as a crutch. 

This is why you see the rise of the "dumbphone", but these devices are far from perfect. I've used one for the past month and the amount of productivity I've gained is astonishing. However, it is not without it's problems. 

My dumbphone issues:
- Mobile orders (I had a buffalo wild wings want to see my order # on my phone before they would give me my to-go order.)
- Navigation (Go old school with printed maps or simply have a GPS in your car)
- Uber / Lyft (These apps are life savers when visiting somewhere and you need to be picked up)
- Group Messaging (Depending the phone you picked, you may lose this ability. Mine couldn't do group messages or gifs)
- Workout Apps
- Camera and Photos
- Music Player (YT Music / Spotify)

Even with losing ALL of this... I still preferred the dumbphone experience because of how much it improved my life. It rewired my brain to really focus on the things that the smartphone does well and if I modified it to only do those things... It would be the PERFECT PHONE!

So what ARE the problems with smartphones?
- Web Browsing (Having this seems like a pro, but often we rely on this to look up everything and its more of a con in my experience) 
- Social Media (Time wasters... need I say more?)
- Social Crutch (Elevators, Waiting Rooms, and many more... The addiction is REAL!)
- Low Battery Life ( 1-2 days... but this is from bloat and constantly picking it up.)
- YouTube / YouTube Studio (This is mainly for me, but these apps cost me so much time.)
- Email (Checking email through your phone is a massive productivity loss and frankly unprofessional)

This isn't that bad as you really are only giving up two things... Being bored and productivity. Right?

To Simplify why those things are so important:
- Being Bored = Creativity Fuel
- Productivity = Realizing your potential

## The Solution

Make the Smartphone only do the things that HELP YOU! Debloating your phone will extend your battery life and keep you from launching into the time wasting apps. The easiest way of doing this is with a fantastic project called [Universal Android Debloater](https://github.com/0x192/universal-android-debloater). 

This makes it extremely easy to debloat your entire device in a single click. 

## Pre-Requisites

You will need the following installed on your computer:
- ADB tools (XDA Developers has a fantastic article going over this: [ADB Tool Installation Guide](https://www.xda-developers.com/install-adb-windows-macos-linux/)
- Developer Mode (Simply click 7-times on the about in your phone to enable developer mode)

### ADB Tool Install Cheatsheet

Debian Linux
```
sudo apt install android-sdk-platform-tools
```

Windows

- Download [ADB Platform Tools](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)
- Extract Tools to `C:\Windows` _(This allows you to run adb.exe and fastboot.exe from anywhere)_
- Install drivers for your phone - [Install Android Device Drivers](https://developer.android.com/studio/run/oem-usb#Drivers)

MacOS

```
brew install android-platform-tools
```

## Install Universal Android Debloater

From your command line interface (terminal, powershell, etc.) type `adb devices`

Verify your phone is seen

Now download the release from their GitHub <https://github.com/0x192/universal-android-debloater/releases>

Then launch the program

![uad](/images/2022/android/uad.webp)

## Usage

As a minimalist I recommend starting with removing ALL the recommended packages. Simply select all with the following recommended settings at the top.

![select](/images/2022/android/select.webp)

Then add back in any google related packages you might use while keeping your phone slimmed down. I only kept these 4 packages from the recommended settings after I finished.

![final](/images/2022/android/final.webp)

Since I was using a Pixel 4a for my main device I also needed to change the default launcher to a more minimal one. Pixel launcher is problematic because of all the dependencies it has. I highly recommend [Niagara launcher](https://play.google.com/store/apps/details?id=bitpit.launcher&hl=en_US&gl=US). 

## The Final Product

After the debloat and changing my launcher, this is what my phone looks like now. 

![home](/images/2022/android/home.webp)

## Walkthrough Video

{{< youtube MFbXFG2xDJI >}}
