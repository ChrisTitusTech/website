---
title: "Replace Google Fonts With Bunny Fonts"

date: 2023-02-15
url: /replace-google-fonts-with-bunny-fonts/
image: images/2023-thumbs/replace-google-fonts-with-bunny-fonts.webp
categories:
  - Linux
  - Windows
tags:
  - Website
  - Hugo
draft: false
---
Did you know Google Fonts is bloated and can cause longer load times? Bunny fonts to the rescue!
<!--more-->

Oh, I forgot to mention, Google fonts is also NOT GDPR compliant. For legal reasons and traffic you might switch over to bunny because it IS GDPR compliant.

## Installation

Wordpress Install: <https://wordpress.org/plugins/replace-google-fonts-with-bunny-fonts/>

Using a static site like me? or are a web designer? Great! It's even easier.

The Bunny Fonts API was designed to be fully compatible with the Google Fonts CSS v1 API, making the switch as easy as changing the hostname.

Simply swap `https://fonts.bunny.net/css` in place of `https://fonts.googleapis.com/css` on your website's source code and let your users enjoy better privacy.

Thanks to DigitalSparky for the Pull Request and updating my website for me! Here is Bunny font implementation pull request on this website: <https://github.com/ChrisTitusTech/website/pull/108>

## Future Improvements

There are so many more improvements to make! Thanks to feedback from users here is the to-do list.

- Use both Netlify AND Cloudflare utilizing round-robin DNS (Thanks Larry!)
- Fix "Total Blocking Time" delays with either a new theme or using Partytown to debloat Javascript <https://github.com/BuilderIO/partytown>

## Walkthrough Video

{{< youtube nBcZASOwo1Q >}}
