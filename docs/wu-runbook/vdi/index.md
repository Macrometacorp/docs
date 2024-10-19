---
sidebar_position: 5
title:  Using VDI on Cloud Workspaces
---


Cloud Workspaces provides Virtual Desktop Infrastructure (VDI), offering remote Windows and Linux desktops that are accessible through your browser. This allows you to perform tasks as if on a local machine.
 
These remote desktops support the following key peripherals:  
1. **Keyboard**
2. **Mouse**
3. **Printer**
4. **Camera** 
5. **Speaker**

### **Download the VDI Installer**

Before accessing remote desktops using VDI, you're required to do the following:
 
1. Click **Download VDI Installer** from the [onboarding screen](../index.md#connecting-to-workspaces) to download the installer.
2. Run the file and follow the on-screen prompts to install the VDI components.
3. Once installed, return to Cloud Workspaces and click **Go to Home** to access the homepage.

:::tip
The VDI installer is configured to support only the Windows VDI in this release.
:::

### **Working with Windows**

Cloud Workspaces offers you access to two different types of Windows VDI:

- **Persistent VDI**: A persistent VDI retains your user session even after you log out, allowing you to resume your previous session and retain your work progress.

- **Non-persistent VDI**: With non-persistent VDI, logging out of a session terminates that session. A new session is started upon logging back in, and data from the previous session is not retained.

:::tip
The Windows VDI is exclusively available on Windows OS/terminals in this release.
:::

To start using the remote Windows desktop, 

1. Navigate to the **Workspaces** homepage and click the **Connect** button for **Windows Web Dev**. A pop-up modal appears with some authentication instructions for use later in Step 4. 

    ![vdi-login](/img/runbook-images/vdi-login.png)

2. Click **OK**. Select **Open Windows PowerShell**  if you are prompted to access it.
3. It launches a **Remote Desktop Connection** window for you to connect to your remote computer. Click **Connect** to initiate the connection to the remote desktop.

    ![rdp-powershell](/img/runbook-images/vdi-rdp.png)

4. Enter your Workspaces password in the credentials window.

    ![rdp-powershell](/img/runbook-images/windows-credentials.png)

6.  If you get any warning to proceed despite any certificate errors, Click **Yes**.
7.   After successful authentication and configuration, the remote Windows desktop is launched, providing you with full access to perform your tasks.

![windows](/img/runbook-images/windows-vdi.png)

**To terminate the session,**

1. Click the **X (close)** button from the top of the screen.
2. A prompt will inform you that your remote session will be disconnected. Click **OK** to confirm.

### **Working with Linux**

To use the remote Linux desktop, 
1. Connect to  **Linux Web Dev** from the **Workspaces** homepage.  This action opens the remote Linux desktop environment in a new browser tab.  

![linux](/img/runbook-images/linux-vdi.png)

From this point, you can begin your work just as you would on a local machine. You can launch applications, access files, use the terminal or browser, configure your settings, etc.
