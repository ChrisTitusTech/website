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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
