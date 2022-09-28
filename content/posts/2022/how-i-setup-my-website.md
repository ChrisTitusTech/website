---
title: "How I Setup My Website"

date: 2022-10-07
url: /how-i-setup-my-website/
image: images/2022-thumbs/how-i-setup-my-website.jpg
categories:
  - Linux
  - Windows
  - Networking
tags:
  - Website
  - HUGO
draft: false
---
This shows you have I automate my workflows and setup my website for maximum productivity and search<!--more-->

## The Workflow and Overview

Typically before I start recording any video, I write an outline and publish it on my website. It's almost like a video script, but also a copy paste guide for either a viewer or just someone searching google.

This is done by using a static site generator. There are bunch on the market, but the one that suited my needs the best is [Hugo](https://gohugo.io). It has a bunch of themes ready to use out of the box @ <https://themes.gohugo.io/> and is extremely modular. 

Then there are the annoyances of other website platforms like WordPress. You need to go on the web and use some terrible web based editor that just is slow and takes a long time. Hugo fixes this by using both GitHub and Netlify for deployment. Netlify will "host, build, and distribute" the content automatically and GitHub will be where you publish when it's ready for the publish stage that Netlify controls.

What this looks like in practice is I issue a `hugo new posts/new-post.md`, edit it with `vim posts/new-post.md`, and post it with git commit and push. This allows me to create a page in seconds if I wanted. 

## The Setup

Install Hugo (I recommend [NIX Package Manager](/nix-package-manager))

```
nix-env -iA nixpkgs.hugo
```

Do a quick setup that creates the `website` folder and the needed HUGO framework files with:

```
hugo new site website
```

Then we will initialize it with a HUGO theme like so:

```
cd website
git init
git submodule add git submodule add https://github.com/zzossig/hugo-theme-zzo.git themes/zzo
```

I absolutely love the ZZO theme as a beginner. It has some of the best instructions and documentation you will find! <https://zzo-docs.vercel.app/zzo/gettingstarted/installation/>

## Usage and First Steps



## Complex Theme Modifications

<https://christitus.com/hugo-guide/>


## Walkthrough Video

{{< youtube 11111111 >}}
