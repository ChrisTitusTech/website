---
title: "How to Speed Up Your Amazon Fire Tablet"
type: post
date: 2020-07-21T12:37:54-05:00
url: /amazon-fire-debloat/
image: /images/2020-thumbs/amazon-fire-debloat.jpg
categories:
  - Android 
tags:
  - Amazon Fire
---
This Guide goes over over debloating amazon fire tablets and getting Google Store and regular tablet functionality out of them.
<!--more-->

## Tools and Sources Used

- Debloat Amazon Fire (XDA Developers): [Amazon Fire Toolbox](https://forum.xda-developers.com/hd8-hd10/development/official-amazon-fire-toolbox-v1-0-t3889604)
- Screenshare Any Android Device (GitHub Project): [scrcpy](https://github.com/Genymobile/scrcpy)
  - YouTube Video Link for scrcpy: <https://youtu.be/VMQfH2Qkuss>

## Prerequisites

- No Root Required
- Developer Mode Unlocked
- USB Debugging Enabled in Developer Tools
- Compatibility:

{{< notice info >}}
Amazon Fire 8/8+ (2020)
Amazon Fire 10 (2019)
Amazon Fire 7 (2019)
Amazon Fire 8 (2018)
Amazon Fire 10 (2017)
Amazon Fire 8 (2017)
Amazon Fire 7 (2017)
Amazon Fire HD8 (2016)
Amazon Fire HD10 (2015)
Amazon Fire HD8 (2015)
Amazon Fire HD7 (2015)
Amazon Fire HD7 (2014)
Amazon Fire HD6 (2014)
{{< /notice >}}

## Enabling Developer Mode

***
![Dev Tools](/images/2020/debloat-amazon/dev-tools.jpg)
***

- Settings > Device Options > About Fire Tablet and tap on the Serial Number until you unlock Developer Options
- Settings > Device Options > Developer Tools and enable USB Debugging

***
After doing this plug your tablet in to your computer and tap authorize device. If you don't see authorization prompt, change USB mode to file transfer or it may already be authorized from a past attempt. Check the Toolbox app in the next step to verify. 

## Amazon Fire Toolbox Usage

### Main Menu

***
![Toolbox](/images/2020/debloat-amazon/toolbox.png)
***

#### Options you need

1. Manage Everything Amazon
     - Disable all amazon apps
2. Custom Launcher 
      - Change to Nova Launcher from Amazon
3. Google Services (Manage)
      - Install Google Play and Google Sign-In

#### Optional Features on Main Menu

- ADB Shell
  - *Command Line for ADB*
- Hybrid Apps
  - *Installing Netflix or Disney- Not needed when using Google Store*
- Lockscreen Wallpaper 
  - *Doesn't remove ads - Done with another package*
- Density Modifier
  - *Changes DPI*
- Google Assistant
  - *Uses Google Assistant instead of Alexa*
- Modify System Settings
  - *Disable automatic system/app updates, and turn off Over the Air updates*
- Power Options
  - *Power Off, Reboot, Bootloader Selection*

### Second Menu

***
![Toolbox2](/images/2020/debloat-amazon/toolbox2.jpg)
***

#### Recommended Options

- Remove Lockscreen Ads
  - This setups an automation sequence that constantly scans and removes amazon ads. Here are the detailed instructions:

{{< notice info >}}
<ul><li>Click Remove Lockscreen Ads in Amazon Fire Toolbox</li>
<li>Launch Automate Settings</li>
<li>Check "Run on system startup"</li>
<li>Import Adblocker script into Automate
<ul><li><i>To import: click magnifying glass, type Amazon, and click "Amazon Lockscreen Ads Remover V4.5"</i></li></ul></li>
<li>Return to Home screen of Automate and click the Ads Remover</li>
<li>Done!</li>
{{< /notice >}}

#### Optional Items on Second Menu

- Parental Control Hide
- System Backup
  - *Excellent backup and restore tool for your tablet*
- Push and Pull 
  - *File Transfer to and from tablet*
- User Management
  - *Add Accounts for Google, LinkedIn, Patreon, etc.*
- YouTube Clients
  - *APK files for Vanced and other YouTube alternative apps*
- Screen Capturing
  - *Record or Screenshot on your tablet*
- Sideload Apps
  - *Select APK files to upload OR search for APK files on internet*

## Conclusion

This tool is a fantastic way to debloat a new fire tablet and get greater functionality from it. The added utilities I rarely use, but can be very nice for some users.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
