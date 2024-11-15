---
sidebar_position: 5
title:  Using VDI on Cloud Workspaces
---


Cloud Workspaces provides Virtual Desktop Infrastructure (VDI), offering remote Windows desktops that are accessible through your browser. This allows you to perform tasks as if on a local machine.

Cloud Workspaces offers you access to two different types of Windows VDI:

- **Persistent VDI**: A persistent VDI retains your user session even after you log out, allowing you to resume your previous session and retain your work progress.

- **Non-persistent VDI**: With non-persistent VDI, logging out of a session terminates that session. A new session is started upon logging back in, and data from the previous session is not retained.

 
These remote desktops support the following key peripherals:  
1. **Keyboard**
2. **Mouse**
3. **Printer**
4. **Camera** 
5. **Speaker**

## Accessing VDI

You can access VDI on Cloud Workspaces through two methods:

1. **[Native client](#accessing-vdi-on-the-native-client):** The native client allows you to connect to the remote Windows desktop using RDP on your device. This option is exclusively available for Windows devices.  

2. **[Universal client](#accessing-vdi-on-the-universal-client):** The universal client provides access to the remote Windows desktop directly through a web browser. This method is accessible to all users, regardless of their operating system.


### Accessing VDI on the universal client

To **start using the remote Windows desktop on the universal client**, 

1. Navigate to the **Workspaces** homepage and click the **Universal Client** button for Windows. 

   ![universal-login.jpg](/img/runbook-images/vdi-mac.png)

2. It opens up the VDI in another broswer tab as shown below:

   ![universal-login.jpg](/img/runbook-images/universal-login.jpg)

:::tip
- Click the Allow button to enable clipboard functionality in your VDI.
- If you receive a pop-up blocked notification, you may need to enable pop-ups in your browser settings for the VDI tab to open successfully.
:::

2. Login with your credentials and click **Connect**. You now have full access to a remote Windows desktop, enabling you to perform your tasks as if you were working on a local machine.

    ![windows-universal](/img/runbook-images/windows-universal.png)

From this point, you can begin your work just as you would on a local machine. Launch applications, access files, use the terminal or browser, configure your settings - all within the secure confines of your browser tab.

#### Windows remote desktop menu

The Windows remote desktop interface in Cloud Workspaces on the universal client provides essential control options to enhance your user experience and manage your session effectively:

![Windows Remote Desktop Menu](/img/runbook-images/windows-menu.png)

1. **Display**
   - Fit: Adjusts the screen display to fit within some dimensions of your local screen.
   - Full: Expands the remote desktop to utilize your full screen, maximizing workspace.
   - Real: Displays the remote desktop at its native resolution, allowing for detailed viewing.

2. **Ctrl+Alt+Del**: Opens a menu with account management and security options, including:
   - **Lock**: Secure your session.
   - **Sign Out**: Log out of the Windows session.
   - **Change Password**: Update your account password.
   - **Task Manager**: Access the Task Manager to monitor and manage running applications and processes.

3. **Meta icon**: Displays the Windows Start menu, providing quick access to applications and system settings.

4. **Toggle cursor kind**: Switch between different cursor types to suit your preferences or specific applications.

5. **Terminate session**: Closes the remote desktop session, ending your current connection to the virtual desktop safely.

These options help customize your remote desktop experience, manage your session, and navigate the Windows environment efficiently.

### Accessing VDI on the native client

To **start using the remote Windows desktop on the native client**, 

1. Navigate to the **Workspaces** homepage and click the **Native Client** button for **Windows Web Dev**. 

   ![vdi-user](/img/runbook-images/vdi.png)

2. It prompts you to download the VDI Installer if you haven't.

#### **Download the VDI Installer**

Before accessing remote desktops using VDI, you're required to do the following:
 
1. Click **Download VDI Installer** from the [onboarding screen](../index.md#connecting-to-workspaces) to download the installer. Alternatively,  navigate to **Software Downloads** from the homepage sidebar and click **Download VDI Installer**. 
  
2. Run the file and follow the on-screen prompts to install the VDI components.
3. Once installed, return to Cloud Workspaces and click **Go to Home** to access the homepage.

:::tip
The VDI installer is configured to support only the Windows VDI in this release.
:::

#### **Working with Windows**

To **start using the remote Windows desktop**, 

1. Navigate to the **Workspaces** homepage and click the **Connect** button for **Windows Web Dev**. 

   ![vdi-user](/img/runbook-images/vdi.png)

2. A pop-up modal appears with some authentication instructions for use later in Step 5. 

    ![vdi-login](/img/runbook-images/vdi-login.png)

3. Click **OK**. Select **Open Windows PowerShell**  if you are prompted to access it.
4. It launches a **Remote Desktop Connection** window for you to connect to your remote computer. Click **Connect** to initiate the connection to the remote desktop.

    ![rdp-powershell](/img/runbook-images/vdi-rdp.png)

5. Enter your Workspaces password in the credentials window.

    ![rdp-powershell](/img/runbook-images/windows-credentials.png)

6.  If you get any warning to proceed despite any certificate errors, Click **Yes**.
7.   After successful authentication and configuration, the remote Windows desktop is launched, providing you with full access to perform your tasks.

![windows](/img/runbook-images/windows-vdi.png)

**To terminate the session,**

1. Click the **X (close)** button from the top of the screen.
2. A prompt will inform you that your remote session will be disconnected. Click **OK** to confirm.