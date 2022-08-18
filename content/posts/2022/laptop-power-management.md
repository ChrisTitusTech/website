---
title: "Laptop Power Management"

date: 2022-08-26
url: /laptop-power-management/
image: images/2022-thumbs/laptop-power-management.jpg
categories:
  - Linux
  - Windows
tags:
  - Power Management
draft: false
---
Power management is a critical thing to understand in laptops. It's possible to buy an expensive laptop and end up not using it because of bad power management practices.
<!--more-->

{{< tweet user="christitustech" id="1560314657142964224" >}}

 Also, not taking care of the thermals on a laptop will lead to less laptop life, shorter battery, and unpleasant heat generation. 

## Cooling Pad
Get any cheap amazon cooling pad from amazon. Here is a decent $30 one with lots of reviews. <https://amzn.to/3SV0Y0l>

## Redo Thermal Paste
By default, almost any and every laptop has excessive thermal compound which leads to higher temperatures. Simply removing the excess compound and apply just a drop of "good" thermal paste will drop temps by about 10 Celsius. 

Here is an example of excess factory thermal compound application:

![termal](/images/2022/laptop-power/thermal.jpg)

## Adjust Max CPU Frequency
Set your CPU governor to the maximum power it can use. I NEVER use a 100% of the CPU and in most instances rarely break above 50% of its total power. Typically, around 2 GHz is perfect for my day-to-day work. When working on battery, I put this down to 25% on a beefy laptop to conserve most of its power. On weaker laptops, you'd probably double these numbers. 100% on AC Power and 50% on Battery. 

### Linux - cpupower

#### Required Dependencies
Install the following packages

 - cpupower
 - acpi-support
 - acpid
 - acpi

Example Install:
```
apt-get install acpi-support acpid acpi linux-cpupower cpufrequtils
```

#### Setting Min/Max Power Example
```
cpupower frequency-set -g powersave -d 0.8G -u 1.2G
```

#### Check Frequency
```
cpufreq-info
```

### Disable Turbo
Turbo will draw more power and reduce battery life while increasing CPU temperature. 

Run the following from a root user:
```
echo 1 > /sys/devices/system/cpu/intel_pstate/no_turbo
```

### Turn off CPU Cores
The more CPU cores that your laptop uses, the power it will draw. On higher end laptops you can see as big as a 75% savings and extend the battery life x3. 

Taking a CPU core offline (_Note: you can't offline cpu0_)
```
echo 0 > /sys/devices/system/cpu/cpu#/online
```

To disable cores above 4 threads, run the following in a bash script:
```
for ((i=4;i<$(nproc);i++)); do echo 0 > /sys/devices/system/cpu/cpu$i/online; done
```

### Use CPULIMIT to Constrain Apps
#### Install
```
sudo apt install cpulimit
```

#### Adjust EXEC commands in .desktop
```
cpulimit --limit 70 /usr/bin/google-chrome-bin
```
_Note: This would limit CPU usage for Google Chrome to 70%_

### Linux - adjust GPU power
There are two methods for adjusting the power usage your GPU uses. I personally use both depending on the laptop, but eGPU's will eat up a battery laptop in no time. 

#### Manually adjust MHz of GPU
Set the following variables:
 - `/sys/class/drm/card0/gt_max_freq_mhz`
 - `/sys/class/drm/card0/gt_boost_freq_mhz`

Using cat to display current MHz and then simply echo the new lower value to these variables.

Example:

```
echo "1000" > /sys/class/drm/card0/gt_max_freq_mhz
```

#### Turning off GPU with Prime-select
While there are technically 3 options, I recommend only using NVIDIA and intel, as on-demand doesn't work very well. 

#### Turning off GPU with Envycontrol
Cool python project that rebuilds the init system to exclude nvidia. 

<https://github.com/geminis3/EnvyControl>



### Windows - GUI Power Management
Launch the GUI power panel with Start ⇾ Run `powercfg.cpl`

![win-power](/images/2022/laptop-power/win-power.png)

Then change the Min / Max CPU Power. I typically set these to 5% Min and 50% Max, but on weaker laptops you can set these higher.

### Windows - AutoHotkey Script
This script sets the max CPU state when plugged in to the wall (AC Power) and when it runs on battery (DC Power). 
```
PowerWriteProcessorStateValueIndex(50, "AC")
PowerWriteProcessorStateValueIndex(25, "DC")
ExitApp

;---------------------
PowerWriteProcessorStateValueIndex(Max := "", Mode := "") {
	l:=PowerEnumeratePlans(ActivePlan), VarSetCapacity(GUID_ACTIVE_POWER_SAVING, 16, 0), VarSetCapacity(GUID_PROCESSOR_SETTINGS_SUBGROUP, 16, 0)
	, DllCall("Ole32.dll\CLSIDFromString", "WStr", "{" ActivePlan.GUID "}", "Ptr", &GUID_ACTIVE_POWER_SAVING), VarSetCapacity(GUID_PROCESSOR_THROTTLE_MAXIMUM, 16, 0)
	, DllCall("Ole32.dll\CLSIDFromString", "WStr", "{54533251-82be-4824-96c1-47b60b740d00}", "Ptr", &GUID_PROCESSOR_SETTINGS_SUBGROUP)
	, DllCall("Ole32.dll\CLSIDFromString", "WStr", "{BC5038F7-23E0-4960-96DA-33ABAF5935EC}", "Ptr", &GUID_PROCESSOR_THROTTLE_MAXIMUM)
	, DllCall("PowrProf.dll\PowerWrite" Mode "ValueIndex", "Ptr", 0, "Ptr", &GUID_ACTIVE_POWER_SAVING
	, "Ptr", &GUID_PROCESSOR_SETTINGS_SUBGROUP, "Ptr", &GUID_PROCESSOR_THROTTLE_MAXIMUM, "UInt", Max, "UInt")
	for k, v in l
		if !(v.Default) {
			RunWait, % ComSpec " /c powercfg /s " v.GUID,, Hide
			break
		} RunWait, % ComSpec " /c powercfg /s " ActivePlan.GUID,, Hide
}

;------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

;enumerates all power plans
;for k, v in PowerEnumeratePlans()
;	MsgBox % "#" k "`nGUID: " v.GUID "`Name: " v.Name "`nDefault?: " v.Default
PowerEnumeratePlans(ByRef ActivePlan := "") {
	List := {}
	for k, v in StrSplit(CMD("powercfg /l"), ":", A_Space A_Tab)
		if (A_Index>1) {
			Info := {}, Info.GUID := SubStr(Trim(v), 1, 36), Info.Default := !!InStr(v, "*")
			, Info.Name := Trim(StrSplit(SubStr(v, InStr(v, "(")+1), ")")[1]), List.Push(Info)
			if (Info.Default)
				ActivePlan := Info
		} return List
}

;executes cmd command and return the result
CMD(CMD := "", Encoding := "UTF-8", ByRef ExitCode := "") {
	DllCall("Kernel32.dll\CreatePipe", "PtrP", hReadPipe, "PtrP", hWritePipe, "Ptr", 0, "UInt", 0)
	, DllCall("Kernel32.dll\SetHandleInformation", "Ptr", hWritePipe, "UInt", 1, "UInt", 1)
	, Size := VarSetCapacity(STARTUPINFO, A_PtrSize=4?68:104, 0), NumPut(Size, STARTUPINFO, 0, "UInt")
    , NumPut(0x100, STARTUPINFO, A_PtrSize=4?44:60, "UInt"), NumPut(hStdInRd, STARTUPINFO, A_PtrSize=4?56:80, "Ptr")
    , NumPut(hWritePipe, STARTUPINFO, A_PtrSize=4?60:88, "Ptr"), NumPut(hWritePipe, STARTUPINFO, A_PtrSize=4?64:96, "Ptr")
	, pi := CreateProcess(, ComSpec " /c " CMD,,,, 0x08000000,,, &STARTUPINFO)
	, DllCall("Kernel32.dll\CloseHandle", "Ptr", hWritePipe), Size := VarSetCapacity(Buff, 4095)
	while DllCall("Kernel32.dll\ReadFile", "Ptr", hReadPipe, "Ptr", &Buff, "UInt", Size, "PtrP", Bytes, "Ptr", 0)
        OutputVar .= StrGet(&Buff, Bytes, Encoding)
	DllCall("Kernel32.dll\CloseHandle", "Ptr", pi.handle), DllCall("Kernel32.dll\CloseHandle", "Ptr", hReadPipe)
	return OutputVar, DllCall("Kernel32.dll\GetExitCodeProcess", "Ptr", pi.handle, "UIntP", ExitCode)
} CreateProcess(ApplicationName := "", ByRef CommandLine := "", ProcessAttributes := 0, ThreadAttributes := 0, InheritHandles := true, CreationFlags := 0x08000000, Environment := 0, CurrentDirectory := "", StartupInfo := 0) {
	VarSetCapacity(PROCESS_INFORMATION, A_PtrSize=4?16:24, 0)
	, r := DllCall("Kernel32.dll\CreateProcess", "Ptr", ApplicationName=""?0:&ApplicationName, "Ptr", CommandLine=""?0:&CommandLine
	, "Ptr", ProcessAttributes, "Ptr", ThreadAttributes, "Int", !!InheritHandles, "UInt", CreationFlags, "Ptr", Environment, "Ptr", CurrentDirectory=""?0:&CurrentDirectory
	, "Ptr", StartupInfo, "Ptr", &PROCESS_INFORMATION)
	return r?{HANDLE: NumGet(PROCESS_INFORMATION, 0, "Ptr"), hThread: NumGet(PROCESS_INFORMATION, A_PtrSize, "Ptr")
	, ID: NumGet(PROCESS_INFORMATION, A_PtrSize=4?8:16, "Ptr"), ThreadID: NumGet(PROCESS_INFORMATION, A_PtrSize=4?12:24, "Ptr")}:0, ErrorLevel := !r
}
```

## Walkthrough Video

{{< youtube 11111111 >}}