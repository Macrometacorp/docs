---
pagination_next: null
pagination_prev: null
sidebar_position: 1
# slug: /photoniq
title:  Runbook v1
---

With Workspaces evolving over time, this runbook will act as a guide to using the different versions of Workspaces.  

## **Connecting to Workspaces**

:::note
Ignore steps 1 and 2 if you are already logged into Workspaces.
:::

1. Open your browser and enter your Workspaces URL. This URL connects you to the Workspace environment and displays a login screen.

    ![login-page](/img/runbook-images/login-page.png)

2. Login with appropriate credentials to your workspace.
3. After logging in,
   
     - For first-time users, the onboarding screen is displayed so you can download the appropriate installer based on your specific requirements. Refer to the respective guides for   detailed instructions on how to set up the [VDI](#download-the-vdi-installer) and [RBA](#download-the-rba-installer) installers. Click **Go to Home** to return back to the Workspaces homepage.
   
        ![onboarding-page](/img/runbook-images/onboarding.png)

     - If you're a returning user, you are automatically redirected to the homepage.

        ![home-page](/img/runbook-images/workspaces-homepage.png)

:::note
If you miss the installers, click the **Download Package** menu from the sidebar to return to the onboarding screen.
:::

The sidebar also provides access to the **User Guide** and **Logout** options. You can view your profile by clicking the user icon in the top-right corner of the screen. 


## **Using VDI on Cloud Workspaces**

Cloud Workspaces provide both persistent and non-persistent Virtual Desktop Infrastructure (VDI), offering remote Windows and Linux desktops that are accessible through your browser. This allows you to perform tasks as if on a local machine.
 
These remote desktops support key peripherals such as **keyboard**, **mouse**, **printer**, **camera**, and **speaker**.

### **Download the VDI Installer**

Before accessing remote desktops using VDI, you need to do the following:
 
1. Click **Download VDI Installer** from the [onboarding screen](#connecting-to-workspaces) to download the installer.
2. Run the file and follow the on-screen prompts to install the VDI components.
3. Once installed, return to Cloud Workspaces and click **Go to Home** to access the homepage.

> The installer is configured to support only the Windows VDI in this release.


### **Working with Windows**

Workspaces offers you access to two different types of Windows VDI:

- **Persistent VDI**: A persistent VDI retains your user session even after you log out, allowing you to resume your previous session and retain your work progress.

- **Non-persistent VDI**: With non-persistent VDI, logging out of a session terminates that session. A new session is started upon logging back in, and data from the previous session is not retained.

> The Windows VDI is exclusively available on Windows OS or terminals in this release.

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

To terminate the session, 
1. Click the **X (close)** button from the top of the screen.
2. A prompt will inform you that your remote session will be disconnected. Click **OK** to confirm.

### **Working with Linux**

To use the remote Linux desktop, 
1. Connect to  **Linux Web Dev** from the **Workspaces** homepage.  This action opens the remote Linux desktop environment in a new browser tab.  

![linux](/img/runbook-images/linux-vdi.png)

From this point, you can begin your work just as you would on a local machine. You can launch applications, access files, use the terminal or browser, configure your settings, etc.

## **Using RBA to access the Western Union App**

Agents can access the Western Union app using Remote Browser Acceleration (RBA) from Cloud Workspaces. RBA improves performance by deploying applications at the network edge, ensuring improved speed and responsiveness.

### **Prerequisites**

- RBA Installer Token: To access this token, return to the [onboarding screen](#connecting-to-workspaces) or navigate to **Download Package** menu from the homepage sidebar. Click on **RBA Installer Token** and copy the displayed token. 

### **Download the RBA Installer**

To use the Western Union App with RBA, the following installation is required to configure the necessary drivers:

> The RBA installer also installs a Chrome browser on your device. You must access RBA using this browser to ensure RBA functions properly.  For devices with supported browsers already installed, the RBA installer skips the browser installation.

1. Click **Download RBA Installer** from the [onboarding screen](#connecting-to-workspaces) to download the installer.
  
2. Run the file and follow the on-screen prompts until you reach the login screen. Enter your login details when prompted. To obtain your RBA token, return to the [onboarding screen](#connecting-to-workspaces) or navigate to **Download Package** menu from the homepage sidebar. Click on **RBA Installer Token** and copy the displayed token.

      ![rba-installer.png](/img/runbook-images/rba-installer-login.png)

3. After successful validation, finalize the installation.
  
      ![rba-validation.png](/img/runbook-images/rba-validation.png)

     > Ensure that the validation and installation process is completed so that the installer can download all the necessary requirements for RBA to function optimally.

4. After installation is complete, you are prompted to restart your device. Click **Finish** to restart. 

      ![login-page](/img/runbook-images/rba-restart.png)

5. Return to Cloud Workspaces and click **Go home** to return to the homepage.

### Accessing the Western Union App

After setting up the RBA installer, continue with the following steps to access the Western Union app from Workspaces:

1. From the **Workspaces** home screen, click **Connect** for the **Western Union App**. The web app opens up in a new tab within the remote browser.

    ![wu](/img/runbook-images/western-union.png)

2. The navigation controls in the top-right corner of the screen allow you to navigate, refresh, and close the web app.
   
    ![rba-controls](/img/runbook-images/rba-controls.png)
   
### **Validating peripheral devices for RBA**

To check the functionality of your connected devices, use the **Peripheral Validator**. RBA supports the following peripheral devices when accessing web apps from the remote browser:
1. **Signature pad**
2. **Webcam**
3. **Thermal printer**
4. **Image scanner**
5. **Card reader**
6. **Pin pad**
   
Navigate to the homepage and click **Connect** for **Peripherals** to start the validation process for each device. 
   
  ![workspaces-homepage](/img/runbook-images/workspaces-homepage.png)

It displays all the supported peripheral devices that can be validated.

![peripherals](/img/runbook-images/peripherals-validator.png)

#### **Printer**

To validate the printer:
1. Click the **Test** button for **Printer** from the **Peripherals** screen. It displays a colored page to test the printer.

   ![test-printer](/img/runbook-images/validate-printer.png)

3. Click on **Test Printer** and add a virtual PDF printer to verify that it is accessible from the remote browser.
4. Select “**See more**..” from the **Destination** options on the print screen to check if the printer (Peripheral1-Printer) is listed. 

   ![save-printer](/img/runbook-images/printer-save.png)

5. Select the printer and print the test page.
6. Alternatively, connect your printer device and confirm that it shows in the list of printers. Select the printer and print the test page.


#### **Signature Pad**

To validate the signature pad:
1. Click the **Connect** button for **Signature Pad** from the **Peripherals** screen. It displays a signature pad validator.

   ![sig-pad](/img/runbook-images/signature-pad.png)

2. Click **Capture**, connect your signature pad device, and start signing. The Signature Capture window displays the signature as you sign.

    ![sig-capture](/img/runbook-images/signature-capture.png)

3. After signing, Click **OK** from the Signature Capture window. The signature is displayed on the validator screen.
4. Click the **Erase** button to remove the existing signature. 


#### **Card Reader**

To validate the card reader, continue with the following steps:
1. Click the **Test** button for **Card Reader** from the **Peripherals** screen. It displays a card reader validator with an input box.

   ![card-reader](/img/runbook-images/card-reader.png)

3. Connect your card reader device. Set your cursor on the input box and swipe your card. The card details are displayed on the screen.

#### **Image Scanner**

To validate the image scanner, continue with the following steps:
1. Click the **Test** button for **Image Scanner** from the **Peripherals** screen. It displays the image scanner validator.

### **Using the RBA control bar**

A control bar icon  appears on the left side of the screen for you to easily manage and interact with the remote browser.

To access the control bar,

- Click the control bar icon on the left side of the browser to access the menu.

    ![control-bar](/img/runbook-images/control-bar-resized.jpeg)

Below is an overview of each menu on the control bar and how to use them to enhance your browsing experience.

1. **Drag viewport**: This setting allows you to move the remote browser window around the screen when minimized.
2. **Keys**: The keys menu provides on-screen buttons for essential control keys such as Control, Alt, Tab, and the Esc key. This functionality is especially handy for mobile device users who don't have access to a full keyboard.
3. **Clipboard**: The clipboard feature allows text transfer between your local device and the remote browser. Text copied within the remote browser appears in this panel for easy access. This is not compulsory for the Chrome browser, as it has native clipboard integration that handles text efficiently.
4. **Fullscreen**: Full screen maximizes the remote browser to fill your entire screen, providing an immersive and distraction-free browsing experience. Use the Esc key to exit fullscreen mode.
5. **USB**: The USB menu displays all devices connected to your local device via USB. To connect a device to the remote browser, select it from the list and click Connect.
6. **Display**:  This menu allows you to manage multiple monitors efficiently. Click the Display menu to add, remove, and arrange screens. New screens open in separate browser windows, which you can position on your local monitors. Use the Display menu to match the on-screen arrangement to your physical setup and adjust positions and sizes as needed.

    ![displays](/img/runbook-images/display.png)

7. **Settings**: The Settings menu lets you customize your remote browser further. Here, you can adjust various aspects to tailor the browser to your preferences and optimize your user experience.

    ![settings](/img/runbook-images/settings-resized.jpeg)

    a. **View-only**: This option restricts the remote browser to a read-only mode, preventing any write operations. Users can browse and view content without being able to modify or interact with elements.
   
    b. **Clipboard Up**: Allows users to copy text from their local device and paste it into the remote browser.
   
    c. **Clipboard Down**: Enables copying content from the remote browser and pasting it onto your local device.
   
    d. **Clipboard Seamless**: This feature facilitates copying and pasting between your local device and the remote browser without noticeable delays or additional steps.
   
    e. **Prefer Local Cursor**: Prioritizes using the local machine's cursor for display and interaction, providing a more consistent user experience.
   
    f. **Translate keyboard shortcuts**: Automatically converts local keyboard shortcuts to the corresponding shortcuts in the remote browser, ensuring they function correctly within the remote environment.
   
    g. **Enable Performance Stats**: This option displays real-time performance metrics of the remote browser at the top right corner of the screen. These metrics include an FPS counter, along with network and CPU stats, where each stat shows the current value and an averaged value over time. A lower value indicates higher resource constraints, helping to identify if performance bottlenecks are due to server-side CPU or network issues.
   
    h. **Enable Pointer Lock**: Constrains the cursor within the remote browser window, providing better control during use. To release the cursor, press the escape key.
  
9. **Audio**: Click the audio icon to enable or disable audio output from the remote browser. 

## **Troubleshooting and FAQs**
Here are some common issues and steps to resolve them.

### Why can’t I access workspaces?
This may result from reasons like an incorrect URL or browser incompatibility. To resolve this:

- Confirm your system meets the system requirements.
- Check the accuracy of your Workspaces URL.
- Contact Macrometa personnel for assistance.

## Why am I get an error whenever I try to access a VDI session?

This may result when the number of users in a session exceeds the session threshold limit. Retry logging in after a short while to fix this.

### Why am I getting an error whenever I try to initiate a remote windows VDI session?

A common reason for this error is an unstable internet connection or incorrect details used to access the remote session. However, other reasons, such as a firewall, other security measures, or window updates, might prevent remote desktop connections. To resolve this:

- Check your internet connection. Restart all network devices if necessary.
- Check your remote connection settings for interruptions and [activate remote desktop access](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access) if it is disabled. 
- Check your IP address. Security measures may prevent a public IP address from creating a connection. If this is the case, you may need to whitelist your IP address.
- Change your network settings from public to private.
  
### Why am I unable to use my peripheral devices (printer, webcams, card reader)
Peripheral devices need to be validated before being used in workspaces. Ensure to [validate your devices](#validating-peripheral-devices-for-rba) before use.

### What should I do if my team experiences slow performance accessing the remote workspaces?
Macrometa workspaces require a minimum network bandwidth to perform optimally. To resolve slow performance:

- Verify the network connection and bandwidth quality.
- Restart your network device(s).

### Why can't I launch VDI from my Windows 11?

Some antiviruses like BitDefender might prevent the execution of the Windows PowerShell script. To fix this, follow any of these solutions:

- Temporarily turn off this antivirus and retry launching VDI.
-  Whitelist the powershell script - `RDPLauncher.ps1`