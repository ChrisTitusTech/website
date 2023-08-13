---
title: "Do Not Make These Github Mistakes"

date: 2023-08-12
url: /do-not-make-these-github-mistakes/
image: images/2023-thumbs/do-not-make-these-github-mistakes.jpg
categories:
  - Linux
  - Windows
tags:
  - GitHub 
draft: true
---
I've made a LOT of GitHub mistakes! Here is a list of things most new users do not know or do WRONG!
<!--more-->

## Raw Files

- Raw Button
- Raw Files only update every few minutes

## Using Branches and Release Tags

- list branches with `git branch -a`
- clone a specific branch with `git clone -b main https://github.com/christitustech/winutil`
- list tags and releases with `git fetch --all --tags`
- checkout tag with `git checkout tags/v1.0`
- see a log of commits and tags `git log --oneline --graph`

## Pull Requests

Pull requests are a great way of collaboration. However, most developers joke that they just close and don't merge most public pull requests. This is mainly because there can be a lot of low quality or hap-hazard commits. I've seen this in many of projects and have made strict requirements before accepting any. The biggest rule I stole from Linus Torvalds, "Never merge a pull request that you do NOT understand."

![pr](/images/2023/do-not-make-these-github-mistakes/pullrequest.png)

## Issues

It is easy to ignore issues, because most issues do not fill out the basic form below. However, I find about half the issues are great at testing your program and help develop it. Delete the issues that say, "IT DON'T WORK!" with no elaboration. Issues help roadmap the development of the program and fix or document any bugs.

![issues](/images/2023/do-not-make-these-github-mistakes/issues.png)

## Rolling back commits and Referencing them

GitHub is truly amazing because of the ability to go back in time revert a single commit or create a branch based on the project at the time a commit was done! 

![revert](/images/2023/do-not-make-these-github-mistakes/revert.png)

## Unit Tests

Unit testing is a vital part of every project as it checks for syntax errors and keeps you from accepting a bad pull request. This is done with automated builds and tests. Check project examples and the `pester` folder. For the github documentation on unit tests refer to <https://docs.github.com/en/actions/automating-builds-and-tests>.

## Walkthrough Video

{{< youtube 11111111 >}}
