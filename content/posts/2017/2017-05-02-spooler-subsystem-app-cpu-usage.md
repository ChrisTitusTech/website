---
title: Spooler subsystem app high CPU usage on Windows 10
author: Chris Titus

date: 2017-05-02T19:53:16+00:00
url: /spooler-subsystem-app-cpu-usage/
image: images/2017/05/Spooler-subsystem-app.webp
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

