---
title: Target Specific People or Computers with Item-Level Targeting in GPOs
author: Chris Titus
type: post
date: 2011-03-22T21:59:02+00:00
url: /target-specific-people-or-computers-with-item-level-targeting-in-gpos/
categories:
  - Windows Server

---
Using Group Policy Objects can be a huge time saver, but if used improperly can be a big headache. Once you&#8217;ve messed around with GPO settings enough, you quickly figure out that you need to create new GPOs for specific programs, events, etc&#8230; that are not all in one GPO. This gives you a lot more flexibility and makes it very easy to track down troublesome GPO related issues when done properly. <!--more-->Now lets say you create a Power Savings GPO that you want to apply only to computers that meet certain conditions. WMI, Security, and Site Filtering are all too broad for this task, and you want to use Item-Level Targeting. After you create your Group Policy Object you will need to add this setting to the GPO.

**In Group Policy Management Settings**
  
-User Configuration -> Preferences -> Control Panel -> Regional Options
  
-Right-Click and Select New
  
-Navigate to Common Tab
  
-Check Item-Level Targeting and Press Targeting&#8230;

From here you will be able to select tons of critaria that you want to meet for your GPO. This can be system requirements to install a program, or only select certain Operating Systems. You can also add is not tags that will rule out any computer that meet that criteria. The options are limitless and its very easy to incorporate in your GPO. Personally, I never use the often complicated and time consuming WMI Filters anymore.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
