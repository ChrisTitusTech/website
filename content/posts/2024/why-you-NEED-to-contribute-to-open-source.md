---
title: "Why You NEED to Contribute to Open Source"

date: 2024-06-06
url: /why-you-NEED-to-contribute-to-open-source/
image: images/2024-thumbs/why-you-NEED-to-contribute-to-open-source.jpg
categories:
  - Linux
  - Windows
tags:
  - OpenSource
draft: true
---
There is a video called "(Don't Contribute to Open Source)[https://www.youtube.com/watch?v=5nY_cy8zcO4]" by Theo t3 and most people don't understand its purpose or didn't watch the entire video.
<!--more-->

## The Video Problem

The problem wasn't the video itself but the title. Only 30-40% of people watch a video all the way through AND an even higher percentage of those people do NOT understand GitHub. 

So the takeaway most took from the video is NOT to contribute to open source projects. When the intent of the video was to NOT make needless Pull Requests to projects and bog down Open Source Maintainers.

## How to contribute to Open Source

1. Start with Issues and capturing bugs in software. This helps you understand the issues with using the given project. 
2. Develop a fix for the issue and submit a pull request
3. Wait for the project maintainer to approve and merge your PR.

### Pull Request Etiquette

- Do NOT make massive changes. Batching tons of fixes into one PR is a BAD idea. Fix one thing and submit it for the feature you are working on. Multiple features = Multiple Pull Requests.
- Do NOT make massive formatting changes. Using an extension like prettier and changing every line in a code is a good way to get banned from the project. 
- If it is a complex feature pull request. Consider making multiple commits in your PR. Example: Fixing error checking commit, new function commit, etc. The idea is to make it easier to read what is happening in the Pull request. Breaking it up in to multiple commits helps the maintainer understand what your LARGE PR is doing. Again, if it starts effecting multiple features... Consider breaking it in to two or more pull requests. 
- Check project documentation for branch submissions. Some projects do not want you to commit to main. They might have a beta or test branch they want submissions to go to. Be careful on which branch you are using.

## What if you are NOT a Developer

Learning to submit issues properly on Github is a tremendous help. As someone that maintains one of the biggest powershell scripts in the world, most issues are poorly presented or documented. Instead of making an issue that says "It don't work!", do the following:

1. Document the Steps you take.
2. Screenshot the error. 
3. Establish what you EXPECT it to do.

Do not do a massive text dump! Instead use the attach button if you are uploading a large log file.  As a general rule of thumb, if it more than 15-20 lines long... It should be an attachment so it doesn't clutter up the issue thread. 

## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
