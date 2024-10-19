---
sidebar_position: 6
title:  Troubleshooting and FAQs
---
Here are some common issues and steps to resolve them.


### Why am I seeing the error "No available sessions found" when trying to access the Windows VDI?

This error typically occurs when you are trying to access a VDI session  and all available sessions are currently in use. You won't be able to use VDI until a session becomes available for use. Wait a while and try again later to see if  you can access VDI. 

### Why am I unable to use my peripheral devices (printer, webcams, card reader)
Configure your peripheral devices using the Peripheral Validator for it to be automatically detected and functional for use in RBA. Ensure to [validate your devices](#validating-peripheral-devices-for-rba) before use.

### Why can't I launch VDI from my Windows 11?

Some antiviruses like BitDefender might prevent the execution of the Windows PowerShell script. To fix this, follow any of these solutions:

- Temporarily turn off this antivirus and retry launching VDI.
- Whitelist the powershell script - `RDPLauncher.ps1`

### Why do I see an error screen when reconnecting to WUPOS after being disconnected from an RBA session?

If you are disconnected from an RBA session and reconnect right away, you might be assigned the same session while the pod is still restarting. This will result in an error screen like this:

![rba-login-error](/img/runbook-images/rba-login-error.png)


To fix this, reload the page to successfully launch the WUPOS RBA pod in your local browser.


### Why am I getting an error whenever I try to initiate a remote windows VDI session?

A common reason for this error is an unstable internet connection or incorrect details used to access the remote session. However, other reasons, such as a firewall, other security measures, or window updates, might prevent remote desktop connections. To resolve this:

- Check your internet connection. Restart all network devices if necessary.
- Check your remote connection settings for interruptions and [activate remote desktop access](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access) if it is disabled. 
- Check your IP address. Security measures may prevent a public IP address from creating a connection. If this is the case, you may need to whitelist your IP address.
- Change your network settings from public to private.

### Why can’t I access workspaces?
This may result from reasons like an incorrect URL or browser incompatibility. To resolve this:

- Confirm your system meets the system requirements.
- Check the accuracy of your Workspaces URL.
- Contact Macrometa personnel for assistance.

### What should I do if my team experiences slow performance accessing the remote workspaces?
Macrometa workspaces require a minimum network bandwidth to perform optimally. To resolve slow performance:

- Verify the network connection and bandwidth quality.
- Restart your network device(s).
