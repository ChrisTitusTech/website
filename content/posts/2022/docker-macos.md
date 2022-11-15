---
title: "Docker Macos"

date: 2022-11-30
url: /docker-macos/
image: images/2022-thumbs/docker-macos.jpg
categories:
  - Linux
  - Windows
  - MacOS
tags:
  - Docker
  - Ubuntu
draft: false
---
Don't have a Mac and need MacOS? No problem, run it in a docker container. 
<!--more-->

Credit goes to this twitter user:

{{< tweet user="justArRinze" id="1591779981390413826" >}}

## Requirements

Install Docker Ubuntu 22.04

```
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu jammy stable"
sudo apt install docker-ce -y
sudo usermod -aG docker $USER
```

**Reboot or logout/login**

(Optional) GUI Webpage for Managing Docker - Portainer

```
docker volume create portainer_data
docker run -d -p 8000:8000 -p 9443:9443 --name portainer \
--restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v portainer_data:/data \
portainer/portainer-ce:2.9.3
```

Open up browser and navigate to <https://localhost:9443> 

_Click Advanced and proceed with any certificate errors_

## MacOS Docker Setup





## Walkthrough Video

{{< youtube 11111111 >}}
