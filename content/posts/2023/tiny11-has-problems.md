---
title: "Tiny11 Has Problems"

date: 2023-04-07
url: /tiny11-has-problems/
image: images/2023-thumbs/tiny11-has-problems.jpg
categories:
  - Windows
tags:
  - Tiny11 
draft: false
---
Using any custom Windows ISO is problematic for many reasons outlined in this article.
<!--more-->

## The Main Problems

- Botnets
- Viruses
- Keyloggers
- Crypto Miners

> But what about Virus scan? Tiny11 is CLEAN!

Antivirus is just a security layer and should NEVER be relied on. More often than not, it will allow viruses through or classify legit programs as viruses. 

### How do they bypass Antivirus? 

When you are distributing an entire operating system, like Tiny11, anything can be modified. Keyloggers can be loaded before an antivirus or have them part of edge. You could steal session tokens from your logged in accounts, or modify Windows defender to exclude the viruses at a system level.

### By why would Tiny11 do this?

Redistributing any form of a modified Windows is illegal. A man was sentenced to 15 months in prison just for Redistributing restore discs preventing ewaste _Source:_ <https://www.polygon.com/windows/2018/4/25/17280178/eric-lundgren-windows-restore-disks-microsoft-prison>.

Not only is the Tiny11 developer risking prison time if caught, but what motivates any custom iso maker given the risks? These are real questions that anyone with ANY common sense would come to the conclusion there has to be a payout somewhere. A small harmless program using your system to mine resources? keylogging passwords or credit cards? Spread chaos? or use you to attack others in a Botnet? 

All these are strong motivators, but it's possible they are breaking the law just so you can have a clean version of Windows out of the goodness in their heart. You decide, but don't be shocked when you are compromised when using any custom ISO. 

## Building Yourself

Build with <https://github.com/ntdevlabs/tiny11builder>, but do NOT use the oscdimg.exe as the signing is missing a proper timestamp. Always use official Microsoft tools from their website. oscdimg.exe is included in the Windows ADK Package located @ <https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install>

**Why should you not trust digital signatures** - Check out the latest hack from 3cx and it exploiting them in this article: <https://www.bleepingcomputer.com/news/microsoft/10-year-old-windows-bug-with-opt-in-fix-exploited-in-3cx-attack/>

## Walkthrough Video

{{< youtube "3UVKfliA_Rc" >}}
