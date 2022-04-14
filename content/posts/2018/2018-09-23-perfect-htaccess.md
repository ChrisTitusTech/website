---
title: The Perfect htaccess for WordPress
author: Chris Titus

date: 2018-09-23T20:50:39+00:00
url: /perfect-htaccess/
image: images/2018/09/htaccess.png
categories:
  - Linux
tags:
  - htaccess
  - WordPress
  - Website
---
This walks you through what your htaccess should look like in a WordPress Installation. I am a minimalist and believe you shouldn&#8217;t be using a ton of plugins that slow down your install when most of what you are looking to accomplish can be achieved with this file. <!--more-->Therefore, this htaccess will contain bad bot blocker, security optimizations, force https, and a variety of other optimizations. This will save you from installing about 5-10 plugins that would slow down your website.

## The .htaccess file to rule them all

##### Basic WordPress part

```
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

##### Secure the WordPress install

```
# Allow mod_rewrite in htaccess
Options +FollowSymLinks
# Disable directory browsing
Options All -Indexes
# Block wp-includes folder and files
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^wp-admin/includes/ - [F,L]
RewriteRule !^wp-includes/ - [S=3]
RewriteRule ^wp-includes/[^/]+\.php$ - [F,L]
RewriteRule ^wp-includes/js/tinymce/langs/.+\.php - [F,L]
RewriteRule ^wp-includes/theme-compat/ - [F,L]
</IfModule>
# Deny access to wp-config.php file
<files wp-config.php>
order allow,deny
deny from all
</files>
```

##### Force HTTPS and Set Time Zones

```
# Force HTTPS
RewriteEngine On
RewriteCond %{SERVER_PORT} 80
RewriteRule ^(.*)$ https://christitus.com/$1 [R,L]
# Set Central Time Zone
SetEnv TZ America/Chicago
```

##### Miscellaneous Optimizations

```
<IfModule mod_rewrite.c>
<IfModule mod_negotiation.c>
Options -MultiViews
</IfModule>
RewriteEngine On
# Redirect Trailing Slashes If Not A Folder...
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [L,R=301]
# Handle Front Controller...
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [L]
# Handle Authorization Header
RewriteCond %{HTTP:Authorization} .
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
</IfModule>
```

##### Expires Header Configuration

```
# BEGIN Expires
<ifModule mod_expires.c>
ExpiresActive On
ExpiresDefault "access 2 days"
ExpiresByType text/html "access plus 3 seconds"
ExpiresByType image/gif "access plus 2419200 seconds"
ExpiresByType image/jpeg "access plus 2419200 seconds"
ExpiresByType image/jpg "access plus 2419200 seconds"
ExpiresByType image/png "access plus 2419200 seconds"
ExpiresByType text/css "access plus 2419200 seconds"
ExpiresByType text/javascript "access plus 2419200 seconds"
ExpiresByType application/x-javascript "access plus 2419200 seconds"
ExpiresByType application/x-shockwave-flash "access 1 month"
ExpiresByType application/pdf "access 1 month"
ExpiresByType image/x-icon "access 1 year"
</ifModule>
# END Expires
```

##### Compression Optimization

```
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE text/javascript
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE image/x-icon
AddOutputFilterByType DEFLATE image/svg+xml svg svgz
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/x-font
AddOutputFilterByType DEFLATE application/x-font-truetype
AddOutputFilterByType DEFLATE application/x-font-ttf
AddOutputFilterByType DEFLATE application/x-font-otf
AddOutputFilterByType DEFLATE application/x-font-woff
AddOutputFilterByType DEFLATE application/x-font-woff2
AddOutputFilterByType DEFLATE application/x-font-opentype
AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
AddOutputFilterByType DEFLATE font/ttf
AddOutputFilterByType DEFLATE font/otf
AddOutputFilterByType DEFLATE font/eot
AddOutputFilterByType DEFLATE font/woff
AddOutputFilterByType DEFLATE font/woff2
AddOutputFilterByType DEFLATE font/opentype
# For Olders Browsers Which Can't Handle Compression
BrowserMatch ^Mozilla/4 gzip-only-text/html
BrowserMatch ^Mozilla/4\.0[678] no-gzip
BrowserMatch \bMSIE !no-gzip !gzip-only-text/html
</IfModule>
```

##### Bad Bot and Vulnerability blockers

```
# Block Bad Bots & Scrapers
SetEnvIfNoCase User-Agent "Aboundex" bad_bot
SetEnvIfNoCase User-Agent "80legs" bad_bot
SetEnvIfNoCase User-Agent "360Spider" bad_bot
SetEnvIfNoCase User-Agent "^Java" bad_bot
SetEnvIfNoCase User-Agent "^Cogentbot" bad_bot
SetEnvIfNoCase User-Agent "^Alexibot" bad_bot
SetEnvIfNoCase User-Agent "^asterias" bad_bot
SetEnvIfNoCase User-Agent "^attach" bad_bot
SetEnvIfNoCase User-Agent "^BackDoorBot" bad_bot
SetEnvIfNoCase User-Agent "^BackWeb" bad_bot
SetEnvIfNoCase User-Agent "Bandit" bad_bot
SetEnvIfNoCase User-Agent "^BatchFTP" bad_bot
SetEnvIfNoCase User-Agent "^Bigfoot" bad_bot
SetEnvIfNoCase User-Agent "^Black.Hole" bad_bot
SetEnvIfNoCase User-Agent "^BlackWidow" bad_bot
SetEnvIfNoCase User-Agent "^BlowFish" bad_bot
SetEnvIfNoCase User-Agent "^BotALot" bad_bot
SetEnvIfNoCase User-Agent "Buddy" bad_bot
SetEnvIfNoCase User-Agent "^BuiltBotTough" bad_bot
SetEnvIfNoCase User-Agent "^Bullseye" bad_bot
SetEnvIfNoCase User-Agent "^BunnySlippers" bad_bot
SetEnvIfNoCase User-Agent "^Cegbfeieh" bad_bot
SetEnvIfNoCase User-Agent "^CheeseBot" bad_bot
SetEnvIfNoCase User-Agent "^CherryPicker" bad_bot
SetEnvIfNoCase User-Agent "^ChinaClaw" bad_bot
SetEnvIfNoCase User-Agent "Collector" bad_bot
SetEnvIfNoCase User-Agent "Copier" bad_bot
SetEnvIfNoCase User-Agent "^CopyRightCheck" bad_bot
SetEnvIfNoCase User-Agent "^cosmos" bad_bot
SetEnvIfNoCase User-Agent "^Crescent" bad_bot
SetEnvIfNoCase User-Agent "^Custo" bad_bot
SetEnvIfNoCase User-Agent "^AIBOT" bad_bot
SetEnvIfNoCase User-Agent "^DISCo" bad_bot
SetEnvIfNoCase User-Agent "^DIIbot" bad_bot
SetEnvIfNoCase User-Agent "^DittoSpyder" bad_bot
SetEnvIfNoCase User-Agent "^Download\ Demon" bad_bot
SetEnvIfNoCase User-Agent "^Download\ Devil" bad_bot
SetEnvIfNoCase User-Agent "^Download\ Wonder" bad_bot
SetEnvIfNoCase User-Agent "^dragonfly" bad_bot
SetEnvIfNoCase User-Agent "^Drip" bad_bot
SetEnvIfNoCase User-Agent "^eCatch" bad_bot
SetEnvIfNoCase User-Agent "^EasyDL" bad_bot
SetEnvIfNoCase User-Agent "^ebingbong" bad_bot
SetEnvIfNoCase User-Agent "^EirGrabber" bad_bot
SetEnvIfNoCase User-Agent "^EmailCollector" bad_bot
SetEnvIfNoCase User-Agent "^EmailSiphon" bad_bot
SetEnvIfNoCase User-Agent "^EmailWolf" bad_bot
SetEnvIfNoCase User-Agent "^EroCrawler" bad_bot
SetEnvIfNoCase User-Agent "^Exabot" bad_bot
SetEnvIfNoCase User-Agent "^Express\ WebPictures" bad_bot
SetEnvIfNoCase User-Agent "Extractor" bad_bot
SetEnvIfNoCase User-Agent "^EyeNetIE" bad_bot
SetEnvIfNoCase User-Agent "^Foobot" bad_bot
SetEnvIfNoCase User-Agent "^flunky" bad_bot
SetEnvIfNoCase User-Agent "^FrontPage" bad_bot
SetEnvIfNoCase User-Agent "^Go-Ahead-Got-It" bad_bot
SetEnvIfNoCase User-Agent "^gotit" bad_bot
SetEnvIfNoCase User-Agent "^GrabNet" bad_bot
SetEnvIfNoCase User-Agent "^Grafula" bad_bot
SetEnvIfNoCase User-Agent "^Harvest" bad_bot
SetEnvIfNoCase User-Agent "^hloader" bad_bot
SetEnvIfNoCase User-Agent "^HMView" bad_bot
SetEnvIfNoCase User-Agent "^HTTrack" bad_bot
SetEnvIfNoCase User-Agent "^humanlinks" bad_bot
SetEnvIfNoCase User-Agent "^IlseBot" bad_bot
SetEnvIfNoCase User-Agent "^Image\ Stripper" bad_bot
SetEnvIfNoCase User-Agent "^Image\ Sucker" bad_bot
SetEnvIfNoCase User-Agent "Indy\ Library" bad_bot
SetEnvIfNoCase User-Agent "^InfoNaviRobot" bad_bot
SetEnvIfNoCase User-Agent "^InfoTekies" bad_bot
SetEnvIfNoCase User-Agent "^Intelliseek" bad_bot
SetEnvIfNoCase User-Agent "^InterGET" bad_bot
SetEnvIfNoCase User-Agent "^Internet\ Ninja" bad_bot
SetEnvIfNoCase User-Agent "^Iria" bad_bot
SetEnvIfNoCase User-Agent "^Jakarta" bad_bot
SetEnvIfNoCase User-Agent "^JennyBot" bad_bot
SetEnvIfNoCase User-Agent "^JetCar" bad_bot
SetEnvIfNoCase User-Agent "^JOC" bad_bot
SetEnvIfNoCase User-Agent "^JustView" bad_bot
SetEnvIfNoCase User-Agent "^Jyxobot" bad_bot
SetEnvIfNoCase User-Agent "^Kenjin.Spider" bad_bot
SetEnvIfNoCase User-Agent "^Keyword.Density" bad_bot
SetEnvIfNoCase User-Agent "^larbin" bad_bot
SetEnvIfNoCase User-Agent "^LexiBot" bad_bot
SetEnvIfNoCase User-Agent "^lftp" bad_bot
SetEnvIfNoCase User-Agent "^libWeb/clsHTTP" bad_bot
SetEnvIfNoCase User-Agent "^likse" bad_bot
SetEnvIfNoCase User-Agent "^LinkextractorPro" bad_bot
SetEnvIfNoCase User-Agent "^LinkScan/8.1a.Unix" bad_bot
SetEnvIfNoCase User-Agent "^LNSpiderguy" bad_bot
SetEnvIfNoCase User-Agent "^LinkWalker" bad_bot
SetEnvIfNoCase User-Agent "^lwp-trivial" bad_bot
SetEnvIfNoCase User-Agent "^LWP::Simple" bad_bot
SetEnvIfNoCase User-Agent "^Magnet" bad_bot
SetEnvIfNoCase User-Agent "^Mag-Net" bad_bot
SetEnvIfNoCase User-Agent "^MarkWatch" bad_bot
SetEnvIfNoCase User-Agent "^Mass\ Downloader" bad_bot
SetEnvIfNoCase User-Agent "^Mata.Hari" bad_bot
SetEnvIfNoCase User-Agent "^Memo" bad_bot
SetEnvIfNoCase User-Agent "^Microsoft.URL" bad_bot
SetEnvIfNoCase User-Agent "^Microsoft\ URL\ Control" bad_bot
SetEnvIfNoCase User-Agent "^MIDown\ tool" bad_bot
SetEnvIfNoCase User-Agent "^MIIxpc" bad_bot
SetEnvIfNoCase User-Agent "^Mirror" bad_bot
SetEnvIfNoCase User-Agent "^Missigua\ Locator" bad_bot
SetEnvIfNoCase User-Agent "^Mister\ PiX" bad_bot
SetEnvIfNoCase User-Agent "^moget" bad_bot
SetEnvIfNoCase User-Agent "^Mozilla/3.Mozilla/2.01" bad_bot
SetEnvIfNoCase User-Agent "^Mozilla.*NEWT" bad_bot
SetEnvIfNoCase User-Agent "^NAMEPROTECT" bad_bot
SetEnvIfNoCase User-Agent "^Navroad" bad_bot
SetEnvIfNoCase User-Agent "^NearSite" bad_bot
SetEnvIfNoCase User-Agent "^NetAnts" bad_bot
SetEnvIfNoCase User-Agent "^Netcraft" bad_bot
SetEnvIfNoCase User-Agent "^NetMechanic" bad_bot
SetEnvIfNoCase User-Agent "^NetSpider" bad_bot
SetEnvIfNoCase User-Agent "^Net\ Vampire" bad_bot
SetEnvIfNoCase User-Agent "^NetZIP" bad_bot
SetEnvIfNoCase User-Agent "^NextGenSearchBot" bad_bot
SetEnvIfNoCase User-Agent "^NG" bad_bot
SetEnvIfNoCase User-Agent "^NICErsPRO" bad_bot
SetEnvIfNoCase User-Agent "^niki-bot" bad_bot
SetEnvIfNoCase User-Agent "^NimbleCrawler" bad_bot
SetEnvIfNoCase User-Agent "^Ninja" bad_bot
SetEnvIfNoCase User-Agent "^NPbot" bad_bot
SetEnvIfNoCase User-Agent "^Octopus" bad_bot
SetEnvIfNoCase User-Agent "^Offline\ Explorer" bad_bot
SetEnvIfNoCase User-Agent "^Offline\ Navigator" bad_bot
SetEnvIfNoCase User-Agent "^Openfind" bad_bot
SetEnvIfNoCase User-Agent "^OutfoxBot" bad_bot
SetEnvIfNoCase User-Agent "^PageGrabber" bad_bot
SetEnvIfNoCase User-Agent "^Papa\ Foto" bad_bot
SetEnvIfNoCase User-Agent "^pavuk" bad_bot
SetEnvIfNoCase User-Agent "^pcBrowser" bad_bot
SetEnvIfNoCase User-Agent "^PHP\ version\ tracker" bad_bot
SetEnvIfNoCase User-Agent "^Pockey" bad_bot
SetEnvIfNoCase User-Agent "^ProPowerBot/2.14" bad_bot
SetEnvIfNoCase User-Agent "^ProWebWalker" bad_bot
SetEnvIfNoCase User-Agent "^psbot" bad_bot
SetEnvIfNoCase User-Agent "^Pump" bad_bot
SetEnvIfNoCase User-Agent "^QueryN.Metasearch" bad_bot
SetEnvIfNoCase User-Agent "^RealDownload" bad_bot
SetEnvIfNoCase User-Agent "Reaper" bad_bot
SetEnvIfNoCase User-Agent "Recorder" bad_bot
SetEnvIfNoCase User-Agent "^ReGet" bad_bot
SetEnvIfNoCase User-Agent "^RepoMonkey" bad_bot
SetEnvIfNoCase User-Agent "^RMA" bad_bot
SetEnvIfNoCase User-Agent "Siphon" bad_bot
SetEnvIfNoCase User-Agent "^SiteSnagger" bad_bot
SetEnvIfNoCase User-Agent "^SlySearch" bad_bot
SetEnvIfNoCase User-Agent "^SmartDownload" bad_bot
SetEnvIfNoCase User-Agent "^Snake" bad_bot
SetEnvIfNoCase User-Agent "^Snapbot" bad_bot
SetEnvIfNoCase User-Agent "^Snoopy" bad_bot
SetEnvIfNoCase User-Agent "^sogou" bad_bot
SetEnvIfNoCase User-Agent "^SpaceBison" bad_bot
SetEnvIfNoCase User-Agent "^SpankBot" bad_bot
SetEnvIfNoCase User-Agent "^spanner" bad_bot
SetEnvIfNoCase User-Agent "^Sqworm" bad_bot
SetEnvIfNoCase User-Agent "Stripper" bad_bot
SetEnvIfNoCase User-Agent "Sucker" bad_bot
SetEnvIfNoCase User-Agent "^SuperBot" bad_bot
SetEnvIfNoCase User-Agent "^SuperHTTP" bad_bot
SetEnvIfNoCase User-Agent "^Surfbot" bad_bot
SetEnvIfNoCase User-Agent "^suzuran" bad_bot
SetEnvIfNoCase User-Agent "^Szukacz/1.4" bad_bot
SetEnvIfNoCase User-Agent "^tAkeOut" bad_bot
SetEnvIfNoCase User-Agent "^Teleport" bad_bot
SetEnvIfNoCase User-Agent "^Telesoft" bad_bot
SetEnvIfNoCase User-Agent "^TurnitinBot/1.5" bad_bot
SetEnvIfNoCase User-Agent "^The.Intraformant" bad_bot
SetEnvIfNoCase User-Agent "^TheNomad" bad_bot
SetEnvIfNoCase User-Agent "^TightTwatBot" bad_bot
SetEnvIfNoCase User-Agent "^Titan" bad_bot
SetEnvIfNoCase User-Agent "^True_Robot" bad_bot
SetEnvIfNoCase User-Agent "^turingos" bad_bot
SetEnvIfNoCase User-Agent "^TurnitinBot" bad_bot
SetEnvIfNoCase User-Agent "^URLy.Warning" bad_bot
SetEnvIfNoCase User-Agent "^Vacuum" bad_bot
SetEnvIfNoCase User-Agent "^VCI" bad_bot
SetEnvIfNoCase User-Agent "^VoidEYE" bad_bot
SetEnvIfNoCase User-Agent "^Web\ Image\ Collector" bad_bot
SetEnvIfNoCase User-Agent "^Web\ Sucker" bad_bot
SetEnvIfNoCase User-Agent "^WebAuto" bad_bot
SetEnvIfNoCase User-Agent "^WebBandit" bad_bot
SetEnvIfNoCase User-Agent "^Webclipping.com" bad_bot
SetEnvIfNoCase User-Agent "^WebCopier" bad_bot
SetEnvIfNoCase User-Agent "^WebEMailExtrac.*" bad_bot
SetEnvIfNoCase User-Agent "^WebEnhancer" bad_bot
SetEnvIfNoCase User-Agent "^WebFetch" bad_bot
SetEnvIfNoCase User-Agent "^WebGo\ IS" bad_bot
SetEnvIfNoCase User-Agent "^Web.Image.Collector" bad_bot
SetEnvIfNoCase User-Agent "^WebLeacher" bad_bot
SetEnvIfNoCase User-Agent "^WebmasterWorldForumBot" bad_bot
SetEnvIfNoCase User-Agent "^WebReaper" bad_bot
SetEnvIfNoCase User-Agent "^WebSauger" bad_bot
SetEnvIfNoCase User-Agent "^Website\ eXtractor" bad_bot
SetEnvIfNoCase User-Agent "^Website\ Quester" bad_bot
SetEnvIfNoCase User-Agent "^Webster" bad_bot
SetEnvIfNoCase User-Agent "^WebStripper" bad_bot
SetEnvIfNoCase User-Agent "^WebWhacker" bad_bot
SetEnvIfNoCase User-Agent "^WebZIP" bad_bot
SetEnvIfNoCase User-Agent "Whacker" bad_bot
SetEnvIfNoCase User-Agent "^Widow" bad_bot
SetEnvIfNoCase User-Agent "^WISENutbot" bad_bot
SetEnvIfNoCase User-Agent "^WWWOFFLE" bad_bot
SetEnvIfNoCase User-Agent "^WWW-Collector-E" bad_bot
SetEnvIfNoCase User-Agent "^Xaldon" bad_bot
SetEnvIfNoCase User-Agent "^Xenu" bad_bot
SetEnvIfNoCase User-Agent "^Zeus" bad_bot
SetEnvIfNoCase User-Agent "ZmEu" bad_bot
SetEnvIfNoCase User-Agent "^Zyborg" bad_bot

# Vulnerability Scanners
SetEnvIfNoCase User-Agent "Acunetix" bad_bot
SetEnvIfNoCase User-Agent "FHscan" bad_bot
# Aggressive Chinese Search Engine
#SetEnvIfNoCase User-Agent "Baiduspider" bad_bot
# Aggressive Russian Search Engine
# Uncomment to disable this search engine
# SetEnvIfNoCase User-Agent "Yandex" bad_bot`

<Limit GET POST HEAD>
Order Allow,Deny
Allow from all
# Surveillance
deny from 38.100.19.8/29
deny from 38.100.21.0/24
deny from 38.100.41.64/26
deny from 38.105.71.0/25
deny from 38.105.83.0/27
deny from 38.112.21.140/30
deny from 38.118.42.32/29
deny from 65.213.208.128/27
deny from 65.222.176.96/27
deny from 65.222.185.72/29`

Deny from env=bad_bot
</Limit>
```

## In Closing

I recommend and personally use all the above settings, however, I broke up each section of my htaccess so you can drop ones you don&#8217;t like or want. Pay close attention to the section Force HTTPS as this will force all http traffic to https and you must have a valid SSL Certificate.

