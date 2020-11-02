---
title: Taking Databases Offline and/or Dropping through SQL Query
author: Chris Titus
type: post
date: 2017-08-31T17:00:08+00:00
url: /taking-databases-offline-sql-query/
image: /wp-content/uploads/2017/08/microsoft-Msyql-server.png
categories:
  - Windows Server
tags:
  - Microsoft SQL

---
The following SQL query is for taking databases offline, drop the offline databases, or bring them all back online. This affects every database in your SQL instance, so be very careful when using these. The following three queries will save you a considerable amount of time if repurposing an instance.<!--more-->

## Taking databases offline and then dropping them

```
use master;
declare @nsql nvarchar(max);
select @nsql=coalesce(@nsql+CHAR(13)+CHAR(10),'')+
'ALTER DATABASE ['+name+'] SET OFFLINE WITH NO_WAIT;'
from master..sysdatabases where sid <> 0x01
exec (@nsql)`
```
Once all databases are offline you can drop them to clear out the entire instance with this SQL query.  
_Note: This is extremely destructive so please use this with care._
# *WARNING* Running this WILL DESTROY ALL DATABASES!!!
```
use master;
declare @nsql nvarchar(max);
select @nsql=coalesce(@nsql+CHAR(13)+CHAR(10),'')+
'DROP DATABASE ['+name+'];'
from master..sysdatabases where sid <> 0x01
exec (@nsql)
```

## Use the following SQL query to take all databases online

```
use master;
declare @nsql nvarchar(max);
select @nsql=coalesce(@nsql+CHAR(13)+CHAR(10),'')+
'ALTER DATABASE ['+name+'] SET ONLINE WITH NO_WAIT;'
from master..sysdatabases where sid <> 0x01
exec (@nsql)
```

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