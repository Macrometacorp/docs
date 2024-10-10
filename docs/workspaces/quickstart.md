---
title: Quickstart
sidebar_position: 1
---

Cloud Workspaces is deployed and managed by Macrometa's engineering team based on your product needs, ensuring optimal performance and security. 

## Prerequisites

Ensure to have the following installed before using Cloud Workspaces:

1. For **Windows 10**, download the latest stable **Chrome** browser.

2. For **Windows 7**, download the [latest supported Chrome browser](https://support.google.com/chrome/a/answer/7100626?hl=en&sjid=16270217913818414435-EU).

3. For **Windows XP**, you need to install the **Supermium browser**. Follow these steps to download and install Supermium:

   a. Go to the [Supermium v.122 release page](https://github.com/win32ss/supermium/releases/tag/v122-r6) on GitHub

   b. Select and download the *.exe* file appropriate for your operating system architecture (32-bit or 64-bit).

   c. Locate the downloaded *.exe* file and double-click to start the installation. Follow the on-screen instructions to complete the installation process.

   d. During installation, select the "**Create shortcuts**" checkbox for easier access to the app after installation.

   ![Supermium installation](/img/workspaces/supermium.png)

## Connecting to the workspace

Once your browser is installed on your device,

1. Contact Macrometa support to receive your unique URL for accessing your Cloud Workspace environment.
1. Open your local browser and enter the provided URL in the address bar. Enter your login details.

![login-screen](/img/workspaces/login-screen.png)

- For first-time users, the onboarding screen is displayed so you can download the appropriate installer based on your specific requirements. Refer to the respective guides for detailed instructions on how to set up the [VDI](./remote-desktop-enviroment/index.md) and [RBA](./remote-browser-accelerator/getting-started.md) installers.
    
    ![onboarding-screen](/img/workspaces/onboarding-screen.png)

- Returning users are redirected to the homepage.

    ![Cloud Workspace interface](/img/workspaces/homepage.jpeg)
    
Once connected, you'll see the specific web applications deployed for your business use case under Workspaces, along with the virtual Linux and Windows desktops. Additionally you have VS Code, a remote IDE for developers. Refer to the [RBA](./remote-browser-accelerator/index.md) and [RDE](./remote-desktop-enviroment/index.md) documentation for more details on how to use these workspaces.


## Validating Peripheral Devices

Workspaces offers its [Peripheral Validator](./peripheral-validator.md), a feature that allows your peripheral devices connect to it successfully to ensure a smooth and productive experience. This feature enhances the user experience by allowing the use of essential hardware in virtual environments. Cloud Workspaces currently supports the following peripheral devices:

- Signature pad
- Card reader
- Webcams
- Printers

:::important
Before validating your devices, ensure to download and install the latest drivers and updates
:::

To validate your devices and ensure they function correctly within your remote sessions:

1. Navigate to the **Peripherals** card from your Workspaces homepage and click **Connect**.
1. Click **Test** to confirm the validation of every device to ensure they are properly configured and ready for use in your remote sessions.