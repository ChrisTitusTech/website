---
title: WordPress on Google Cloud Platform
author: Chris Titus
type: post
date: 2019-03-14T15:23:56+00:00
url: /wordpress-google-cloud-platform/
image: /wp-content/uploads/2019/03/google-cloud-platform.png
categories:
  - Linux
tags:
  - Website
  - Google Cloud Platform
  - WordPress

---
I am going over hosting WordPress on Google Cloud Platform in this article. This is a step by step guide on how to set up and host a WordPress website using a fresh installation. <!--more-->

![nas_theapplication_3216](/wp-content/uploads/2019/03/nas_theapplication_3216.png)

### Step 1: Fresh VM

_Note: Be sure and install gcloud https://cloud.google.com/sdk/docs/downloads-apt-get
Setup Project and VM (micro)_  
```sudo apt update && sudo apt upgrade```

### Step 2: Install Swap
```
sudo fallocate -l 1G /swapfile  
sudo dd if=/dev/zero of=/swapfile bs=1024 count=1048576  
sudo chmod 600 /swapfile  
sudo mkswap /swapfile  
sudo swapon /swapfile  
sudo nano /etc/fstab  
```
`/swapfile swap swap defaults 0 0`

![apache2](/wp-content/uploads/2019/03/apache2.png)

### Step 3: Install LAMP Stack (Linux, Apache, MySQL, and PHP)

```
sudo apt install tasksel
sudo tasksel install lamp-server
sudo apt install php-curl php-gd php-mbstring php-xml php-xmlrpc
```

![Internet_Line-20-512](/wp-content/uploads/2019/03/Internet_Line-20-512.png)

### Step 4: Configure Domain

**Setup DNS**  
-Go to your web domain registrar and create A record pointing to your new server  
**Configure Apache conf for website**  
```
<Directory /var/www/example.com>  
        Require all granted  
</Directory>  
<VirtualHost *:80>  
        ServerName <a rel="noreferrer noopener" target="_blank" href="http://example.com/">example.com</a>  
        ServerAlias <a rel="noreferrer noopener" target="_blank" href="http://www.example.com/">www.example.com</a>  
        ServerAdmin webmaster@localhost  
        DocumentRoot /var/www/example.com  
</VirtualHost>
```

`$ mkdir -p /var/www/example.com`

`$ a2dissite 000-default.conf`  
`$ a2ensite example.com.conf`  
`$ systemctl reload apache2`

![san](/wp-content/uploads/2019/03/san.png)

### Step 5: Prep Database and PHP

**Create database**
```
$ mysql -u root  
> CREATE DATABASE wordpress;  
> GRANT ALL ON wordpress.* TO 'wordpressuser' IDENTIFIED BY 'Secure1234!';  
> quit  
$ mysql_secure_installation
```

**Edit /etc/php/7.2/apache2/php.ini**  
```
max\_input\_time = 30  
upload\_max\_filesize = 20M  
post\_max\_size = 21M
```
![WordPress-Logo-Download-PNG](/wp-content/uploads/2019/03/WordPress-Logo-Download-PNG.png)

### Step 6: Install WordPress on Google Cloud Platform

https://codex.wordpress.org/Installing_WordPress  
`$ wget https://wordpress.org/latest.tar.gz`  
`$ tar -xzvf latest.tar.gz` 

### Step 7: Tune the new install and MPM_Prefork.conf
https://raw.githubusercontent.com/richardforth/apache2buddy/master/apache2buddy.pl

### Step 8: Troubleshooting

One important addition to setting up WordPress. Permission errors with the WordPress installation can be fixed with the following command. 

`$ chown -R www-data:www-data /var/www/html/*`

This adds permissions for the Apache server user to use the files in the webpage directory.

## Video Walkthrough

[![wordpress-yt](https://img.youtube.com/vi/vIJdypOqlL4/0.jpg)](https://www.youtube.com/watch?v=vIJdypOqlL4)  
_Note: YouTube Video - Hold Ctrl + Left Click to open in new window_

In Conclusion, you now have WordPress on Google Cloud Platform. Enjoy the experience and let me know in the comments if you have any issues. 

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: /
 [4]: /discord
