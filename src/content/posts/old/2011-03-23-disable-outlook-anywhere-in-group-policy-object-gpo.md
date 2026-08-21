---
title: Disable Outlook Anywhere in Group Policy Object (GPO)
author: Chris Titus

date: 2011-03-23T15:35:23+00:00
url: /disable-outlook-anywhere-in-group-policy-object-gpo/
categories:
  - Windows Server

---
By default the standard outlk12.adm templates do not come with a configuration of Outlook Anywhere. You can configure the &#8220;**Configure Outlook Anywhere user interface options**&#8221; options to disable or grey out the settings. However, this DOES NOT disable Outlook anywhere, just user interaction with it.

You will need the Article-961112 administrative template that Microsoft released
for this configuration. Microsoft has retired the original KB article and
download, so this walkthrough is retained for historical reference.

1. Obtain the Article-961112 administrative template from a trusted archive
   and unzip it to reveal the `article-961112.adm` file.
  
2. In the Group Policy Object Editor add the Article-961112.adm file:
  
Right-click Administrative Templates and click Add/Remove Templates.
  
In the Add/Remove Templates dialog box click Add.
  
In the Policy Templates dialog box locate and select the Article-961112.adm file. Click Open.
  
Click Close in the Add/Remove Templates dialog box.
  
1. Under User Configuration in Administrative Templates expand the policy node labeled Article 961112 Policy Settings. (Note: You may see this under Classic Administrative Templates in a sub-menu)
  
2. Select the Outlook Anywhere (RPC/HTTP) node to list the following policies under the Setting column in the right-pane:

> RPC/HTTP Connection Flags -> Set to Enabled -> No Flags
> Proxy Server Name -> Do not change
> Only Connect if Proxy Server certificate has this principle name -> Do not change
> Proxy authentication Setting -> Do not change

1. Double-click each policy to configure the appropriate RPC/HTTP setting for your Outlook clients.
