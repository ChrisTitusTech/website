---
title: "You are using GitHub WRONG!"

date: 2022-09-19
url: /using-github-correctly/
image: images/2022-thumbs/using-github-correctly.jpg
categories:
  - Linux
  - Windows
tags:
  - GitHub
draft: false
---
GitHub is an incredible powerful tool, but using it in command line can be frustrating. So instead of doing something dumb like using SSH agent workarounds or Token exporting shenanigans to make `git` work in command line. We are going to use an amazing utility called `gh` to authenticate. <!--more-->

Now before we continue, you might be thinking, I can just use password authentication. Well, Here is the error you get if you try that non-sense.

```
Support for password authentication was removed on August 13, 2021. 
Please use a personal access token instead.
```

## GH Overview
This utility was created by GitHub directly to manage authentication and has a lot of fantastic features. So lets dive in...

### Install GH

Debian Linux

```
sudo apt install gh
```

Windows

```
winget install -e GitHub.cli
```

Mac

```
brew install gh
```

### First Time Setup
```
gh auth login
```

Follow all the prompts and I'd recommend setting SSH as auth method.

### Set CLI to use SSH

If you forgot to set the protocol during the setup in `gh auth login` use this command to set it.

```
gh config set -h github.com git_protocol ssh
```

#### Set the Repo to use GH auth

Set the project repository for SSH auth

```
git remote set-url origin git@github.com:ChrisTitusTech/project.git
```

## Using GitHub Desktop
There is nothing wrong with GitHub desktop and sometimes I use it when I'm reviewing my commits or pushes. It is a great graphical representation of how fetch/pull or commit/push work on GitHub. However, it is considerably slower, than just typing it in via terminal with a simple git push or git pull. This also blurs the lines between `git add .`, `git commit -a -m "message"`, and `git push` when adding to a project. 

## Using GitHub properly
If you are anything like me, when I started using GitHub I did so many things incorrectly and still do today! However, I'm slowly seeing the error of my ways and these are the big things I missed. 

### Not combining git add, commit, and push
When I first started these three commands seemed like they all pretty much did the same thing. I JUST WANT TO ADD TO MY PROJECT! Why is it like this?

Then I started doing some collaborative work and realized I'm terrible and most other people are too on GitHub, because we are all doing it WRONG!

So how should we be using `git`?

**COMMIT OFTEN and after every change in code**

This should be everyone mantra, including me, but often I get caught up in my work and don't do it. So what is the big deal? Well, if you bundle a ton of different changes into one commit... you have to revert ALL those changes if you had one bad one. Breaking those up into different commits, you could just revert the bad code. That can literally save a project! I learned this when I bundled a ton of changes into my ArchTitus project and basically turned it into a spaghetti string of code that I hate looking at and debugging. To continue that project, I'd have to rebase and wipe out a ton of progress I've made and other people have contributed. This makes everyone mad and is simply not fun. 

So follow that golden rule and realize you will fail at it, but realize your failures and do better the next time is how we elevate ourselves to the next level.

### Quick Aliases
These are some quality of life improvements that will make using git from command line so much better. 

I use bashrc these days and these are some aliases I added to my `~/.bashrc` file. 

```
gcom() {
	git add .
	git commit -m "$1"
	}
lazyg() {
	git add .
	git commit -m "$1"
	git push
}
```

Now in a perfect world I would be using `gcom "commit message"` several times a day and then finally using `lazyg "last commit of the day"` to push my changes public after I'm done. However, the world and myself are far from perfect, but understanding what perfection would look like will help you know when you aren't. 

### Helping Projects
A poorly documented issue is pointless and just gets closed in every project. Don't be that person! Document what you can and if you noticed a recent commit messed something up reference it by doing a copy paste of the Pull Request # like so. First, get to this screen by clicking "## commits" in top right of the project main page. Then copy the SHA from the "bad" commit. 

![git-commit](/images/2022/github/git-commits.png)

From here, you simply make your issue and paste that long sha hash in where you want to reference it. Don't worry the numbers will be truncated and it will look awesome in the issue page. 

Also make sure you don't just put a WALL OF TEXT! Try to make your issue readable by breaking up your issue if it is more than several sentences long. This just makes it more readable and make it as concise as possible. 

## Walkthrough Video

{{< youtube 11111111 >}}
