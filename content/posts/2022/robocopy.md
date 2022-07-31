---
title: "Robocopy - Copying files the right way in Windows"

date: 2022-01-19T17:39:34-06:00
url: /robocopy/
image: images/2022-thumbs/robocopy.jpg
categories:
  - Windows
  - Networking
tags:
  - Robocopy
---
This guide shows how to copy files in windows when dealing with large volumes of files and very long file paths past 255 characters. 
<!--more-->

## What is Robocopy and Why use it?

Robocopy is a build in command line program that is fantastic at copying files quickly and bypasses many of the downsides of the standard copy process of windows. 

The downsides of Window's standard file copy are:

 - Has to read ALL files being copied BEFORE it will copy the first file
 - Artificial character limit of 255 that includes the filename and filepath. 
 - GUI limitations for LARGE amounts of files. 

## How to use Robocopy

Launch into the Command Prompt or Powershell by right-clicking Start Menu

![start-menu](/images/2022/01-Robocopy/start-menu.png)

From this interface you can now run Robocopy.

Basic Syntax:
```
C:\> robocopy "Source Directory" "Destination Directory" /e /w:5 /r:2 /COPY:DATSOU /DCOPY:DAT /MT
```

Full syntax can be shown with `robocopy /?` but be careful with /MIR and move style copies as this can overwrite and erase existing files in the destination directory. 

Notable Options with Robocopy

 - /e - Copy all folders including empty ones
 - /r - Retry times /r:0 means no retry on failed copy
 - /w - Wait time /w:0 means no wait between retry on failed copy
 - /COPYALL OR /COPY:DATSOU - Copy Data, Attributes, Timestamps, Security, Owner, and Auditing Info for files
 - /DCOPY:DAT - Copy Data,Attributes and Timestamps for Directories (Other Options are E=EAs-Extended Attributes, X=Skip alt data streams, but are almost never used)
 - /MT:n - Multithread transfer with n threads. Example /MT:4 - Use 4 threads to copy files. If no threads set, it will default to 8.
 - /MIR - Mirror Source to Destination - WARNING: WILL DELETE ANY FILES THAT DO NOT MATCH IN DESTINATION!
 - /MOVE - Moves from Source to Destination - WARNING: WILL DELETE ALL FILES FROM SOURCE AFTER COPY!
 - /LFSM:100M - Operate in Low Free Space Mode with 100 Megabytes. 10M = 10 Megabytes 1G = 1 Gigabyte
 - /B - Backup Mode - Great for system backups if you are part of Administrator or Backup Users group - NOT RECOMMENDED - Use 3rd party backup software
 - /ZB - Restartable Backup Mode - Tries to copy files with restartable and if it fails it restarts in backup mode - NOT RECOMMENDED - Use 3rd party backup software
 - /RH:1700-0900 - Scheduled run between 5PM and 9AM and will pause if it is during "business hours of 9AM-5PM"
 - /LOG+:C:\robocopy.log - Outputs everything to C:\robocopy.log (Note: if NOT running as admin you need to put this in your user folder C:\Users\username\robocopy.log) the + adds to the file.
 - /TEE - If using LOG and you also want console output, put the /TEE option in.

I don't recommend using backup, restartable mode, or jobs. Jobs typically miss options and 3rd party solution like veeam are FAR better for backups than robocopy EVER will be. 

### Walkthrough Video

{{< youtube 0q3rGK_IMZg >}}  
