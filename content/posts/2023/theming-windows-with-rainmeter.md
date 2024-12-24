---
title: "Theming Windows With Rainmeter"

date: 2023-01-25
url: /theming-windows-with-rainmeter/
image: images/2023-thumbs/theming-windows-with-rainmeter.webp
categories:
  - Windows
tags:
  - Rainmeter
draft: false
---
Rainmeter has some amazing themes, but this shows you methods to get a TRULY different look!
<!--more-->

## Removing the Taskbar

The taskbar is often in the way of a clean looking desktop and we can remove it for those minimalists out there.

- Use NirCMD <https://www.nirsoft.net/utils/nircmd.html>
- Download NirCMD <https://www.nirsoft.net/utils/nircmd-x64.zip>

This command line tool allows us to modify Windows in ways that we normally aren't able to. Launch the `nircmd.exe` file and it will ask to copy itself to the Windows directory.

**Note: Auto-hide taskbar BEFORE removing it!**

Command to "remove" the taskbar

```
nircmd.exe win trans class Shell_TrayWnd 256
```

Command to restore the taskbar

```
nircmd.exe win trans class Shell_TrayWnd 255
```

## Install Rainmeter

Official Site: <https://www.rainmeter.net/>

Download and install from mainpage or use Winget (below).

```
winget install -e Rainmeter.Rainmeter
```

## Rainmeter Skins

There are multiple download sites for Rainmeter skins, but here are some that I use. 

- [Rainmeter DeviantArt group](https://www.deviantart.com/rainmeter) (downloads require an account)
- [Rainmeter forums](https://forum.rainmeter.net/viewforum.php?f=27)
- GitHub [#rainmeter-skin topic](https://github.com/topics/rainmeter-skin)

## Using Rainmeter Skins

After you download the skin that includes the `*.rmskin` file. You install it by opening it. _(Note: Some skins are inside zip files and require extraction of the rmskin file.)_

Enable the components you want and edit the ini files to your needs. 

## Issues

Rainmeter has been around since 2001! This means a lot of skins are out of date. A common bug I see with themes is they use an old weather API which is no longer open. This means most of the weather widgets do NOT work! Keep this in mind when using old skins that haven't been updated in years.

There's a non-exhaustive list of [working weather skins](https://forum.rainmeter.net/viewtopic.php?f=13&t=34689) on the Rainmeter forum.

## Walkthrough Video

{{< youtube WROzWPK3iw8 >}}
