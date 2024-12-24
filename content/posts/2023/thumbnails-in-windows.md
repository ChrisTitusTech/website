---
title: "Thumbnails in Windows"

date: 2023-01-06
url: /thumbnails-in-windows/
image: images/2023-thumbs/thumbnails-in-windows.webp
categories:
  - Windows
tags:
  - Thumbnails
draft: false
---
The thumbnail system in Windows has 4 major configuration areas dating back to 2000. From thumbs.db files, checkboxes, group policy, and registry edits, the Windows thumbnail system is, like everything in Windows, old and layered.
<!--more-->

## Where are thumbnails stored?

**thumbs.db**

EVERY folder has this hidden file. It is a database of small images for that given directory. Delete it and it will replicate itself if there are files in that folder and you have NOT disabled thumbnails.

## How do I configure thumbnails?

> "Oh, how do I count the ways..."

Any one of the following options will cause thumbnails NOT to work. Genius design...

### File Options in File explorer

Make sure this option is UNCHECKED "Always show icons, never thumbnails" to DISPLAY thumbnails.

![](/images/2023/thumbnails-in-windows/file-options.webp)

### System Performance Options

Open up this old hidden panel `sysdm.cpl` using run and you can configure it here as well!

Make sure this one is CHECKED! "Show Thumbnails instead of icons". 

![](/images/2023/thumbnails-in-windows/system-options.webp)

### Group Policy

There are FOUR, yes, FOUR options to disable thumbnails in group policy. Launch it with `gpedit.msc` from Run.

Make sure these aren't configured:

![](/images/2023/thumbnails-in-windows/gpedit.webp)

### Registry

With every Windows option there is a corresponding registry entry.

The main one is in `HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced` with DWORD `DisableThumbnailCache` with value of `1`

Screenshot of `regedit`

![](/images/2023/thumbnails-in-windows/regedit.webp)

## Walkthrough Video

{{< youtube "JUEBG-_U1vc" >}}
