---
title: "Speedup Linux"

date: 2022-07-24T10:30:53-05:00
url: /speedup-linux/
image: images/2022-thumbs/speedup-linux.webp
categories:
  - Linux
tags:
  - Ubuntu
  - Fedora
  - Arch
---
Linux by default is meant for servers and actually decreases the performance for greater security. While this great in business, when using Linux as a desktop it is not ideal unless your are serving other devices on your network with that machine. 
<!--more-->
## Disable Mitigations
This will have a substantial increase in performance just by doing disable many mitigations that happen in multi-threaded systems. The more core count you have the greater the performance gain. Some performances increases can be as large as 30%, but the average increase is about 10%. 

Add this to your `/etc/default/grub` under line `GRUB_CMDLINE_LINUX="rhgb quiet"`:
```
GRUB_CMDLINE_LINUX="rhgb quiet mitigations=off"
```

## ZSwap for 16GB or Less Systems
Z Swap is the a neat Linux feature that compresses data that is about to enter your swap file. This causes it to be used quite a bit less and can give a performance uplift to those with a small amount of memory. If you have a system with 32GB or greater, I wouldn't recommend doing this. 

Add this to your `/etc/default/grub`:
```
GRUB_CMDLINE_LINUX="zswap.enabled=1 rhgb quiet mitigations=off"
```

## Systems older than Linux 5.11
There is a cool website called <https://make-linux-fast-again.com/> that has a massive amount of the flags including the ones used above. However, this is mainly for older Linux installs and why I really don't use it. These are all the flags that website recommends:
```
noibrs noibpb nopti nospectre_v2 nospectre_v1 l1tf=off nospec_store_bypass_disable no_stf_barrier mds=off tsx=on tsx_async_abort=off mitigations=off
```

## Is this really needed?
While all this above isn't really needed, it is a really neat way to squeeze a bit performance out of your systems. It is ONLY recommended for those not sharing services and files through your network. It is also NOT recommended for those using Linux in a virtual machine as many of the mitigations are for VM protection. So use this RESPONSIBLY and don't just slap it on every Linux install. 

## Walkthrough Video

{{< youtube 8XueTkMTNvc >}}

