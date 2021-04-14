---
title: Exclude shared mailboxes from Dynamic Distribution Group
author: Chris Titus

date: 2016-10-31T20:29:26+00:00
url: /exclude-shared-mailboxes-exchange/
image: /images/2014/01/logo-Exchange-Color.jpg
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