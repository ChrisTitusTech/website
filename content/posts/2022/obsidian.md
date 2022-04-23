---
title: "My Obsidian Setup"
date: 2022-04-22T08:32:54-05:00
url: /obsidian/
image: images/2022-thumbs/obsidian.jpg
categories:
  - Linux
  - Windows
  - MacOS
tags:
  - Obsidian
---

 Notes are vital to our productivity but often people either take too many notes or none at all. I sought to fix this by using a simplistic approach in the Obsidian app. I've tried notion and a variety of other offerings that always fell flat. Let me show you how I set this app for maximum productivity.
<!--more-->
## Install Plugins
Open Obsidian Settings
![settings](/images/2022/04-obsidian/plugins.png)

- Template (Core)
- Kanban
- Dataview (Progress Bar)
- Homepage

## Template Core Plugin
- Make Template folder in file view
- Set Template Folder under Template in Obsidian settings

## Kanban Plugin
![kanban settings](/images/2022/04-obsidian/kanban-settings.png)

`Click on settings cog for your board`

_NOT the settings for the obsidian program_

**Set your default template, Note folder to put new files in, and lane width.**

![kanban settings2](/images/2022/04-obsidian/kanban-settings2.png)

_Note: I recommend leaving 270 width for 1080p screens_

## Homepage Plugin
Adds Home button and just makes it easy to always get back to your kanban to-do page. The homepage button my default will close all open notes and open the to-do or what ever note you specify. Here are my settings:

![homepage plugin](/images/2022/04-obsidian/homepage.png)

## Dataview Plugin
This is for progress bar, or if you want to do filters, tags, yaml headers, and other sorting techniques. It does WAY more than I use it for at the moment. Since I'm limiting my notes to maybe 10-20 notes I don't need the other stuff, but it is there incase I expand. For now, I will use the following code in my templates to add a progress bar that tracks any checkboxes and how many are checked compared to total. 

```
`="![progress](https://progress-bar.dev/" + round(length(filter(this.file.tasks.completed, (t) => t = true)) / length(this.file.tasks.text) * 100) + "/)"`
```

### Walkthrough Video

[![30daychromeosvid](https://img.youtube.com/vi/zGCv6aDDfP8/0.jpg)](https://www.youtube.com/watch?v=zGCv6aDDfP8)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_