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

The best part is this is FREE and will produce a website faster than anything on the web. Netlify, my host, didn't charge anything until I was breaking 100GB of bandwidth and 100,000 active users PER MONTH! Now with double those numbers I pay only $19 a month and have 1 TB (Terabyte) of data per month.

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
git submodule add https://github.com/zzossig/hugo-theme-zzo.git themes/zzo
```

I absolutely love the ZZO theme as a beginner. It has some of the best instructions and documentation you will find! <https://zzo-docs.vercel.app/zzo/gettingstarted/installation/>

## Usage and First Steps

The first thing you want to do is look over the sample post in `/themes` under `/themes/examplesite`. Under here you will see the structure that HUGO uses and how most of the content ends up in the `content` directory off of root. 

The second thing to note is the `/content/posts/` and seeing the examples here. This will show you the sample markdown file and how it's laid out. Change these and make your first post. Once you figure out a good structure for your posts, you can then edit the default template. 

For previewing the changes you can open up a new terminal and just type `hugo server` from the root `website` directory. 

Now I have three different windows that I'm using for the bulk of my workflow:
1. Chrome Window with <https://localhost:1313>
2. IDE for editing my markdown files (vs code, vim, etc.)
3. Extra terminal window running `hugo server` for real time updates for the chrome window

_Note: You can use terminal inside vs code and with the auto save feature you can see the code get updated on the webpage for every change you make!_

## Your First Modifications

Remember the big thing with HUGO is everything is modular and everything can be changed, because at the end it is simply outputting a static html file.

Once you figure out how you want your posts structured, change the `/archtypes/default.md`. This template is what each new post will use. This is where you really increase your efficiency as we often find ourselves writing the same few things on each new post we make.

The next modification will probably comes from adding widgets or sidebar components. Instead of directly modifying the `/theme/zzo` files you can actually look through the partials directory and create your own `/layouts/partials` in your root that will take precedence over the ones in the theme directory. More in-depth explanation from the official site <https://gohugo.io/templates/partials/>. 

## Complex Theme Modifications

In my past Hugo Guide I went into some pretty big theme modifications (adding search, tags, etc.) Read more about that @ <https://christitus.com/hugo-guide/>

Also if you see something you want to copy from my website, everything is on my public GitHub @ <https://github.com/christitustech/website>

Adding comments can be done in a multitude of ways, but my absolute favorite instead of using Disqus or commento.io is simply using GitHub to host the comments directly on your website repository! There is an amazing "plugin" that you can add called <https://github.com/utterance/utterances> which does all the spam filtering and integrates comments BETTER!

## Walkthrough Video

{{< youtube xMv10E561WQ >}}
