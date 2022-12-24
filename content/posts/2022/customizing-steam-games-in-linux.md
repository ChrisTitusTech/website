---
title: "Customizing Steam Games in Linux"

date: 2022-12-28
url: /customizing-steam-games-in-linux/
image: images/2022-thumbs/customizing-steam-games-in-linux.jpg
categories:
  - Linux
tags:
  - Steam
draft: false
---
Installing steam games on Linux is easy but running executables inside those games to add mods, maps, and other Windows programs that enhance the gaming experience is essential. This guide shows you how to do this.
<!--more-->

## Protontricks

This package has evolved and a fantastic way of fixing broken games and enhancing existing games. The source repo is @ <https://github.com/Matoking/protontricks> and it has a couple dependencies.

I caution you from using the built-in packages on Ubuntu 22.04 because it uses an old package. If you are reading this in 2024 this might have changed, but until then I recommend installing it through the official method using `pipx`.

### Installing

First install pipx

```
sudo apt install python3-pip python3-setuptools python3-venv pipx

```

Then use pipx to install protontricks
```
pipx install protontricks
```

## Using Protontricks

List all installed steam games with `protontricks -l` _Note: Old versions do NOT have this feature_

![](/images/2022/customizing-steam-games-in-linux/list-proton.png)

Adding corefonts to a prefix (this fixes a LOT of black screens or if launchers don't display fonts/text properly)

Syntax: `protontricks APPID corefonts`

_Example of adding corefonts to Lord of The Rings Online._

![](/images/2022/customizing-steam-games-in-linux/corefont-install.png)

Running custom commands (executables inside the game directories)

Syntax: `protontricks-launch --appid APPID COMMANDEXE`

_Example launching a plugin installer for Lord of the Rings Online_

![](/images/2022/customizing-steam-games-in-linux/plugin-launch.png)

## Walkthrough Video

{{< youtube 11111111 >}}
