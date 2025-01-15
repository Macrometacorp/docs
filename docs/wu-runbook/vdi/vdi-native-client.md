---
sidebar_position: 7
title:  Accessing VDI on the Native Client
---
The native client option is only available for users accessing VDI on **Windows**. Using the native client requires you to run the VDI installer for neccessary configurations to access VDI. This guide will explain how to:
- [**Download the VDI installer**](#download-the-vdi-installer)
- [**Connect to the VDI**](#connect-to-the-vdi)
- [**Enable USB access on RDP client**](#enable-usb-access-on-rdp-client)

## **Download the VDI installer**

Before accessing remote desktops using the native client, follow these steps:

1. Go to the **Software Downloads** page and click the **Download** button  for Virtual Desktop Interface to get the VDI installer.

    ![vdi-package.png](/img/runbook-images/onboarding.png)
  
2. Run the downloaded file and follow the installation prompts.

3. Once the installation is complete, click **Finish**.
4. After a succesful installation, you'll see the Macrometa VDI Service icon in the system tray.

    ![vdi-tray.png](/img/runbook-images/vdi-tray.png)


## **Connect to the VDI**

To **begin using the remote Windows desktop via the native client**:

1. Open the Workspaces homepage and click the **Native Client** button for **Windows**.

    ![vdi-user](/img/runbook-images/vdi-windows.png)

2. If the installer is not already downloaded, it will prompt you to [download and install the VDI installer](#download-the-vdi-installer).
    ![vdi-user](/img/runbook-images/nativeclient-check.png)

3. If prompted, select **Open Windows PowerShell** from the browser pop-up to proceed.

4. A Remote Desktop Connection pop-up will appear. Click **Connect** to initiate the connection.

    ![rdp-powershell](/img/runbook-images/vdi-rdp.png)

   :::note
   If you want to enable USB access in your RDP client, go to [Enable USB access on RDP client](#enable-usb-access-on-rdp-client) before you click **Connect**.
   :::

5. Enter your VDI password when prompted for login credentials and click **OK** to connect. If needed, click **More choices** to specify a different username and password.

    ![rdp-powershell](/img/runbook-images/vdi-password.jpg)

6. If you get any warning to proceed despite any certificate errors, Click **Yes**.
7. Upon successful authentication, the remote Windows desktop launches in your RDP client.

    ![windows](/img/runbook-images/windows-vdi.png)

**To terminate the session,**

1. Click the **X (close)** button from the top of the RDP client screen.
2. A prompt will inform you that your remote session will be disconnected. Click **OK** to confirm.
   

## **Enable USB access on RDP client**

To enable USB device access for your remote session, follow these steps in your RDP client before clicking **Connect** on the [VDI connection pop-up](#connect-to-the-vdi):

1. Navigate to **Local Resources > Local Devices and Resources**.

    ![usb](/img/runbook-images/usb.png)
   
2. Click **More**, then choose the devices you want to use. By default, most of the devices are selected.

    ![devices](/img/runbook-images/devices.png)

3. Click **OK** , then **Connect** to return to the VDI pop-up and proceed with the [connection](#connect-to-the-vdi).








