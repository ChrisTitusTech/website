---
title: "GlazeWM Tiling Window Management"

date: 2024-04-13
url: /glazewm-tiling-window-management/
image: images/2024-thumbs/glazewm-tiling-window-management.jpg
categories:
  - Windows
tags:
  - GlazeWM
draft: false
---
GlazeWM is a powerful tiling window manager for Windows, designed to enhance productivity by allowing users to efficiently manage their windows and workspaces through keyboard-driven commands. This guide will walk you through the installation process and introduce you to some of the most commonly used hotkeys in GlazeWM.<!--more-->

## Installation

There are several methods to install GlazeWM, ensuring flexibility depending on your preferences or requirements.

### Direct Download

The simplest way to get GlazeWM up and running is by downloading the latest executable from the [releases page](https://github.com/glzr-io/glazewm/releases). No installation is necessary; just run the `.exe` file.

### Winget

For those who prefer package managers, GlazeWM can be installed via Winget with the following command:

```
winget install glazewm
```

## Hotkeys

GlazeWM offers a variety of hotkeys to streamline your workflow. Here are some of the most essential ones:

- **Alt + Arrow Keys**: Move focus between windows
- **Alt + Shift + Arrow Keys**: Move the focused window in the direction of the arrow keys
- **Alt + Number**: Switch to a specific workspace (e.g., Alt + 1 for workspace 1)
- **Alt + Shift + Number**: Move the focused window to a specific workspace

These hotkeys are customizable, and users are encouraged to tailor them to their specific needs through the GlazeWM settings.

### Official Hotkey Maps

Alt Hotkeys

![GlazeWM Hotkey Maps](https://user-images.githubusercontent.com/34844898/194635035-152ed4a6-e5a1-4878-8863-f62391e7d703.png)

Alt+Shift Hotkeys

![GlazeWM Hotkey Maps2](https://user-images.githubusercontent.com/34844898/194635089-d5ed152b-1527-43e8-a69c-4e154b97a207.png)

### Custom Hotkeys

I made some modifications based on the programs that I use all the time. Here are the ones I use the most:

```
keybindings:
  - command: "exec 'C:\\Program Files\\Thorium\\Application\\thorium.exe'"
    bindings: ["Alt+B"]
  - command: "exec wt"
    bindings: ["Alt+X"]
  - command: "exec explorer"
    bindings: ["Alt+E"]
  - command: "exec '%LOCALAPPDATA%\\Programs\\cursor\\Cursor.exe'"
    bindings: ["Alt+W"]
```

### Personal Config

My doesn't change that much from the default but I do have a few changes to the workspace layout. Mainly I hate the massive gaps by default. Here is a link to my config file:

[Raw Config File](https://raw.githubusercontent.com/ChrisTitusTech/glazewm/main/config.yaml)

## Livestream using GlazeWM

GlazeWM work starts at [33:35](https://youtu.be/mJqNBBSViDU?si=3hZKYYp3kOJ3ZILG&t=2015)

{{< youtube mJqNBBSViDU >}}

## Walkthrough Video

{{< youtube 0I8HyVMKEeo >}}
