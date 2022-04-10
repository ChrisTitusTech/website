---
title: Taking Databases Offline and/or Dropping through SQL Query
author: Chris Titus

date: 2017-08-31T17:00:08+00:00
url: /taking-databases-offline-sql-query/
image: images/2017/08/microsoft-Msyql-server.png
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