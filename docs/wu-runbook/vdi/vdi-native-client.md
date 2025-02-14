---
sidebar_position: 7
title:  Access with the Native Client
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Accessing the VDI via the native client is available for Windows and Mac users and follows the steps offered in this guide.

## Prerequisites

Before getting started, ensure to do the following:

- [**Download the VDI Client**](#step-1-download-and-install-the-vdi-client): (For Windows and Mac users) This client installs the necessary tools needed to set up your Virtual Desktop Infrastructure.
- [**Download the Windows app**](#download-the-vdi-installer) - For Mac users

<Tabs groupId="vdi-native-client">
<TabItem value="access windows" label="Access on Windows">

### **Step 1: Download and install the VDI Client**

1. Go to the **Software Downloads** page and click **Download VDI Client** to download the VDI installer.

    ![software downloads](/img/runbook-images/software-downloads.png)
  
2. Run the downloaded file and follow the installation prompts.

3. Once the installation is complete, click **Finish**.
4. After a successful installation, you'll see the Macrometa VDI Service icon in the system tray.

    ![vdi-tray.png](/img/runbook-images/vdi-tray.png)

### **Step 2: Connect to the VDI**

To **begin using the remote Windows desktop via the native client**:

1. Open the Workspaces homepage and click the **Native Client** button for **Windows**.

    ![vdi-user](/img/runbook-images/vdi-macs.png)

2. If the installer is not already downloaded, it will prompt you to [download and install the VDI client](#download-the-vdi-installer).

    ![vdi-user](/img/runbook-images/nativeclient-check.png)

3. A Remote Desktop Connection pop-up will appear. Click **Connect** to initiate the connection.

    ![rdp-powershell](/img/runbook-images/vdi-rdp.png)

   :::note
   To make additional configurations to the connection, go to [Configure your connection in the RDP client](#configure-your-connection-in-the-rdp-client) before you click **Connect**.
   :::

4. Enter your VDI password when prompted for login credentials and click **OK** to connect. If needed, click **More choices** to specify a different username and password.

    ![rdp-powershell](/img/runbook-images/vdi-password.jpg)

5. If you get any warning to proceed despite any certificate errors, Click **Yes**.
6. Upon successful authentication, the remote Windows desktop launches in your RDP client.

    ![windows](/img/runbook-images/windows-vdi.png)

### **Step 3 (Optional): Configure your connection in the RDP client**

To make additional configurations to your connection in the RDP client, follow these steps before clicking **Connect** on the [VDI connection pop-up](#connect-to-the-vdi):

1. Navigate to the RDP client and update your desired configurations. Go to  **Local Resources > Local Devices and Resources**.

    ![usb](/img/runbook-images/usb.png)
   
2. Click **More**, then choose the devices you want to use in your remote session. By default, all the devices are selected.

    ![devices](/img/runbook-images/devices.png)

3. Click **OK** , then **Connect** to return to the VDI pop-up and proceed with the [connection](#connect-to-the-vdi).

</TabItem>
<TabItem value="access mac" label="Access on Mac">

:::important
While the Mac Native Client runs smoothly on Firefox and Chrome browsers, Safari users may encounter a minor issue and a fix will be released in a subsequent release.
:::

### **Step 1: Download the Windows app**

1. Navigate to **Software Downloads** and click **Download Windows App**.

    ![software downloads](/img/runbook-images/software-downloads.png). 

Follow the onscreen prompts to download and install the Windows app.

### **Step 2: Download and install the VDI client**

1.  Navigate to **Software Downloads** and click **Download VDI Client**

    ![software downloads](/img/runbook-images/download-vdi-client.png).

2. Double-click on the newly downloaded VDI installer.

    ![vdi message](/img/runbook-images/vdi-install-message.png).

:::tip
If the above screen pops up, [follow these steps](https://support.apple.com/en-gb/guide/mac-help/mh40616/mac) to resolve it.
:::

3. Follow the onscreen prompts to successfully install the VDI client.

### **Step 3: Connect to the VDI with the Native Client**

1. Click **Native Client** from your Workspaces homepage.

    ![vdi-user](/img/runbook-images/vdi-macs.png)

    This initiates the RDP Launcher.

    ![rdp-launcher](/img/runbook-images/open-rdp-client.png)

- Note: If you haven't downloaded and installed the Windows app and VDI client this pop-up message prompts you to download:

![pop-up message](/img/runbook-images/download-message.png)

2. Click **Open RDP Launcher**. This initiates and configures a remote connection to the PC.

    ![initiate-connection](/img/runbook-images/initiate-connection.png)

3. Enter your credentials and click **Continue**.

    ![enter credentials](/img/runbook-images/enter-details.png)

A security warning may pop up regarding the host certificate. Click **Continue**.

![certificate warning](/img/runbook-images/certificate-warning.png)

This launches your remote session. You can now perform your numerous tasks without the limitations that comes with using a single OS.

</TabItem>
    </Tabs>

**To terminate the session,**

1. Click the **X (close)** button from the top of the RDP client screen.
2. A prompt will inform you that your remote session will be disconnected. Click **OK** to confirm.
