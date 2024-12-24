---
title: "Docker Guide"

date: 2022-12-09
url: /docker-guide/
image: images/2022-thumbs/docker-guide.webp
categories:
  - Linux
  - Windows
tags:
  - Docker
draft: false
---
This is a full walk-through and guide for Docker. 
<!--more-->

## Install and Getting Started

- Official Docker: <https://docs.docker.com/get-docker/>
- Official Portainer: <https://docs.portainer.io/start/install/server/docker>

## Quick Commands

### Run a new container

- New Image - `docker run IMAGE`
- Name Container and Launch Image - `docker run --name CONTAINER IMAGE`
- Map Container Ports and Launch Image -`docker run -p HOSTPORT:CONTAINERPORT IMAGE`
- Map ALL Ports and Launch Image - `docker run -P IMAGE`
- Launch Image as Background Service - `docker run -d IMAGE`
- Map Local Directory and Launch - `docker run -v HOSTDIR:TARGETDIR IMAGE`

### Manage Containers

- List RUNNING Containers - `docker ps`
- List ALL containers - `docker ps -a`
- Delete container - `docker rm CONTAINER`
- Delete a Running Container - `docker rm -f CONTAINER`
- Stop Container - `docker stop CONTAINER`
- Start Container - `docker start CONTAINER`
- Copy File FROM container - `docker cp CONTAINER:SOURCE TARGET`
- Copy File TO container - `docker cp TARGET CONTAINER:SOURCE`
- Start Shell inside container - `docker exec -it CONTAINER bash`
- Rename container - `docker rename OLD NEW`
- Create new Image from Container - `docker commit CONTAINER`

### Manage Images

- Download Image - `docker pull IMAGE[:TAG]`
- Upload Image to repository - `docker push IMAGE`
- Delete Image - `docker rmi IMAGE`
- List Images - `docker images`
- Build Image from Docker file - `docker build DIRECTORY`
- Tag Image IMAGE - `docker tag IMAGE NEWIMAGE:TAG`

### Troubleshooting and Information

- Show logs - `docker logs CONTAINER`
- Show stats - `docker stats`
- Show processes - `docker top CONTAINER`
- Show modified files - `docker diff CONTAINER`
- Show mapped ports - `docker port CONTAINER`

## Walkthrough Video

{{< youtube 94VQvRpjfO8 >}}
