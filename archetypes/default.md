---
title: "{{ replace .Name "-" " " | title }}"

date: {{ now.Format "2006-01-02" }}
url: /{{ .Name }}/
image: images/2022-thumbs/{{ .Name }}.jpg
categories:
  - Linux
  - Windows
  - Networking
tags:
  - Ubuntu
draft: false
---
<!--more-->

{{< nitter user="christitustech" id="1550918768334979078" >}}
