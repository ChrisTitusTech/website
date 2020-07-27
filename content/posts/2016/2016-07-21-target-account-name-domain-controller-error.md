---
title: “Target account name is incorrect” Domain Controller Error
author: Chris Titus
type: post
date: 2016-07-21T13:31:35+00:00
url: /target-account-name-domain-controller-error/
image: /wp-content/uploads/2016/07/dcreplication.jpg
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
    
I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
