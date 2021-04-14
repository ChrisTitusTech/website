---
title: Spooler subsystem app high CPU usage on Windows 10
author: Chris Titus

date: 2017-05-02T19:53:16+00:00
url: /spooler-subsystem-app-cpu-usage/
image: /images/2017/05/Spooler-subsystem-app.png
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