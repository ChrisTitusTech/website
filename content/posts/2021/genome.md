---
title: "Genome Desktop"

date: 2021-07-07T23:43:50-05:00
url: /genome/
image: /images/2021-thumbs/genome.jpg
categories:
  - Linux
tags:
  - Ubuntu
---
Under Construction
<!--more-->

## Dependencies 

```bash
apt install bspwm rustc cargo alacritty zsh polybar chromium rofi jgmenu wmctrl graphicsmagick feh python3 python3-pip python3-setuptools python3-wheel ninja-build build-essential autoconf gcc make pkg-config libpam0g-dev libcairo2-dev libfontconfig1-dev libxcb-composite0-dev libev-dev libx11-xcb-dev libxcb-xkb-dev libxcb-xinerama0-dev libxcb-randr0-dev libxcb-image0-dev libxcb-util0-dev libxcb-xrm-dev libxkbcommon-dev libxkbcommon-x11-dev libjpeg-dev taskwarrior fonts-font-awesome fonts-firacode
```

- Node.js

  ```bash
  curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

- Theme

    ```bash
    wget https://github.com/EliverLara/Nordic/releases/download/2.0.0/Nordic-darker.tar.xz
    tar -xvf Nordic-darker.tar.xz ~/.themes/

    #NPM
    npm install --save nord
    ```

- Eww Widgets - [https://elkowar.github.io/eww/](https://elkowar.github.io/eww/)

    ```bash
    git clone https://github.com/elkowar/eww
    cd eww
    cargo build --release
    ```

- Blur Wallpaper

    ```bash
    mkdir ~/.local/bin -p
    wget https://raw.githubusercontent.com/kiddae/feh-blur-wallpaper/master/feh-blur -O ~/.local/bin/feh-blur
    ```

- Desktop Compositor picom fork

    ```bash
    git clone https://github.com/jonaburg/picom
    cd picom
    meson --buildtype=release . build
    ninja -C build
    # To install the binaries in /usr/local/bin (optional)
    sudo ninja -C build install
    ```

- i3lock-color LockScreen

    ```bash
    git clone https://github.com/Raymo111/i3lock-color.git
    cd i3lock-color
    git tag -f "git-$(git rev-parse --short HEAD)"
    ./install-i3lock-color.sh
    ```

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://christitus.com/lbry>

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
 [2]: https://christitus.com/join