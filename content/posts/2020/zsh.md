---
title: "Zsh"

date: 2020-02-19T12:32:44-06:00
url: /zsh/
image: images/2020-thumbs/zsh.jpg
categories:
  - Linux
  - MacOS
tags:
  - ZSH
---
In this article, I go over my implementation of ZSH, which is a better shell alternative to BASH.
<!--more-->
## Why ZSH?

ZSH is an amazing shell that just makes everything a bit easier from auto suggestions, completing tasks you do regularly considerably faster.

## Before you Begin: Dependencies

I built a resource for those starting out with my Github @ https://github.com/ChrisTitusTech/zsh and will be using many files from the project. 

Packages needed before you start:
- zsh - ZSH Shell
- zsh-syntax-highlighting - syntax highlighting for ZSH in standard repos
- autojump - jump to directories with j or jc for child or jo to open in file manager
- zsh-autosuggestions - Suggestions based on your history

## Initial Setup of ZSH

```
touch "$HOME/.cache/zshhistory"
#-- Setup Alias in $HOME/zsh/aliasrc
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >> ~/.zshrc
```

## Complete Switch from BASH to ZSH

```
chsh $USER
```

*Then type `/bin/zsh`*

*OR* Edit `/etc/passwd` and change /bin/bash to /bin/zsh

![ZSH Switch](/images/2020/zsh-passwd.png)

## Video Walkthrough

[![zsh guide](https://img.youtube.com/vi/gGmBUfMaWMU/0.jpg)](https://www.youtube.com/watch?v=gGmBUfMaWMU)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

