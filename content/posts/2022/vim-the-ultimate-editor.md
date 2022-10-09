---
title: "Vim the Ultimate Editor"

date: 2022-10-14
url: /vim-the-ultimate-editor/
image: images/2022-thumbs/vim-the-ultimate-editor.jpg
categories:
  - Linux
  - Windows
  - MacOS
tags:
  - VIM
draft: false
---
VIM editor is one of the most beloved, but often misunderstood editors in existence. Let's configure it from a noobs perspective and show you it's power.
<!--more-->

## Why VIM?

There is so many things to learn about VIM, but before we start the question often pops up why not just use VS Code or IntelliJ?

VS Code and IntelliJ have some fantastic ease of use, and great debugging capabilities. There is extension support to add some amazing functionality. So why do many programmers still use VIM? one word: SPEED!

There is nothing that can even compare when it comes to speed from a veteran VIM user. They will blaze through code at the speed of light and change so much on their screen that you will have a hard time following just watching it. Don't believe me? Just watch ANY "[The Primeagen](https://www.youtube.com/c/ThePrimeagen/videos)" videos

So if it's so fast why don't most people use VIM? It's hard and has one of the biggest learning curves that I have ever seen from any program. It will take **YEARS** to master, months to be better than vs code/intellij editors, and weeks of learning to be comparable to any other editor on the market. 

However, the payoff is beyond worth it to me. The reward feels so good when you start to _get_ it. The big thing... you can throw your mouse away, because when you get it... a mouse is no longer needed. 

## Beginning steps

The very first thing you need to know about vim is the modes.

  - Normal Mode - The default mode you enter into on launch. This allows quick movement, exiting, commands, but you don't "type" in this mode. 
  - Insert Mode - Pressing `i` on your keyboard will allow you enter insert mode. This allows you to type text and keyboard input to the open file.
  - Visual Mode - Pressing `v` on your keyboard will put you in visual mode. This allows you to highlight and use commands on highlighted syntax.

_Note: You can escape Insert and Visual mode to go back to Normal mode with `esc` key_

The other MEME you will always see about vim is you can't exit it... just turn your computer off. Haha, but seriously exiting vim is probably my favorite thing and that brings us to the first thing to remember:

> "If something is slow in vim, there is a way to do it faster in vim"

The official way to save and quit vim is to press the following in normal mode: `:wq` or faster `:x` or even faster `ZZ`

To quit without saving: `:q!` or faster `ZQ`

VIM Cheatsheets:

  - <https://devhints.io/vim>
  - <https://vim.rtorr.com/>

{{< tweet user="christitustech" id="1577690702200590336" >}}

## Learning the basics

Now that you can actually function inside of vim, you might be thinking... "How in the hell do elite programmers use this damn program so fast?". 

Movement and muscle memory are the biggest things with vim. It's not just knowing the keys, but using them without thinking. This may seem impossible, but the more you practice the better you will get. 

You may have heard of `vimtutor` which walks you through the basics of vim. However, I'd encourage you to treat it like speed runners of your favorite video game. Run `vimtutor` as often as you can and treat it like a video game. How fast can you run it? Can you beat the old time? Can you complete the entire thing for the first time?!

This is where you will pick up the speed. Between the constant cheatsheets and running `vimtutor` as often as possible.

Other tips are moving as much of your workflow into vim as possible and customizing it to **YOUR** needs. Don't just copy and paste some vimrc file your favorite programmer uses... it's made for that person NOT YOU! 

## Making VIM your own

It is time to elevate your game to the elite status and making your own `.vimrc` file. This is where you make it feel awesome, even if you still suck at using vim. It's important that you make vim feel good as this will make you want to continue using it. 

I've been using VIM for a month and this is my `.vimrc` file. I use a lot of plugins, themes, and just a few hotkeys. This isn't what an experts .vimrc file looks like, as I still consider myself just now leaving the beginner stages into an intermediate user. As time goes on I will expand this file by adding more shortcuts and better hotkeys. 

Source: <https://github.com/christitustech/myvim>
{{< ghcode "https://raw.githubusercontent.com/ChrisTitusTech/myvim/master/.vimrc" >}}

## Walkthrough Video

{{< youtube P88ydZVcm1s >}}
