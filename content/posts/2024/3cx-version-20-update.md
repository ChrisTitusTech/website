---
title: "3cx Version 20 Update"

date: 2024-03-22
url: /3cx-version-20-update/
image: images/2024-thumbs/3cx-version-20-update.jpg
categories:
  - Linux
tags:
  - 3cx
draft: true
---
3CX just released version 20 of its PBX telephone system. 3CX has been my favorite phone system that I've setup at multiple businesses. Let's explore version 20!
<!--more-->

## New Admin Console

All-in-One Admin/Client URL. Version 20 also uses a condensed URL to make it easier to remember. The entire system moves on-prem Debian 10 to 12 and is a huge change.

## Changes in Administration

- SIP Trunk location moved
- Department Hours added no longer global
- DID routing is now done at the destination (Extension, Ring Group, Digital Receptionist, etc.)
- Queues, Ring Groups, and Digital Receptionists can all be assigned independent holidays and hours of operation.

## New Features

- Windows Softphone (Microsoft Store)
- Google Transcription Update (New API)
- Split DNS (Enhanced security and faster on-prem phones) - Hairpin NAT Support Required
- Improved Reporting (Call logs are improved)
- 2FA Added
- Ability to monitor quality of calls

### Call Processing Scripts

You can now create custom scripts that route calls based on time, caller id, and a lot more variables. I'll leave a link below if you want to explore this, but programming specific phone numbers, or numbers with a certain country code and area codes to groups of agents can be huge for businesses. 

Source: <https://www.3cx.com/docs/manual/call-processing-script/>

### New APIs

The update also brings new API access for both the system configuration and client configuration. Each has a new set of calls they will take and you can extract user information to your app or even website. 

## Before you move

- Check Phone Compatibility <https://www.3cx.com/sip-phones/>
- Allocate Downtime (Debian 10 -> 11 -> 12) will take time.
- Check off the official checklist <https://www.3cx.com/blog/releases/v20-upgrade-checklist-faq/>

## Walkthrough Video

{{< youtube 11111111 >}}
