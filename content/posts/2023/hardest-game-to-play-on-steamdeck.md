---
title: "Hardest Game to Play on Steamdeck"

date: 2023-02-06
url: /hardest-game-to-play-on-steamdeck/
image: images/2023-thumbs/hardest-game-to-play-on-steamdeck.jpg
categories:
  - Linux
tags:
  - Steamdeck
draft: false
---
Most games work great on Steamdeck, but Final Fantasy XI is one that doesn't. It requires dotnet, injection of 3rd party tool, and other modifications to make it playable.
<!--more-->

## Launcher Problems

PlayOnline has a TON of problems, as do many other games with independent launchers. This is complicated even more with another tool that makes gearswaps, adds minimaps, and other quality of life tools that aren't in the vanilla game.

### Workarounds

Multiple launchers are the kiss of death for most emulation and compatibility layers. To get around this, we need to bypass launchers.

Steam has some fantastic bypass arguments for a LOT of games. Example: Cyberpunk 2077 (Set Launch Options) `--launcher-skip -skipStartScreen`

There is also modding the game files themselves to bypass intro movies and other problematic launches. For FFXI we need to do this.

## Setting up the Environment

Wine bottles are folders that contain all the operating variables. These folders can be anywhere when using WINE, but for the steamdeck I like using bottles flatpak which isolates them to `~/.var/app/com.usebottles.bottles/data/bottles`. You'd be shocked how far you can get with the stock "Gaming" bottle.

Bottle Flatpak Install

```
flatpak install flathub com.usebottles.bottles
```

![](/images/2023/hardest-game-to-play-on-steamdeck/gaming-bottle.png)

Set Launch Options

![](/images/2023/hardest-game-to-play-on-steamdeck/launch-options.png)

**Bottles Bug: Nothing Happens when selection launch options**

![](/images/2023/hardest-game-to-play-on-steamdeck/bottle-bug.png)

If you run into this bug, then you need to manually edit the yml file at the root directory.

Change this section to include `arguments=''`

Example:

```
External_Programs:
    f43fe6b6-29c6-49b4-88f8-dc724361f3d5:
        arguments: horizonxi.ini <-- Added Line
        executable: Ashita-cli.exe
        folder: /home/titus/Games/horizonxi/drive_c/HorizonXI/Game
```

After this line is added, you will now be able to use the launch options or just add the arguments you need directly in the yml file.

### FFXI Injection

Using the new HorizonXI fan made server, we can see that it is using Ashita. Ashita/Windower were the main projects almost every FFXI player uses on PC. These days Ashita is by far my favorite as the lead developer, Atm0s, has been developing and re-writing it for more than 10 years. His dedication has made strides to the community and made HorizonXI launcher possible.

The Official Horizon XI Launcher is written in 2022 Visual C++ and those libraries aren't possible yet, at least to my knowledge. So how do we get the game files? Use Windows with Syncthing if you have another PC or just load up a VM and share the local folder.

Then add that folder in the the bottles directory so it has access to it, and the argument `horizonxi.ini` using the executable `Ashita-cli.exe` and we are almost done. 

There are two modifications to make: Auto-Login and Controller Support for Steamdeck. The steamdeck uses an XInput (Xbox Style) controller scheme and autologin is just adding a few lines to the ini.

```
[ashita.boot]
; Retail Server Usage
file        = .\\bootloader\\horizon-loader.exe
command     = --server betabox.horizonxi.com --user USERNAMEHERE --pass PASSWORDHERE
gamemodule  = ffximain.dll
script      = default.txt
```

Gamepad config

Change the following lines to mimic these at the end of `[ffxi.registry]` entry.

```
padmode000 = 1,0,0,0,0,1
padsin000 = 8,9,13,12,10,0,1,3,2,15,-1,-1,14,-33,-33,32,32,-36,-36,35,35,6,7,5,4,16,-1
```

Now when you run the FFXI Bottle it will auto launch into the game WITHOUT ANY LAUNCHER! 

_Note: My personal setup is using syncthing on my windows machine and automatically syncing the files directly in the bottle.

## Walkthrough Video

{{< youtube DCwGENR5scE >}}
