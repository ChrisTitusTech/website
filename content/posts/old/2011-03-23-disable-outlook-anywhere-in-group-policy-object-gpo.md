---
title: Disable Outlook Anywhere in Group Policy Object (GPO)
author: Chris Titus

date: 2011-03-23T15:35:23+00:00
url: /disable-outlook-anywhere-in-group-policy-object-gpo/
categories:
  - Windows Server

---
By default the standard outlk12.adm templates do not come with a configuration of Outlook Anywhere. You can configure the &#8220;**Configure Outlook Anywhere user interface options**&#8221; options to disable or grey out the settings. However, this DOES NOT disable Outlook anywhere, just user interaction with it.

You will need to download a new administrative template that Microsoft released in this [hotfix][5]. If you don&#8217;t like reading Microsoft&#8217;s wonderful support site instructions or Microsoft changes their support site after this blog post, here is the file and instructions paraphrased.

1. Download Add-On Outlook Anywhere Administrative Template here&#8230;[article-961112][6] (unzip to reveal article-961112.adm file).
  
2. In the Group Policy Object Editor add the Article-961112.adm file:
  
Right-click Administrative Templates and click Add/Remove Templates.
  
In the Add/Remove Templates dialog box click Add.
  
In the Policy Templates dialog box locate and select the Article-961112.adm file. Click Open.
  
Click Close in the Add/Remove Templates dialog box.
  
3. Under User Configuration in Administrative Templates expand the policy node labeled Article 961112 Policy Settings. (Note: You may see this under Classic Administrative Templates in a sub-menu)
  
4. Select the Outlook Anywhere (RPC/HTTP) node to list the following policies under the Setting column in the right-pane:

> RPC/HTTP Connection Flags -> Set to Enabled -> No Flags
  
> Proxy Server Name -> Do not change
  
> Only Connect if Proxy Server certificate has this principle name -> Do not change
  
> Proxy authentication Setting -> Do not change

5. Double-click each policy to configure the appropriate RPC/HTTP setting for your Outlook clients.

 [5]: http://support.microsoft.com/kb/961112
 [6]: http://localhost/images/2011/03/article-961112.zip
