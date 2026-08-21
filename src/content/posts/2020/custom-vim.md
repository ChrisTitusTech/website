---
title: "Custom Vim"

date: 2020-06-04T15:05:41-05:00
url: /custom-vim/
image: images/2020-thumbs/custom-vim.webp
categories:
  - Linux
tags:
  - Vim
---
This article originally documented my Vim setup and the retired `myvim`
repository. I no longer use Vim and have moved my editor workflow to Neovim.
<!--more-->

## My current editor setup

My maintained configuration now lives in the
[ChrisTitusTech/neovim](https://github.com/ChrisTitusTech/neovim) project. It
is a Lua-based setup built on kickstart.nvim with LSP support, completion,
formatting, project search, file navigation, and writing tools.

For the full setup and current feature overview, read
[Neovim: The Ultimate Editor](/vim-the-ultimate-editor/) and
[Neovim the Elite Editor](/neovim-the-elite-editor/).

## Quick installation

On Linux, clone the project to a normal directory and run its dependency
repair script:

```bash
git clone https://github.com/ChrisTitusTech/neovim ~/neovim
cd ~/neovim
bash lin-depend.sh
nvim
```

On first launch, Neovim installs the configured plugins. Use `:checkhealth` to
check the environment, `:Lazy` to manage plugins, and `:Mason` to manage
language servers and development tools.

The old `.vimrc` and Vim-plug instructions are intentionally no longer
included because the configuration they referenced no longer exists.
