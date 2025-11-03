---
title: "Chrome Performance Issues Linux"

date: 2025-11-02
url: /chrome-performance-issues-linux/
image: images/2025-thumbs/chrome-performance-issues-linux.webp
categories:
  - Linux
tags:
  - Chrome
draft: true
---
Does Chrome take a long time to startup in your Linux instance? I recently had an issue where all tabs delayed its connection before it would download the page on initial launch.
<!--more-->

Solution:

Add launch options to Chrome shortcut:

`/usr/share/applications/google-chrome.desktop`
```
Exec=google-chrome-stable --disable-gcm-registration --disable-features=AsyncDns %U
```
This disables Google Cloud Messaging registration and asynchronous DNS resolution, which can cause delays on some Linux systems.

Test change before applying it system-wide by running Chrome from the terminal with the options:

```
google-chrome-stable --disable-gcm-registration --disable-features=AsyncDns
```