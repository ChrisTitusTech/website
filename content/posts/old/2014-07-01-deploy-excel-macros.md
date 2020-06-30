---
title: Deploy excel macros to all xls files on startup
author: Chris Titus
type: post
date: 2014-07-01T15:39:39+00:00
url: /deploy-excel-macros/
image: /wp-content/uploads/2014/07/Excel-icon.png
categories:
  - Windows

---
To deploy excel macros on every excel file you open, you will need to create a personal file in your XLStart folder.<!--more-->

### Here is a step-by-step

  1. Create and test your macro
  2. Save as &#8211; Personal.xls (Macro-Enabled workbook)
  3. Copy the personal file to your C:Program Files\Microsoft Office\Office1#\XLStart folder
  4. Done!

I have no clue why the articles on TechNet and Microsoft&#8217;s Knowledge-base are so long when this is all you have to do.  Other than its Microsoft 😉

Note: I&#8217;ve also heard of folks dropping there *.bas macro files directly into XLStart and having the same result, but I personally have not used that method.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
