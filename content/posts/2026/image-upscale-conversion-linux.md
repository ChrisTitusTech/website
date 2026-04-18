---
title: "Image Upscale Conversion Linux"

date: 2026-04-18
url: /image-upscale-conversion-linux/
image: images/2026-thumbs/image-upscale-conversion-linux.webp
categories:
  - Linux
tags:
  - Thunar
  - Image Upscaling
  - Webp Conversion
draft: true
---
I created new upscale and conversion to webp scripts for Thunar, the default file manager in Xfce. The scripts use `ffmpeg` to upscale images to 4K resolution and convert them to WebP format, which is a modern image format that provides better compression and quality than traditional formats like JPEG and PNG. This allows users to easily enhance their images and save space on their hard drives without sacrificing quality.
<!--more-->

## Image Upscale

Upscale any image — or a whole folder of images — straight from the terminal using [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN). Results land in an `upscale/` subfolder next to your originals, always as lossless PNG. It also includes a Thunar right-click action so you can upscale images directly from the file manager.

### Install

```bash
git clone https://github.com/ChrisTitusTech/image-upscale
cd image-upscale
./install.sh
```

This installs the `upscale` CLI, the `upscale-selected` Thunar wrapper, and registers an `Upscale Image (Real-ESRGAN)` right-click action in Thunar. A dedicated virtual environment is used to avoid system Python conflicts.

### Usage

```bash
# Single image (4x upscale, default model)
upscale photo.jpg

# Whole folder
upscale /path/to/photos/

# 2x upscale
upscale photo.jpg --model x2plus

# Anime / illustrations
upscale drawing.png --model x4plus-anime

# CPU mode (no GPU required)
upscale photo.jpg --fp32
```

Output is always written to an `upscale/` subfolder next to the source. The first run downloads model weights (~67 MB) to `~/.cache/image-upscale/weights/`; subsequent runs are instant.

### Models

| Model | Best For | Scale |
|---|---|---|
| `x4plus` (default) | Photos, general images | 4x |
| `x2plus` | Photos at 2x | 2x |
| `x4plus-anime` | Anime, illustrations | 4x |
| `general-x4v3` | General scenes, fastest | 4x |

### Thunar Right-Click

After running `install.sh`, select one or more images in Thunar, right-click, and choose **Upscale Image (Real-ESRGAN)**. Each file is processed and written into an `upscale/` folder beside the source.

## WebP Conversion

Convert images to WebP format with a single command. This is ideal for saving disk space while maintaining good image quality. Like the upscale script, it also includes a Thunar right-click action for easy conversion from the file manager.

### Install

```bash
git clone https://github.com/ChrisTitusTech/thunar-webp-convert
cd thunar-webp-convert
./install.sh
```

This installs the `webp-convert` CLI and registers a `Convert to WebP` right-click action in Thunar.

### Configuration

Settings are read from:

```bash
~/.config/webp-convert/config.toml
```

Supported keys:

- `target_width`
- `quality`
- `output_suffix`

Example:

```toml
target_width = 800
quality = 85
output_suffix = ""
```

Notes:

- `target_width` must be a positive integer.
- `quality` must be an integer from 1 to 100.
- `output_suffix` must be a quoted string, for example `"-new"`.
- Use an empty suffix (`""`) to output `photo.webp`.

### Usage

```bash
convert-to-webp path/to/image.png
convert-to-webp path/to/image1.jpg path/to/image2.png`
```

