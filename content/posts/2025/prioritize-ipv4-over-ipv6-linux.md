---
title: "Prioritize Ipv4 Over Ipv6 Linux"

date: 2025-10-03
url: /prioritize-ipv4-over-ipv6-linux/
image: images/2025-thumbs/prioritize-ipv4-over-ipv6-linux.webp
categories:
  - Linux
  - Networking
tags:
  - ipv4
draft: false
---
On many Linux systems, IPv6 is prioritized over IPv4 by default. This can lead to connectivity issues if the network or services you are trying to reach are not fully compatible with IPv6. To prioritize IPv4 over IPv6, you can modify the system's address selection policy.
<!--more-->

## Setting /etc/gai.conf

gai.conf is the best and in my opinion, the ONLY method you should use for pushing ipv4 ahead of ipv6. Most methods online show `sysctl` which DISABLES ipv6 and not a recommended way because ipv6 is so integrated in to many networks these days.

Instead change the following file by editing `/etc/gai.conf` and no restart or systemctl restart commands are needed. 

Here is the line to uncomment
```
precedence ::ffff:0:0/96  100
```

That's it! Your system will now using ipv4 when it is availible, but can use ipv6 if it isn't.

## Verify ipv4 priority

```
getent ahosts google.com
```

or simply `ping google.com` and you will see that ipv4 is shown instead of a ipv6 address at the top. `getent` is a nice way of verifying that it will default back to ipv6 as it will show ipv6 addresses towards the bottom. 
