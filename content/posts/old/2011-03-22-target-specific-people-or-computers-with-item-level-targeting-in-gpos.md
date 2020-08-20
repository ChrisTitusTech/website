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

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join