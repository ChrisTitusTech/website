---
title: FTP Credentials Required for WordPress Update to Plugins/Themes
author: Chris Titus
type: post
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

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://portal.christitus.com
 [5]: https://links.christitus.com/join