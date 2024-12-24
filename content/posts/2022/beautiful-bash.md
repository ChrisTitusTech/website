---
title: "Beautiful Bash"

date: 2022-10-24
url: /beautiful-bash/
image: images/2022-thumbs/beautiful-bash.webp
categories:
  - Linux
tags:
  - Bash
draft: false
---
Tired of an Ugly prompt with no features? Fix it with this guide! 
<!--more-->
 
## The Look

 The following is what the end result of the bash prompt will look like:

 ![](/images/2022/beautiful-bash/prompt.webp)

## Requirements

With all my guides I like to create bash scripts that will auto install and configure everything. You may have heard of the starship prompt, which this uses, but is heavily themed. I also have my included bashrc with a ton of useful aliases.

The setup file will also install autojump which helps you navigate between directories. 

![](/images/2022/beautiful-bash/alias.webp)

## Installation

Pick a directory to house all the bash files. I have a dedicated Github directory for all the projects I use @ `~/GitHub/`, but you can pick any directory including your home and then clone mybash repository for install.

```
git clone https://github.com/christitustech/mybash
cd mybash
./setup.sh
```
_Note: By default this will symlink your ~/.bashrc and wipe out any customizations you have made!_

## Walkthrough Video

{{< youtube "b3W7Ky_aaaY" >}}
