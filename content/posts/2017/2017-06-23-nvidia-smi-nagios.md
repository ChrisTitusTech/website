---
title: Report Nvidia-smi Temperature to Nagios
author: Chris Titus
type: post
date: 2017-06-24T04:14:45+00:00
url: /nvidia-smi-nagios/
thumbnail: /wp-content/uploads/2017/06/Nagios-Logo.jpg
categories:
  - Linux
tags:
  - Nagios

---
Here is a custom script that reports the nvidia-smi temperature of the Nvidia cards in your system using NRPE. Conversely,  NRPE performs much better than NCPA and my protocol of choice.<!--more-->
  
_*Note: Install NRPE to your_ Linux _box first, and create this file (gpu_temp.sh) in your /_usr_/lib/_nagios_/plugins directory for Nagios Core 4+_

## Nagios NRPE Query Command

`check_nrpe!gpu_temp.sh`

This will only query the first GPU that is found via nvidia-smi CLI command. It will do warnings and alerts at the given thresholds.

![nvidia smi nagios](/wp-content/uploads/2017/06/script.png)

### The gpu_temp.sh Script

Use this script to query nvidia-smi, thus reporting the temp of the card.
  
```
############################################
## Sample nvidia commands to query gpu
##
##nvidia-smi -q -d TEMPERATURE | grep "GPU Current Temp" | awk '{print $5}'
##nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader
##nvidia-smi | grep '[0-9][0-9]C' | awk '{print $3}' | sed 's/C//'
############################################`
```
Here is the script code:
  
```
#!/bin/bash
gpu_temp=`nvidia-smi | grep '[0-9][0-9]C' | awk '{print $3}'`
case $gpu_temp in
[1-70]*)
echo "OK - $gpu_temp in normal operating range."
exit 0
;;
[71-80]*)
echo "WARNING - $gpu_temp in high operating range."
exit 1
;;
[81-100]*)
echo "CRITICAL - $gpu_temp in extreme operating range. Shutdown ASAP!"
exit 2
;;
*)
echo "UNKNOWN - $gpu_temp is current temperature."
exit 3
;;
esac`
```

You will need to modify this as the nvidia-smi tool will be updated in the future and the grep command will have to be reconfigured if due to any output changes.

I live stream on [Twitch][1] and encourage you to drop in and ask a question. I regularly publish on [YouTube][2] and [christitus.com][3], but if you need immediate assistance, check out our discord channel at [Chris Titus Tech Discord][4].

 [1]: https://twitch.tv/christitustech
 [2]: https://www.youtube.com/c/ChrisTitusTech
 [3]: https://www.christitus.com/
 [4]: https://www.christitus.com/discord
