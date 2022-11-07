---
title: "5 Essential Terminal Utilities"

date: 2022-11-18
url: /5-terminal-commands/
image: images/2022-thumbs/5-terminal-commands.jpg
categories:
  - Linux
  - Windows
  - Networking
tags:
  - Ubuntu
draft: false
---
<!--more-->


## TLDR

![](/images/2022/5-terminal-commands/tldr.png)

Too long didn't read? The perfect solution for long man pages that we just want some quick examples and basic syntax for a command. TLDR is a vital tool to save you time when learning the terminal. 

## CMatrix

![](/images/2022/5-terminal-commands/cmatrix.png)

How can you use Linux without using CMatrix... It's hard to be cool without it. 

## Trash-CLI

![](/images/2022/5-terminal-commands/trash-cli.png)

This is a life saver after you delete a directory or files in terminal and need to get them back. I highly recommend making the following alias in your `~/.bashrc` file. 

```
alias rm='trash -v'
```

 - Delete a file and send it to the trash:
   `trash path/to/file`

 - List all files in the trash:
   `trash-list`

 - Interactively restore a file from the trash:
   `trash-restore`

 - Empty the trash:
   `trash-empty`

 - Permanently delete all files in the trash which are older than 10 days:
   `trash-empty 10`

 - Remove all files in the trash, which match a specific blob pattern:
   `trash-rm "*.o"`

 - Remove all files with a specific original location:
   `trash-rm /path/to/file_or_directory`

## Autojump

![](/images/2022/5-terminal-commands/autojump.png)

This is my most used terminal utility that saves me the most amount of time. The catch to this program is you must have navigated to the directory at least once in terminal first. 

- Jump to a directory that contains the given pattern:
   `j pattern`

 - Jump to a sub-directory (child) of the current directory that contains the given pattern:
   `jc pattern`

 - Open a directory that contains the given pattern in the operating system file manager:
   `jo pattern`

 - Remove non-existing directories from the autojump database:
   `j --purge`

 - Show the entries in the autojump database:
   `j -s`

## Progress

Tired of wondering how much longer the cp, mv, dd, tar, cat, and other Linux coreutil functions take? Progress will tell you!

- Show the progress of running coreutils:
   `progress`

- Launch and monitor a single long-running command:
   `command & progress --monitor --pid $!`

- Include an estimate of time remaining for completion:
   `progress --wait --command rsync`

## Walkthrough Video

{{< youtube 11111111 >}}
