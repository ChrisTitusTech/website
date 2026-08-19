---
title: "Resolve in Arch Linux"
date: 2026-06-23
url: /resolve-in-arch-linux/
image: images/2026-thumbs/resolve-in-arch-linux.webp
categories:
  - Linux
tags:
  - Arch
  - DaVinci Resolve
  - Video Editing
draft: false
---

DaVinci Resolve on Arch Linux is one of those setups that can be perfect for weeks and then break after one system update. The problem is not that Arch is bad or Resolve is bad. The problem is that Resolve is a proprietary professional video editor built and tested against a conservative Linux stack, while Arch is a rolling-release distribution that moves libraries, GPU drivers, and desktop components quickly.

This post goes through the common problems, the fixes that matter, and the workflow I use to make Resolve usable on Arch Linux.

<!--more-->

## The Big Picture

Blackmagic Design's Linux target is Rocky Linux, not Arch. Arch users rely on the AUR, community packaging, and wrapper fixes when Resolve expects older or different system libraries. That means the install can work extremely well, but you need to understand what is being fixed.

There are three major problem areas:

- Resolve launch errors caused by library/runtime mismatch
- GPU and OpenCL/CUDA setup
- Codec support, especially H.264, H.265, and AAC

The practical fix is to install Resolve cleanly, verify GPU compute, run Resolve through a compatibility wrapper when needed, and transcode unsupported media into native Resolve-friendly formats.

## Install Resolve on Arch

Use the AUR package for the free version:

```bash
paru -S davinci-resolve
```

or the Studio version:

```bash
paru -S davinci-resolve-studio
```

Blackmagic requires a manual download for the Linux installer. If the AUR build fails because the ZIP is missing, download the exact version requested by the package from Blackmagic's support page, place it in the AUR build directory shown in the error, and run the install again.

For a clean build environment, make sure you have the basics:

```bash
sudo pacman -S --needed base-devel git
```

Do not randomly install old libraries from random mirrors. If the AUR package expects a specific dependency, use the package sources and comments from the AUR package first. Arch partial upgrades and manually pinned libraries are a great way to break this later.

## GPU Compute Is Required

Resolve is not a normal desktop video editor. It expects GPU acceleration. If Resolve starts but says it cannot find a GPU, crashes when opening a project, or shows broken playback, check OpenCL or CUDA first.

Install the correct stack for your GPU.

### NVIDIA

```bash
sudo pacman -S --needed nvidia nvidia-utils opencl-nvidia cuda
```

Verify OpenCL:

```bash
clinfo | less
```

If `clinfo` does not show your NVIDIA GPU, Resolve will not be happy. Reboot after driver changes and make sure Secure Boot is not blocking the NVIDIA kernel module.

### AMD

```bash
sudo pacman -S --needed rocm-opencl-runtime
```

Verify:

```bash
clinfo | less
```

AMD on Arch has changed over time. Some users used `opencl-amd` from the AUR, but ROCm version changes can break Resolve. If Resolve crashes after an AMD OpenCL update, test `rocm-opencl-runtime` from the official repos before chasing random downgrade guides.

### Intel

```bash
sudo pacman -S --needed intel-compute-runtime
```

Then verify:

```bash
clinfo | less
```

Intel can work, but NVIDIA remains the least painful Resolve path on Linux because Blackmagic's Linux support matrix is CUDA-focused.

## The Library Launch Problem

The classic Arch problem is that Resolve launches from `/opt/resolve/bin/resolve`, then fails with library or symbol errors after an update. This happens because Resolve bundles some libraries but still interacts with system libraries. On a rolling distro, the ABI can move faster than Resolve.

The quick fix is my `resolve-fix` wrapper from:

<https://github.com/ChrisTitusTech/resolve-linux>

Clone it:

```bash
git clone https://github.com/ChrisTitusTech/resolve-linux.git
cd resolve-linux
chmod +x resolve-fix
```

Run Resolve through the wrapper:

```bash
./resolve-fix
```

The wrapper preloads Arch's GLib stack and puts `/usr/lib` earlier in `LD_LIBRARY_PATH` before launching Resolve:

```bash
export LD_PRELOAD=/usr/lib/libglib-2.0.so.0:/usr/lib/libgobject-2.0.so.0:/usr/lib/libgio-2.0.so.0:/usr/lib/libgmodule-2.0.so.0
export LD_LIBRARY_PATH=/usr/lib:$LD_LIBRARY_PATH
exec /opt/resolve/bin/resolve "$@"
```

If that fixes the launch, make it your normal Resolve command:

```bash
sudo install -m 755 resolve-fix /usr/local/bin/resolve-fix
```

Then launch:

```bash
resolve-fix
```

You can also edit your desktop launcher to run `/usr/local/bin/resolve-fix` instead of the default Resolve binary.

## Check Missing Libraries

If Resolve still will not launch, run:

```bash
ldd /opt/resolve/bin/resolve | grep "not found"
```

Common fixes include:

```bash
sudo pacman -S --needed libxcrypt-compat glu apr-util
```

Do not install packages blindly. Run `ldd`, see what is missing, then install the package that owns that library.

To find the package for a missing library:

```bash
pacman -Fyx 'libcrypt.so.1'
```

If file database search is not enabled:

```bash
sudo pacman -Fy
```

## The Codec Problem

This is the part that confuses most people because MP4 is a container, not a codec.

On Linux, Resolve codec support is different from Windows and macOS. Blackmagic's supported codec document for Resolve 20 lists Rocky Linux 8.6 CUDA as the Linux platform. In that Linux matrix, AAC is not available, while embedded audio support is limited to decodable formats such as PCM, MP3, FLAC, OPUS, and AC-3 depending on the container.

That means common camera, phone, OBS, and downloaded clips can fail in weird ways:

- MP4 imports but video is missing
- Video imports but audio is silent
- H.264 or H.265 media shows as offline
- Free Resolve cannot decode formats that Studio can
- Studio still does not magically fix AAC audio on Linux

The most reliable answer is to transcode footage before editing.

## Convert Footage to Native Resolve Formats

Use the conversion script from the same repo:

<https://github.com/ChrisTitusTech/resolve-linux>

Install dependencies:

```bash
sudo pacman -S --needed ffmpeg parallel
```

Clone and prepare the script:

```bash
git clone https://github.com/ChrisTitusTech/resolve-linux.git
cd resolve-linux
chmod +x resolve_convert.sh
```

Preview what will be converted:

```bash
./resolve_convert.sh -n /path/to/footage
```

Convert the folder:

```bash
./resolve_convert.sh /path/to/footage
```

The script recursively scans the folder, skips its own output directory, and mirrors the original folder layout under `resolve_ready/`.

Video is converted to:

```text
DNxHR in a .mov container
```

Audio is converted to:

```text
PCM 24-bit 48 kHz .wav
```

That avoids the common Linux Resolve problems with H.264, H.265, and AAC. DNxHR takes much more disk space than camera originals, but it edits smoothly and imports cleanly.

## Quality Profiles

The conversion script supports multiple DNxHR profiles:

```bash
./resolve_convert.sh -q lb /path/to/footage
./resolve_convert.sh -q sq /path/to/footage
./resolve_convert.sh -q hq /path/to/footage
./resolve_convert.sh -q hqx /path/to/footage
./resolve_convert.sh -q 444 /path/to/footage
```

Use them like this:

- `lb`: proxy/offline editing
- `sq`: smaller intermediate files
- `hq`: good default
- `hqx`: high quality 12-bit work
- `444`: maximum quality when you actually need it

For most YouTube and screen-recording workflows, `hq` is the default I would use. For rough cuts on a laptop, use `lb` and relink later if needed.

Parallel conversion:

```bash
./resolve_convert.sh -q hq -j 4 /path/to/footage
```

Do not point this at a nearly full disk. DNxHR files are large.

## Fix Silent Audio

If the clip imports but has no audio, it is probably AAC. Convert the file:

```bash
./resolve_convert.sh /path/to/clip-folder
```

Or convert just the audio manually:

```bash
ffmpeg -i input.mp4 -vn -c:a pcm_s24le -ar 48000 output.wav
```

Then import the WAV into Resolve and sync it with the video.

For batch work, the script is easier because it keeps the folder structure and handles video plus audio together.

## Fix Media Offline for MP4

If an MP4 shows "Media Offline", inspect it:

```bash
ffprobe input.mp4
```

If it is H.264 or H.265, convert it:

```bash
./resolve_convert.sh -q hq /path/to/footage
```

Then import the converted `.mov` from `resolve_ready/`.

Do not waste time installing random codec packs. Resolve does not use your desktop media player codec stack the same way VLC or Kdenlive does.

## Fix Fonts Missing in Resolve

Resolve may only look at system font paths. If fonts installed under your home directory do not appear, open Fusion settings and update the font path map from:

```text
SystemFonts:
```

to:

```text
SystemFonts:;$HOME/.local/share/fonts
```

Restart Resolve after changing it.

## Backup Before You Break It

The `resolve-linux` repo also includes `resolve_backup.sh`, which can archive the Resolve install and user configuration. This is useful before reinstalling, moving to another Linux machine, or testing a big driver update.

Run a dry run first:

```bash
./resolve_backup.sh --dry-run
```

Create a backup:

```bash
./resolve_backup.sh --output-dir ~/backups
```

Restore from an archive:

```bash
./resolve_backup.sh --restore inputfile.tar.gz
```

This is not a replacement for real system snapshots, but it is useful for preserving Resolve settings, LUTs, scripts, fonts, and the application install.

## Troubleshooting Checklist

### Resolve does not launch

```bash
resolve-fix
ldd /opt/resolve/bin/resolve | grep "not found"
```

Install missing libraries with `pacman`, not random downloads.

### Resolve cannot find a GPU

```bash
clinfo
```

Install the correct OpenCL/CUDA stack for your GPU and reboot.

### Resolve crashes after a system update

Try the wrapper first:

```bash
resolve-fix
```

Then check AUR comments for the exact Resolve package version. Rolling distros break proprietary apps when runtime libraries move.

### MP4 imports without audio

Convert AAC to PCM:

```bash
./resolve_convert.sh /path/to/footage
```

### MP4 or H.265 shows Media Offline

Convert to DNxHR:

```bash
./resolve_convert.sh -q hq /path/to/footage
```

### Conversion script says DNxHD/DNxHR is missing

Reinstall Arch's ffmpeg package:

```bash
sudo pacman -S ffmpeg
```

## Recommended Workflow

My practical Arch workflow is:

1. Install Resolve from the AUR.
2. Install the right GPU compute stack.
3. Verify with `clinfo`.
4. Launch with `resolve-fix`.
5. Convert all questionable footage with `resolve_convert.sh`.
6. Edit from `resolve_ready/`.
7. Backup Resolve settings before major system or driver updates.

Arch Linux can be a great Resolve workstation, but only if you stop treating Resolve like a normal Arch-native package. It is proprietary software with Linux-specific codec limitations and runtime assumptions. Once you wrap the launch and feed it DNxHR/PCM media, the experience becomes much more predictable.

## Sources

- ChrisTitusTech Resolve Linux tools: <https://github.com/ChrisTitusTech/resolve-linux>
- Arch Wiki DaVinci Resolve page: <https://wiki.archlinux.org/title/DaVinci_Resolve>
- DaVinci Resolve 20 supported codecs: <https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_20_Supported_Codec_List.pdf>
- AUR `davinci-resolve` package: <https://aur.archlinux.org/packages/davinci-resolve>

## YouTube Video

{{< youtube "oHsboGBxUuc" >}}
