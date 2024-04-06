---
title: "XZ Backdoor Affected These Users"

date: 2024-04-06
url: /xz-affected-these-users/
image: images/2024-thumbs/xz-affected-these-users.jpg
categories:
  - Linux
tags:
  - Virus
draft: false 
---
Who actually was affected by the XZ Backdoor? Lets go over the vulnurable linux distributions that were affected.
<!--more-->

## Affected Linux Distributions

- **UNAFFECTED**: Ubuntu. The distribution uses the older 5.4 version of xz, so no update is necessary.
- **AFFECTED**: Red Hat. Fedora 41 and Fedora Rawhide contain vulnerable packages. However, Red Hat Enterprise Linux (RHEL) versions are not affected. Users are advised to cease using the affected versions immediately until an updated xz version is released.
- **AFFECTED**: SUSE. Users of openSUSE (Tumbleweed or MicroOS) with xz version 5.6.0 and 5.6.1. Update is out to patch the malicious code.
- **AFFECTED**: Debian Linux. Testing, unstable, and experimental versions included compromised packages, though stable versions remain unaffected. Users are recommended to update xz-utils.
- **AFFECTED**: Kali Linux. Systems updated from March 26 to March 29 need to be updated again for the fix. Systems last updated before March 26 are not affected.
- **UNAFFECTED**: Arch Linux. Arch never linked SSHD with liblzma. Even with the malicious code in liblzma the backdoor was never exploited. Source: <https://security.archlinux.org/ASA-202403-1>

## Social Engineering Summary

Source: <https://robmensching.com/blog/posts/2024/03/30/a-microcosm-of-the-interactions-in-open-source-projects/>

The narrative outlines a common scenario in open-source projects where a maintainer's burnout leads to vulnerability exploitation, as seen in the xz/liblzma case. Initially, the maintainer's struggle to keep up with the project invites an attacker to offer help, gaining trust. Despite the community's demands for more attention and updates, the maintainer's mental health and the unpaid nature of the work make it challenging to meet these expectations. The situation escalates with unhelpful comments from the community, further pressuring the maintainer. The story highlights the need for a change in how open-source projects are managed and supported, emphasizing the importance of understanding and addressing the challenges maintainers face.

## XZ Backdoor Summary

The XZ exploit, a critical vulnerability identified within the XZ compression utility, has sparked considerable debate and scrutiny within the cybersecurity realm. This exploit compromises the integrity of the liblzma library, enabling attackers to execute arbitrary code on a victim's system through a buffer overflow vulnerability. Notably, this vulnerability also facilitated unauthorized access via SSH by manipulating the liblzma library used in SSH processes. The exposure of this exploit prompted an extensive evaluation of security protocols for applications relying on the XZ compression algorithm. In response, developers of the XZ utility have issued patches, and there have been widespread advisories urging users to upgrade their software to the most current version. This event has highlighted the critical need for ongoing security audits and timely updates to thwart similar threats.

## Walkthrough Video

{{< youtube "s_WkMtEPsuE" >}}
