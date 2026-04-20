---
title: "Image Manipulation Linux"

date: 2026-04-18
url: /image-manipulation-linux/
image: images/2026-thumbs/image-manipulation-linux.webp
categories:
  - Linux
tags:
  - Thunar
  - Image Resize
  - Image Upscaling
  - Webp Conversion
draft: true
---
If you use Linux and want better-looking images without jumping into a full editor, this toolkit is for you.

I now use three small projects that work from both terminal and Thunar right-click menus:

- **image-resize** for fast dimension changes (for example 1920x1080)
- **image-upscale** for AI upscaling with Real-ESRGAN
- **thunar-webp-convert** for smaller WebP files with good quality

This post walks through each one in plain language, with install and usage examples.
<!--more-->

## What Each Tool Is For

| Tool | Best use case | Keeps original? | Output |
|---|---|---|---|
| `image-resize` | Quickly fit images into a target size | **No** (overwrites originals) | Same file, resized |
| `image-upscale` | Increase detail and resolution with AI | Yes | New PNG in `upscale/` |
| `thunar-webp-convert` | Shrink file size for web uploads | Yes | New `.webp` beside source |

## Before You Start

- Make sure Thunar is installed if you want right-click actions.
- Restart Thunar after install so new menu items appear.
- For `image-resize`, make a backup first because it edits files in place.

## 1) Image Resize (Fast + Simple)

Use this when you want a quick resize to fit a resolution like `1920x1080` while preserving aspect ratio.

Project: [ChrisTitusTech/image-resize](https://github.com/ChrisTitusTech/image-resize)

### Install

```bash
git clone https://github.com/ChrisTitusTech/image-resize
cd image-resize
./install.sh
```

This installs:

- `resize` (terminal command)
- `resize-selected` (Thunar wrapper)
- `Resize Image` right-click action in Thunar

### Usage

```bash
# Single image
resize /path/to/photo.jpg 1920x1080

# Whole folder
resize /path/to/photos/ 1920x1080
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.bmp`, `.tiff`, `.tif`

> **Important:** `resize` overwrites the original file. Keep backups if needed.

## 2) Image Upscale (AI Quality Boost)

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

## 3) WebP Conversion (Smaller Files for Web)

Convert images to WebP format with a single command. This is ideal for saving disk space while maintaining good image quality. Like the upscale script, it also includes a Thunar right-click action for easy conversion from the file manager.

### Install

```bash
git clone https://github.com/ChrisTitusTech/thunar-webp-convert
cd thunar-webp-convert
./install.sh
```

This installs the `convert-to-webp` CLI and registers a `Convert to WebP` right-click action in Thunar.

Dependencies (example package names):

```bash
# Arch
sudo pacman -S libwebp imagemagick libnotify

# Debian / Ubuntu
sudo apt install webp imagemagick libnotify-bin
```

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
convert-to-webp path/to/image1.jpg path/to/image2.png
```

Output is written next to each source image as `.webp`.

## Recommended Workflow

For most people, this order works best:

1. `upscale` if the image still needs more detail.
2. `resize`  to your target dimensions.
3. `convert-to-webp` for final web-friendly output.

## Troubleshooting

- No Thunar menu item: restart Thunar and rerun each project `install.sh`.
- Command not found: confirm `~/.local/bin` is in your `PATH`.
- WebP conversion fails: verify `cwebp` and ImageMagick `convert` are installed.

