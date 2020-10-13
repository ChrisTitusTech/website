---
title: "Linux Cheatsheet"
type: post
date: 2020-09-25T11:04:34-05:00
url: /linux-cheatsheet/
image: /images/2020-thumbs/linux-cheatsheet.jpg
categories:
  - Linux
  - Windows
  - Networking
tags:
  - Ubuntu
draft: true
---
Here is a cheatsheet of commands that every Linux user should know or have on hand.
<!--more-->

## Display System Information

```bash
uname -sr # Display kernel release information
uptime # How long has the computer been booted
hostname # Show system host name
last reboot # Displays reboot history
cal # Show this month's calendar
whoami # Shows current username
```

## Hardware Information

```bash
dmesg # Display messages in kernel ring buffer
cat /proc/cpuinfo # Display CPU information
free -h # Display free and used memory ( -h for human readable, -m for MB, -g for GB.)
lspci # Display PCI devices
lsusb # Display USB devices
dmidecode # Display DMI/SMBIOS (hardware info) from the BIOS
hdparm -i /dev/sda # Show info about disk sda
```

## Performance Monitoring

```bash
top # Display and manage the top processes
htop # Interactive process viewer
iostat 1 # I/O statistics
tail 50 /var/log/syslog # Display the last 50 syslog messages
tcpdump -i eth0 'port 80' # Monitor all traffic on port 80 ( HTTP )
lsof # List all open files on the system
watch df -h # Execute "df -h", showing periodic updates
```

## User Management

```bash
id # Display the user and group ids of your current user
groupadd test # Create a group named "test"
useradd -m titus # Create the account and create the user's home directory
userdel titus # Delete the titus account
usermod -aG autologin titus # Add the titus account to the autologin group

## File Management

```bash
# List all files in a long listing (detailed) format
ls -al

# Display the present working directory
pwd

# Create a directory
mkdir directory

# Remove (delete) file
rm file

# Remove the directory and its contents recursively
rm -r directory

# Force removal of file without prompting for confirmation
rm -f file

# Forcefully remove directory recursively
rm -rf directory

# Copy file1 to file2
cp file1 file2

# Copy source_directory recursively to destination. If destination exists, copy source_directory into destination, otherwise create destination with the contents of source_directory.
cp -r source_directory destination

# Rename or move file1 to file2. If file2 is an existing directory, move file1 into directory file2
mv file1 file2

# Create symbolic link to linkname
ln -s /path/to/file linkname

# Create an empty file or update the access and modification times of file.
touch file

# View the contents of file
cat file

# Browse through a text file
less file

# Display the first 10 lines of file
head file

# Display the last 10 lines of file
tail file

# Display the last 10 lines of file and "follow" the file as it grows.
tail -f file
6 – PROCESS MANAGEMENT
# Display your currently running processes
ps

# Display all the currently running processes on the system.
ps -ef

# Display process information for processname
ps -ef | grep processname

# Display and manage the top processes
top

# Interactive process viewer (top alternative)
htop

# Kill process with process ID of pid
kill pid

# Kill all processes named processname
killall processname

# Start program in the background
program &

# Display stopped or background jobs
bg

# Brings the most recent background job to foreground
fg

# Brings job n to the foreground
fg n
7 – FILE PERMISSIONS
Linux chmod example
        PERMISSION      EXAMPLE

         U   G   W
        rwx rwx rwx     chmod 777 filename
        rwx rwx r-x     chmod 775 filename
        rwx r-x r-x     chmod 755 filename
        rw- rw- r--     chmod 664 filename
        rw- r-- r--     chmod 644 filename

# NOTE: Use 777 sparingly!

        LEGEND
        U = User
        G = Group
        W = World

        r = Read
        w = write
        x = execute
        - = no access
8 – NETWORKING
# Display all network interfaces and ip address
ifconfig -a

# Display eth0 address and details
ifconfig eth0

# Query or control network driver and hardware settings
ethtool eth0

# Send ICMP echo request to host
ping host

# Display whois information for domain
whois domain

# Display DNS information for domain
dig domain

# Reverse lookup of IP_ADDRESS
dig -x IP_ADDRESS

# Display DNS ip address for domain
host domain

# Display the network address of the host name.
hostname -i

# Display all local ip addresses
hostname -I

# Download http://domain.com/file
wget http://domain.com/file

# Display listening tcp and udp ports and corresponding programs
netstat -nutlp
 

9 – ARCHIVES (TAR FILES)
# Create tar named archive.tar containing directory.
tar cf archive.tar directory

# Extract the contents from archive.tar.
tar xf archive.tar

# Create a gzip compressed tar file name archive.tar.gz.
tar czf archive.tar.gz directory

# Extract a gzip compressed tar file.
tar xzf archive.tar.gz

# Create a tar file with bzip2 compression
tar cjf archive.tar.bz2 directory

# Extract a bzip2 compressed tar file.
tar xjf archive.tar.bz2
10 – INSTALLING PACKAGES
# Search for a package by keyword.
yum search keyword

# Install package.
yum install package

# Display description and summary information about package.
yum info package

# Install package from local file named package.rpm
rpm -i package.rpm

# Remove/uninstall package.
yum remove package

# Install software from source code.
tar zxvf sourcecode.tar.gz
cd sourcecode
./configure
make
make install
11 – SEARCH
# Search for pattern in file
grep pattern file

# Search recursively for pattern in directory
grep -r pattern directory

# Find files and directories by name
locate name

# Find files in /home/john that start with "prefix".
find /home/john -name 'prefix*'

# Find files larger than 100MB in /home
find /home -size +100M
12 – SSH LOGINS
# Connect to host as your local username.
ssh host

# Connect to host as user
ssh user@host

# Connect to host using port
ssh -p port user@host
13 – FILE TRANSFERS
# Secure copy file.txt to the /tmp folder on server
scp file.txt server:/tmp

# Copy *.html files from server to the local /tmp folder.
scp server:/var/www/*.html /tmp

# Copy all files and directories recursively from server to the current system's /tmp folder.
scp -r server:/var/www /tmp

# Synchronize /home to /backups/home
rsync -a /home /backups/

# Synchronize files/directories between the local and remote system with compression enabled
rsync -avz /home server:/backups/
14 – DISK USAGE
# Show free and used space on mounted filesystems
df -h

# Show free and used inodes on mounted filesystems
df -i

# Display disks partitions sizes and types
fdisk -l

# Display disk usage for all files and directories in human readable format
du -ah

# Display total disk usage off the current directory
du -sh
15 – DIRECTORY NAVIGATION
# To go up one level of the directory tree.  (Change into the parent directory.)
cd ..

# Go to the $HOME directory
cd

# Change to the /etc directory
cd /etc


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