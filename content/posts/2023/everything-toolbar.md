---
title: "Replace Windows Search"

date: 2023-01-18
url: /everything-toolbar/
image: images/2023-thumbs/everything-toolbar.jpg
categories:
  - Windows
tags:
  - Everything
draft: false
---
Everything Search is faster, more efficient, and a better Windows Search. This guide shows you how to setup everything and a toolbar for quick access.
<!--more-->

## Installation

Everything Search Official Download Site: <https://www.voidtools.com/downloads/>

Powershell Install:

```
choco install Everything
```
OR
```
winget install voidtools.Everything
```

### Everything Toolbar

Getting the right version of everything toolbar is important. Version 0.8+ (Currently Beta ONLY) is compatible with Windows 11 and The official everything toolbar version 0.7.4 or earlier will ONLY work with Windows 10. 

Download the beta at: <https://github.com/stnkl/EverythingToolbar/releases>

OR

```
winget install stnkl.EverythingToolbar.Beta
```

For earlier versions (Windows 10 ONLY)

Download the stable release at: <https://github.com/stnkl/EverythingToolbar/releases> 

```
choco install everythingtoolbar
```

OR

```
winget install stnkl.EverythingToolbar
```

## Disable Windows Indexer

Easiest way to disable indexing and the performance hog that it is. Disable the service!

Open Run command: Right-click start button and select run

![](/images/2023/everything-toolbar/run.png)

Disable the Service by stopping and disabling it

![](/images/2023/everything-toolbar/service.png)

## Walkthrough Video

{{< youtube "6Xg-BRA3rgQ" >}}
