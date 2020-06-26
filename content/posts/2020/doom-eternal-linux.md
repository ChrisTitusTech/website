---
title: "Doom Eternal Linux"
type: post
date: 2020-03-22T20:50:39-05:00
url: /doom-eternal-linux/
thumbnail: /images/2020-thumbs/doom-eternal-linux.jpg
categories:
  - Linux
tags:
  - Gaming
---
This post is here to help guide you through setting up doom eternal on Linux. 
<!--more-->

# Requirements
We will be using Glorious Eggroll's version of proton which is very easy to install and update with an update script. You can manually install this if you don't want to do the "easy way". 

## Custom Proton GE Edition Install
Run the following commands:  
```
wget https://raw.githubusercontent.com/flubberding/ProtonUpdater/master/cproton.sh
sudo chmod a+x cproton.sh
sh cproton.sh
```

You will be prompted if you want to update it just type yes.  
This will install the new GE proton into the ~/.steam/root/compatibility.d (arch) and ~/.steam/compatibility.d (debian) respectively. 

## Modifying Steam Launch Options
By default, the default settings will still make it so you are unable to launch the game. I found using the following in steam launch options not only fixes the problems but makes it perform better and get you to the title screen faster. 
```
RADV_PERFTEST=llvm PROTON_NO_ESYNC=1 %command% +in_terminal 1 +com_skipIntroVideo 1 +com_skipKeyPressOnLoadScreens 1 +com_skipSignInManager 1
```
If you still encounter issues install the AMDVLK package [https://github.com/GPUOpen-Drivers/AMDVLK](https://github.com/GPUOpen-Drivers/AMDVLK)  
*Note: Nvidia card users can't use this package and are currently having issues with Doom*

## Video Walkthrough
[![doom guide](https://img.youtube.com/vi/g3UPxd8iUsU/0.jpg)](https://www.youtube.com/watch?v=g3UPxd8iUsU)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

# Conclusion
All testing was done with a Linux box using an AMD Radeon RX580. Refer to the video above for a look at the performance. I have noticed a lot of people online complaining that they are still having performance problems, but all of them seem to be nVidia users.  
All these fixes should be merged in to the official version of proton in a couple months and you shouldn't need to do any of this once this is done. 

Have Fun and Game On!

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
