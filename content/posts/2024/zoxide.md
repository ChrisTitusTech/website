---
title: "Zoxide"

date: 2024-04-21
url: /zoxide/
image: images/2024-thumbs/zoxide.jpg
categories:
  - Linux
  - Windows
  - MacOS
tags:
  - Zoxide
draft: false
---
**Zoxide** is an enhanced version of the traditional `cd` command, drawing inspiration from tools like `z` and `autojump`. It's designed to make navigating your filesystem faster and more intuitive by learning your habits. The more you use it, the smarter it gets, allowing you to "jump" to your most frequently used directories with minimal input. <!--more-->

## Key Features

- **Smart Directory Jumping:** Navigate to your most used directories with just a few keystrokes.
- **Cross-Shell Compatibility:** Works seamlessly across all major shells.
- **Interactive Selection:** Use `zi` for interactive directory selection with `fzf`.
- **Easy Installation:** Simple setup process across various platforms.

## Getting Started

### Basic Commands

- `z foo`: Jump to the highest-ranked directory matching `foo`.
- `z ~/foo`: Works just like `cd`, allowing navigation to absolute paths.
- `z ..`: Move up one directory level.
- `z -`: Return to the previous directory.

### Installation Steps

1. **Install Zoxide:** Available for Linux, macOS, Windows, BSD, and Android.
  - All operating systems have zoxide in default repositories and can be installed by using the `zoxide` package
2. **Shell Integration:** Easily integrate zoxide into your preferred shell (Bash, Fish, Zsh, and more).
3. **Optional fzf Integration:** For enhanced interactive selection, install `fzf` (v0.33.0+).

### Configuration

Customize zoxide with various flags and environment variables:

- **Command Prefix:** Change the default `z` and `zi` commands with `--cmd`.
- **Hooks:** Adjust the frequency of directory score updates with `--hook`.
- **Data Directory:** Specify the database location with `_ZO_DATA_DIR`.
- **Exclude Directories:** Use `_ZO_EXCLUDE_DIRS` to exclude directories from zoxide's database.

## Integrations

Zoxide integrates with a wide range of applications, from file managers like `lf` and `ranger` to text editors like `vim` and `emacs`, enhancing your workflow across tools.

## Links

Github: <https://github.com/ajeetdsouza/zoxide>

## Walkthrough Video

{{< youtube 11111111 >}}
