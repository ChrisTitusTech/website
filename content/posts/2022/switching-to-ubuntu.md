---
title: "Switching to Ubuntu"

date: 2022-11-28
url: /switching-to-ubuntu/
image: images/2022-thumbs/switching-to-ubuntu.jpg
categories:
  - Linux
tags:
  - Ubuntu
draft: false
---
Yes, the title is correct, I'm switching to Ubuntu. Don't you hate snaps and GNOME? Yes, but I always say change your Linux install to what you want. Don't like something? Change IT!
<!--more-->

But Why? ... Ubuntu does something right!?

{{< tweet user="christitustech" id="1591540430226628608" >}}

## Starting with Server

I start with Ubuntu server download <https://ubuntu.com/download/server> and then strip out SNAPD before adding any desktop environment. This makes it so I can avoid all the things I don't like about Ubuntu, while getting the benefits of their Kernel optimizations and packaging. 

Will Ubuntu always be better than Debian for kernel and packaging? No, in fact, Debian is adding non-free firmware packages into their base installer and will no longer be second class citizen on new installs and you won't need to go hunting for a non-free ISO any longer. 

### Removing Snapcraft or Snaps

Run the following commands to remove snapd and also hold the package to prevent it from reinstalling. 

```
sudo apt purge snapd
sudo apt-mark hold snapd
```

### Avoiding certain packages

The downside to the following approach is Ubuntu has packages, such as: Firefox and others that will try to install the snap version. 

I highly recommend installing NIX OS env to get around this limitation, as this is what I do with every install on every distribution anyways.

```
curl -L https://nixos.org/nix/install | sh
```

_For a reference guide check out my Nix Package Manager article: <https://christitus.com/nix-package-manager/>_

## Installing Your Desktop

The easiest method for installing your desktop is using `tasksel` from the terminal. 

```
sudo apt install tasksel -y
```

Run it with `sudo tasksel`

![](/images/2022/switching-to-ubuntu/tasksel.png)

Select the Debian Desktop Environment at top and the desktop environment that you want to use. 

_Note: While this method is easy, it will install some bloat that you may wish to remove._

### Advanced Option

Using my window manager set up, which requires manual intervention from <https://github.com/christitustech/ubuntu-titus/>. 

Final Result:

![](/images/2022/switching-to-ubuntu/ubuntu-titus.jpg)




## Walkthrough Video

{{< youtube 11111111 >}}
