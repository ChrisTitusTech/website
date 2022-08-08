---
title: "The 3 Biggest Security Mistakes Linux Users Make"

date: 2022-08-03
url: /linux-security-mistakes/
image: images/2022-thumbs/linux-security-mistakes.jpg
categories:
  - Linux
tags:
  - Security
draft: false
---
Security is a journey, not a destination
<!--more-->

So after making a couple videos showing how to increase performance in desktop computers running Linux, I was overwhelmed by the sheer scale of comments worried about mitigations. If you are worried about that, you should be even more worried about the things below. 

Here are the 3 biggest things I see wrong in Linux installs that can easily be exploited or lead to massive problems. I'm choosing some of the worst offenders from the basic security layers an attacker goes through. 

![basic-layers](/images/2022/linux-security-mistakes/basic-layers.png)

## Network Level - Not using a Firewall

Managing a firewall on a system can be a monumental task, but one of the most important is managing the traffic coming to and from your computer. The best packages for this in Linux is `ufw` and `fail2ban`.

### UFW
Uncomplicated Firewall is easy to setup and understand. It blocks traffic and allows it. 

#### Install UFW
```
sudo apt install ufw
```

#### My recommended Rules
```
sudo ufw limit 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
```

### Fail2Ban
Fail2Ban is one of the best programs that is installed in every single Linux server I have EVER installed. This program is a intrusion prevention utility. Most install it, but forget to configure and use it. These are the settings I like to use.

#### Installing Fail2Ban
```
sudo apt install fail2ban
```

#### My Fail2Ban Settings File
Fail2Ban by default doesn't really do much unless you adjust the settings file. Here is mine, but feel free to change it to your needs.

All configuration files are in `/etc/fail2ban`

Configuration file examples and defaults are in two main files `/etc/fail2ban/fail2ban.conf` and `/etc/fail2ban/jail.conf`

My Config - `/etc/fail2ban/jail.local`

```
[DEFAULT]
ignoreip = 127.0.0.1/8 ::1
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
```

Now in more complex service environments I would generally start adding services and programs like `ssh-jail.conf` to the `/etc/fail2ban/jail.d/` directory. Any program that hackers use is typically always under watch, like WordPress installs for example:

`/etc/fail2ban/jail.d/wordpress.conf`

```
[wordpress]
enabled = true
filter = wordpress
logpath = /var/log/auth.log
maxretry = 3
port = http,https
bantime = 300
```

#### Enabling Fail2Ban
```
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Operating System Level - Adding Repositories
Too many times do I see people installing and using 10+ repositories on a Linux install. Obviously, adding repositories to get the programs you want on your system is something you will do. However, there is a hierarchy to these repositories and if you just blindly trust and import all the keys to the repositories, they can and will override packages from the base distribution. This isn't good and can lead to security issues or even break your system. I'd highly recommend putting a priority on these, so it will only use them when the package doesn't exist in that base repo. 

If you don't use any priority, often times the package you want from the added repo is installed and updated, but sometimes they add OTHER packages in that repo that will also overwrite existing packages, which can lead to some undesired results. 

### Prioritizing Repositories
Official documentation for APT (Debian) - <https://wiki.debian.org/DebianRepository/UseThirdParty>

All priority preference files are stored in the `/etc/apt/preferences.d/` directory.

Example: `volian.perf`
```
Package: *
Pin: origin deb.volian.org
Pin-Priority: 100
```

- Set specific packages to only install with the `Package: *` Line
- Pin: Origin is the address of the repo
- Pin-Priority is generally 100 which means it will update packages NOT in base repos.
	- 1 = do not auto update
	- 100 = update if not in other repos
	- over 100 = overwrite base repos

Arch doesn't have any priorities in pacman that I can find, but most are building from source with limited 3rd party repositories. Building from source presents even more dangers for those that are blindly installing programs through the AUR. 

## Application Level - Not using AppArmor or SELinux
Most Linux distributions have one of these installed by default, but there is one major one that most forget. Arch Linux. A lot of install scripts forget apparmor and SELinux is too complex for many to install. These programs do one massive security feature that many just don't realize. They can sandbox and limit program access even when they get elevated. If an application profile doesn't exist, they typically limit its access to the home folder and limit hardware access. You can customize application profiles to expand or limit access as needed. Without having either of the programs installed, you are putting yourself at risk. 

However, just the simple act of installing these programs often leads to them being used or setup. They typically are set up to be in complain mode for AppArmor or permissive mode for SELinux. While these are fine for logging and adding some security, it normally would NOT stop the program doing damage.

I've set these up in server environments and it is not trivial to do or maintain. Most, if not all, Linux desktops don't bother with setting these to enforce mode and blocking programs that don't comply to their application profile. This requires the end user to have knowledge of how to set up profiles and generate them when they are missing, so the programs will work correctly. 

To learn more about using them:
AppArmor Documentation <https://gitlab.com/apparmor/apparmor/-/wikis/Documentation>
SELinux Documentation <https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/selinux_users_and_administrators_guide/index>

## Walkthrough Video

{{< youtube QxNsyrftJ8I >}}


