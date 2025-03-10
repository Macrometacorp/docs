---
sidebar_position: 2
title: Troubleshooting
slug: troubleshooting
---

## Browser Support

Macrometa GDN supports the following browsers:

- Google Chrome
- Apple Safari
- Mozilla Firefox

## Unable to access GDN?

If you are unable to access your tenant's global URL, try flushing your DNS cache. Use the following procedure for your OS:

- [Windows 10/11](#windows-1011)
- [MacOS](#macos)
- [Linux](#linux)

### Windows 10/11

Follow these steps to flush your DNS cache on Windows:

1. Navigate to '**Start**' and search for the '**Command Line**'
1. Right-click to open the command line and click '**Run as Administrator**'
1. Type `ipconfig /flushdns` and press Enter. A message appears confirming that the DNS Resolver Cache was flushed.

### MacOS

To flush your DNS cache on MacOS:

1. Open the Terminal application.
2. Type `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` and press Enter.
3. Type your Mac password and press Enter.

For older versions of MacOS, use the following commands:

* El Capitan or later: `sudo killall -HUP mDNSResponder`
* Lion, Mountain Lion, and Mavericks: `sudo killall -HUP mDNSResponder`
* Snow Leopard: `sudo dscacheutil –flushcache`
* Leopard: `sudo lookupd –flushcache`
* Tiger: `lookupd –flushcache`

### Linux

On most Linux systems, the DNS resolver is either `systemd-resolved` or `dnsmasq`. 

To determine which one your system uses, run `$ sudo lsof -i :53 -S` and view the output.

* If you're using `systemd-resolved`:

	1. Run `$ sudo systemd-resolve --flush-caches` to flush the DNS cache.
	2. If you want to verify that the cache flushed successfully, run `$ sudo systemd-resolve --statistics` and view the Current Cache Size.

* If you're using `dnsmasq`:

	1. Run `$ sudo killall -HUP dnsmasq` to flush the DNS cache.
	2. If you want to verify that the cache flushed successfully, run `$ sudo killall -USR1` followed by `$ tail -f -n1000 /var/log/syslog | grep "cache size"`.
