---
title: Exchange Online Archive Requirements
author: Chris Titus
type: post
date: 2015-08-27T18:41:57+00:00
url: /exchange-online-archive-requirements/
featured_image: https://christitus.com/wp-content/uploads/2015/08/exchange-online-archive.png
categories:
  - Windows Server
tags:
  - Exchange Online
  - Exchange Server

---
This article goes over Exchange Online Archive Requirements and the headache of licensing for it. I recently completed a staged migration from exchange 2007 to exchange online. If you have any users over 50 GB you need the exchange online archive. <!--more-->Upload all your archive files using Azure copy (see <https://docs.microsoft.com/en-us/office365/securitycompliance/use-network-upload-to-import-pst-files> for instructions). Afterward, make sure to check <https://outlook.office365.com/owa/> to verify the archive emails. You may notice that their outlook doesn&#8217;t show the archive. Well, you need the correct outlook license! I found the following article about Licenses and Exchange Online Archiving.

https://support.office.com/en-ie/article/Outlook-license-requirements-for-Exchange-features-46b6b7c5-c3ca-43e5-8424-1e2807917c99?ui=en-US&rs=en-IE&ad=IE&fromAR=1

## Which Outlook to use?

In short, If you don&#8217;t have Pro Plus, Stand-Alone Outlook, or Office E3+ plan you CAN NOT use the exchange online archive in outlook. Buy the appropriate license and then reinstall the office for that user. Its a pain, but needed for the archive to function properly. Personally, I just went ahead and bought the Pro Plus and installed it for that user since we only have one user needing it.

## Conclusion

In my opinion, this was a horrible licensing decision by Microsoft and they should revert it so any outlook can access it. In closing, the exchange online archive requires are a bit crazy, you need both the exchange archive plan and an outlook version that supports it. This couldn&#8217;t be any more confusing as Microsoft licensing usually is.

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