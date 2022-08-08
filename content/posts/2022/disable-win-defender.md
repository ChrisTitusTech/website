---
title: "Disable Win Defender"

date: 2022-08-12
url: /disable-win-defender/
image: images/2022-thumbs/disable-win-defender.jpg
categories:
  - Windows
tags:
  - Microsoft Defender
draft: false
---
Windows Defender can be a massive drain on system performance and often can have a lot of false positives. While I recommend Anti-virus for most, I don't like having it enabled on my systems that aren't used for web browsing. <!--more-->

## How Secure is Windows Defender
I often hear the phrase and have used the phrase "Windows Defender is good enough", but often get mistaken in to thinking Defender is a good Anti-Virus. For detection rates it is good, but for protection it is NOT! Why? Anyone with a little bit of knowledge knows how to disable it without the user even knowing it. The services, registry entries, and built-in windows policies are designed to make it easy for an administrator to disable it. Why does Microsoft make it so easy to disable it? Simple, Windows in business environments never use Defender and administrators need to disable it. 

## What are the methods to disable defender?
There are a multitude of ways to disable defender or render it useless. Most properly programmed viruses will utilize one or more of these methods below.

### Windows Settings
Turn off Tamper Protection and Real-Time monitoring. 

![real-monitoring](/images/2022/remove-win-defender/real-monitoring.png)

### Registry
There are so many registry settings, but the main ones to focus on are below:

```
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows Defender\Features]
"MpPlatformKillbitsFromEngine"=hex:00,00,00,00,00,00,00,00
"TamperProtectionSource"=dword:00000000
"MpCapability"=hex:00,00,00,00,00,00,00,00
"TamperProtection"=dword:00000000

[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender]
"PUAProtection"=dword:00000000
"DisableRoutinelyTakingAction"=dword:00000001
"ServiceKeepAlive"=dword:00000000
"AllowFastServiceStartup"=dword:00000000
"DisableLocalAdminMerge"=dword:00000001
"DisableAntiSpyware"=dword:00000001
"RandomizeScheduleTaskTimes"=dword:00000000

[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Microsoft Antimalware]
"ServiceKeepAlive"=dword:00000000
"AllowFastServiceStartup"=dword:00000000
"DisableRoutinelyTakingAction"=dword:00000001
"DisableAntiSpyware"=dword:00000001
"DisableAntiVirus"=dword:00000001

[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender\Real-Time Protection]
"DisableRealtimeMonitoring"=dword:00000001
"DisableBehaviorMonitoring"=dword:00000001
"DisableOnAccessProtection"=dword:00000001
"DisableScanOnRealtimeEnable"=dword:00000001
"DisableIOAVProtection"=dword:00000001
"LocalSettingOverrideDisableOnAccessProtection"=dword:00000000
"LocalSettingOverrideRealtimeScanDirection"=dword:00000000
"LocalSettingOverrideDisableIOAVProtection"=dword:00000000
"LocalSettingOverrideDisableBehaviorMonitoring"=dword:00000000
"LocalSettingOverrideDisableIntrusionPreventionSystem"=dword:00000000
"LocalSettingOverrideDisableRealtimeMonitoring"=dword:00000000
"RealtimeScanDirection"=dword:00000002
"IOAVMaxSize"=dword:00000512
"DisableInformationProtectionControl"=dword:00000001
"DisableIntrusionPreventionSystem"=dword:00000001
"DisableRawWriteNotification"=dword:00000001
```

For a more comprehensive list check out: <https://christitus.com/files/windefender_disable.reg>

### Services
List of Services Windows Defender uses and relies upon.

 - WdNisSvc
 - WdNisDrv
 - WdFilter
 - WdBoot
 - wcncsvc

### Files
There are a ton of program files and logs for Windows Defender located at `C:\Program Files\Windows Defender`

### Powershell
This can be used to do temporary disable parts or all of Defender as well. Here is some basic command I used and shared on Twitter:

{{< tweet user="christitustech" id="1556368265139585026" >}}

## GitHub Projects - CAUTION!
Here are a couple GitHub projects that will completely destroy defender and when used improperly can even be used to deliver virus payloads onto systems

 - <https://github.com/jbara2002/windows-defender-remover>
 - <https://github.com/swagkarna/Defeat-Defender-V1.2>
 - <https://github.com/qtkite/defender-control>

## Walkthrough Video

{{< youtube 11111111 >}}