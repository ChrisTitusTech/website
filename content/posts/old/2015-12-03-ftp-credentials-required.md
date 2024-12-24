---
title: FTP Credentials Required for WordPress Update to Plugins/Themes
author: Chris Titus

date: 2015-12-03T22:47:50+00:00
url: /ftp-credentials-required/
image: images/2015/12/ftp-creds.webp
categories:
  - Linux

---
If you are getting errors on a WordPress update that say you need FTP credentials, your apache install doesn&#8217;t have rights to do the changes. You could install vsftpd, but it is MUCH easier to just grant apache access to your WordPress.<!--more-->

### Commands to grant access

`sudo chown -R apache:apache path/to/wordpress`

#### Here is the syntax I used

`sudo chown -R apache:apache /var/www/html/`
  
OR
  
`sudo chown -R www-data:www-data /var/www/html/public_html`

Afterward, you should not see the error asking for FTP Credentials again. This is a very simple process and one I highly recommend due to many plugins requiring this to update.

