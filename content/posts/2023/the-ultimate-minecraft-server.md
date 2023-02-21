---
title: "The Ultimate Minecraft Server"

date: 2023-02-20
url: /the-ultimate-minecraft-server/
image: images/2023-thumbs/the-ultimate-minecraft-server.jpg
categories:
  - Linux
tags:
  - Minecraft
draft: true
---
I've run a Minecraft server for about two years now, and these are lessons I've learned.
<!--more-->

Minecraft servers are technically demanding, and all guides I've seen miss or outright give bad information. The closest "turn-key" Minecraft setup with a web GUI is "MineOS" <https://wiki.codeemo.com/>. This Guide isn't that, it is a from scratch to give you the best security, updates, and customization.

## The Setup

Ubuntu or Debian latest install. This gives the security and reliability needed, while being the most widely used in the server space.

- Ubuntu Server <https://ubuntu.com/download/server>
- Debian Server <https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/current/amd64/iso-cd/>

### Which version of Java?

You want to use the latest LTS version of Java. At the time of this writing it is Java 17. **Avoid old Java versions!**

Check this website to see what Java you should be using: <https://endoflife.date/java>

JDK vs JRE 

- JDK is for developing Java applications and includes the JRE (Runtime) it is NOT needed for your server.
- JRE is a runtime used for running Java Applications and is a much smaller package. I use the package `jre17-openjdk-headless` as it is a minimal footprint and headless is for servers that don't display graphics.

### After Linux install

Follow these steps to make sure you are up-to-date and have some base security:

- Update packages `sudo apt update && sudo apt upgrade -y`
- Secure Server <https://christitus.com/secure-web-server/>



## Walkthrough Video

{{< youtube 11111111 >}}
