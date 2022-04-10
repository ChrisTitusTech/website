---
title: FTP Credentials Required for WordPress Update to Plugins/Themes
author: Chris Titus

date: 2015-12-03T22:47:50+00:00
url: /ftp-credentials-required/
image: images/2015/12/ftp-creds.png
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

## CTT Extra Content

- [ChrisTitus.com Downloads Section][1] (_CC Only_)
  1. Digital Downloads with Guides and Pre-Built Images
  2. Monthly Members Only Video
  3. $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  1. Monthly Members Only Video
  2. YouTube Emojis for Comments and Live Chat
  3. YouTube Badges that changes based on membership time for comments and chat.
  4. All YouTube comments are highlighted when I review comments daily. 
  5. $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://christitus.com/join