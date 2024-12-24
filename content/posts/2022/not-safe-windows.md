---
title: "You are NOT safe in Windows"

date: 2022-07-15T13:14:39-05:00
url: /not-safe-windows/
image: images/2022-thumbs/not-safe-windows.webp
categories:
  - Windows
tags:
  - Security
---
Thank you to all the Microsoft Windows users from all the Technicians that work on this operating system. Without your continued use, we wouldn't have jobs. 
<!--more-->
## Why is Windows NOT secure?
Legacy systems and a fundamental flaw in system design. It is far to easy to get system level access through a variety of methods. Let's go over the systems that you can use to exploit a traditional Windows user, so you know what NOT to do. 

### PowerShell
Powershell is one of the most powerful tools in Windows, but it is at a cost. While it makes it incredibly easy to administrator and make modifications to massive amounts of systems quickly, it can be abused. Pretty much anything you want to do can be accomplished with Powershell. This is most evident in business systems where it is required to administer systems and even Office 365 in the cloud. 

### Task Scheduler
So many processes end up running at a system level in Task scheduler and something the core system relied heavily on. This can not be disabled and is always one of the biggest Achilles heels for Windows. I am often disabling tasks to debloat systems such as auto-submission tools Microsoft uses like Telemetry and even Defender bug reports. 

### Visual Basic - .vbs scripts
VBS scripts often provide a level of scripting that isn't possible with many other methods. While this is good in business, it is very bad for the end user. I designed a vbs script to migrate on-premises outlook mailboxes to O365 mailboxes so a thousand users wouldn't have to redownload all their emails. However this can easily be abused for those malicious actors out there. Be cautious of this loophole and any vbs script that runs on your system. 

### Group Policy
Again this is used in many pro+ systems and even if you aren't part of a domain can be abused by using `gpedit.msc` to create a local policy that can run scripts, lock user features, and much more. Home users typically don't have this functionally unless a hack is done. 

If you want Group Polcy as a home user type the following in an elevated to Administrator prompt:
```
dism /online /norestart /add-package:"%SystemRoot%servicingPackages{{PackageFileName}}**
```

### Registry
So many things can be accomplished with the registry, such as auto login, and various hooks that can happen by just launching your web browser or windows explorer. Registry is basically the brain of windows and can be exploited easily to do pretty much anything.

## How to protect yourself
I highly recommend hardening your system with just basic tools that do NOT run in the background, but disable many of the tools above. These tools are wonderful in the right hands, but world ending the wrong ones. 

A simple free hardening tool on Github will disable many of these attack surfaces and do FAR more than any antivirus or internet security suite can, while also not adding ANY overhead or extra processes to your system. 

HardenTools to disable services: <https://github.com/securitywithoutborders/hardentools>

![harden](/images/2022/hardentools.webp)

## Walkthrough Video

{{< youtube Bh8HqxxI4pc >}}


