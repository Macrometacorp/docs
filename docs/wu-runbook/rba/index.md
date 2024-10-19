---
sidebar_position: 1
title:  Using RBA to access the Western Union App
---

WUPOS Agents can access the Western Union app using Remote Browser Acceleration (RBA) from Cloud Workspaces.  RBA improves performance by deploying applications at the network edge, ensuring improved speed and responsiveness.

### **Prerequisites**

- **RBA Installer Token**: The RBA Installer Token is required when [setting up the installer](#download-the-rba-installer). To access this token, return to the [onboarding screen](../index.md#connecting-to-workspaces) or navigate to **Download Package** menu from the homepage sidebar. Click on **RBA Installer Token** and copy the displayed token. 

### **Download the RBA Installer**

To use the Western Union App with RBA, the following installation steps is required to configure the necessary drivers:

:::tip
The RBA installer also installs a Chrome browser on your device. You must access RBA using this browser to ensure RBA functions properly. For devices with the supported browser already installed, the RBA installer skips this browser installation.
:::

1. Click **Download RBA Installer** from the [onboarding screen](../index.md#connecting-to-workspaces) to download the installer.
  
2. Run the file and follow the on-screen prompts until you reach the login screen. Enter your login details when prompted. Use your Workspaces email address and the [RBA Installer Token](#prerequisites) you copied earlier. Click **Next**.

      ![rba-installer.png](/img/runbook-images/rba-login.png)

3. After successful validation,  Click **OK** to finalize the installation.
  
      ![rba-validation.png](/img/runbook-images/rba-validation.png)

    :::tip
    Ensure that the validation and installation process is completed so that the installer can download all the necessary requirements for RBA to function optimally.
    :::

4. After installation is complete, you are prompted to restart your device. Click **Finish** to restart. 

      ![login-page](/img/runbook-images/rba-restart.png)


### Accessing the Western Union App

After setting up the RBA installer and restarting your device, continue with the following steps to access the Western Union app from Workspaces:

1. Log in to Cloud Workspaces on the newly installed browser and click **Go home** if you're not on the homepage.

    ![home-page](/img/runbook-images/workspaces-homepage.png)

2. From the **Workspaces** homepage, click **Connect** for the **Western Union App**. The web app opens up in a new tab within the remote browser.

    ![wu](/img/runbook-images/western-union.png)

3. The navigation controls in the top-right corner of the screen allow you to navigate back and forth within the Western Union app to complete your tasks. These controls also provide options to refresh and close the web app.
   
    ![rba-controls](/img/runbook-images/rba-controls.png)
   
**Next steps:**
- [Configure the supported peripheral devices](validating-peripherals.md) to ensure they're functional for use within RBA.