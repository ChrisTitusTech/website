---
title: "Custom Vim"
type: post
date: 2020-06-04T15:05:41-05:00
url: /custom-vim/
image: /images/2020-thumbs/custom-vim.jpg
categories:
  - Linux
tags:
  - Vim
---
This article goes over customizing VIM and making a custom vim installation.<!--more--> This is my custom vim that I am constantly updating via GitHub and clone this to every installation I have. Let's go over the install, config, and usage. 

## Installation of VIM

### Adding VIM-plug
The first thing I do is install vim-plug from junegunn that has makes a lot of vim-based plugins. Here is the repository that I am using for this: https://github.com/junegunn/vim-plug  
#### Installation
```
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

### Using My Custom .vimrc
This is the main repository that has all of my customization to VIM. https://github.com/ChrisTitusTech/myvim
#### Installation
```
cd ~
wget https://raw.githubusercontent.com/ChrisTitusTech/myvim/master/.vimrc
```

## Configuration of VIM
  - Launch VIM
  - Type :PlugInstall
  - Exit (Shift+ZZ)

## Overview of Plugins
Let's go over all the plugins that were just installed. Feel free to edit the .vimrc to your needs. 

#### LightLine
This plugin adds a nice look to the bottom part of vim and adding a colored line that is now displayed and changes when VIM enters different modes.

#### OneDark
This is a theme for VIM that adds a greater contrast and dark theme to vim. This makes text and everything inside easier to read. 

#### FZF (Fuzzy Search)
This adds greater functionality to search that allows you to search for partial matches easier. See full syntax here: https://github.com/junegunn/fzf#usage

#### GoYo
This plugin removes all the numbers and formatting and makes it easier when writing documents in VIM. From Normal Mode - I made the hotkey Ctrl+\ to enter this special format. 

#### UndoTree
UndoTree is an amazing plugin that makes it easy to see everything you have done in your session. Simply press F5 from Normal mode and you will see the entire all your recent changes and undo them. 

#### NerdTree
NerdTree is a file management plugin. This hotkey is Ctrl+o and opens up a file tree on the left side for you switch files

#### VimWiki
VimWiki adds syntax formatting for markdown and is a fantastic plugin to have if you many markdown files.

## Conclusion
There is still a ton of other edits I need to make to this VIM and will be a work in progress for many years. Everyday I learn something new and powerful with VIM and if you can think about what you want, I am sure VIM will be able to accommodate that. Future additions that I am looking at is SpellCheck, VIM Tabs, and general improvements to the .vimrc file. My vimrc file currently has a lot of the most common tweaks, longer history, sorting, file numbering, and removal of auto comment formatting, However there is still a of things to improve. So come and check back often as I will update this project as it progresses. 
 
I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
