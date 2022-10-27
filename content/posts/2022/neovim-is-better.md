---
title: "Neovim Is Better"

date: 2022-11-07
url: /neovim-is-better/
image: images/2022-thumbs/neovim-is-better.jpg
categories:
  - Linux
tags:
  - Neovim
draft: false
---
I've never experience a program with such power and potential than Neovim. It does so much and we are at the beginning as it isn't even to a 1.0 release yet. The best part is the program works on Windows, MacOS, and Linux.
<!--more-->

The following tweet encompasses my thoughts and feelings in my first week using neovim.

{{< tweet user="christitustech" id="1584944224700702720" >}}

## Is this the path for you?

Neovim is rewarding after configured. The amount of automation, speed, and shear possibilities are limitless, but NOT without it's downside though. I've spent hours working on my basic configuration and I am still months away before I will be close to completion. I say this as a NOOB! That is because I had no idea what a DAP, LSP, Linter, and other coding terms were before I began this journey. 

If you know any of the coding terms and a little LUA, you will have a better starting point than myself. If not, get prepared to learn because there will be a lot of new terms and functionality you will need to know to get the most out of Neovim experience. 

## What I use Neovim for

- **Writing** is a difficult task that requires focus and creativity. For me, having the focus mode with a Linter that checks spelling and grammar has made a massive difference. I prefer the linting approach to writing, because it doesn't tell me about sentence structure or grammar until I've finished my thought and saved.
- **Configuration Files** in neovim are a dream for any system admin that doesn't have the luxury of a desktop or are using a remote server. Tab out multiple files, read other contents into an existing file, and have a file explorer with full undo logs. I could go on, but you get the idea.
- **Coding** is where most people's mind goes with Neovim. You have the rockstars, like primeagen, that make neovim look like a tool of the gods and mere mortals use other editors. 

## Installation

With Neovim being so young in releases the latest release you can get is the best. Anything below 0.7 is too low as it won't have the features you will need for the best experience. I highly recommend downloading directly from Neovim's GitHub releases: <https://github.com/neovim/neovim/releases/tag/stable>

All dependencies and requirements are in my setup.sh for Linux and winsetup.ps1 for Windows from: <https://github.com/ChrisTitusTech/neovim>

```
git clone https://github.com/christitustech/neovim
cd neovim
sudo ./setup.sh
```

## Configuration

Instead of making a big modular structure that you see in most Neovim projects, mine is small for ease of learning. It will expand as times goes on, but I want to KISS it... Keep it stupid simple. There is 3 files:

- `init.lua` - Initializes neovim and calls any extra files. These are my main settings and special plugin configurations. _Note: some people use the old `init.vim` instead of lua, but that defeats the purpose of using neovim.
- `lua/keymaps.lua` - These are all my key bindings for Neovim
- `lua/plugins.lua` - List of plugins to load. 

## Startup


## Walkthrough Video

{{< youtube 11111111 >}}
