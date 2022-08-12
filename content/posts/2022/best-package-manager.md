---
title: "Best Package Manager"

date: 2022-08-08
url: /best-package-manager/
image: images/2022-thumbs/best-package-manager.jpg
categories:
  - Linux
  - MacOS
tags:
  - Ubuntu
  - Fedora
  - Arch
draft: false
---
Instead of using the built-in package manager in Linux or some container that never puts the programs files in a usable spot, we will use Homebrew!
<!--more-->
I know, it's an OS X package manager, but it works fantastic on Linux and solves MANY problems. 

Main issues it addresses: 

 - Older packages from stable Linux distributions 
 - Putting the installed packages in easy spots to reference them and modify them when needed. 
 - Using sudo can be dangerous and brew installs it to a home directory instead of systemwide without needing sudo.

A good example of this. On Debian and Fedora the package HUGO is old... like really old. Anywhere between version .60 and .90 where home brew installs version .101-extended

## Installing Homebrew

### Dependencies
**Debian or Ubuntu**
```
sudo apt-get install build-essential procps curl file git
```
    
**Fedora, CentOS, or Red Hat**
```
sudo yum groupinstall 'Development Tools'
sudo yum install procps-ng curl file git
sudo yum install libxcrypt-compat # needed by Fedora 30 and up
```

### Install Script
One command to install it:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Make brew available in terminal
By default homebrew puts itself in an easy to access directory. `/home/linuxbrew/.linuxbrew` but there are a variety methods to use it from your prompt. 

#### Official Method
```
test -d ~/.linuxbrew && eval "$(~/.linuxbrew/bin/brew shellenv)"
test -d /home/linuxbrew/.linuxbrew && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
test -r ~/.bash_profile && echo "eval \"\$($(brew --prefix)/bin/brew shellenv)\"" >> ~/.bash_profile
echo "eval \"\$($(brew --prefix)/bin/brew shellenv)\"" >> ~/.profile
```

#### The .bashrc Method
Add the following line to `~/.bashrc`

```
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

_Note: if you use ZSH then the file you need to edit is `~/.zshrc`_

## Using Homebrew
With homebrew setup here are the commands I use almost daily

- `brew install programname` - Install programname using brew
- `brew search programname` - Search for programname in brew
- `brew uninstall programname` - Uninstall program
- `brew update` - Updates brew
- `brew upgrade program` - Updates just that one program
- `brew list` - List programs in brew

Get Lost? `man brew` to look at all documentation in terminal or don't know what a program does? `brew info programname` 

That's it for the daily syntax

## Understanding Homebrew terms

- keg - Program binaries created from source
- bottle - Program binaries downloaded
- cellar - Directory where kegs / binaries are stored
- tap - git repository
- cask - mac os native binary (not used in Linux)

There is other stuff to homebrew but read the full documentation if interested here <https://docs.brew.sh/Formula-Cookbook#homebrew-terminology>

Basics of homebrew on Linux official documentation <https://docs.brew.sh/Homebrew-on-Linux>

## Walkthrough Video

{{< youtube QsYEvnV-P34 >}}

## Thank you Homebrew Team

{{< nitter user="christitustech" id="1554153066823385089" >}}
