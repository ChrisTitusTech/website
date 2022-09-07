---
title: "Fix LibGL0 Error"

date: 2022-08-16
url: /fix-libGL0-error/
image: images/2022-thumbs/fix-libGL0-error.jpg
categories:
  - Linux
  - Windows
  - Networking
tags:
  - Ubuntu
draft: true
---
<!--more-->

{{< tweet user="christitustech" id="1550918768334979078" >}}

```
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt install libgl1-mesa-dri:i386 libgl1:i386
sudo apt-get upgrade steam -f
sudo apt install nvidia-driver-libs:i386
```