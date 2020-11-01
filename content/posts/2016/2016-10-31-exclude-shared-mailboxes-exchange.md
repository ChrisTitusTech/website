---
title: Exclude shared mailboxes from Dynamic Distribution Group
author: Chris Titus
type: post
date: 2016-10-31T20:29:26+00:00
url: /exclude-shared-mailboxes-exchange/
image: /wp-content/uploads/2014/01/logo-Exchange-Color.jpg
categories:
  - Windows Server
tags:
  - Exchange Online
  - Exchange Server
  - Powershell

---
This shows you how to exclude shared mailboxes from a Dynamic Distribution Group in Exchange Online. We will be using Powershell to make sure your shared mailboxes don&#8217;t get spam in them.<!--more-->

![Exclude Shared Mailboxes](/wp-content/uploads/2016/10/exclude-shared-mailboxes.png)

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
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join