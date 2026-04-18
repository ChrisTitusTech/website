---
title: "Resolve Linux 2026"

date: 2026-04-18
url: /resolve-linux-2026/
image: images/2026-thumbs/resolve-linux-2026.webp
categories:
  - Linux
tags:
  - Resolve
draft: true
---
Here is my setup to get resolve working in Arch Linux in 2026.
<!--more-->

## Before you start

There are some very "Linuxy" things you need to do before you can get resolve working.

- opencl must be working, and you need to have the opencl headers installed and test with `clinfo`
- AAC is not supported (Re-encode to AC3, Opus, PCM, etc.) I love opus and its better than AAC
- Resolve Studio is needed for MP4 and x264/x265 which you will need, you also get plugin support

## Installation

### OpenCL Installation

AMD Cards:

```
sudo pacman -S rocm-opencl-runtime
```

Intel (integrated/Arc):

```bashsudo pacman -S intel-compute-runtime```

NVIDIA:

```
sudo pacman -S opencl-nvidia
```

### Library Dependency Problems

## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
