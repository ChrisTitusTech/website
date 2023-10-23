---
title: "My New Editor"

date: 2023-12-31
url: /my-new-editor/
image: images/2023-thumbs/my-new-editor.jpg
categories:
  - Linux
  - Windows
tags:
  - Neovim
draft: true
---
After years of switching IDE's and editors, then trying dozens of vim configurations... I HAVE FOUND THE PERFECT EDITOR! My Neovim configuration I have tweaked to perfection.
<!--more-->

I'm not a god programmer the likes of the primeagen, but a mere mortal that has taken the time to finally come to a spot that makes my configuration the perfect one for me and possibly you.

## Neovim Problems

I've done several iterations of setting up neovim from scratch, to using neovim distros like lazyvim, nvchad, and lunarvim. These "distros" just customize too much for my liking. 

Starting from scratch is rough, because of all the options and customization that needs to be done. This is why people end up using vscode because it just works. However, there is a better way!

## Kickstart

One of the devs of Neovim made an amazing kickstart project <https://github.com/nvim-lua/kickstart.nvim> that I have taken and make my own modifications to. 

The entire project is meant as a jumping off point. Giving you a functional LSP and the essentials that everyone wants in Neovim, but not a bunch of customizations that you may not want. I recommend referring back to this project often and checking for updates. 

## My Neovim

Using the kickstart base, here are the customizations I've made for my neovim. <https://github.com/ChrisTitusTech/neovim>

- copilot.vim added
- synthwave84 theme
- spellcheck on startup
- telescope ignores images by default
- custom clipboard image addon for markdown files
- windows fixes
- undotree addition (F5 Hotkey)
- wakatime for tracking time spent programming
- autosave.vim
- suda.vim to elevate to sudo and save file
- Alpha Dashboard on startup for recent items and projects (Leader + a to switch to dashboard at anytime)
- zoxide for project search
- New Tab Hotkeys (leader + 1-5 for selecting tab, leader+t for new tab, and leader+c to closetab)
- jj to quick esc

## Walkthrough Video

{{< youtube 11111111 >}}
