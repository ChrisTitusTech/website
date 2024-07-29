---
title: "Crowdstrike Alternatives"

date: 2024-07-26
url: /crowdstrike-alternatives/
image: images/2024-thumbs/crowdstrike-alternatives.jpg
categories:
  - Windows
tags:
  - Antivirus
draft: false
---
With Crowdstrike proving that it should NOT be used, here are some alternatives for MSPs and Enterprise users.
<!--more-->

## Why move from Crowdstrike

- Kernel Panics on RHEL systems June 2024 <https://access.redhat.com/solutions/7068083>
- Global Outage on Windows Systems July 2024
- Failure to follow client staging options. (Many MSPs reported that Crowdstrike failed to honor N-1 update policy and pushed updates anyways)
- Crowdstrike June 2024 update caused 100% CPU spikes on single core. <https://www.thestack.technology/crowdstrike-bug-maxes-out-100-of-cpu-requires-windows-reboots/>
- CEO used to be McAfee CTO during global outage in 2010 McAfee update that deleted svchost file and caused BSODs. <https://www.newsbytesapp.com/news/science/defective-mcafee-once-caused-worldwide-meltdown-of-windows-xp-pcs/story>

## Residential Users

In 2024, just use Windows Defender at this point. There is no reason to pay for an antivirus or security software for a home user in a non-managed scenario.

## MSP / Enterprise Users

The list of Crowdstrike Alternatives

### 1. Huntress

<https://www.huntress.com/>

Huntress is a unique managed security software in that it does NOT use its own antivirus. They use Windows Defender and have a robust reporting system. Most MSPs and technicians I talk to this is the pick for them. Pricing on this starts around $5 a seat per month and drops to about $2-3 a seat per month with 500+ users.

### 2. Blackpoint Security

<https://blackpointcyber.com/>

Blackpoint is the runner-up but also has a good track record in the MSP space. I personally have never dealt with them, but heard good things.

### 3. SentinelOne Security

<https://www.sentinelone.com/>

Probably the cheapest on this list, but also has a decent track record. I personally don't like the client because it is heavy and the reporting is too noisy. However, it does give good protection. 

### The Others

BitDefender, Webroot, and other popular AV name brands are NOT suitable in my opinion for use in a large environment. 

## Walkthrough Video

{{< youtube "_3NOjLlsp3Y" >}}
