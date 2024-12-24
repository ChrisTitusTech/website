---
title: "Is Antivirus Worthless?"

date: 2022-06-22T16:44:33-05:00
url: /antivirus-worthless/
image: images/2022-thumbs/antivirus-worthless.webp
categories:
  - Windows
tags:
  - AntiVirus
---
To many advanced users, Antivirus IS worthless. That is because it uses system resources and provides more annoyances than benefits. However, for many users it is required as they will not know what is a virus or not. 
<!--more-->

## How to Scan

The biggest issue with antivirus is some show false positives and others show nothing when it is a virus. So what is the best way to scan? 

<https://virustotal.com> is my recommendation. It will help you determine if that exe or zip file you just downloaded from a shady source is infected. This will do a far better job than an individual antivirus scans, since virustotal is an aggregate and uses antivirus engines for EVERY major antivirus. 

## What not to do

Downloading free antivirus is terrible and typically you will be giving away your privacy as they will be submitting the URLs you visit in many free packages, like Kasperky Cloud Free. Avast and AVG on the other hand you will be inidated with popups and upsells to a bloated internet security suite that does nothing but slow your computer down. I've also seen people install multiple AntiVirus programs, which just slows down a PC considerably while providing little to no extra protection. 

So Never do any of these things!
- Download FREE AntiVirus
- Install, Buy, or Download ANY Internet Security Suite
- Installing multiple AntiVirus programs

## False Positives

I've been giving out an exe file for my Debloat Utility to anyone that pays $5 on cttstore.com to help fund its future development. However, since it is a free and open source project that is a PowerShell script that gets converted to EXE it has caused MANY false positives. The reason is many Antivirus companies are lazy and block EVERY powershell script that is converted to EXE. Microsoft, AVG, Avast, etc. which you can see below. 

PowerShell to EXE Disclaimer
![ps1toexe](/images/2022/antivirus-worthless/virus-ps1-exe.webp)

VirusTotal Result from PowerShell Script to EXE
![script-virustotal](/images/2022/antivirus-worthless/script-virus.webp)

Obviously with false positives there are times where AntiVirus programs completely miss viruses. How does this happen and how I changed the exe to bypass antivirus programs. There are two methods I've used to reduce or even completely remove antivirus scans. 

### Code Signed EXEs have less false positives

Code Signing is the practice of using cryptographic keys to sign EXE files like below. 
![signed-file](/images/2022/antivirus-worthless/signed-file.webp)

Good antivirus programs will NOT flag my EXE when I used a code signing key. However, if I don't sign the EXE it will flag it as a virus. So, why doesn't everyone use a code signing key? It's expensive. Roughly it is $100 a year for the "basic" code signing and to bypass Microsoft SmartScreen for "enhanced" code signing it will set you back almost $275 a year. Feels kinda like extortion, but I can appreciate that I now have a digital signature for my exe so folks know it came from me. 

Let's move on to the easiest way to obscure your exe to bypass Antivirus.

### Encrypted Files can not be scanned for viruses

Simply created an encrypted file will bypass any scans. I find the easiest way to do this is using 7-zip with SHA256 encryptioon and a password. This is how I distribute my EXE now so I don't have to worry about antiviruses. So, be EXTREMELY CAREFUL when opening files with passwords, as your antivirus can not scan it. If you do not trust the source you downloaded it... DO NOT OPEN IT!

Here is an example of a encrypted file:
![encrypted-file](/images/2022/antivirus-worthless/encrypted-file.webp)

## Recommended AntiVirus

If you don't want to spend any money then simply use Microsoft's Defender. Its decent with it's cloud protection and is already baked into Windows. Its detection rates are passable and has a small system impact. 

The biggest factors to look at when considering antivirus is System Impact and History/Detection Rates. 

ESET NOD32 Antivirus is the best I've found. They were one of the original antivirus programs with NOD32's creation in 1987 and ESET being founded by the developers of NOD32 in 1992. The basic antivirus is fast has very little passive performance loss and fantastic detection rates. I recommend just doing the basic [NOD32 Antivirus](https://www.jdoqocy.com/click-100287975-15083621)

## Walkthrough Video

{{< youtube UXT17bQ2W2Q >}}

