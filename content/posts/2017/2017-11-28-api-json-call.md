---
title: Python script to print out specific results from an API JSON call
author: Chris Titus

date: 2017-11-28T22:03:53+00:00
url: /api-json-call/
image: images/2017/11/jsonapi.webp
categories:
  - Linux
tags:
  - Python

---
The following is a Python script to print out specific results from an API JSON call from a website. This basic syntax will allow you to create a value to use.<!--more-->

```
import json, urllib2 # Import libraries we will be using
url = urllib2.urlopen('http://baseurl.com:port/api.json') # Pull webpage into a variable
result = json.load(url) # Format the URL for JSON
allhash = result['hashrate']['total'] # Pull a specific array of values
checkhash= allhash[0] # Specify a single value in the array
```
## Making an API JSON call

Using this basic script this will make a call from the JSON API on a website. I wanted a specific value 2 levels down. To determine which value you want to grab remember { open bracket will expand a level and a } close bracket will go back a level.

For instance, using this api.json
  
```
{"hashrate":{"threads":[[632.8,629.7,631.0],[531.6,524.6,518.4],[631.9,628.6,625.0],[501.6,520.4,512.0]],"total":[2297.8,2303.2,2286.4],"highest":2339.2},"results":{"diff_current":100001,"shares_good":281,"shares_total":301,"avg_time":49.9,"hashes_total":32000515,"best":[11141633,10328800,8258255,8129845,4476110,3954464,3795403,3425658,3208501,3130523],"error_log":[{"count":18,"last_seen":1511905084,"text":"Job not found."}]},"connection":{"pool": "cryptonight.usa.nicehash.com:3355","uptime":15018,"ping":109,"error_log":[]}}
```

### In Closing

Using the above API readout you can see I go into the hashrate brackets and pull the values for &#8220;total&#8221;. This creates an array and not a single string. So to make a call for the second value in &#8220;total&#8221; you would change the python code from allhash[0] to allhash[1]. You can use this to print out the values from the script, put them in a variable to be displayed on a website, or use it in a Nagios script for monitoring. The options are limitless.

