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

```bash
touch "$HOME/.cache/zshhistory"
#-- Setup Alias in $HOME/zsh/aliasrc
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >> ~/.zshrc
```

## Complete Switch from BASH to ZSH

```bash
chsh $USER
```

*Then type `/bin/zsh`*

*OR* Edit `/etc/passwd` and change /bin/bash to /bin/zsh

![ZSH Switch](/images/2020/zsh-passwd.png)

## Video Walkthrough

[![zsh guide](https://img.youtube.com/vi/gGmBUfMaWMU/0.jpg)](https://www.youtube.com/watch?v=gGmBUfMaWMU)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

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
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join