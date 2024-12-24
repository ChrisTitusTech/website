---
title: "Twitter Archive Offline"

date: 2022-12-02
url: /twitter-archive/
image: images/2022-thumbs/twitter-archive.webp
categories:
  - Linux
  - Windows
tags:
  - Twitter
draft: false
---
Leaving Twitter? Why not download all your tweets from archive and store it yourself before deleting your account!
<!--more-->

## Projects

- [Twitter Archive Parser](https://github.com/timhutton/twitter-archive-parser)
- [Twitter Bookmark Tool - Download All Links](https://github.com/nornagon/twitter-bookmark-archiver)
- [Twitter Cleaner](https://github.com/caarlos0/twitter-cleaner)
- [Twitter Photo Downloader](https://github.com/walaura/Twitter-photo-downloader)

## Process of Offline Twitter

1. Download Twitter Archive
  ![](/images/2022/twitter-archive/twitter-archive.webp)
  _Note: This can take up to 72 hours to produce a downloadable zip_
2. Unzip Archive to it's OWN folder
3. Download the Archive parser
    ```
    wget https://raw.githubusercontent.com/timhutton/twitter-archive-parser/main/parser.py
    ```
4. Run `python3 parser.py`
    _I recommend selecting Yes to download all messages_
5. Open `Your archive.html` in your browser
    ![](/images/2022/twitter-archive/offline-twitter.webp)

## Limitations

I put the other projects above to get around the limitations of using the Archive Parser. 

- Bookmark Tool will change the t.co links to their proper links so it doesn't use Twitter servers.
- Cleaner will cleanup the archive
- Photo Downloader will download the full photos in your tweets. By default it downloads the thumbnail and references twitter for the full image.

## Walkthrough Video

{{< youtube vwxxNCQpcTA >}}
