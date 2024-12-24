---
title: "Creating a Website on Raspberry Pi"

date: 2021-04-20T10:02:56-05:00
url: /pi-website/
image: images/2021-thumbs/pi-website.webp
categories:
  - Linux
tags:
  - Raspberry Pi
featured: true
---
This is a guide on how to create a website on a Raspberry Pi. This will teach you the basics of using a LAMP stack.
<!--more-->

## Overview

This is perfect for setting up your first website and learning not only administering a wordpress site, but learning Linux. You will need a Raspberry Pi, a couple hours, and a computer to download the image on. The Raspberry Pi (RPI) is a perfect device for learning these things. 

Also check out the official projects site from RaspberryPi
Source: <https://projects.raspberrypi.org/en/projects/lamp-web-server-with-wordpress> 

## Downloading the RPI Imager

Download the Imager for your operating system. This supports all three OS's (Windows, Mac, and Linux).

<https://www.raspberrypi.org/downloads/>

- Run and Install the Imager
- Select Raspberry Pi OS (other) -> Raspberry Pi OS Lite (32-bit)
  - Note: This is the one with NO Desktop Environment
- Insert the SD Card into your Computer
- Click Write

## Install Dependencies

```
sudo apt-get install apache2 php mariadb-server php-mysql -y
sudo service apache2 restart
```

## Install Wordpress

```
cd /var/www/html/
sudo rm *
sudo wget http://wordpress.org/latest.tar.gz
sudo tar xzf latest.tar.gz
sudo mv wordpress/* .
sudo rm -rf wordpress latest.tar.gz
sudo chown -R www-data: .
```

## Setup WordPress Database

```
sudo mysql_secure_installation
```

- You will be asked Enter current password for root (enter for none): — press Enter.
- Type in Y and press Enter to Set root password?.
- Type in a password at the New password: prompt, and press Enter. Important: remember this root password, as you will need it later to set up WordPress.
- Type in Y to Remove anonymous users.
- Type in Y to Disallow root login remotely.
- Type in Y to Remove test database and access to it.
- Type in Y to Reload privilege tables now.

_When complete, you will see the message All done! and Thanks for using MariaDB!._

Login to MySQL with `sudo mysql -uroot -p` and enter the password you set above. 

You will see the terminal prompt change and you can enter the following: 

```
create database wordpress;
GRANT ALL PRIVILEGES ON wordpress.* TO 'root'@'localhost' IDENTIFIED BY 'YOURPASSWORD';
FLUSH PRIVILEGES;
```

*IMPORTANT: Exit SQL Prompt with `Ctrl + D` and change `YOURPASSWORD` above to your password!*

Reboot with `sudo reboot`

## Wordpress Configuration

Remote Access can be done with SSH from any system. Find your Raspberry Pi IP with `ip a`. This IP is only your Local IP and not accessible from the outside world. 

Initial setup can be done from any computer in the same network as the RPI. Type your pi ip address from above into your browsers address bar. 

_Example: https://192.168.1.123_

Remote Login after initial setup append `/wp-admin` to the address

_Example: https://192.168.1.123/wp-admin_

## Recommended Server settings

Finally we need to make some quality of life improvements so you don't have weird looking addresses. This is called "Friendly Permalinks". 

In the *WP Admin Portal*:

- Go to *Setting*, then *Permalinks*
- Select the *Post name* option and click *Save Changes*

From *SSH or Terminal on the RPI* you need to enter the following:

```
sudo a2enmod rewrite
sudo nano /etc/apache2/sites-available/000-default.conf
```

000-default.conf edits (Add this midway in the file)

```
<Directory "/var/www/html">
    AllowOverride All
</Directory>
```

Save the File by press Ctrl + O and Exit with Ctrl + X

Now restart Apache Web with `sudo service apache2 restart`

