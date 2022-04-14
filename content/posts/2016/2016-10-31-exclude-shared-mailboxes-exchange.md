---
title: Exclude shared mailboxes from Dynamic Distribution Group
author: Chris Titus

date: 2016-10-31T20:29:26+00:00
url: /exclude-shared-mailboxes-exchange/
image: images/2014/01/logo-Exchange-Color.jpg
categories:
  - Windows Server
tags:
  - Exchange Online
  - Exchange Server
  - Powershell

---
This shows you how to exclude shared mailboxes from a Dynamic Distribution Group in Exchange Online. We will be using Powershell to make sure your shared mailboxes don&#8217;t get spam in them.<!--more-->

![Exclude Shared Mailboxes](/images/2016/10/exclude-shared-mailboxes.png)

### Commands

#### Connect to O365 in PS:

```
$UserCredential = Get-Credential
$Session = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri https://outlook.office365.com/powershell-liveid/ -Credential $UserCredential -Authentication Basic -AllowRedirection
Import-PSSession $Session
```
#### Exclude Shared Mailboxes with this filter command:

`set-DynamicDistributionGroup -Name "all@yourcompany.com"  -RecipientFilter {((RecipientType -eq 'UserMailbox') -and -not (RecipientTypeDetailsValue -eq 'SharedMailbox'))}`

### Conclusion

Afterward, Verify in Exchange Admin Console. You always want to prevent your shared mailboxes from getting spammed in a distribution group. Consequently, I&#8217;d highly recommend setting a requirement to send to-these dynamic mailboxes. This will prevent every employee from sending emails to everyone, which will be a bad thing.

