---
title: "Disable Snaps"
type: post
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

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join