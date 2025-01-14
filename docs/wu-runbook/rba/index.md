---
sidebar_position: 2
title:  Using RBA to access the Western Union App
---

WUPOS Agents can access the Western Union app using Remote Browser Acceleration (RBA) from Cloud Workspaces.  RBA improves performance by deploying applications at the network edge, ensuring improved speed and responsiveness.

### **Prerequisites**

- **RBA Installer Token**: The RBA Installer Token is required when [setting up the installer](#download-the-rba-installer). To access this token, navigate to **Software Downloads** from the homepage sidebar. Copy the **Software Token** for **Remote Browser Acceleration**.

    ![rba-token.png](/img/runbook-images/rba-token.png)

### **Download the RBA Installer**

To use the Western Union App with RBA, the following installation steps is required to configure the necessary drivers:

:::tip
The RBA installer also installs a Chrome browser on your device. You must access RBA using this browser to ensure RBA functions properly. For devices with the supported browser already installed, the RBA installer skips this browser installation.
:::

1. Click the **Download** button for **Remote Browser Acceleration** on the **Software Downloads** page to obtain the installer.
  
2. Run the file and follow the on-screen prompts until you reach the login screen. Use the [token](#prerequisites) you copied earlier when prompted for your **RBA Installer Token**. Click **Next**.

      ![rba-installer.png](/img/runbook-images/rba-login.png)

3. After installation is complete, click **Finish**. 

### Accessing the Western Union App

After setting up the RBA installer and restarting your device, continue with the following steps to access the Western Union app from Workspaces:

1. Log in to Cloud Workspaces using the newly installed Chrome browser. If you’re not already on the homepage, click **Go Home**. The tools available in your workspace may vary based on your [user subscription](../index.md#workspaces-subscriptions).

    ![home-page](/img/runbook-images/rba.png)

2. From the **Workspaces** homepage, click **Open** for the **Western Union App**. The web app opens up in a new tab within the remote browser.

    ![wu](/img/runbook-images/western-union.png)

3. The navigation controls in the top-right corner of the screen allow you to navigate back and forth within the Western Union app to complete your tasks. These controls also provide options to refresh and close the web app.
   
    ![rba-controls](/img/runbook-images/rba-controls.png)
   
**Next steps:**
- [Configure the supported peripheral devices](validating-peripherals.md) to ensure they're functional for use within RBA.