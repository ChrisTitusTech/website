---
title: "Hugo Static Site Guide"
type: post
date: 2020-01-08T15:59:19-06:00
url: /hugo-guide/
image: /images/2020-thumbs/hugo-guide.jpg
categories:
  - Linux
  - Networking
tags:
  - Hugo
  - WordPress
---
This article goes over the basics of hugo and guides you through the process of using a static site generator. 
<!--more-->
## Installing Hugo
Arch-Based Users: `yay -S hugo`  
Debian-Based Users: `sudo apt install hugo`  
_Note: Debian packages are old and I recommend downloading the latest version of hugo from github_

Github Repo for Hugo (Latest Versions and Notes)  
[Hugo GitHub](https://github.com/gohugoio/hugo)  
[Official Site](https://gohugo.io)

Create your first site and install a theme using the [Quick Start](https://gohugo.io/getting-started/quick-start/) Page. 

## Common Hugo Commands
  - `hugo` - builds static files in the `siteroot/public` folder
  - `hugo server` - runs a test site so you can login to http://127.0.0.1:1313 and see your changes before pushing live
  - `hugo new posts/dir/newpost.md` - you can make new posts on the fly with all your templates (see below) 

## The First Changes
I made several changes when I first switched to HUGO and these were the changes I made. 
### Theme Modification
I downloaded the the [Mainroad](https://themes.gohugo.io/mainroad/) Theme and installed it during the Quick Start. _Note: My Debian system had an old version of HUGO 0.40 and I had to update before the theme worked._
#### Changing Theme Widgets
##### Social Widget
I first started to change the *social widget* by adding YouTube and Twitch from the following file `siteroot/themes/mainroad/layouts/partials/widgets/social.html`.  
The Most challengeing Part of this was the SVG files used by mainroad. However, once I figured out the SVG format can be edited in a simple text editor and I mirrored the size and types from the existing SVG files they showed up.

Here are the Edits I made to *social.html*:
```
{{- with .Site.Params.widgets.social.twitch }}
		<div class="widget-social__item widget__item">
			<a class="widget-social__link widget__link btn" title="Twitch" rel="noopener noreferrer" href="https://twitch.tv/{{ . }}" target="_blank">
				{{ partial "svg/twitch.svg" (dict "class" "widget-social__link-icon") }}
				<span>Twitch Live Streams</span>
			</a>
		</div>
		{{- end }}
```
Basically after getting the SVG setup and putting the twitch.svg and youtube.svg in this path `siteroot/mainroad/layouts/partials/svg` I was able to get the Social widget exactly how I wanted. 

##### Tags Widget
Next up was fixing the tags on the sidebar. They were blocky and quite ugly, where I wanted a traditional tag cloud that you see on many other sites to help users navigate your content. So I began looking at other projects that had the proper code. I found the following code snippit:
```
{{ if not (eq (len $.Site.Taxonomies.tags) 0) }}
    {{ $fontUnit := "rem" }}
    {{ $largestFontSize := 2.0 }}
    {{ $largestFontSize := 2.5 }}
    {{ $smallestFontSize := 1.0 }}
    {{ $fontSpread := sub $largestFontSize $smallestFontSize }}
    {{ $max := add (len (index $.Site.Taxonomies.tags.ByCount 0).Pages) 1 }}
    {{ $min := len (index $.Site.Taxonomies.tags.ByCount.Reverse 0).Pages }}
    {{ $spread := sub $max $min }}
    {{ $fontStep := div $fontSpread $spread }}
<div class="widget-taglist widget">
  <h4 class="widget__title">{{ T "tags_title" }}</h4>
   <div class="widget__content">
    <div id="tag-cloud" style="padding: 5px 15px">
        {{ range $name, $taxonomy := $.Site.Taxonomies.tags }}
            {{ $currentTagCount := len $taxonomy.Pages }}
            {{ $currentFontSize := (add $smallestFontSize (mul (sub $currentTagCount $min) $fontStep) ) }}
            {{ $count := len $taxonomy.Pages }}
            {{ $weigth := div (sub (math.Log $count) (math.Log $min)) (sub (math.Log $max) (math.Log $min)) }}
            {{ $currentFontSize := (add $smallestFontSize (mul (sub $largestFontSize $smallestFontSize) $weigth) ) }}
            <!--Current font size: {{$currentFontSize}}-->
            <a href="{{ "/tags/" | relLangURL }}{{ $name | urlize }}" style="font-size:{{$currentFontSize}}{{$fontUnit}}">{{ $name }}</a>
        {{ end }}
    </div>
  </div>
</div>
{{ end }}
```
After replacing `siteroot/themes/mainroad/layouts/partials/widgets/taglist.html` with the following code. The tag cloud was complete.
#### Header/Footer Modification
Replacing the Header and footer was extremely easy as it is just plain HTML. The files are located in `siteroot/themes/mainroad/layouts/partials/header.html or footer.html`. You can leave the stock, but I wanted to add a privacy policy and terms of service to be compliant. 
#### Table of Contents Changes
I replaced the title "PAGE CONTENTS" with share buttons using a share-buttons.html I created. This could all be done in the post-toc.html file, but I wanted to keep it modular and not make too many edits to the theme. Here were my changes:

*siteroot/themes/mainroad/layouts/partials/post-toc.html*
```
{{ if .Param "toc" }}
<div class="post__toc toc">
	<div class="toc__title">{{ partial "share-buttons.html" . }}</div>
	<div class="toc__menu">
		{{ .TableOfContents }}
	</div>
</div>
{{ end }}
```
_Note: I added the `{{ partial "share-buttons.html" . }}` to this and removed PAGE CONTENTS text_

*/siteroot/layouts/partials/share-buttons.html* - NEW FILE
```
{{ $pageurl := .Permalink }}

<style>
#share-buttons {display: inline-block; vertical-align: middle; }
#share-buttons:after {content: ""; display: block; clear: both;}
#share-buttons > div {
position: relative;
text-align: left; 
height: 36px; 
width: 32px; 
float: left; 
text-align: center;
}
#share-buttons > div > svg {height: 16px; fill: #d5d5d5; margin-top: 10px;}
#share-buttons > div:hover {cursor: pointer;}
#share-buttons > div.facebook:hover > svg {fill: #3B5998;}
#share-buttons > div.twitter:hover > svg {fill: #55ACEE;}
#share-buttons > div.linkedin:hover > svg {fill: #0077b5;}
#share-buttons > div.pinterest:hover > svg {fill: #CB2027;}
#share-buttons > div.mail:hover > svg {fill: #7D7D7D;}
#share-buttons > div.instagram:hover > svg {fill: #C73B92;}
#share-buttons > div.facebook > svg {height: 18px; margin-top: 9px;}
#share-buttons > div.twitter > svg {height: 20px; margin-top: 8px;}
#share-buttons > div.linkedin > svg {height: 19px; margin-top: 7px;}
#share-buttons > div.pinterest > svg {height: 20px; margin-top: 9px;}
#share-buttons > div.mail > svg {height: 14px; margin-top: 11px;}
</style>

<span style="color: silver;">Share on: </span><div id="share-buttons">
<div class="facebook" title="Share this on Facebook" onclick="window.open('http://www.facebook.com/share.php?u={{ $pageurl }}');"><svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"/></svg></div>
<div class="twitter" title="Share this on Twitter" onclick="window.open('http://twitter.com/home?status={{ $pageurl }}');"><svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"/></svg></div>
<div class="linkedin" title="Share this on Linkedin" onclick="window.open('https://www.linkedin.com/shareArticle?mini=true&url={{ $pageurl }}&title=&summary=&source=');"><svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z"/></svg></div>
{{ if .Params.image }}<div class="pinterest" title="Share this on Pinterest" onclick="window.open('https://pinterest.com/pin/create/button/?url=&media={{ .Params.image }}&description=');"><svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M256 597q0-108 37.5-203.5t103.5-166.5 152-123 185-78 202-26q158 0 294 66.5t221 193.5 85 287q0 96-19 188t-60 177-100 149.5-145 103-189 38.5q-68 0-135-32t-96-88q-10 39-28 112.5t-23.5 95-20.5 71-26 71-32 62.5-46 77.5-62 86.5l-14 5-9-10q-15-157-15-188 0-92 21.5-206.5t66.5-287.5 52-203q-32-65-32-169 0-83 52-156t132-73q61 0 95 40.5t34 102.5q0 66-44 191t-44 187q0 63 45 104.5t109 41.5q55 0 102-25t78.5-68 56-95 38-110.5 20-111 6.5-99.5q0-173-109.5-269.5t-285.5-96.5q-200 0-334 129.5t-134 328.5q0 44 12.5 85t27 65 27 45.5 12.5 30.5q0 28-15 73t-37 45q-2 0-17-3-51-15-90.5-56t-61-94.5-32.5-108-11-106.5z"/></svg></div>{{ end }}
<div class="mail" title="Share this through Email" onclick="window.open('mailto:?&body={{ $pageurl }}');"><svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"/></svg></div>
</div>
```
#### Adding AdSense and Custom Scripts to All Pages
To add specific scripts to all pages, such as AdSense, you will need to modify `siteroot/themes/mainroad/_defaults/baseof.html`. I added the following before the `</head>` of this file to populate AdSense. You could put Analytics in here as well, but it isn't needed since mainroad theme has the option in `config.toml`. Here are my modifications:

*baseof.html*
```
{{- if not .Site.IsServer }}
		{{ template "_internal/google_analytics_async.html" . }}
		{{ partial "adsense-auto.html" . }}
	{{- end }}
</head>
```
*siteroot/layouts/partials/adsense-auto.html* - NEW FILE
```
<script data-ad-client="ca-pub-000000000000000" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
```
_Note: Make sure to use your *ca-pub-IDGOESHERE*
### Configuration of config.toml
In your siteroot you will see this file that you will need to configure. Most users will simply edit this and away they go. Everything in this file worked pretty darn well. There was a couple spots that tripped me up which I will go over now. 
#### BaseURL
Make sure you fill this out completely. I messed up the automated sitemap.xml because I simply put / instead of my entire address. This is what I have in the file now: `baseURL = "https://christitus.com/"`
#### Analytics, Social, and Title/Description
All of these options worked perfectly and I had no issues.
#### Menu
The last problem I had was the menu at the top of my theme. I soon learned there was a syntax to the config.toml file that I missed. I simply added this to the bottom and changed the weight to sort the menu properly. Here is that code snippit:
```
[menu]

  [[menu.main]]
    identifier = "home"
    name = "Home"
    pre = "<i class='fa fa-heart'></i>"
    url = "/"
    weight = -110

  [[menu.main]]
    name = "Donate"
    post = ""
    pre = "<i class='fa fa-road'></i>"
    url = "https://www.patreon.com/christitustech"
    weight = -105

  [[menu.main]]
    name = "Remote Support"
    post = ""
    pre = "<i class='fa fa-road'></i>"
    url = "https://download.teamviewer.com/download/TeamViewerQS.exe"
    weight = -100
```
_Note: I added external site links and a proper home button_
### Templates to Optimze My Workflow
This is where HUGO really shines and saves me a TON of time compared to WordPress and the like. Simply modifying the `siteroot/archetypes/default.md` file to put all the things I normally have in a post. Here is what I use:

*default.md*
```
---
title: "{{ replace .Name "-" " " | title }}"
type: post
date: {{ .Date }}
url: /{{ .Name }}/
image: /images/2020-thumbs/{{ .Name }}.jpg
categories:
  - Linux
  - Windows
  - Networking
tags:
  - Ubuntu
draft: true
---
<!--more-->

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join```
Now everytime I run `hugo new posts/newpost.md` it will fill in the Title, date, custom url, thumbnail, add the more directive for list view, and my closing phrase. 

## Video Walkthrough
[![hugo guide](https://img.youtube.com/vi/6JaBian3vgI/0.jpg)](https://www.youtube.com/watch?v=6JaBian3vgI)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

## Conclusion
This has changed my life and has made it so I can make posts like this one for people to follow. This entire post took me about an hour to write and would have take twice as long if I were to do it in WordPress. 

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join