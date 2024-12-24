---
title: "Script for Optimizing Images"

date: 2023-01-30
url: /script-for-optimizing-images/
image: images/2023-thumbs/script-for-optimizing-images.webp
categories:
  - Linux
tags:
  - Bash
  - Optipng
  - img-optimizer
draft: false
---
Optimizing images is easy with this script! Img-optimizer + ImageMagicK leverages multiple CLI tools to give the best results.
<!--more-->

## Dependencies  

- imagemagick
- optipng
- jpegoptim

Install script

### Debian Command

```
sudo apt install jpegoptim optipng imagemagick webp -y
git clone https://github.com/VirtuBox/img-optimize.git $HOME/.img-optimize
sudo ln -s $HOME/.img-optimize/optimize.sh /usr/local/bin/img-optimize
sudo chmod +x /usr/local/bin/img-optimize
```

### Arch Command

```
yay -S jpegoptim optipng imagemagick webp -y
git clone https://github.com/VirtuBox/img-optimize.git $HOME/.img-optimize
sudo ln -s $HOME/.img-optimize/optimize.sh /usr/local/bin/img-optimize
sudo chmod +x /usr/local/bin/img-optimize
```

## My Custom Script

Change the variables for FOLDER, WIDTH, and HEIGHT. 

Current script used on this website: <https://raw.githubusercontent.com/ChrisTitusTech/website/master/content/images/opti>

```
#!/bin/bash
# Dependancies
# - img-optimize - https://virtubox.github.io/img-optimize/
# - imagemagick
# - jpegoptim
# - optipng

FOLDER="/home/titus/github/website/content/images"

# max width
WIDTH=800

# max height
HEIGHT=600

#resize png or jpg to either height or width, keeps proportions using imagemagick
find ${FOLDER} -iname '*.webp' -o -iname '*.webp' -exec convert \{} -verbose -resize $WIDTHx$HEIGHT\> \{} \;
img-optimize --std --path ${FOLDER}
```

## Walkthrough Video

{{< youtube Fq3HBk6swuQ >}}
