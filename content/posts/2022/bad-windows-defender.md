---
title: "Why I Hate Windows Defender"

date: 2022-07-11T11:36:33-05:00
url: /bad-windows-defender/
image: images/2022-thumbs/bad-windows-defender.webp
categories:
  - Windows
tags:
  - Windows Defender
tables:
  ev-table:
    - ["Extended Validation", "Regular Validation"] # <-- this row is used as the column headers
    - ["Hardware Key", "Software Key"]
    - ["Smartscreen Bypassed", "Smartscreen Error"]
  ev-cost:
    - ["Site","Extended Validation", "Regular Validation"] # <-- this row is used as the column headers
    - ["Comodo","$319", "$85"]
    - ["Instant SSL","$299", "$166"] 
    - ["Sectigo","$399", "$179"] 
    - ["DigiCert","$566", "$404"] 
---
Windows Defender is often seen as a good antivirus, but I want to inform you of a cost noone sees but developers because of Defender.
<!--more-->
## Is Windows Defender Good?
Yes. It does detect a ton of viruses and have good detection rates as long as you are online, since it relies heavily on its online connection. However, there is a dark side to having Microsoft control this entire part of your PC that we need to go over. The false positives are excessive and I believe it is by design. 

## The Mafia for Software Developers

![bad-defender](/images/2022-thumbs/bad-windows-defender.webp)

Smartscreen is powered by Windows Defender and you have to buy a $300 A YEAR code signing license with Extended Validation to bypass it. The EV cert is close to the mafia extorting business users for "protection". If you don't use Defender, you don't need to worry about smartscreen. Using standard code signing with an external anti-virus will work close to the same as Defender is disabled when you use a 3rd party av. 

### Code Signing Cost

_Cost for 1 year - prices as of 7/11/2022_

{{< table "ev-cost" >}}


The big question is "Why does extended validation cost so much more?" and it is simply gatekeeping at its best. Many SSL companies will tell you it is because the "vetting process is harder", but I smell bullshit on that. It costs usually double and sometimes more. The only difference is it requires a hardware cryptographic key and Microsoft smartscreen immediately gives it a pass on all scans. 

{{< table "ev-table" >}}

I can't find anything in regards to who is really profiting the most of the Extended Validation code signing and if Microsoft is getting a cut since it is basically the only reason to have one. However, the entire situation is a bit suspect and any development person I know loath the process that Extended Validation is. 

## Free Anti-Virus Alternatives
Is there something better than windows defender that is free? I'd say [BitDefender Free](https://www.bitdefender.com/solutions/free.html) offers superior protection.

This is a drastic shift in recommendation for me, because I used to say "All Free AV is worthless", but now I see this from a different angle. Don't get me wrong most FREE antivirus is glorified advertising for a paid product that essentially does the same thing. After looking at all the free offerings, I'd say BitDefender Free is better than using Defender. 

## Paid Anti-Virus
For those that want good detection rates, better privacy, and low overhead. The antivirus I have recommend has stayed the same for years. I recommend [ESET](https://christitus.com/antivirus) for this because it is a proven antivirus that isn't as intrusive as the others. 

## Walkthrough Video

{{< youtube 9P6r7DLS77Q >}}


