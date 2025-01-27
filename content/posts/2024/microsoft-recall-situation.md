---
title: "The Microsoft Recall Situation"

date: 2024-10-28
url: /microsoft-recall-situation/
image: images/2024-thumbs/microsoft-recall-situation.webp
categories:
  - Windows
tags:
  - Recall
draft: false
---
The Microsoft Recall situation is a serious issue as the feature has been spotted in all systems that are updated in 24H2. Let's go over what this feature is and how it is implemented depending on your system.
<!--more-->

## What is Recall

Microsoft Recall is a feature that takes screenshots every 5 seconds and OCR's what is on your screen so it can "recall" anything you have done on your PC. This feature is a serious privacy concern as it can capture sensitive information. Microsoft has promised that it only stores this data locally and does not send it to their servers.

## Recall on 24H2

This feature was initially said to only work with ARM-based CPUs with a Copilot+ chip or NPU chip. However, it has been spotted on all systems that have been updated to 24H2. What is it doing and is it active on all these x86 systems?

## How to Check or Disable Recall Feature

```
DISM /Online /Get-FeatureInfo /FeatureName:Recall
```

Disable Recall

```
DISM /Online /Disable-Feature /FeatureName:Recall
```

*Note: removing recall feature from an offline image breaks the new file explorer reverting its look to the old one.*

Source files referenced in Feature located in `C:\Windows\SystemApps\MicrosoftWindows.Client.AIX_cw5n1h2txyewy`

![](/images/2024/microsoft-recall-situation/recall-aix-files.png)

## Recall Requirements

- A Copilot+ PC
  - Qualcomm's Snapdragon X Elite processors
  - Intel's Core Ultra processors
  - AMD's AI 300 Series processors
  - Besides the Copilot+ Certification, it maybe possible with any CPU with a NPU chip.
- Windows 24H2
- 16 GB RAM
- 8 logical processors
- 256 GB storage capacity
  - To enable Recall, you need at least 50 GB of space free
  - Snapshot capture automatically pauses once the device has less than 25 GB of disk space available

## Explorer Recall Problems

If you remove Recall from an offline image, the new file explorer will break and revert to the old one. This is was originally thought to be from the removal of the Recall feature, but it is actually due to the removal of the AIX package which in turn removes the `Microsoft.WindowsAppRuntime.CBS_cw5n1h2txyewy` package. 

This CBS package is a library responsible for the new file explorer and removing it will revert the file explorer to the old one.

So why did this happen? The AIX package (AKA Recall) manifest references the CBS package, so when you remove the AIX package, it removes the CBS package as well. MicrosoftWindows.Client.FileExp_cw5n1h2txyewy (File Explorer) is dependent on the Microsoft.WindowsAppRuntime.CBS_cw5n1h2txyewy package but it is not referenced in the File Explorer manifest.

This would cause the new file explorer to break and revert to the old one because that package is a library that gives the new look to explorer with tabs.

### The Explorer Fix in Offline Images

To fix the new file explorer in offline images, you need to add the `Microsoft.WindowsAppRuntime.CBS_cw5n1h2txyewy` package back to the image. This can be done by adding the package back to the image using the following command:

This was done in pull request #2947 Source: <https://github.com/ChrisTitusTech/winutil/pull/2947/files>

```
 # Detect Windows 11 24H2 and add dependency to FileExp to prevent Explorer look from going back - thanks @WitherOrNot and @thecatontheceiling
        if ((Test-CompatibleImage $imgVersion $([System.Version]::new(10,0,26100,1))) -eq $true)
        {
            try
            {
                if (Test-Path "$scratchDir\Windows\SystemApps\MicrosoftWindows.Client.FileExp_cw5n1h2txyewy\appxmanifest.xml" -PathType Leaf)
                {
                    # Found the culprit. Do the following:

                    # 1. Take ownership of the file, from TrustedInstaller to Administrators
                    takeown /F "$scratchDir\Windows\SystemApps\MicrosoftWindows.Client.FileExp_cw5n1h2txyewy\appxmanifest.xml" /A

                    # 2. Set ACLs so that we can write to it
                    icacls "$scratchDir\Windows\SystemApps\MicrosoftWindows.Client.FileExp_cw5n1h2txyewy\appxmanifest.xml" /grant "$(Get-LocalizedUsers -admins $true):(M)" | Out-Host

                    # 3. Open the file and do the modification
                    $appxManifest = Get-Content -Path "$scratchDir\Windows\SystemApps\MicrosoftWindows.Client.FileExp_cw5n1h2txyewy\appxmanifest.xml"
                    $originalLine = $appxManifest[13]
                    $dependency = "`n        <PackageDependency Name=`"Microsoft.WindowsAppRuntime.CBS`" MinVersion=`"1.0.0.0`" Publisher=`"CN=Microsoft Corporation, O=Microsoft Corporation, L=Redmond, S=Washington, C=US`" />"
                    $appxManifest[13] = "$originalLine$dependency"
                    Set-Content -Path "$scratchDir\Windows\SystemApps\MicrosoftWindows.Client.FileExp_cw5n1h2txyewy\appxmanifest.xml" -Value $appxManifest -Force -Encoding utf8
```

## Credits

Big shoutout to WitherorNot, CodingWonders, fish bazooka, and thecatontheceiling for figuring out the fix for the new file explorer in offline images and tracking down this information.

## Walkthrough Video

{{< youtube "gBqIUkmVel8" >}}
