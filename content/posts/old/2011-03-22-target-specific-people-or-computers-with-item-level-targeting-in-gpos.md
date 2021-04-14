---
title: Target Specific People or Computers with Item-Level Targeting in GPOs
author: Chris Titus

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