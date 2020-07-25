---
title: Get rid of Amazon Fire Launcher without root access
author: Chris Titus
type: post
date: 2017-07-10T21:46:28+00:00
url: /amazon-fire-launcher/
categories:
  - Android
tags:
  - Amazon Fire

---
This How-To shows you how to get rid of Amazon Fire Launcher without root access. Amazon Fire 5.3.3 OS can&#8217;t be downgraded or rooted, and since the Fire tablet line auto-updates, this leads many folks with the horrible experience of using the Fire OS with their gimped store/subscriptions.<!--more-->

The process to use Google Services and Googles Store instead is a bit involved but entirely doable on the Fire Tablets without having to root it. From then on, you don&#8217;t have to navigate the out of date and limited Amazon App Store.

### Here is the process:

  * Enable ADP USB Debugging (Settings -> Device -> Tap Serial 10 Times -> Select Developer options -> Turn ADP Debugging ON)
  
![ADP Enable](/wp-content/uploads/2017/07/ADP-Enable.png)

  * Enable Downloads from Unknown Sources (Settings -> Security -> Allow Unknown Sources ON)
  
![Unknown Sources](/wp-content/uploads/2017/07/Unknown-Sources.png)

  * Install Google Play Services 
      * Plug Device into USB on Computer and run the Supertool as Administrator 
          * On Tablet Select Always Allow this computer and press OK
          * Download this zip file <http://rootjunkysdl.com/files/?dir=Amazon%20Fire%205th%20gen/SuperTool>
          * Run 1-Amazon-Fire-5th-gen.bat
          * Select Install Google Play Services/Framework
          * Wait for it to Finish and Close the program
  * Launch Google Play using Search on Home Screen
  
![Search Play](/wp-content/uploads/2017/07/Search-Play.png)

  * Sign-in to Google
  * Update Google Play Services (Note: you can type Google Play Services in or launch update from the notifications tray &#8212; This will take 5-10 minutes to update)
  * Install Nova Launcher from Play next
  * Download the following APK to change the Amazon Fire&#8217;s Default Launcher. Afterward, on the tablet open Google Chrome or Amazon Silk Browser enter this address: <http://bit.ly/amalaunch>

_Note: This is the shortlink for https://github.com/BaronKiko/LauncherHijackV2/releases/download/2.1/LauncherHijackV2.1.apk Github project. It is open source and I encourage you to look over the project on your PC so you aren&#8217;t blindly installing things on your tablet._

  * Install the HijackLauncherV2.apk and Open it
  * Select Nova Launcher in the App and hit Ok at the prompt
  * Go back to settings -> Accessibility ->To detect home button press -> Switch to On
  
![Hijack Launcher](/wp-content/uploads/2017/07/HijackLauncher.png)

**Finished, Enjoy being able to use Google Services on your Amazon Fire!**

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
