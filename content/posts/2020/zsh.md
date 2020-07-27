---
title: "Zsh"
type: post
date: 2020-02-19T12:32:44-06:00
url: /zsh/
image: /images/2020-thumbs/zsh.jpg
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
wget https://github.com/ChrisTitusTech/zsh/raw/master/.zshrc -O ~/.zshrc
mkdir -p "$HOME/.zsh"
wget https://github.com/ChrisTitusTech/zsh/raw/master/.zsh/aliasrc -O ~/.zsh/aliasrc
git clone https://github.com/sindresorhus/pure.git "$HOME/.zsh/pure"
```

## Complete Switch from BASH to ZSH
`sudo nano /etc/passwd`

![ZSH Switch](/images/2020/zsh-passwd.png)

Then change the your user at the end from `/bin/bash` to `/bin/zsh`

## Video Walkthrough
[![zsh guide](https://img.youtube.com/vi/gGmBUfMaWMU/0.jpg)](https://www.youtube.com/watch?v=gGmBUfMaWMU)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
