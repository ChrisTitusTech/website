---
title: "Microsoft Is Driving Users Away"

date: 2023-02-17
url: /microsoft-is-driving-users-away/
image: images/2023-thumbs/microsoft-is-driving-users-away.jpg
categories:
  - Windows
tags:
  - Microsoft
draft: false
---
What will be the end of Windows? Microsoft.
<!--more-->

I've been a lifelong Windows user since the 90s and even MS-DOS back in the 80s, but things are changing. I've been using other operating systems more and more. MacOS and Linux are getting mixed into my workflow more and Windows less. Why? Microsoft is actively angering it power users by removing features. By trying to simplify Windows they are actively making administering it worse.

## The Problem

Microsoft is in a panic from the continued loss of it's user base. They are making some improvements like the GUI and cleaning up other elements that give a more cohesive look. No more mixing Metro UI and Legacy panels like Windows 10. While this is good on the surface, they aren't fixing anything. In fact, things are about to get much worse with the removal of these panels. On Tuesday, I had a printer issue at a client site and I was going to pull up the "Devices and Printers" panel to manage the drives and printing default settings. In the most recent 22H2 Windows 11 update, they hid it! 

Using old Control Panel (Start->Run->`control`)

Clicking on this will redirect you to the new settings printer that gives NO options to do any advanced troubleshooting and removes the ability to FIX the issue!

What about the old `control printers` shortcut? remapped to the new crap.

## The Solution

With any Windows problem, Microsoft never really removes ANYTHING! Remember, this company is still using legacy code from the 90s in spots and just slapping in new coat of paint on top of it every 5 years when they need to extract more money from its users.

To Access the old devices and printer use the run prompt and type the following:

```
shell:::{A8A91A66-3A7D-4424-8D24-04E180695C7A}
```

Alternatively, you can create a new shortcut and assign the key combination to it.

* Create a new shortcut on your desktop
* Set the location to: explorer.exe shell:::{A8A91A66-3A7D-4424-8D24-04E180695C7A}
* Set the name to Devices and Printers
* Choose the shortcut icon
* Add the key combination shortcut (CTRL + ALT + D is default for this window)

This provides you an easy to access link as well as overwriting the keyboard shortcut to open the old version.

Success for now...

## The Future

MacOS and Linux will keep gaining market share. Microsoft needs to stop actively sabotaging it's users. MacOS is bland and hasn't changed in years, while Linux has a technical barrier of entry with little support. Yet, both of these options are better than modern Windows unless you need Gaming. However, Steam with it's steamdeck might be changing the game...

## Walkthrough Video

{{< youtube "q7JmN8_URGY" >}}
