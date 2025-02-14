---
sidebar_position: 6
sidebar_label: Troubleshooting
title:  Troubleshooting and FAQs
---
Here are some common issues and steps to resolve them.

### Why am I seeing the error "No available sessions found"?
This error can have different causes depending on the service you are trying to access:

- **Persistent VDI users**: You are pre-assigned to a specific session and instance by default. If you encounter this error, please contact [Macrometa support](https://www.macrometa.com/support) for assistance.

- **Non-Persistent VDI and RBA users**: This error typically occurs when all available sessions are in use. Wait for a session to free up and try again later.

### Why am I unable to use my peripheral devices (printer card reader, e.t.c)?
Configure your peripheral devices using the Peripheral Validator for it to be automatically detected and functional for use in RBA. Ensure to [validate your devices](../rba/validating-peripherals.md) before use.

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
- Change your network settings from public to private.

### Why can’t I access workspaces?
This may result from reasons like an incorrect URL or browser incompatibility. To resolve this:

- Confirm your system meets the system requirements.
- Check the accuracy of the Workspaces URL. Check for common errors like typos or misplaced characters in the URL and try again. 
- Contact Macrometa personnel for assistance.

### What should I do if my team experiences slow performance accessing the remote workspaces?
Macrometa workspaces require a minimum network bandwidth to perform optimally. To resolve slow performance:

- Verify the network connection and bandwidth quality.
- Restart your network device(s).
