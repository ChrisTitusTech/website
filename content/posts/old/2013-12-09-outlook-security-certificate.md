---
title: Outlook Security Certificate is invalid
author: Chris Titus

date: 2013-12-09T21:33:37+00:00
url: /outlook-security-certificate/
image: /images/2013/12/microsoft_exchange_header_contentfullwidth.jpg
categories:
  - Windows Server
tags:
  - Exchange Server

---
The following article fixes the Outlook security certificate error your users get when they connect to your exchange server internally. This is typically from installing a 3rd party SSL Certificate.<!--more-->

(Original Article Link: <http://community.spiceworks.com/how_to/show/48384-outlook-the-name-of-the-security-certificate-is-invalid-or-does-not-match-the-name-of-the-site>)

Issue: Outlook anywhere works fine with third party cert, but internal Outlook clients get cert error with NETBIOS name of Exchange server.
  
Example: `https://NetBIOS_name.contoso.com/autodiscover/autodiscover.xml`
  
Note: I tested this on Exchange 2010 as well.

### Outlook Security Certificate Resolution

Change the URLs for the appropriate Exchange 2007 components. To do this, follow these steps:

  1. Start the Exchange Management Shell.
  2. Change the Autodiscover URL in the Service Connection Point. The Service Connection Point is stored in the Active Directory directory service. To change this URL, type the following command, and then press Enter:
  
    `Set-ClientAccessServer -Identity CAS_Server_Name -AutodiscoverServiceInternalUri https://mail.contoso.com/autodiscover/autodiscover.xml`
  3. Change the InternalUrl attribute of the EWS. To do this, type the following command, and then press Enter:
  
    `Set-WebServicesVirtualDirectory -Identity "CAS_Server_NameEWS (Default Web Site)" -InternalUrl https://mail.contoso.com/ews/exchange.asmx`
  4. Change the InternalUrl attribute for Web-based Offline Address Book distribution. To do this, type the following command, and then press Enter:
  
    `Set-OABVirtualDirectory -Identity "CAS_Server_nameoab (Default Web Site)" -InternalUrl https://mail.contoso.com/oab`
  5. Change the InternalUrl attribute of the UM Web service. To do this, type the following command, and then press Enter:
  
    `Set-UMVirtualDirectory -Identity "CAS_Server_Nameunifiedmessaging (Default Web Site)" -InternalUrl https://mail.contoso.com/unifiedmessaging/service.asmx`
  
     _Note: The command in step 5 is required only in an Exchange 2007 environment._ This command no longer exists in an Exchange 2010 environment. Instead, the WebServices URL is used for this purpose.
  6. Open IIS Manager.
  7. Expand the local computer, and then expand Application Pools.
  8. Right-click MSExchangeAutodiscoverAppPool, and then click Recycle.

Now that you have finished, you will not see anymore certificate popups. I highly recommend issuing a proper certificate if possible, but this typically happens when your active directory is not resolvable from the outside world. Such as `contsco.local` instead of `microsoft.com`.

## Chris Titus Tech

#### Social

- Twitter - <https://twitter.com/christitustech>
- YouTube - <https://youtube.com/c/ChrisTitusTech>
- Twitch - <https://twitch.tv/christitustech>
- Odysee / LBRY (Privacy) - <https://links.christitus.com/lbry>

#### Exclusive Content

- [ChrisTitus.com Members Section][1] (_CC Only_)
  - Digital Downloads with Guides and Pre-Built Images
  - Monthly Members Only Video
  - $5 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][2] (_All Payments Accepted_)
  - Monthly Members Only Video
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://portal.christitus.com
 [2]: https://links.christitus.com/join