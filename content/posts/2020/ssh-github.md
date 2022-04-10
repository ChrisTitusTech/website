---
title: "How to Use SSH with Github"

date: 2020-09-03T10:57:46-05:00
url: /ssh-github/
image: images/github.png
categories:
  - Linux
tags:
  - GitHub
---
Setting Up SSH Authentication with GitHub for Secure Access with 2FA GitHub Accounts
<!--more-->

![ssh](/images/ssh.png)

## Creating SSH Keys

Type this in to create GitHub Keys for your computer

```
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Notes:
- I typically save this in ~/.ssh/github
- You don't have to put a password if you aren't worried about security

## Adding the New Key to GitHub and Local SSH-Agent

Type the following on the local machine to add your key to the agent.

```
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github
```

Copy the contents of `~/.ssh/github.pub` to the new key field in GitHub. If you have xclip installed type this `cat ~/.ssh/github.pub | xclip -sel clip` to copy the contents. 

![github-pub](/images/2020/github-ssh.jpg)

## Test GitHub SSH Access

Type the following to verify you have completed the setup properly

```
ssh -T git@github.com
```

## SSH GitHub Clone Syntax and Updating Repositories

Here is how to clone new repositories instead of using https:// 

```
git clone git@github.com:USERNAME/Repo.git
```

Update existing repositories to use SSH instead of https

```
git remote set-url origin git@github.com:USERNAME/Repo.git
```

## Conclusion 

This is the best way to clone and push updates to repositories if you have 2-Factor enabled on your GitHub account. 

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
