---
title: FTP Credentials Required for WordPress Update to Plugins/Themes
author: Chris Titus

date: 2015-12-03T22:47:50+00:00
url: /ftp-credentials-required/
image: /images/2015/12/ftp-creds.png
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

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://links.christitus.com/lbry>

#### Exclusive Content

- [ChrisTitus.com Members Section][1] (_CC Only_)
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  - Monthly Members Only Video
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://links.christitus.com/join