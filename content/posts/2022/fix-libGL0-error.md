---
title: "Fix LibGL Errors"

date: 2022-09-08
url: /fix-libGL-errors/
image: images/2022-thumbs/fix-libGL-error.webp
categories:
  - Linux
tags:
  - Ubuntu
  - Debian
draft: false
---
I recently had a debian install where Steam would not launch. Here is how I fixed it when it.
<!--more--> _Note: This is for nVidia based GPU systems_

## Error Screen

![libGL-error](/images/2022/fix-libGL-error.webp)

`You are missing the following 32-bit libraries, and Steam may not run: libGL.so.1`

## Packages Required

These packages are missing and will fix the above error.

```
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt install libgl1-mesa-dri:i386 libgl1:i386
sudo apt-get upgrade steam -f
sudo apt install nvidia-driver-libs:i386
```

## Launch Steam

You now can launch steam and have it launch properly. 