---
title: Troubleshooting
---

This section is designed to help you quickly resolve common issues that you might encounter while using Workspaces. If your problem isn't listed here, feel free to [reach out to our support team](https://support.macrometa.com/hc/en-us/requests/new) for more assistance.

- [Login and authentication](#login-and-authentication)
- [Why can't I launch VDI from my Windows 11?](#why-cant-i-launch-vdi-from-my-windows-11)
- [Issues accessing VDI?](#why-am-i-seeing-the-error-no-available-sessions-found)
- [Error validating peripherals](#why-am-i-unable-to-use-my-peripheral-devices-printer-card-reader-etc)

## Login and Authentication

If you are unable to access Workspaces or the browser returned an error after entering the Workspace URL, try any of the following: 

- Confirm the accuracy of the Workspaces URL. Ensure there are no extra or deleted characters. 
- Contact Macrometa support if the issue persists.
- Confirm browser compatibility. 

## Why can't I launch VDI from my Windows 11?
Some antiviruses like BitDefender might prevent the execution of the Windows PowerShell script. To fix this, follow any of these solutions:

- Temporarily turn off this antivirus and retry launching VDI.
- Whitelist the powershell script - `RDPLauncher.ps1`

## Why am I seeing the error "No available sessions found"?
This error can have different causes depending on the service you are trying to access:

- **Persistent VDI users**: You are pre-assigned to a specific session and instance by default. If you encounter this error, please contact [Macrometa support](https://www.macrometa.com/support) for assistance.

- **Non-Persistent VDI and RBA users**: This error typically occurs when all available sessions are in use. Wait for a session to free up and try again later.

## Why am I unable to use my peripheral devices (printer card reader, e.t.c)?
Configure your peripheral devices using the Peripheral Validator for it to be automatically detected and functional for use in RBA. Ensure to [validate your devices](./remote-browser-accelerator/rba-peripheral-validator.md) before use.