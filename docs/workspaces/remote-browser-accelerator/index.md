---
sidebar_position: 3
title: Remote Browser Acceleration (RBA)
---

Remote Browser Acceleration (RBA) enhances the performance of specific web applications by deploying them directly at the network edge. This allows users to interact with web apps remotely as if they were running locally on their devices, ensuring optimal speed and responsiveness. By offloading processing tasks to a remote browser, RBA ensures faster page load times, improved responsiveness, and consistent performance, even on legacy or resource-constrained systems.

## Getting started

At the end of this guide, you will be able to:

- Download and set up the [RBA installer](#step-1-download-and-set-up-the-rba-installer)
- Get RBA started and launch your necessary work applications
- [Validate peripherals](./rba-peripheral-validator.md) for RBA
- Use the [RBA control bar](./rba-control-bar.md) for an optimized experience

Before proceeding, contact Macrometa support for your Workspace URL.

## Step 1: Download and set up the RBA installer

The RBA installer is a driver that configures the neccesary pre-requisites and broswer on your device for RBA to function properly. 

:::important
The RBA installer also installs the supported Chrome browser on your device. To ensure RBA functions properly, you must access Cloud Workspaces using this browser. If you already have the correct Chrome version, the browser installation will be skipped.
:::

To install this driver:

1. Log in to your Workspaces account.
2. Follow one of these steps based on your usage level:
    - For first-time users, you are directed to an onboarding screen that displays the various installers. Click **Download RBA Installer**. 
    - For returning users,  Navigate to **Download Package** from the left-hand sidebar on the homepage. This takes you to the onboarding page with the various installers. Click **Download RBA Installer**.
    
    ![onboarding-screen](/img/workspaces/onboarding-screen.png)

3. Run the file and follow the on-screen prompts until you reach the login screen. Enter your login details when prompted. To obtain your RBA token, return to the **Download Package** or onboarding screen for Workspaces and click on **RBA Installer Token**. Then, copy the displayed token.

    ![rba-installer-login](/img/workspaces/rba-installer-login.png)


:::important
After validation is succesful, wait for the installation process to be completed to ensure the installer downloads all the necessary tools to access RBA.
:::

4. Once the installation and validation process is completed, you receive a prompt to restart your device. Click **Finish** to restart your device.

![restart-rba](/img/workspaces/rba-restart.png)




## Step 2: Launch your web apps

After completing the installation and restarting your device, 
1. Log in to Cloud Workspaces using the newly installed browser.
2. Click on the web app you wish to use. By default, the selected application or service will open in a tab within the remote browser. A control bar icon `>` appears on the left side of the screen, allowing you to easily manage and interact with the remote browser.
