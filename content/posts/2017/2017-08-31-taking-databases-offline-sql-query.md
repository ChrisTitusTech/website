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

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out the Terminal Cafe with [Discord Invite Link][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://christitus.com/
 [4]: https://christitus.com/discord
