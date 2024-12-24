---
title: "Stop Using APT"

date: 2022-07-19T17:32:28-05:00
url: /stop-using-apt/
image: images/2022-thumbs/stop-using-apt.webp
categories:
  - Linux
tags:
  - Ubuntu
  - Debian
---
APT is slow... single downloading and generally uses slow mirrors as it doesn't optimize them out of the box. It also doesn't have a history so rolling back updates can really suck. 
<!--more-->
Welp, all that is now fixed with [Nala](https://gitlab.com/volian/nala) and it is absolutely wonderful. Not only does it fix all that listed above but it makes the updates look beautiful. 

![nala-image](/images/2022/nala/nala.webp)

## Install
Add Repository - NOT NEEDED FOR Debian SID/testing
```
echo "deb http://deb.volian.org/volian/ scar main" | sudo tee /etc/apt/sources.list.d/volian-archive-scar-unstable.list; wget -qO - https://deb.volian.org/volian/scar.key | sudo tee /etc/apt/trusted.gpg.d/volian-archive-scar-unstable.gpg
```

Install Nala on any Debian Sid or Ubuntu 22+ with:
```
sudo apt update && sudo apt install nala
```

Install on Debian Stable or Ubuntu 21 and below:
```
sudo apt update && sudo apt install nala-legacy
```

## Update Mirrors
This will drastically speed up your downloads
```
sudo nala fetch
```

Select the mirrors you want from the list. Typically you will want to select three. Here is an example:
![nala-mirror](/images/2022/nala/mirror.webp)

## View Update History
Nala has a robust history and even an UNDO! These commands are a life saver.

View the history:
```
nala history
```

Undo a history (`sudo nala history undo ID`):
```
sudo nala history undo 1
```

## Convert APT to Nala

Add the following to your `~/.bashrc` AND `/root/.bashrc` file:
```
apt() { 
  command nala "$@"
}
sudo() {
  if [ "$1" = "apt" ]; then
    shift
    command sudo nala "$@"
  else
    command sudo "$@"
  fi
}
```

From here you can install programs with apt or nala command and it will always work perfectly!

## Conclusion
This is everything I want in a package manager and more. My hat is off to the team that came up with all these drastic improvements and it has made my life so much easier on Debian based systems!

## Walkthrough Video

{{< youtube oroSkR4Nn_w >}}


