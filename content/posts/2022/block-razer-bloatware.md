---
title: "Block Razer Bloatware"

date: 2023-01-02
url: /block-razer-bloatware/
image: images/2022-thumbs/block-razer-bloatware.jpg
categories:
  - Windows
tags:
  - Razer
draft: false
---
This script is made due to the frustration of the bloatware that gets install for all Razer devices.
<!--more-->

## The Problem

 The hardware works fine without any software and just installing the BASE synapse software it runs almost 500 MB installer that has 3 services and 15 RUNNING PROCESSES! This gets worse the more software you select past Synapse. The worst part about all this? It auto-installs when you plug in ANY Razer USB product. It is classified as malware because the hardware doesn't need it AND it slow yours your computer down.

![](/images/2022/block-razer-bloatware/bloatware.png)

## The Solution

I've developed a simplistic approach, but may need to expand when Razer learns of this project. This script, locates the installer folder and deletes it while protecting from being written to again. This prevents the hardware from running Razer installers.

GitHub Project: <https://github.com/ChrisTitusTech/block-razer>

One line Script: (Run As Administrator in Powershell)

```
irm https://raw.githubusercontent.com/ChrisTitusTech/block-razer/main/block.ps1 | iex
```

## Walkthrough Video

{{< youtube 11111111 >}}
