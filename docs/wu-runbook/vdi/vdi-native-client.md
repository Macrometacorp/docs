---
sidebar_position: 7
title:  Access via the Native Client
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Accessing VDI with the native client is available for Windows and Mac users and follows these steps:

<Tabs groupId="access-vdi">
<TabItem value="access windows" label="Access on Windows">


## **Step 1: Download the VDI installer**

Before accessing remote desktops using the native client, follow these steps:

1. Go to the **Software Downloads** page and click the **Download** button  for Virtual Desktop Interface to get the VDI installer.

    ![vdi-package.png](/img/runbook-images/onboarding.png)
  
2. Run the downloaded file and follow the installation prompts.

3. Once the installation is complete, click **Finish**.
4. After a succesful installation, you'll see the Macrometa VDI Service icon in the system tray.

    ![vdi-tray.png](/img/runbook-images/vdi-tray.png)


## **Step 2: Connect to the VDI**

To **begin using the remote Windows desktop via the native client**:

1. Open the Workspaces homepage and click the **Native Client** button for **Windows**.

    ![vdi-user](/img/runbook-images/vdi-windows.png)

2. If the installer is not already downloaded, it will prompt you to [download and install the VDI installer](#download-the-vdi-installer).
    ![vdi-user](/img/runbook-images/nativeclient-check.png)

3. If prompted, select **Open Windows PowerShell** from the browser pop-up to proceed.

4. A Remote Desktop Connection window will appear. Click **Connect** to initiate the connection.

    ![rdp-powershell](/img/runbook-images/vdi-rdp.png)

5. Enter your VDI password when prompted for login credentials and click **OK** to connect. If needed, click **More choices** to specify a different username and password.

    ![rdp-powershell](/img/runbook-images/vdi-password.jpg)

6. If you get any warning to proceed despite any certificate errors, Click **Yes**.
7. Upon successful authentication, the remote Windows desktop launches in your RDP client.

    ![windows](/img/runbook-images/windows-vdi.png)


</TabItem>

<TabItem value="access mac" label="Access on Mac">

## **Step 1: Download the Windows app**

1. Navigate to **Software Downloads** on the Workspaces homepage.
1. Click **Download Windows app**. This directs you to then Apple playstoe to download and install the Windows app. 

## **Step 2: Download the VDI installer**

1. Navigate to the **Software Downloads** section of the Workspaces homepage.
1. Click **Download VDI** 
1. Follow the onscreen prompts to install the VDI installer.

## **Step 3:Connect to the VDI**

1. 

</TabItem>
</Tabs>

**To terminate the session,**

1. Click the **X (close)** button from the top of the RDP client screen.
2. A prompt will inform you that your remote session will be disconnected. Click **OK** to confirm.