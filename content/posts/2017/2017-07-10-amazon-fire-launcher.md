---
title: Get rid of Amazon Fire Launcher without root access
author: Chris Titus

date: 2017-07-10T21:46:28+00:00
url: /amazon-fire-launcher/
categories:
  - Android
tags:
  - Amazon Fire

---
This How-To shows you how to get rid of Amazon Fire Launcher without root access. Amazon Fire 5.3.3 OS can&#8217;t be downgraded or rooted, and since the Fire tablet line auto-updates, this leads many folks with the horrible experience of using the Fire OS with their gimped store/subscriptions.<!--more-->

> This 2017 procedure is retained for historical reference. The SuperTool
> download is gone, and LauncherHijack is deprecated and may not install on
> current Fire OS releases.

The process to use Google Services and Googles Store instead is a bit involved but entirely doable on the Fire Tablets without having to root it. From then on, you don&#8217;t have to navigate the out of date and limited Amazon App Store.

### Here is the process:

  * Enable ADP USB Debugging (Settings -> Device -> Tap Serial 10 Times -> Select Developer options -> Turn ADP Debugging ON)
  
![ADP Enable](/images/2017/07/ADP-Enable.webp)

  * Enable Downloads from Unknown Sources (Settings -> Security -> Allow Unknown Sources ON)
  
![Unknown Sources](/images/2017/07/Unknown-Sources.webp)

  * Install Google Play Services 
      * Plug Device into USB on Computer and run the Supertool as Administrator 
          * On Tablet Select Always Allow this computer and press OK
          * The original SuperTool ZIP download is no longer available.
          * Run 1-Amazon-Fire-5th-gen.bat
          * Select Install Google Play Services/Framework
          * Wait for it to Finish and Close the program
  * Launch Google Play using Search on Home Screen
  
![Search Play](/images/2017/07/Search-Play.webp)

  * Sign-in to Google
  * Update Google Play Services (Note: you can type Google Play Services in or launch update from the notifications tray &#8212; This will take 5-10 minutes to update)
  * Install Nova Launcher from Play next
  * The former LauncherHijack APK is no longer distributed as a supported
    download. Its archived source remains at
    <https://github.com/BaronKiko/LauncherHijack>.

_Note: The project owner has deprecated LauncherHijack and recommends building
it from source with a different package name only if you understand the Android
build process._

  * Install the HijackLauncherV2.apk and Open it
  * Select Nova Launcher in the App and hit Ok at the prompt
  * Go back to settings -> Accessibility ->To detect home button press -> Switch to On
  
![Hijack Launcher](/images/2017/07/HijackLauncher.webp)

**Finished, Enjoy being able to use Google Services on your Amazon Fire!**
