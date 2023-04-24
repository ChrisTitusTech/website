---
title: "TitusPi 3.0"

date: 2023-04-25
url: /tituspi-2023/
image: images/2023-thumbs/tituspi-2023.jpg
categories:
  - Linux
tags:
  - RaspberryPi
draft: false
---
TitusPi is a raspberrypi desktop that can play retro games and also substitute for a full desktop.
<!--more-->

## What is it?

Linux ARM is at its roots using the Raspbian server lite spin. Official Raspbian Desktop uses XFCE and I don't like it's configuration, look, or performance. TitusPi changes it to what I have found to be the best for a new user.

- KDE Desktop
- Optimized for RaspberryPi 3 and 4
  
## How is Different from Raspbian Desktop?

The desktop offers much better customization, style, and features compared to the official one. The stock KDE experience has performance issues due to the compositing. I optimized this by disabling the compositor in KWIN and making the entire interface much more responsive. 

A customized terminal using my [custom bash settings](https://github.com/ChrisTitusTech/mybash).

| Terminal      | Desktop       | KDE Profile   |
|:-------------:|:-------------:|:-------------:|
|![](/images/2023/tituspi/terminal.png)|![](/images/2023/tituspi/desktop.png)|![](/images/2023/tituspi/konsave.png)|

### Build instructions

- Install Raspberry Pi OS LITE (NOT THE DESKTOP)
- From console on login use `tasksel` and select KDE
- Modify KDE to DISABLE composition in KWIN (Massive performance boost)
- Modify `/boot/cmdline.txt` for leverage graphics acceleration and other boot modifications (quiet boot). 
- Use [konsave](https://github.com/Prayag2/konsave) and tituspi.knsv (extracted from tituspi.7z files - 7Zip Required) to copy fonts, KDE settings and more!

```
disable_splash=1
disable_overscan=1
hdmi_group=1
hdmi_mode=4
hdmi_drive=2
hdmi_ignore_cec_init=1
arm_freq=2048
v3d_freq=750
over_voltage=6
dtparam=i2c_arm=on
dtparam=audio=on
enable_uart=1
[pi4]
dtoverlay=vc4-fkms-v3d
[all]
hdmi_enable_4kp60=1
```


#### boot cmdline.txt explainations

<www.raspberrypi.org/documentation/hardware/raspberrypi/revision-codes/README.md>
<www.cnx-software.com/2020/02/24/raspberry-pi-4-rev-1-2-fixes-usb-c-power-issues-improves-sd-card-resilience/>

Seems my RPi4 version is more sensitive to what chargers I can use, therefore limits overclocking options.

```
cat /proc/cpuinfo | grep Revision
```

> Revision : c03111

##### Overclocking

Reference: <www.raspberrypi.org/documentation/configuration/config-txt/overclocking.md>

These are the speeds I achieve with arm_freq=2048. arm_freq=2047 reports a lower scaling_max_freq which can be noticed in games like God of War: Chains of Olympus (one of the games I used as benchmark). v3d_freq=750 is the max GPU overclock, over_voltage=6 required to provide extra juice (over_voltage=5 worked for me with arm_freq=2000).

```
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq
```

> 2194967

```
echo performance > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
```

> vcgencmd measure_clock arm
> frequency(48)=2048519552

As for hdmi_enable_4kp60=1 I also use it for overclocking reasons, as the only way to increase the GPU core_freq from 500 to 550, enable_tvout underclocks to 360:
"Specific to Pi 4B: The core_freq of the Raspberry Pi 4 can change from the default if either hdmi_enable_4kp60 or enable_tvout are used, due to relationship between internal clocks and the particular requirements of the requested display modes."

##### HDMI options and resolution

Reference: <www.raspberrypi.org/documentation/configuration/config-txt/video.md>

hdmi_group=1, hdmi_mode=4, hdmi_drive=2 : these options set the RPi at 16:9 720p using the standard CEA TV timings and sending audio through HDMI.

hdmi_ignore_cec_init=1 "prevents a CEC-enabled TV from coming out of standby and channel-switching when you are rebooting your Raspberry Pi."
Channel switching on reboots was quite annoying indeed :)

##### No gpu_mem parameters??

Reference: <www.raspberrypi.org/documentation/configuration/config-txt/memory.md>

That's right! :) "On the Raspberry Pi 4 the 3D component of the GPU has its own memory management unit (MMU), and does not use memory from the gpu_mem allocation. Instead memory is allocated dynamically within Linux. This may allow a smaller value to be specified for gpu_mem on the Pi 4, compared to previous models." Note: Still recommended for Pi 3's if using for emulation!

The performance of N64 Conker's Bad Fur Day increased noticeably after removing all gpu_mem parameters.

Information pulled from retropie community forum: <https://retropie.org.uk/forum/topic/27430/howto-optimized-boot-config-txt>

### RetroPie Addition

Check official documentation from RetroPie @ <https://retropie.org.uk/docs/Manual-Installation/>

## Walkthrough Video

{{< youtube 11111111 >}}
