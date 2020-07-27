---
title: iDrac Dell Server (Off-Band Remote Access)
author: Chris Titus
type: post
date: 2015-03-24T18:43:46+00:00
url: /idrac-dell-server/
image: /wp-content/uploads/2015/03/Dell-iDRAC.png
categories:
  - Hardware
  - Windows Server

---
I recently had a server freeze up when I wasn&#8217;t on-site and needed to power cycle it. I had configured iDrac before but it was not responsive. Here are some useful commands that can configure, reboot, and reset the iDrac function on Dell Servers. The commands below are run from a command prompt on the server (unless otherwise stated) in the (C:\Program Files\Dell\SysMgt\idrac) path.<!--more-->

![iDrac](/wp-content/uploads/2015/03/idrac.png)

**Remote Commands (Workstation or another server)**
  
`racadm -r -u -p`

Example: `racadm -r 10.1.1.1 -u root -p calvin getsysinfo`

DEFAULT USER: root
  
DEFAULT PASS: calvin

**iDrac Information**
  
`racadm getsysinfo`

**Reset and Factory Defaults**
  
`racadm racreset` (soft Reset)

`racadm racresetcfg` (Hard Reset &#8211; Resets IP/Account settings back to factory default)
  
NOTE: Resets Default IP > 192.168.0.120

**Network Setup**
  
```
racadm config -g cfgLanNetworking -o cfgNicEnable 1
racadm config -g cfgLanNetworking -o cfgNicIpAddress 192.168.0.120
racadm config -g cfgLanNetworking -o cfgNicNetmask 255.255.255.0
racadm config -g cfgLanNetworking -o cfgNicGateway 192.168.0.120
racadm config -g cfgLanNetworking -o cfgNicUseDHCP 0
racadm config -g cfgLanNetworking -o cfgDNSServersFromDHCP 0
racadm config -g cfgLanNetworking -o cfgDNSServer1 192.168.0.5
racadm config -g cfgLanNetworking -o cfgDNSServer2 192.168.0.6
```

**User Setup**
  
```
racadm config -g cfgUserAdmin -o cfgUserAdminUserName -i 2 john
racadm config -g cfgUserAdmin -o cfgUserAdminPassword -i 2 123456
racadm config -g cfgUserAdmin -o cfgUserAdminEnable -i 2 1
```

To verify the new user, use one of the following commands:

```
racadm getconfig -u john
racadm getconfig –g cfgUserAdmin –i 2
```

From here you will use your web browser to enter the iDrac configuration GUI and finish setting up SMTP servers, alerts and other things. I only recommend the above from command line since it gives direct access when the web browser isn&#8217;t functions due to bad IP address or invalid username.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
