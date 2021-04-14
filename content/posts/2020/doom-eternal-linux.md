---
title: "Doom Eternal Linux"

date: 2020-03-22T20:50:39-05:00
url: /doom-eternal-linux/
image: /images/2020-thumbs/doom-eternal-linux.jpg
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

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://christitus.com/lbry>

#### Exclusive Content

- [ChrisTitus.com Members Section][1] (_CC Only_)
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  - Monthly Members Only Video
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join