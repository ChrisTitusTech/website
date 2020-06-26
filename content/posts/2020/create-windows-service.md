---
title: "How to Create a Windows Service"
type: post
date: 2020-06-15T23:33:56-05:00
url: /create-windows-service/
thumbnail: /images/2020-thumbs/create-windows-service.jpg
categories:
  - Windows
tags:
  - PowerShell
---
This article goes over how to create a windows service.
<!--more--> I will be going over 3 different ways to create a windows service. Check the legend to skip to the method you'd like to use. They will be: PowerShell, 3rd Party Tool, and Windows Resource Kits. 

## Create Windows Service with PowerShell
Microsoft Source Article with ALL Syntax - [Microsoft Link](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/new-service?view=powershell-7)

TestService Example:  
`New-Service -Name "TestService" -BinaryPathName "C:\WINDOWS\System32\svchost.exe -k netsvcs"`

## Create Windows Service for Java Applications with WinSW
[https://github.com/winsw/winsw](https://github.com/winsw/winsw) is the project that is a fantastic wrapper for windows services.  
You will download this exe and rename it to your needs. It is configured by the included XML file under the same name. 

## Create Windows Service with NSSM
[http://nssm.cc](http://nssm.cc) is the official site for this 3rd party tool method. 

To show service installation GUI:  
`nssm install [<servicename>]`

To install a service without confirmation:  
`nssm install <servicename> <app> [<args> ...]`

To show service editing GUI:  
`nssm edit <servicename>`

To retrieve or edit service parameters directly:  
`nssm get <servicename> <parameter> [<subparameter>]`  
`nssm set <servicename> <parameter> [<subparameter>] <value>`  
`nssm reset <servicename> <parameter> [<subparameter>]`

To show service removal GUI:  
`nssm remove [<servicename>]`

To remove a service without confirmation:  
`nssm remove <servicename> confirm`

## Create Windows Service with Windows Server Resource Kit 2003
  - Download Windows Server Resource Kit [here](http://www.microsoft.com/downloads/details.aspx?FamilyID=9d467a69-57ff-4ae7-96ee-b18c4790cffd&DisplayLang=en)
  - Run the executable to install the Resource Kit
  - Open up a command prompt and run the following to install a service stub (default install location used in this example):
  - You may substitute "EQBC Service" with whatever name you would like to give to the service for display purposes
```
"C:\Program Files\Windows Resource Kits\Tools\instsrv.exe" "New Service" "C:\Program Files\Windows Resource Kits\Tools\srvany.exe"
```
  - Run regedit to edit the Windows registry, and navigate to the following registry key: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\New Service`
  - From the Edit menu, select New, select Key, and name the new key Parameters
  - Highlight the Parameters key
  - From the Edit menu, select New, select String Value, and name the new value Application
  - From the Edit menu, select Modify, and type in the full path name and application name, including the drive letter and file extension.
  *Example:* `C:\MQ2\eqbcs.exe`
  - Now go to Start and Run and type in `services.msc`
  - From here scroll down to New Service (or whatever name you gave the service above), right-click and select Properties
  - On the General tab, change the Startup type to `Automatic`
  - Click the Start button to start your service
  - Select the Recovery tab, and you have the option of changing the drop-down boxes for First-Failure and so on to Restart the service
  - Select OK and you are finished

## Conclusion
Each one of these ways have their uses and I have used each method for different programs. It is great to learn to use all of the above examples or at least make yourself familiar with them. 

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
