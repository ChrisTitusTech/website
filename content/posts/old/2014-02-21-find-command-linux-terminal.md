---
title: Using the find command Linux Terminal
author: Chris Titus
type: post
date: 2014-02-21T20:56:09+00:00
url: /find-command-linux-terminal/
image: /wp-content/uploads/2014/02/putty-terminals.png
categories:
  - Linux

---
Here is the syntax for using the find command Linux terminal. The following commands are great to have in your back pocket when looking for specific files or directories.<!--more-->

How to find a file from the root directory and check the entire system:
  
`find / -name filename.ext`  
See directory structure without files (requires `tree` use yum or apt-get to install)
  
`tree -d /var/www/`    
_Note: if you don&#8217;t include the -d it will list ALL files and folders_

The two commands I use almost daily as they are fantastic for finding files or just seeing how a programs directories are structured.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
