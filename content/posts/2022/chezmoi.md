---
title: "Easily moving Linux installs"

date: 2022-04-25T17:04:25-05:00
url: /chezmoi/
image: images/2022-thumbs/chezmoi.webp
categories:
  - Linux
tags:
  - chezmoi
---
Are you tired of having to reset all your app settings on a new install? Using a simple tool you will never have to reconfig your app settings again. Also adding new apps and programs are extremely simple and intuitive. Stop wasting your time and start using Chezmoi to restore your app settings. This isn't meant to be a system backup but a settings backup. 
<!--more-->

## Why Chezmoi

Chezmoi offers the most simplistic approach and versioning that is simply is my preferred solution over the other dot file tools below. Here is a brief diagram of how it works. _Note: I do not use git from command line in my tutorial for commits and pushes_

![diagram.webp](/images/2022/chezmoi/diagram.webp)

## Notes about other dot file tools

- **GNU/Stow** is a very popular one, but I don't like using it because of its reliance on Symlinks
- **Bare GIT repos** are also another way of doing this, but managing the files can be cumbersome
- **Git / Ansible playbooks** a great way to deploy new systems, but can be complex to maintain and keep up to date. 
- **Home Directory Backups** many times end up backing up too much and overly bloat a new system or add in unwanted settings

## Installation

First we install Chezmoi to the /bin folder. I recommend system wide below but you can also do the install to `~/.local/bin` if you only want to install for current user

System-wide install `/bin` *Recommended*
```
su
cd /
sh -c "$(curl -fsLS chezmoi.io/get)"
exit
```

User install `~/.local/bin`
```
cd ~/.local
sh -c "$(curl -fsLS chezmoi.io/get)"
```
_Note: Most systems have ~/.local/bin, however a few do not_

## Setting up config repository

First Setup a new repository for your config files on GitHub

![new-repo.webp](/images/2022/chezmoi/new-repo.webp)

I called mine "dotfiles" <https://github.com/ChrisTitusTech/dotfiles>

We now simply initialize chezmoi with that new GitHub repository

```
chezmoi init https://github.com/ChrisTitusTech/dotfiles
```

## Adding files and Applying changes

chezmoi uses a git based aliases to add files and merge them. To add something to your dotconfigs you'd simply do this command as an example: `chezmoi add .bashrc`

This copies the file to the working directory ~/.local/share/chezmoi and allows it to be a part of your repository. Just like the name suggests, the working directory is where you should be doing all your edits once they are added. 

Once you edit your file you need to "apply" it back to its home so they are used with `chezmoi apply`

What happens if you edit the "original" file in the home directory? simply merge that change with the working directory with `chezmoi merge filename`

Now you are done for the day and you want to submit the changes to the remote repo so you can apply these changes to your other computers. You simply change directory to chezmoi with `chezmoi cd` or `cd ~/.local/share/chezmoi` and `git add files` -> `git commit -m "initial commit"` -> `git push` in the command line. However, I really like the desktop application GitHub desktop and prefer to add the ~/.local/share/chezmoi directory to it and do the add, commit, and push in that GUI GitHub Directory shown below. 

![git-desktop.webp](/images/2022/chezmoi/git-desktop.webp)


