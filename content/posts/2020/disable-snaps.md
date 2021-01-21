---
title: "Disable Snaps"

date: 2020-09-08T13:44:58-05:00
url: /disable-snaps/
image: /images/2020-thumbs/disable-snaps.png
categories:
  - Linux
tags:
  - Ubuntu
---
This goes over how to Disable Snaps and making sure it doesn't automatically reinstall. 
<!--more-->

## List and Uninstall Snaps

```bash
snap list # This shows you what snaps are installed
sudo snap remove program # Fill in all snaps listed above
```

## Purge Snaps and Block Reinstall

```bash
sudo apt purge snapd
sudo apt-mark hold snapd
```

## Verify Uninstall

```bash
apt list --install | grep snap
```

Check your Output for any snap packages

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://links.christitus.com/lbry>

#### Exclusive Content

- [ChrisTitus.com Members Section][1] (_CC Only_)
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  - Monthly Members Only Video
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://links.christitus.com/join