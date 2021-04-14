---
title: “Target account name is incorrect” Domain Controller Error
author: Chris Titus

date: 2016-07-21T13:31:35+00:00
url: /target-account-name-domain-controller-error/
image: /images/2016/07/dcreplication.jpg
categories:
  - Windows Server

---
This article explains how to fix the &#8220;Target account name is incorrect&#8221; error you are getting on your domain controllers. This usually stems from a system administrator doing a snapshot revert on the Domain Controller which messes up the KDC service and domain replication. It also can happen if you had a DC offline for a long time 30+ days. <!--more-->

### Commands

  * Stop and disable the Key Distribution Center (KDC) service on the troubled domain controller 
```
net stop kdc
sc config "kdc" start= disabled
```
_Please Note: space is REQUIRED after start=_  
_Alternatively, you can do this from the Services Panel_
  * Purge the ticket cache on the local domain controller. 
`klist purge`  
_Note: you can use `klist tickets` to view tickets before purging them
    
      * Afterward, Reboot Troubled Domain Controller
    
      * Reset the troubled domain controller&#8217;s account password to the primary domain controller (PDC) emulator master using netdom /resetpwd. Find PDC using: netdom query fsmo 
          * `netdom /RESETPWD /s:pdcserver.domain.local /ud:domain\Administrator /pd:*`
    
      * Synchronize the domain directory partition of the replication partner with the PDC emulator master 
          * `repadmin /kcc`
    
      * Once more, Reboot the Troubled DC and start and enable the KDC on the local domain controller: 
```
sc config "kdc" start= auto
net start KDC
```
Typically I wait about 5-10 minutes after this and start doing checks to see if it is now replicating properly. You can also force a replicate using repadmin /replicate but usually not necessary. In the end, make sure you check to make you aren&#8217;t getting the &#8220;Target account name is incorrect&#8221; error anymore.
    
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