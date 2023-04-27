---
title: "AtlasOS Review"

date: 2023-04-27
url: /atlasos-review/
image: images/2023-thumbs/atlasos-review.jpg
categories:
  - Windows
tags:
  - AtlasOS
draft: false
---
I don't review Custom ISO or Custom Windows. Anything that requires downloading ISO is an immediate red flag. AtlasOS takes a different approach using official Microsoft ISOs and modifying them using an open source tool. 
<!--more-->


## What is it?

A stripped version of windows that has had a LOT of Microsoft's tools and bloat removed. It is NOT to be used lightly or by an uneducated or non-tech savvy person! However, in the right hands it can be a good tool when you have a specific need, but I would NOT daily drive it.

## The Main Issues

I take issue with its main marketing being "secure", when it is anything but secure. I do not like Defender, Edge, MRT, or any numerous microsoft security projects built in to Windows, but saying you are more secure by not having them is madness. 

They did make a thread about this on twitter below addressing some of the backlash since the Linus Tech Tips coverage.

{{< twitter user="AtlasOS" id="1651284816489336832" >}}

AtlasOS 22H2 (Current Release) has the following security issues:

- No Windows Updates (Updates are done manually using their EXE tool and this can be hit and miss)
- MRT is missing. (Malicious Removal Tool)
- Defender is gone. (Good performance boost, but most people need an Anti-Virus.)
- Anything related to SecHealth, HealthCheck, MsMpEng, SmartScreen, and any Misc. Tools for virus or malware protection.
- Some security improvements in Networking configuration were made, but they disable most logging which makes it less secure.
- Automatic Elevation of Admin without Consent Ex. `ConsentPromptBehaviorAdmin` entry `0` - Will NOT prompt user.
- Virtualization Based security
- Spectre and Meltdown mitigations removed

### What Else was Removed?

- Microsoft Edge
- Internet Explorer
- WebView
- OneDrive
- MSPaint
- OneNote
- OfficeHub
- Solitare
- Many other MS Store Apps (Maps, Feedbackhub, Camera, etc.)
- Error Reporting
- Telemetry
- Logging (Printer, Events, Etc.)
- Windows Restore and Restore Points
- Remote Assistance
- Microsoft Sign-In (Login for PC)
- Background Apps

### Improvement suggestions for AtlasOS

- Defrag tasks should be left alone. Windows Defrag does utilize TRIM on ssd's and should be run. 
- Disk Cleanup tasks are also beneficial.
- Inform the public that this is a VERY INSECURE spin that is an EXTREME DEBLOAT!
- Offer a Security flavor that has all the security issues addresed
- Enable VBS (Virtualization based security) - In testing this netted no performance gains
- Logging needs to be more robust and is too stripped down. Troubleshooting an AtlasOS system would be a nightmare.
- Fill out the "what is removed section" in FAQ.
- Better documentation. Example: unpacking the playbook with the password `malte` is hard to find.
- Incorporate basic security hygiene - Check out the project <https://github.com/securitywithoutborders/hardentools>

## Who is this for?

Its for someone with a specific purpose in mind. Playing a few games, a kiosk, or using the machine for simple tasks. It is NOT suitable for browsing the internet or using as a daily driver in it's current state. If you are aware of the security issues, and have the ability to navigate them, it *might* be for you. For the average user... HELL NO! 

{{< twitter user="christitustech" id="1651325245209341959" >}}

## Walkthrough Video

{{< youtube UICz1S1xuHo >}}
