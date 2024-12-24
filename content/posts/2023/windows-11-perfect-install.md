---
title: "Windows 11 Perfect Install"

date: 2023-08-05
url: /windows-11-perfect-install/
image: images/2023-thumbs/windows-11-perfect-install.webp
categories:
  - Windows
tags:
  - guide
draft: false
---
Setting a clean Windows 11 is difficult with all the built-in bloat. This guide fixes all that to give you a clean system that is easy to manage.
<!--more-->

## The Download ISO

You can download any of the ISOs from Microsoft <https://www.microsoft.com/software-download/windows11>

Choose English World from initial boot screen (Credit to ThioJoe for this tip - This makes sure TikTok and other 3rd party stuff don't install)

## Change Region to United States Post Install

Run `intl.cpl` or launch the windows toolbox and use legacy panels to launch Region Settings. Then switch it to US region.

![Alt text](/images/2023/windows-11-perfect-install/region.webp)

If you are using the Microsoft Store you need to search for Region in Settings and Set it to United States

## Debloat with Recommended Tweaks

Run `irm christitus.com/win | iex` from Administrator Terminal (Powershell)

![Alt text](/images/2023/windows-11-perfect-install/winutil.webp)

## (Optional) Browser Change from Edge

Install your browser of choice from the Install Menu on winutil. I recommend Brave, but you can choose whatever you want.

Then run Edge Removal from the winutil Tweaks Menu and it will redirect all web links to your new browser.

## Walkthrough Video

{{< youtube 6UQZ5oQg8XA >}}
