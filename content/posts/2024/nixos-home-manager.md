---
title: "NixOS Home Manager"

date: 2024-01-19
url: /nixos-home-manager/
image: images/2024-thumbs/nixos-home-manager.jpg
categories:
  - Linux
tags:
  - NixOS
draft: true
---
This guide goes over installing and using NixOS Home Manager.
<!--more-->

Official Source Guides:
- <https://nixos.wiki/wiki/Home_Manager>
- <https://nix-community.github.io/home-manager/index.xhtml#ch-installation>

## Why Home Manager?

Home mangager is used to create config files in the home directory for a consistent user experience. 

It will automate the creation of new .config files for a consistent experience across users. It is essential if you have multiple users using the NixOS machine. If it is just a single user with their own configs it isn't needed as everything can be done from the `configuration.nix` file.

## Installation

Here is how I installed Home Manager at a system level.

```
nix-channel --add https://github.com/nix-community/home-manager/archive/release-23.11.tar.gz home-manager
nix-channel --update
```

Edit `configuration.nix` add your tweaks user packages, user program config, create files, and user services
```
home-manager.users.USERNAME = { pkgs, ... }: {
  home.packages = [ pkgs.gitAndTools.gh ];
  programs.gh.enable = true
  services.gpg-agent = {
    enable = true;
    defaultCacheTtl = 1800;
    enableSshSupport = true;
  };
  home.file = {
    ".local/share/applications/defaults.list" = {
       text = ''
       [Default Applications]
       application/pdf=zathura.desktop
       '';
    };
};
```

You can also seperate out the home-manager config in to its own .nix file and do an import in the configuration. If doing a lot of changes and additions to users, I'd recommend this method instead.

## Walkthrough Video

{{< youtube 11111111 >}}
