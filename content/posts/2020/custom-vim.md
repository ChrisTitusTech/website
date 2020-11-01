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
 
## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join