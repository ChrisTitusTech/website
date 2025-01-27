---
title: "Cleanup Docker"

date: 2022-12-16
url: /cleanup-docker/
image: images/2022-thumbs/cleanup-docker.webp
categories:
  - Linux
  - Windows
tags:
  - Docker
draft: false
---
If you are running docker you will accumulate a lot of unused images and volumes as you update running containers. This makes maintenance a necessity.
<!--more-->

{{< x user="christitustech" id="1603766983274729472" >}}

## Do you need this?

Check your portainer status page and look for "unused" images and containers. If you are seeing a lot of these, then you are wasting space and I'd recommend running this script to clean them up! 


## The Cleanup Script

Run this bash script every week to ensure the cleanup gets performed. 

```
#!/bin/bash

docker volume rm $(docker volume ls -f dangling=true -q)
docker rmi $(docker images --quiet --filter "dangling=true")
```
