---
title: Configuring SQL Authentication
author: Chris Titus

date: 2013-04-09T16:24:26+00:00
url: /configuring-sql-authentication/
image: images/2013/04/sql-authentication.webp
categories:
  - Windows Server
tags:
  - GFI MailArchiver
  - Microsoft SQL

---
Configuring SQL Authentication can be tricky at times, and this is a great article that goes over the two types of authentication in SQL. I find some programs interface better with direct SQL authentication when Windows Authentication fails for any reason.<!--more-->

_Note: This article is taken from <http://kb.gfi.com/articles/SkyNet_Article/How-to-configure-SQL-Server-2005-2008-to-accept-SQL-Authentication> and all credit goes to them for the writing. I&#8217;m posting it here simply as a reference in case_ there _site changes the above link. _

### Fix Authentication in GFI ReportCenter

In order to use SQL Server authentication, you must first configure your server using the steps below.
1. Right-click on the server node and select &#8216;Properties&#8217;
2. Select &#8216;Security&#8217; from the left menu under &#8216;Select a page&#8217;
3. Under &#8216;Server Authentication&#8217;, select the &#8216;SQL Server and Windows Authentication mode option&#8217;
4. Click &#8216;OK&#8217; to close the dialog
5. Right click on the server node and choose &#8216;Restart&#8217; for the changes to take effect

#### SQL Server authentication login
1. In the server node expand &#8216;Security&#8217; and &#8216;Logins&#8217;
2. Right click on the login name and select &#8216;Properties&#8217;
3. Enter a password and confirm the password for the login
4. Select &#8216;Status&#8217; from the left menu under &#8216;Select a page&#8217;
5. Set the &#8216;Login&#8217; option to &#8216;Enabled&#8217;
6. Click &#8216;OK&#8217; to close the dialog

Once you have walked through configuring SQL authentication, you can now change your instance to the type you need.

