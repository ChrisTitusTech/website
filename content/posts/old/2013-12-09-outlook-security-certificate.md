---
title: Outlook Security Certificate is invalid
author: Chris Titus
type: post
date: 2013-12-09T21:33:37+00:00
url: /outlook-security-certificate/
image: /wp-content/uploads/2013/12/microsoft_exchange_header_contentfullwidth1.jpg
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

## Contact Me

I live stream on [Chris Titus Tech YouTube Channel][1] every Friday at 10 AM CST and archive clips to [Titus Tech Talk][2]. I also regularly publish to [christitus.com][3], but if you'd like to contact me directly or want to contribute to help keep these articles and videos being made consider joining the CTT members. 

Two Memberships exist:
- [ChrisTitus.com Members Section][4] (_CC Only_)
  - Full Archive of All Unlisted Live Streams
  - Direct Members Only Email
  - Monthly Members Only Video
  - Starting at $2 Per Month (_100% of Proceeds goes to Chris Titus Tech_)
- [YouTube Chris Titus Tech Membership][5] (_All Payments Accepted_)
  - YouTube Emojis for Comments and Live Chat
  - YouTube Badges that changes based on membership time for comments and chat.
  - All YouTube comments are highlighted when I review comments daily. 
  - Immediate Access to Full Live Streams
  - $4.99 Per Month (_70% of the Proceeds goes to Chris Titus Tech_)

 [1]: https://www.youtube.com/c/ChrisTitusTech
 [2]: https://www.youtube.com/c/ChrisTitusTechStreams
 [3]: https://christitus.com/
 [4]: https://christitus.com/members
 [5]: https://links.christitus.com/join