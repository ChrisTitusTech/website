---
title: Spooler subsystem app high CPU usage on Windows 10
author: Chris Titus
type: post
date: 2017-05-02T19:53:16+00:00
url: /spooler-subsystem-app-cpu-usage/
image: /wp-content/uploads/2017/05/Spooler-subsystem-app-624x163.png
categories:
  - Windows
tags:
  - Windows 10

---
Perform the following steps to solve the Spooler subsystem app high CPU usage. I recently updated a computer to Windows 10 and found that the spooler service was using a lot of resources.<!--more-->

## The Solution

  * Open up command prompt as administrator and type the following

```
net stop spooler
del /Q /F /S "%systemroot%\System32\Spool\Printers\*.*"
net start spooler
```

## Conclusion

Now check task manager again and verify the Spooler subsystem app is now at 0% usage. Alternatively, you can disable the spooler service in services (Start -> Run -> Type: services.msc) and this will make sure it doesn&#8217;t run, however, it also means you can&#8217;t print.

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