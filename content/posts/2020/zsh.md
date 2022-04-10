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

## CTT Extra Content

- [ChrisTitus.com Downloads Section][1] (_CC Only_)
  1. Digital Downloads with Guides and Pre-Built Images
  2. Monthly Members Only Video
  3. $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  1. Monthly Members Only Video
  2. YouTube Emojis for Comments and Live Chat
  3. YouTube Badges that changes based on membership time for comments and chat.
  4. All YouTube comments are highlighted when I review comments daily. 
  5. $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join