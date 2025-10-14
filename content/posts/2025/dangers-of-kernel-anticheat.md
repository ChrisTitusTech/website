---
title: "Dangers of Kernel Anticheat"

date: 2025-10-13
url: /dangers-of-kernel-anticheat/
image: images/2025-thumbs/dangers-of-kernel-anticheat.webp
categories:
  - Windows
tags:
  - Gaming
draft: true
---
Kernel anticheat software is a controversial topic in the gaming community. While it aims to prevent cheating in online games, it often does so by operating at a very low level within the operating system, which can introduce significant security and stability risks.
<!--more-->

## What is Kernel Anticheat?
Kernel anticheat software runs with high privileges in the operating system's kernel mode. This allows it to monitor and control various aspects of the system, including memory access and process management, to detect and prevent cheating behaviors in games.

## Risks and Dangers
1. **Security Vulnerabilities**: Running software in kernel mode increases the attack surface of the operating system. If the anticheat software has vulnerabilities, they can be exploited by malicious actors to gain control over the entire system.
2. **System Instability**: Kernel-level software can cause system crashes and instability if it conflicts with other drivers or software. This can lead to a poor user experience and potential data loss.
3. **Privacy Concerns**: Kernel anticheat software often requires extensive access to system resources, which can lead to privacy issues. Users may not be fully aware of the extent of data being collected and how it is used. EA the Battlefield 6 anticheat is kernel level and the publisher was recently bought by Saudi Arabia's Public Investment Fund, and I don't know about you but that makes me nervous about privacy with this game.

    Official Statement from EA:
    > "REDWOOD CITY, Calif.--(BUSINESS WIRE)-- Electronic Arts Inc. (NASDAQ: EA) (“EA” or the “Company”), a global leader in interactive entertainment, today announced that it has entered into a definitive agreement to be acquired by an investor consortium (“the Consortium”) comprised of PIF, Silver Lake, and Affinity Partners in an all-cash transaction that values EA at an enterprise value of approximately $55 billion. The transaction positions EA to accelerate innovation and growth to build the future of entertainment.<br> [...]<br>
    > PIF, Silver Lake, and Affinity Partners bring deep sector experience, committed capital, and global portfolios with networks across gaming, entertainment, and sports that offer unique possibilities for EA to blend physical and digital experiences, enhance fan engagement, and create new growth opportunities. The transaction represents the largest all-cash sponsor take-private investment in history, with the Consortium partnering closely with EA to enable the Company to move faster and unlock new opportunities on a global stage."

    Source: <https://ir.ea.com/press-releases/press-release-details/2025/EA-Announces-Agreement-to-be-Acquired-by-PIF-Silver-Lake-and-Affinity-Partners-for-55-Billion/default.aspx>

4. **Compatibility Issues**: Kernel anticheat can interfere with legitimate software, leading to compatibility issues. This can prevent users from running other applications or games on their systems.
5. **Difficult to Remove**: Once installed, kernel anticheat software can be challenging to uninstall completely. This can leave users with unwanted software that continues to run in the background, potentially causing ongoing issues.
6. **Boot Problems**: In some cases, kernel anticheat software can cause boot issues, preventing the operating system from starting correctly. This can require advanced troubleshooting to resolve. An example of this was when Riot Vanguard caused issues with Windows 11 updates. Even security software like CrowdStrike had a now infamous issue where it shut down multiple airports because of a bug in their kernel driver. Example and history here: <https://christitus.com/crowdstrike-alternatives/>

## Alternatives
Instead of relying on kernel anticheat, game developers can explore other methods to ensure fair play, such as:
- User-mode anticheat solutions that operate with lower privileges.
- Behavioral analysis and machine learning to detect cheating patterns.
- Community reporting systems to identify and address cheaters.

## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
