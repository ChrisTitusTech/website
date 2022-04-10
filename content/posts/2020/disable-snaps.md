---
title: "Disable Snaps"

date: 2020-09-08T13:44:58-05:00
url: /disable-snaps/
image: images/2020-thumbs/disable-snaps.png
categories:
  - Linux
tags:
  - Ubuntu
---
This goes over how to Disable Snaps and making sure it doesn't automatically reinstall. 
<!--more-->

## List and Uninstall Snaps

```
snap list # This shows you what snaps are installed
sudo snap remove program # Fill in all snaps listed above
```

## Purge Snaps and Block Reinstall

```
sudo apt purge snapd
sudo apt-mark hold snapd
```

## Verify Uninstall

```
apt list --install | grep snap
```

Check your Output for any snap packages

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