---
title: "Pretty Powershell"

date: 2022-10-31
url: /pretty-powershell/
image: images/2022-thumbs/pretty-powershell.webp
categories:
  - Windows
tags:
  - PowerShell
draft: false
---
PowerShell is UGLY and cumbersome by default. This Guide fixes that!
<!--more-->

The End Result:

![](/images/2022/pretty-powershell/end-result.webp)

## Fixing the Visuals

With all my guides here is the one line script to install "most" of the needed fixes. I'd recommend running it from an admin elevated prompt for installation of OhMyPosh.

### One Line Install

```
irm "https://github.com/ChrisTitusTech/powershell-profile/raw/main/setup.ps1" | iex
```

The first thing that needs to be fixed is installing the correct font. Here are screenshots from both Windows 11 using Terminal and Windows 10 using Conhost. After running the above script, you will unzip the `cove.zip` file from the directory the command above was run from and install those nerd fonts. If you want to download other nerd fonts, go to: <https://www.nerdfonts.com/>

### Windows 11 Font Settings

![](/images/2022/pretty-powershell/win11.webp)

### Windows 10 Font Settings

In the screenshot below you will see the stock font select and the missing icons. Selecting CaskaydiaCove above Consolas and saving will fix it. 

![](/images/2022/pretty-powershell/win10.webp)

## Fixing the Syntax

The defaults are clunky and take too long to type in even when using shorthand. Linux does this better, so lets bring in that syntax to fix it with Aliases in our PowerShell profile.

{{< tweet user="christitustech" id="1581708112394096640" >}}

### New Aliases

Here are the following added aliases for quality of life

- cd... `cd ..\..`
- cd.... `cd ..\..\..`
- dirs "Recursive directory listing"
- admin / su / sudo "Elevate to admin prompt"
- Edit-Profile "Edit current powershell $PROFILE"
- vim `nvim` "Neovim alias"
- ll "file listing, excluding dirs"
- g "cd to Documents\Github"
- gcom "quick github commit"
- lazyg "quick github commit and push"
- Get-PubIP "Grab external IP"
- uptime
- reload-profile
- find-file "recursive file search from current directory"
- unzip
- grep
- touch
- df "disk free"
- sed
- which
- export
- pkill "process killer"
- pgrep "process finder"

## Walkthrough Video

{{< youtube LuAipOW8BNQ >}}
