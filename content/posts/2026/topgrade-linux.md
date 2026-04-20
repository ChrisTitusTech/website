---
title: "Topgrade Linux"

date: 2026-04-19
url: /topgrade-linux/
image: images/2026-thumbs/topgrade-linux.webp
categories:
  - Linux
tags:
  - topgrade
  - updates
draft: true
---
Most Linux users only run their package manager and call it a day. That updates your system packages, but it often leaves the rest of your machine in a partially updated state. If you use `pip`, `cargo`, `flatpak`, `snap`, `brew`, `oh-my-zsh`, VS Code extensions, or even dotfile repos, those pieces can all drift out of date separately.

Topgrade exists to solve this exact problem. It gives you one command to update almost everything you actually use.
<!--more-->

Keeping your machine consistently updated is not just about getting shiny new versions. It is about reducing weird breakage from version mismatch, closing security holes faster, and spending less time doing repetitive maintenance.

## What Topgrade Is

Topgrade is a command-line tool that runs update commands across multiple package managers and tools in sequence. Instead of remembering ten different commands, you run one:

```bash
topgrade
```

Topgrade can handle things like:

- System package managers (`apt`, `dnf`, `pacman`, `zypper`, etc.)
- Language package managers (`pip`, `cargo`, `npm`, etc.)
- Universal package managers (`flatpak`, `snap`)
- Tooling ecosystems (`rustup`, `asdf`, `sdkman`, etc.)
- Repository pulls (dotfiles or local git repos)
- Shell/plugin ecosystems (depending on what is installed)

The exact behavior depends on your distro and what tools you have installed, but the core idea is the same: centralize updates.

## The Problem with "Just Do System Updates"

When people say, "I update regularly," they usually mean one command:

- Debian/Ubuntu: `sudo apt update && sudo apt upgrade`
- Fedora: `sudo dnf upgrade`
- Arch: `sudo pacman -Syu`

That is good, but incomplete for most power users.

### 1. You Are Only Updating One Layer

Modern Linux setups have multiple software layers:

- OS packages
- Userland language packages
- Third-party tools installed outside distro repos
- Application stores (`flatpak`, `snap`)
- Git-managed configs and scripts

If only one layer is current, your system is still effectively behind.

### 2. Human Memory Is the Bottleneck

Nobody wants a giant sticky note of update commands. Even experienced users forget steps when busy.

Topgrade removes this memory tax. You no longer need to think, "Did I update `cargo` crates this week? Did I pull dotfiles?"

### 3. Drift Causes Hard-to-Debug Issues

Many random issues come from version drift between tools:

- One CLI tool expects newer dependencies than your local setup
- Shell plugin manager is old while shell itself is new
- User-level package manager lags behind system-level updates

Topgrade reduces this drift by making full-stack updates routine.

## Why Topgrade Is Better in Practice

Topgrade is not magic. It is workflow optimization.

### 1. One Command, Consistent Routine

The biggest win is consistency. If updates are a chore, you postpone them. If updates are one command, you do them more often.

Friction matters.

### 2. Better Visibility

A single Topgrade run shows what got updated and what failed. That gives you one place to review maintenance status instead of checking each ecosystem manually.

### 3. Great for Mixed Environments

Most advanced Linux users run hybrid setups:

- Native packages via distro manager
- Some dev tools via language managers
- GUI apps via flatpak

Topgrade shines exactly in this mixed reality.

### 4. Useful for Workstations and Homelabs

If you maintain multiple Linux systems, standardizing around Topgrade makes your process more repeatable. Your update playbook becomes simpler and easier to document.

## Installation

Topgrade is commonly available in distro repositories and other package managers.

Examples:

```bash
# Arch
yay -S topgrade-bin # or paru AUR helper or you can build from source with topgrade

# Fedora
sudo dnf install topgrade

# Debian/Ubuntu (if available in your repos)
sudo apt install topgrade

# Via Cargo
cargo install topgrade
```

If your distro repo version is old, installing via `cargo` is often the fastest way to get the latest release.

## First Run: What to Expect

Run:

```bash
topgrade
```

You may be prompted for `sudo` depending on what update steps need elevated privileges.

The first run can take a while because it catches up everything at once. That is normal.

## Safety: How to Use It Responsibly

Topgrade is powerful, so use it with a sane workflow.

### 1. Start with a Dry Run

Preview what it would do:

```bash
topgrade --dry-run
```

This is especially useful before enabling new update targets.

### 2. Keep Backups and Snapshots

Before major updates:

- Snapshot with Btrfs/Timeshift/ZFS if available
- Backup important config/data

No update tool replaces backups.

### 3. Exclude What You Do Not Want

You can configure Topgrade to skip specific steps you do not trust or do not need. That lets you keep one-command convenience while controlling risk.

#### Recommended exclusions for cautious users:

- `firmware` updates (I had this break my firmware before, so I prefer to review them separately)

Disable firmware updates in config if you want to review them separately. Firmware updates can be risky if something goes wrong, so some users prefer to handle them manually. Change the topgrade config here:

`~/.config/topgrade/config.toml`

```toml
[disable]
firmware = true

[firmware]
upgrade = false
```

_Note: This double excludes it, but I like to make sure that even if firmware is ran it will only show available updates without installing them._

Full syntax with examples here: <https://github.com/topgrade-rs/topgrade/blob/main/config.example.toml>

Check in terminal with `topgrade --config-reference` for the latest config options.

### 4. Read Output Instead of Blindly Spamming Enter

Treat updates like maintenance, not background noise. If one step fails, investigate it before your next cycle.

## Configuration Basics

Topgrade supports configuration so you can tailor behavior to your setup. Typical use cases:

- Disable managers you do not use
- Set specific git repos to pull
- Skip risky or noisy steps

You can generate and edit configuration with:

```bash
topgrade --edit-config
```

This is where Topgrade moves from "nice command" to "production-grade personal workflow."

## Recommended Update Workflow

For desktop users:

1. Run `topgrade --dry-run` if you have made major setup changes
2. Run `topgrade`
3. Reboot when kernel/driver/core libraries update
4. Quickly test core workflows (browser, editor, shell, audio, GPU app)

For servers and critical machines:

1. Test updates in staging first
2. Snapshot/backup
3. Run Topgrade with selective scope
4. Validate services and logs after update

Topgrade is a force multiplier, but your operational discipline still matters.

## When You Might Not Want Topgrade

Topgrade is not mandatory for every scenario.

- Minimal systems that only use one package manager
- Locked-down enterprise environments with strict patch pipelines
- Users who prefer explicit manual control for every ecosystem

If your stack is simple, manual updates may be enough.

But for most modern Linux users with layered tooling, Topgrade saves time and reduces inconsistency.

## Topgrade vs Manual Updates: Short Version

Manual updates are fine when your environment is tiny.

Topgrade wins when your environment is real-world:

- Multiple package ecosystems
- Frequent toolchain changes
- Several machines to maintain

The benefit is not just speed. It is reliability through repeatability.

## Final Thoughts

If you are serious about Linux reliability, "just update the system packages" is no longer enough.

Topgrade gives you a practical middle ground between fully manual maintenance and fragile automation scripts:

- One command
- Broad coverage
- Configurable behavior
- Better long-term hygiene

Use it weekly, keep backups, and stop letting half your toolchain lag behind.

## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
